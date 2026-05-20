/**
 * LOGIN PAGE SCRIPT
 * Handles password input, validation, and authentication
 */

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const loader = document.getElementById('loader');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const rememberMe = document.getElementById('rememberMe');

    // Redirect if already authenticated
    if (AdminAuth.isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }

    /**
     * Toggle password visibility
     */
    passwordToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggle.innerHTML = isPassword
            ? '<i class="fas fa-eye-slash"></i>'
            : '<i class="fas fa-eye"></i>';
    });

    /**
     * Update password strength indicator
     */
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const validation = AdminAuth.validatePasswordStrength(password);

        // Update strength bar
        strengthFill.className = `strength-fill ${validation.strength}`;

        // Update strength text
        const strengthLabels = {
            weak: '❌ Weak',
            fair: '⚠️ Fair',
            good: '✓ Good',
            strong: '✅ Strong'
        };
        strengthText.textContent = `Password strength: ${strengthLabels[validation.strength]}`;

        // Update feedback
        if (validation.feedback.length === 0) {
            passwordFeedback.innerHTML = '<li style="color: var(--color-success);"><i class="fas fa-check-circle"></i> Password is strong</li>';
        } else {
            passwordFeedback.innerHTML = validation.feedback
                .map(item => `<li style="color: var(--color-text-muted);"><i class="fas fa-info-circle"></i> ${item}</li>`)
                .join('');
        }
    });

    /**
     * Handle form submission
     */
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = passwordInput.value.trim();

        // Basic validation
        if (!password) {
            showError('Password is required');
            return;
        }

        try {
            // Show loader
            loader.classList.add('active');
            loginButton.disabled = true;

            // Check stored password hash first (works on file:// where fetch is blocked)
            const storedHash = localStorage.getItem('cms-password-hash');
            if (storedHash) {
                const enteredHash = await AdminAuth.hashPassword(password);
                if (enteredHash !== storedHash) {
                    throw new Error('Incorrect password. Please try again.');
                }
            }

            // Try to load and decrypt the content file (validates password on real server)
            try {
                await DataManager.load(password);
            } catch (error) {
                // File exists on server but decryption failed — wrong password
                throw new Error('Incorrect password. Please try again.');
            }

            // Create session
            const loginSuccess = await AdminAuth.login(password);
            if (!loginSuccess) {
                throw new Error('Login failed');
            }

            // Persist hash for future file:// validation
            const pwHash = await AdminAuth.hashPassword(password);
            localStorage.setItem('cms-password-hash', pwHash);

            // Success - redirect to dashboard
            Utils.showToast('Login successful!', 'success');
            
            // Store remember me preference
            if (rememberMe.checked) {
                localStorage.setItem('cms-remember-password-hint', '1');
            }

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            showError(error.message || 'Authentication failed. Please try again.');
        } finally {
            loader.classList.remove('active');
            loginButton.disabled = false;
        }
    });

    /**
     * Show error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }

    // Focus on password input
    passwordInput.focus();
});
