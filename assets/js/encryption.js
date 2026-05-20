/**
 * ENCRYPTION MODULE
 * AES-256-GCM encryption/decryption using Web Crypto API (built into browsers)
 * No external libraries needed - works on GitHub Pages!
 * 
 * Usage:
 *   const encrypted = Encryption.encrypt(data, password);
 *   const decrypted = Encryption.decrypt(encrypted, password);
 */

const Encryption = (() => {
    'use strict';

    const ITERATIONS = 100000; // PBKDF2 iterations (high for security, still fast)
    const SALT = 'bespoke-cms-salt-v2'; // Fixed salt for consistent key derivation
    const KEY_LENGTH = 256; // 256-bit key

    /**
     * Convert ArrayBuffer to Base64 string
     * @param {ArrayBuffer} buffer - The buffer to convert
     * @returns {string} - Base64 string
     */
    function bufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let str = '';
        for (let i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return btoa(str);
    }

    /**
     * Convert Base64 string to ArrayBuffer
     * @param {string} base64 - The Base64 string
     * @returns {ArrayBuffer} - The buffer
     */
    function base64ToBuffer(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    /**
     * Derive a key from password using PBKDF2 (Web Crypto API)
     * @param {string} password - The password to derive from
     * @returns {Promise<CryptoKey>} - The derived key
     */
    async function deriveKey(password) {
        try {
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(password);
            const saltBuffer = encoder.encode(SALT);

            // Import password as key
            const baseKey = await window.crypto.subtle.importKey(
                'raw',
                passwordBuffer,
                { name: 'PBKDF2' },
                false,
                ['deriveKey']
            );

            // Derive encryption key using PBKDF2
            const key = await window.crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: saltBuffer,
                    iterations: ITERATIONS,
                    hash: 'SHA-256'
                },
                baseKey,
                { name: 'AES-GCM', length: KEY_LENGTH },
                false,
                ['encrypt', 'decrypt']
            );

            return key;
        } catch (error) {
            console.error('Key derivation error:', error);
            throw new Error('Failed to derive encryption key: ' + error.message);
        }
    }

    /**
     * Encrypt data with AES-256-GCM
     * @param {string|object} data - Data to encrypt
     * @param {string} password - Password for encryption
     * @returns {string} - Encrypted data as Base64 (format: iv:ciphertext:tag)
     */
    async function encrypt(data, password) {
        try {
            // Validate inputs
            if (!password || password.trim().length === 0) {
                throw new Error('Password is required');
            }

            // Convert data to JSON string if it's an object
            const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
            
            if (!jsonString) {
                throw new Error('Data to encrypt cannot be empty');
            }

            // Derive key from password
            const key = await deriveKey(password);
            
            // Generate random IV (12 bytes is standard for AES-GCM)
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            
            // Encrypt with AES-GCM
            const encoder = new TextEncoder();
            const encryptedBuffer = await window.crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                key,
                encoder.encode(jsonString)
            );

            // Combine IV + encrypted data
            const ivBase64 = bufferToBase64(iv);
            const encryptedBase64 = bufferToBase64(encryptedBuffer);
            
            // Return as combined Base64 string (iv:encrypted)
            return ivBase64 + ':' + encryptedBase64;
        } catch (error) {
            console.error('Encryption failed:', error);
            throw new Error('Failed to encrypt data: ' + error.message);
        }
    }

    /**
     * Decrypt data with AES-256-GCM
     * @param {string} encryptedData - Encrypted data (Base64 format: iv:encrypted)
     * @param {string} password - Password for decryption
     * @param {boolean} parseJSON - Whether to parse result as JSON
     * @returns {string|object} - Decrypted data
     */
    async function decrypt(encryptedData, password, parseJSON = true) {
        try {
            // Validate inputs
            if (!encryptedData || encryptedData.trim().length === 0) {
                throw new Error('Encrypted data is required');
            }
            
            if (!password || password.trim().length === 0) {
                throw new Error('Password is required');
            }

            // Split iv:encrypted
            const parts = encryptedData.split(':');
            if (parts.length !== 2) {
                throw new Error('Invalid encrypted data format');
            }

            const ivBuffer = base64ToBuffer(parts[0]);
            const encryptedBuffer = base64ToBuffer(parts[1]);

            // Derive key from password
            const key = await deriveKey(password);
            
            // Decrypt with AES-GCM
            const decryptedBuffer = await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: ivBuffer
                },
                key,
                encryptedBuffer
            );

            // Convert to UTF-8 string
            const decoder = new TextDecoder();
            const decryptedString = decoder.decode(decryptedBuffer);
            
            if (!decryptedString || decryptedString.trim().length === 0) {
                throw new Error('Decryption failed - invalid password or corrupted data');
            }
            
            // Parse as JSON if requested
            if (parseJSON) {
                try {
                    return JSON.parse(decryptedString);
                } catch (parseError) {
                    throw new Error('Decrypted data is not valid JSON: ' + parseError.message);
                }
            }
            
            return decryptedString;
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Failed to decrypt data: ' + error.message);
        }
    }

    /**
     * Generate a random password
     * @param {number} length - Password length
     * @returns {string} - Random password
     */
    function generatePassword(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    return {
        encrypt,
        decrypt,
        generatePassword
    };
})();

// Export for Node.js if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Encryption;
}
