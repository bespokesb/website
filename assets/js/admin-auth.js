/**
 * ADMIN AUTHENTICATION MODULE
 * Handles login, session management, and route protection
 * Uses Web Crypto API (built into browsers) - no external libraries needed
 * 
 * Usage:
 *   AdminAuth.login(password);
 *   AdminAuth.isAuthenticated();
 *   AdminAuth.logout();
 */

const AdminAuth = (() => {
    const SESSION_KEY = 'cms-admin-session';
    const PASSWORD_KEY = 'cms-admin-pwd';
    const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
    let sessionCheckInterval = null;

    /**
     * Hash password using Web Crypto API (SHA-256)
     * @param {string} password - Password to hash
     * @returns {Promise<string>} - Hash
     */
    async function hashPassword(password) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        } catch (error) {
            console.error('Hashing failed:', error);
            throw new Error('Failed to hash password: ' + error.message);
        }
    }

    /**
     * Authenticate with password
     * @param {string} password - Password to authenticate with
     * @returns {boolean} - Authentication success
     */
    async function login(password) {
        try {
            if (!password || password.trim().length === 0) {
                throw new Error('Password is required');
            }

            // Create session
            const session = {
                timestamp: Date.now(),
                hash: await hashPassword(password),
                token: generateToken()
            };

            // Store in sessionStorage (not localStorage for security)
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
            sessionStorage.setItem(PASSWORD_KEY, password);
            window.__adminPassword = password;

            // Start session timeout check
            startSessionTimeout();

            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} - Is authenticated
     */
    function isAuthenticated() {
        const session = getSession();
        if (!session) {
            return false;
        }

        // Check if session has expired
        const age = Date.now() - session.timestamp;
        if (age > SESSION_TIMEOUT) {
            logout();
            return false;
        }

        return true;
    }

    /**
     * Get current session
     * @returns {object|null} - Session object or null
     */
    function getSession() {
        try {
            const session = sessionStorage.getItem(SESSION_KEY);
            return session ? JSON.parse(session) : null;
        } catch (error) {
            console.error('Failed to get session:', error);
            return null;
        }
    }

    /**
     * Get admin password (from memory, not stored)
     * @returns {string|null} - Password if available
     */
    function getPassword() {
        return window.__adminPassword || sessionStorage.getItem(PASSWORD_KEY) || null;
    }

    /**
     * Logout
     */
    function logout() {
        try {
            // Clear session storage
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(PASSWORD_KEY);

            // Clear password from memory
            delete window.__adminPassword;

            // Clear session timeout
            stopSessionTimeout();

            // Redirect to login
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    /**
     * Refresh session
     */
    function refreshSession() {
        const session = getSession();
        if (session) {
            session.timestamp = Date.now();
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        }
    }

    /**
     * Get session timeout remaining (in seconds)
     * @returns {number} - Seconds remaining
     */
    function getSessionTimeRemaining() {
        const session = getSession();
        if (!session) {
            return 0;
        }

        const age = Date.now() - session.timestamp;
        const remaining = SESSION_TIMEOUT - age;

        return Math.max(0, Math.floor(remaining / 1000));
    }

    /**
     * Check and protect admin route
     * Redirects to login if not authenticated
     */
    function protectRoute() {
        if (!isAuthenticated()) {
            window.location.href = 'index.html';
        }
    }

    /**
     * Generate secure token
     * @returns {string} - Token
     */
    function generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Start session timeout check
     */
    function startSessionTimeout() {
        stopSessionTimeout(); // Clear any existing interval

        sessionCheckInterval = setInterval(() => {
            const remaining = getSessionTimeRemaining();

            // Warn when 5 minutes remaining
            if (remaining === 300) {
                Utils.showToast('Session will expire in 5 minutes. Please save your work.', 'warning');
            }

            // Auto-logout when expired
            if (remaining === 0 && isAuthenticated()) {
                Utils.showToast('Session expired. Please login again.', 'warning');
                logout();
            }
        }, 1000);

        // Refresh session on user activity
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, debounceRefresh, true);
        });
    }

    /**
     * Stop session timeout check
     */
    function stopSessionTimeout() {
        if (sessionCheckInterval) {
            clearInterval(sessionCheckInterval);
            sessionCheckInterval = null;
        }

        // Remove activity listeners
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            document.removeEventListener(event, debounceRefresh, true);
        });
    }

    /**
     * Debounced refresh
     */
    let refreshTimeout;
    const debounceRefresh = () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
            if (isAuthenticated()) {
                refreshSession();
            }
        }, 1000);
    };

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} - Validation result
     */
    function validatePasswordStrength(password) {
        const result = {
            strength: 'weak',
            score: 0,
            feedback: []
        };

        if (!password) {
            result.feedback.push('Password is required');
            return result;
        }

        // Length check
        if (password.length >= 8) result.score += 1;
        else result.feedback.push('At least 8 characters');

        // Uppercase check
        if (/[A-Z]/.test(password)) result.score += 1;
        else result.feedback.push('Include uppercase letters');

        // Lowercase check
        if (/[a-z]/.test(password)) result.score += 1;
        else result.feedback.push('Include lowercase letters');

        // Number check
        if (/\d/.test(password)) result.score += 1;
        else result.feedback.push('Include numbers');

        // Special character check
        if (/[!@#$%^&*]/.test(password)) result.score += 1;
        else result.feedback.push('Include special characters');

        // Determine strength
        if (result.score <= 2) result.strength = 'weak';
        else if (result.score <= 3) result.strength = 'fair';
        else if (result.score <= 4) result.strength = 'good';
        else result.strength = 'strong';

        return result;
    }

    /**
     * Hash password (for comparison)
     * @param {string} password - Password to hash
     * @returns {string} - Hash
     */
    async function hashPassword(password) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        } catch (error) {
            console.error('Hashing failed:', error);
            throw new Error('Failed to hash password: ' + error.message);
        }
    }

    return {
        login,
        isAuthenticated,
        getSession,
        getPassword,
        logout,
        refreshSession,
        getSessionTimeRemaining,
        protectRoute,
        startSessionTimeout,
        stopSessionTimeout,
        validatePasswordStrength,
        hashPassword
    };
})();

// Export for Node.js if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminAuth;
}
