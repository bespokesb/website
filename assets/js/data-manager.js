/**
 * DATA MANAGER MODULE
 * Handles loading, saving, and managing encrypted content
 * 
 * Usage:
 *   await DataManager.load(password);
 *   DataManager.getCompany();
 *   DataManager.updateCompany(companyData);
 *   await DataManager.save(password);
 */

const DataManager = (() => {
    let currentData = null;
    const DATA_FILE_PATH = '../data/content.enc';
    const STORAGE_KEY = 'cms-content-draft';

    /**
     * Default/empty content structure
     */
    const DEFAULT_SCHEMA = {
        version: '1.0',
        company: {
            name: 'BeSpoke Integrated Sdn Bhd',
            aboutText: '',
            address: 'No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru Bangi, 43650 Selangor',
            phone: '017-2388058',
            email: 'hello@bespokesb.com',
            whatsapp: '',
            googleMapsEmbed: '',
            socialMedia: {
                facebook: '',
                linkedin: '',
                twitter: '',
                instagram: ''
            }
        },
        blogs: [],
        clients: [],
        testimonials: [],
        gallery: [],
        lastUpdated: new Date().toISOString()
    };

    /**
     * Load encrypted content from file
     * @param {string} password - Password to decrypt content
     * @returns {Promise<object>} - Decrypted content
     */
    async function load(password) {
        let response;
        try {
            response = await fetch(DATA_FILE_PATH);
        } catch (fetchError) {
            // fetch() fails over file:// protocol — restore from localStorage draft if available
            const draft = loadDraft();
            if (draft) {
                currentData = draft;
                return currentData;
            }
            currentData = JSON.parse(JSON.stringify(DEFAULT_SCHEMA));
            return currentData;
        }

        try {
            if (response.status === 404) {
                // No encrypted file yet — restore from localStorage draft if available
                const draft = loadDraft();
                if (draft) {
                    currentData = draft;
                    return currentData;
                }
                currentData = JSON.parse(JSON.stringify(DEFAULT_SCHEMA));
                return currentData;
            }

            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.statusText}`);
            }

            const encryptedData = await response.text();
            currentData = await Encryption.decrypt(encryptedData, password);
            return currentData;
        } catch (error) {
            console.error('Failed to load content:', error);
            throw error;
        }
    }

    /**
     * Save encrypted content to file (requires backend/GitHub Actions)
     * For now, provide export functionality
     * @param {string} password - Password to encrypt content
     * @returns {Promise<string>} - Encrypted content as Base64
     */
    async function save(password) {
        try {
            if (!currentData) {
                throw new Error('No data to save');
            }
            
            // Update lastUpdated timestamp
            currentData.lastUpdated = new Date().toISOString();
            
            // Encrypt the data
            const encryptedData = await Encryption.encrypt(currentData, password);
            
            // Note: To actually save to the server, you would need:
            // 1. A GitHub Actions workflow
            // 2. Or a simple backend endpoint
            // 
            // For now, return encrypted data for manual download/copy
            console.log('Encrypted data (copy to /data/content.enc):');
            console.log(encryptedData);
            
            return encryptedData;
        } catch (error) {
            console.error('Failed to save content:', error);
            throw error;
        }
    }

    /**
     * Get company information
     * @returns {object} - Company data
     */
    function getCompany() {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        return currentData.company;
    }

    /**
     * Update company information
     * @param {object} updates - Company data updates
     */
    function updateCompany(updates) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        currentData.company = { ...currentData.company, ...updates };
        saveDraft();
    }

    /**
     * Get all blogs
     * @returns {array} - Blog posts
     */
    function getBlogs() {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        return currentData.blogs || [];
    }

    /**
     * Add a new blog post
     * @param {object} blog - Blog data
     * @returns {string} - Blog ID
     */
    function addBlog(blog) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        if (!currentData.blogs) {
            currentData.blogs = [];
        }
        
        const id = `blog-${Date.now()}`;
        blog.id = id;
        blog.createdAt = new Date().toISOString();
        blog.slug = generateSlug(blog.title);
        
        currentData.blogs.push(blog);
        saveDraft();
        
        return id;
    }

    /**
     * Update a blog post
     * @param {string} id - Blog ID
     * @param {object} updates - Updates to apply
     */
    function updateBlog(id, updates) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        
        const blog = currentData.blogs.find(b => b.id === id);
        if (!blog) {
            throw new Error(`Blog with ID ${id} not found`);
        }
        
        Object.assign(blog, updates);
        if (updates.title) {
            blog.slug = generateSlug(updates.title);
        }
        
        saveDraft();
    }

    /**
     * Delete a blog post
     * @param {string} id - Blog ID
     */
    function deleteBlog(id) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        
        currentData.blogs = currentData.blogs.filter(b => b.id !== id);
        saveDraft();
    }

    /**
     * Get all clients
     * @returns {array} - Clients data
     */
    function getClients() {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        return currentData.clients || [];
    }

    /**
     * Add a client
     * @param {object} client - Client data
     * @returns {string} - Client ID
     */
    function addClient(client) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        if (!currentData.clients) {
            currentData.clients = [];
        }
        
        const id = `client-${Date.now()}`;
        client.id = id;
        currentData.clients.push(client);
        saveDraft();
        
        return id;
    }

    /**
     * Update a client
     * @param {string} id - Client ID
     * @param {object} updates - Updates to apply
     */
    function updateClient(id, updates) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        
        const client = currentData.clients.find(c => c.id === id);
        if (!client) {
            throw new Error(`Client with ID ${id} not found`);
        }
        
        Object.assign(client, updates);
        saveDraft();
    }

    /**
     * Delete a client
     * @param {string} id - Client ID
     */
    function deleteClient(id) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        
        currentData.clients = currentData.clients.filter(c => c.id !== id);
        saveDraft();
    }

    /**
     * Get all testimonials
     * @returns {array} - Testimonials
     */
    function getTestimonials() {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        return currentData.testimonials || [];
    }

    /**
     * Add a testimonial
     * @param {object} testimonial - Testimonial data
     * @returns {string} - Testimonial ID
     */
    function addTestimonial(testimonial) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        if (!currentData.testimonials) {
            currentData.testimonials = [];
        }
        
        const id = `testimonial-${Date.now()}`;
        testimonial.id = id;
        currentData.testimonials.push(testimonial);
        saveDraft();
        
        return id;
    }

    /**
     * Get all gallery items
     * @returns {array} - Gallery items
     */
    function getGallery() {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        return currentData.gallery || [];
    }

    /**
     * Add gallery item
     * @param {object} item - Gallery item data
     * @returns {string} - Item ID
     */
    function addGalleryItem(item) {
        if (!currentData) {
            throw new Error('Data not loaded. Call load() first.');
        }
        if (!currentData.gallery) {
            currentData.gallery = [];
        }
        
        const id = `gallery-${Date.now()}`;
        item.id = id;
        currentData.gallery.push(item);
        saveDraft();
        
        return id;
    }

    /**
     * Get raw data
     * @returns {object} - Current data
     */
    function getData() {
        return currentData;
    }

    /**
     * Generate URL-friendly slug
     * @param {string} text - Text to slugify
     * @returns {string} - Slug
     */
    function generateSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    /**
     * Save draft to localStorage
     */
    function saveDraft() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        } catch (error) {
            console.warn('Failed to save draft to localStorage:', error);
        }
    }

    /**
     * Load draft from localStorage
     * @returns {object|null} - Draft data or null
     */
    function loadDraft() {
        try {
            const draft = localStorage.getItem(STORAGE_KEY);
            return draft ? JSON.parse(draft) : null;
        } catch (error) {
            console.warn('Failed to load draft from localStorage:', error);
            return null;
        }
    }

    /**
     * Clear draft
     */
    function clearDraft() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn('Failed to clear draft:', error);
        }
    }

    /**
     * Export data as JSON file
     */
    function exportAsJSON() {
        if (!currentData) {
            throw new Error('No data to export');
        }
        
        const dataStr = JSON.stringify(currentData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cms-content-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return {
        load,
        save,
        getCompany,
        updateCompany,
        getBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getClients,
        addClient,
        updateClient,
        deleteClient,
        getTestimonials,
        addTestimonial,
        getGallery,
        addGalleryItem,
        getData,
        saveDraft,
        loadDraft,
        clearDraft,
        exportAsJSON
    };
})();

// Export for Node.js if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
