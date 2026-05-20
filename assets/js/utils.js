/**
 * UTILITIES MODULE
 * Common helper functions
 */

const Utils = (() => {
    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type: success, error, warning, info
     * @param {number} duration - Duration in milliseconds
     */
    function showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    /**
     * Show loading spinner
     * @param {boolean} show - Show or hide
     * @param {string} message - Optional message
     */
    function showLoading(show = true, message = 'Loading...') {
        let loader = document.getElementById('cms-loader');
        
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'cms-loader';
                loader.innerHTML = `
                    <div class="loader-overlay">
                        <div class="loader-content">
                            <div class="spinner"></div>
                            <p>${message}</p>
                        </div>
                    </div>
                `;
                document.body.appendChild(loader);
            }
        } else {
            if (loader) {
                loader.remove();
            }
        }
    }

    /**
     * Validate email
     * @param {string} email - Email to validate
     * @returns {boolean} - Is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate URL
     * @param {string} url - URL to validate
     * @returns {boolean} - Is valid
     */
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Format date
     * @param {string|Date} date - Date to format
     * @param {string} format - Format pattern (e.g., 'YYYY-MM-DD')
     * @returns {string} - Formatted date
     */
    function formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('SS', seconds);
    }

    /**
     * Deep clone object
     * @param {object} obj - Object to clone
     * @returns {object} - Cloned object
     */
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Merge objects
     * @param {object} target - Target object
     * @param {object} source - Source object
     * @returns {object} - Merged object
     */
    function merge(target, source) {
        return { ...target, ...source };
    }

    /**
     * Debounce function
     * @param {function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {function} - Debounced function
     */
    function debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function
     * @param {function} func - Function to throttle
     * @param {number} limit - Limit time in milliseconds
     * @returns {function} - Throttled function
     */
    function throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Get query parameter
     * @param {string} param - Parameter name
     * @returns {string|null} - Parameter value
     */
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    /**
     * Set query parameter
     * @param {string} param - Parameter name
     * @param {string} value - Parameter value
     */
    function setQueryParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    }

    /**
     * Confirm dialog
     * @param {string} message - Message to display
     * @returns {Promise<boolean>} - Confirmation result
     */
    function confirm(message) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay active';
            modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-header-title">Confirm</h2>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove(); window.__confirmResult = false;">Cancel</button>
                        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); window.__confirmResult = true;">Confirm</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Wait for click
            const checkResult = setInterval(() => {
                if (window.__confirmResult !== undefined) {
                    clearInterval(checkResult);
                    const result = window.__confirmResult;
                    delete window.__confirmResult;
                    resolve(result);
                }
            }, 50);
        });
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     */
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Copied to clipboard', 'success');
        } catch (error) {
            console.error('Failed to copy:', error);
            showToast('Failed to copy', 'error');
        }
    }

    /**
     * Generate unique ID
     * @returns {string} - Unique ID
     */
    function generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Truncate text
     * @param {string} text - Text to truncate
     * @param {number} length - Max length
     * @returns {string} - Truncated text
     */
    function truncate(text, length = 50) {
        if (text.length <= length) return text;
        return text.substr(0, length) + '...';
    }

    /**
     * Capitalize text
     * @param {string} text - Text to capitalize
     * @returns {string} - Capitalized text
     */
    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Get file size in human-readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} - Human-readable size
     */
    function formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
    }

    return {
        showToast,
        showLoading,
        isValidEmail,
        isValidUrl,
        formatDate,
        deepClone,
        merge,
        debounce,
        throttle,
        getQueryParam,
        setQueryParam,
        confirm,
        copyToClipboard,
        generateId,
        truncate,
        capitalize,
        formatFileSize
    };
})();

// Export for Node.js if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
