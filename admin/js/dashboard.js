/**
 * DASHBOARD SCRIPT
 * Main admin panel logic and content management
 */

const Dashboard = (() => {
    let currentData = null;
    let currentEditingItem = null;
    let currentEditingType = null;

    const elements = {
        navLinks: document.querySelectorAll('.admin-nav-link'),
        contentAreas: document.querySelectorAll('.dashboard-content-area'),
        pageTitle: document.getElementById('pageTitle'),
        modalOverlay: document.getElementById('modalOverlay'),
        modalTitle: document.getElementById('modalTitle'),
        modalBody: document.getElementById('modalBody'),
        modalCancel: document.getElementById('modalCancel'),
        modalSave: document.getElementById('modalSave'),
        modalClose: document.getElementById('modalClose'),
        logoutBtn: document.getElementById('logoutBtn'),
        exportBtn: document.getElementById('exportBtn'),
        publishBtn: document.getElementById('publishBtn'),
        loader: document.getElementById('loader'),
        companyForm: document.getElementById('companyForm'),
        addBlogBtn: document.getElementById('addBlogBtn'),
        addClientBtn: document.getElementById('addClientBtn'),
        addTestimonialBtn: document.getElementById('addTestimonialBtn'),
        addGalleryBtn: document.getElementById('addGalleryBtn')
    };

    /**
     * Initialize dashboard
     */
    async function init() {
        try {
            // Protect route
            AdminAuth.protectRoute();

            // Get password from session
            const password = AdminAuth.getPassword();
            if (!password) {
                throw new Error('Session lost. Please login again.');
            }

            // Load data
            showLoader(true);
            await loadData(password);

            // Setup event listeners
            setupEventListeners();

            // Render initial content
            renderOverview();

            showLoader(false);
        } catch (error) {
            console.error('Dashboard init error:', error);
            Utils.showToast(error.message, 'error');
            setTimeout(() => {
                AdminAuth.logout();
            }, 2000);
        }
    }

    /**
     * Load content from encrypted file
     */
    async function loadData(password) {
        try {
            currentData = await DataManager.load(password);
            return currentData;
        } catch (error) {
            console.error('Failed to load data:', error);
            // Initialize with default schema
            currentData = DataManager.getData();
            if (!currentData) {
                throw error;
            }
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Navigation
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                showSection(section, link);
            });
        });

        // Logout
        elements.logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AdminAuth.logout();
        });

        // Export
        elements.exportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            DataManager.exportAsJSON();
        });

        // Publish posts to public posts.json
        elements.publishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            publishPosts();
        });

        // Company form
        elements.companyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveCompanyInfo();
        });

        // Add buttons
        elements.addBlogBtn.addEventListener('click', () => showBlogModal());
        elements.addClientBtn.addEventListener('click', () => showClientModal());
        elements.addTestimonialBtn.addEventListener('click', () => showTestimonialModal());
        elements.addGalleryBtn.addEventListener('click', () => showGalleryModal());

        // Modal buttons
        elements.modalClose.addEventListener('click', closeModal);
        elements.modalCancel.addEventListener('click', closeModal);
        elements.modalSave.addEventListener('click', saveModalItem);
    }

    /**
     * Show section
     */
    function showSection(section, navLink) {
        // Update nav
        elements.navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');

        // Update content
        elements.contentAreas.forEach(area => area.classList.remove('active'));
        const target = document.getElementById(section);
        if (target) target.classList.add('active');

        // Update title
        const titles = {
            overview: 'Dashboard',
            company: 'Company Information',
            blogs: 'News & Updates',
            clients: 'Clients',
            testimonials: 'Testimonials',
            gallery: 'Gallery'
        };
        elements.pageTitle.textContent = titles[section] || 'Dashboard';

        // Render content
        switch (section) {
            case 'overview':
                renderOverview();
                break;
            case 'company':
                renderCompanyForm();
                break;
            case 'blogs':
                renderBlogsList();
                break;
            case 'clients':
                renderClientsList();
                break;
            case 'testimonials':
                renderTestimonialsList();
                break;
            case 'gallery':
                renderGalleryList();
                break;
        }
    }

    /**
     * Render overview section
     */
    function renderOverview() {
        const blogs = DataManager.getBlogs();
        const clients = DataManager.getClients();
        const testimonials = DataManager.getTestimonials();
        const gallery = DataManager.getGallery();

        // Update counts
        document.getElementById('blogCount').textContent = blogs.length;
        document.getElementById('clientCount').textContent = clients.length;
        document.getElementById('testimonialCount').textContent = testimonials.length;
        document.getElementById('galleryCount').textContent = gallery.length;

        // Recent blogs
        const recentBlogs = blogs.slice(-3).reverse();
        document.getElementById('recentBlogs').innerHTML = recentBlogs.length === 0
            ? '<p style="color: var(--color-text-muted);">No posts yet</p>'
            : recentBlogs.map(blog => `
                <div class="list-item">
                    <div class="list-item-info">
                        <h4>${blog.title}</h4>
                        <p>${Utils.formatDate(blog.date)}</p>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn-icon" onclick="Dashboard.editBlog('${blog.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('');

        // Recent clients
        const recentClients = clients.slice(-3).reverse();
        document.getElementById('recentClients').innerHTML = recentClients.length === 0
            ? '<p style="color: var(--color-text-muted);">No clients yet</p>'
            : recentClients.map(client => `
                <div class="list-item">
                    <div class="list-item-info">
                        <h4>${client.name}</h4>
                        <p>${client.industry || 'No industry'}</p>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn-icon" onclick="Dashboard.editClient('${client.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('');
    }

    /**
     * Render company form
     */
    function renderCompanyForm() {
        const company = DataManager.getCompany();
        
        document.getElementById('companyName').value = company.name || '';
        document.getElementById('companyAbout').value = company.aboutText || '';
        document.getElementById('companyAddress').value = company.address || '';
        document.getElementById('companyPhone').value = company.phone || '';
        document.getElementById('companyEmail').value = company.email || '';
        document.getElementById('companyWhatsapp').value = company.whatsapp || '';
        document.getElementById('companyInstagram').value = company.socialMedia?.instagram || '';
    }

    /**
     * Save company info
     */
    function saveCompanyInfo() {
        const updates = {
            name: document.getElementById('companyName').value,
            aboutText: document.getElementById('companyAbout').value,
            address: document.getElementById('companyAddress').value,
            phone: document.getElementById('companyPhone').value,
            email: document.getElementById('companyEmail').value,
            whatsapp: document.getElementById('companyWhatsapp').value,
            socialMedia: {
                ...DataManager.getCompany().socialMedia,
                instagram: document.getElementById('companyInstagram').value
            }
        };

        DataManager.updateCompany(updates);
        Utils.showToast('Company information saved!', 'success');
    }

    /**
     * Render blogs list
     */
    function renderBlogsList() {
        const blogs = DataManager.getBlogs();
        const container = document.getElementById('blogsList');

        if (blogs.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-muted); padding: var(--spacing-lg);">No posts yet. Click "Add Post" to create one.</p>';
            return;
        }

        container.innerHTML = blogs.map(blog => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${blog.title}</h4>
                    <p>${blog.status} • ${Utils.formatDate(blog.date)}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn-icon" onclick="Dashboard.editBlog('${blog.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" onclick="Dashboard.deleteBlog('${blog.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Show blog modal
     */
    window.Dashboard = window.Dashboard || {};
    window.Dashboard.editBlog = function(id) {
        const blog = DataManager.getBlogs().find(b => b.id === id);
        if (blog) {
            currentEditingItem = blog;
            currentEditingType = 'blog';
            showBlogModal(blog);
        }
    };

    function showBlogModal(blog = null) {
        currentEditingItem = blog;
        currentEditingType = 'blog';

        elements.modalTitle.textContent = blog ? 'Edit Post' : 'Add Post';
        elements.modalBody.innerHTML = `
            <form id="blogForm">
                <div class="form-group">
                    <label>Title *</label>
                    <input type="text" class="form-control" id="blogTitle" value="${blog?.title || ''}" required>
                </div>
                <div class="form-group">
                    <label>Content *</label>
                    <textarea class="form-control" id="blogContent" rows="6" required>${blog?.content || ''}</textarea>
                </div>
                <div class="editor-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="form-group">
                        <label>Cover Image URL</label>
                        <input type="url" class="form-control" id="blogCoverImage" value="${blog?.coverImage || ''}">
                    </div>
                    <div class="form-group">
                        <label>Date *</label>
                        <input type="datetime-local" class="form-control" id="blogDate" value="${blog ? new Date(blog.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}" required>
                    </div>
                </div>
                <div class="editor-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="form-group">
                        <label>Category</label>
                        <input type="text" class="form-control" id="blogCategory" value="${blog?.category || 'Updates'}">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" id="blogStatus">
                            <option value="published" ${blog?.status === 'published' ? 'selected' : ''}>Published</option>
                            <option value="draft" ${blog?.status === 'draft' ? 'selected' : ''}>Draft</option>
                        </select>
                    </div>
                </div>
            </form>
        `;

        openModal();
    }

    window.Dashboard.deleteBlog = function(id) {
        if (confirm('Are you sure you want to delete this post?')) {
            DataManager.deleteBlog(id);
            Utils.showToast('Post deleted!', 'success');
            renderBlogsList();
        }
    };

    /**
     * Render clients list
     */
    function renderClientsList() {
        const clients = DataManager.getClients();
        const container = document.getElementById('clientsList');

        if (clients.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-muted); padding: var(--spacing-lg);">No clients yet. Click "Add Client" to add one.</p>';
            return;
        }

        container.innerHTML = clients.map(client => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${client.name}</h4>
                    <p>${client.industry || 'No industry'}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn-icon" onclick="Dashboard.editClient('${client.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" onclick="Dashboard.deleteClient('${client.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.Dashboard.editClient = function(id) {
        const client = DataManager.getClients().find(c => c.id === id);
        if (client) {
            currentEditingItem = client;
            currentEditingType = 'client';
            showClientModal(client);
        }
    };

    function showClientModal(client = null) {
        currentEditingItem = client;
        currentEditingType = 'client';

        elements.modalTitle.textContent = client ? 'Edit Client' : 'Add Client';
        elements.modalBody.innerHTML = `
            <form id="clientForm">
                <div class="form-group">
                    <label>Company Name *</label>
                    <input type="text" class="form-control" id="clientName" value="${client?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>Logo URL</label>
                    <input type="url" class="form-control" id="clientLogo" value="${client?.logo || ''}">
                </div>
                <div class="form-group">
                    <label>Website URL</label>
                    <input type="url" class="form-control" id="clientWebsite" value="${client?.website || ''}">
                </div>
                <div class="form-group">
                    <label>Industry</label>
                    <input type="text" class="form-control" id="clientIndustry" value="${client?.industry || ''}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="clientDescription" rows="3">${client?.description || ''}</textarea>
                </div>
            </form>
        `;

        openModal();
    }

    window.Dashboard.deleteClient = function(id) {
        if (confirm('Are you sure you want to delete this client?')) {
            DataManager.deleteClient(id);
            Utils.showToast('Client deleted!', 'success');
            renderClientsList();
        }
    };

    /**
     * Render testimonials list
     */
    function renderTestimonialsList() {
        const testimonials = DataManager.getTestimonials();
        const container = document.getElementById('testimonialsList');

        if (testimonials.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-muted); padding: var(--spacing-lg);">No testimonials yet. Click "Add Testimonial" to add one.</p>';
            return;
        }

        container.innerHTML = testimonials.map(testimonial => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${testimonial.clientName}</h4>
                    <p>${testimonial.position} at ${testimonial.company}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn-icon" onclick="Dashboard.editTestimonial('${testimonial.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" onclick="Dashboard.deleteTestimonial('${testimonial.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.Dashboard.editTestimonial = function(id) {
        const testimonial = DataManager.getTestimonials().find(t => t.id === id);
        if (testimonial) {
            currentEditingItem = testimonial;
            currentEditingType = 'testimonial';
            showTestimonialModal(testimonial);
        }
    };

    function showTestimonialModal(testimonial = null) {
        currentEditingItem = testimonial;
        currentEditingType = 'testimonial';

        elements.modalTitle.textContent = testimonial ? 'Edit Testimonial' : 'Add Testimonial';
        elements.modalBody.innerHTML = `
            <form id="testimonialForm">
                <div class="form-group">
                    <label>Client Name *</label>
                    <input type="text" class="form-control" id="testimonialName" value="${testimonial?.clientName || ''}" required>
                </div>
                <div class="editor-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="form-group">
                        <label>Position *</label>
                        <input type="text" class="form-control" id="testimonialPosition" value="${testimonial?.position || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Company *</label>
                        <input type="text" class="form-control" id="testimonialCompany" value="${testimonial?.company || ''}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Feedback *</label>
                    <textarea class="form-control" id="testimonialFeedback" rows="4" required>${testimonial?.feedback || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Rating (1-5)</label>
                    <select class="form-control" id="testimonialRating">
                        <option value="5" ${testimonial?.rating === 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐ (5 stars)</option>
                        <option value="4" ${testimonial?.rating === 4 ? 'selected' : ''}>⭐⭐⭐⭐ (4 stars)</option>
                        <option value="3" ${testimonial?.rating === 3 ? 'selected' : ''}>⭐⭐⭐ (3 stars)</option>
                        <option value="2" ${testimonial?.rating === 2 ? 'selected' : ''}>⭐⭐ (2 stars)</option>
                        <option value="1" ${testimonial?.rating === 1 ? 'selected' : ''}>⭐ (1 star)</option>
                    </select>
                </div>
            </form>
        `;

        openModal();
    }

    window.Dashboard.deleteTestimonial = function(id) {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            DataManager.getTestimonials().splice(DataManager.getTestimonials().findIndex(t => t.id === id), 1);
            Utils.showToast('Testimonial deleted!', 'success');
            renderTestimonialsList();
        }
    };

    /**
     * Render gallery list
     */
    function renderGalleryList() {
        const gallery = DataManager.getGallery();
        const container = document.getElementById('galleryList');

        if (gallery.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-muted); padding: var(--spacing-lg);">No gallery items yet. Click "Add Image" to add one.</p>';
            return;
        }

        container.innerHTML = gallery.map(item => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.category || 'Uncategorized'}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn-icon" onclick="Dashboard.editGallery('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" onclick="Dashboard.deleteGallery('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.Dashboard.editGallery = function(id) {
        const item = DataManager.getGallery().find(g => g.id === id);
        if (item) {
            currentEditingItem = item;
            currentEditingType = 'gallery';
            showGalleryModal(item);
        }
    };

    function showGalleryModal(item = null) {
        currentEditingItem = item;
        currentEditingType = 'gallery';

        elements.modalTitle.textContent = item ? 'Edit Gallery Item' : 'Add Gallery Item';
        elements.modalBody.innerHTML = `
            <form id="galleryForm">
                <div class="form-group">
                    <label>Title *</label>
                    <input type="text" class="form-control" id="galleryTitle" value="${item?.title || ''}" required>
                </div>
                <div class="form-group">
                    <label>Image URL *</label>
                    <input type="url" class="form-control" id="galleryImage" value="${item?.image || ''}" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" class="form-control" id="galleryCategory" value="${item?.category || 'Projects'}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="galleryDescription" rows="2">${item?.description || ''}</textarea>
                </div>
            </form>
        `;

        openModal();
    }

    window.Dashboard.deleteGallery = function(id) {
        if (confirm('Are you sure you want to delete this gallery item?')) {
            const gallery = DataManager.getGallery();
            const index = gallery.findIndex(g => g.id === id);
            if (index > -1) {
                gallery.splice(index, 1);
            }
            Utils.showToast('Gallery item deleted!', 'success');
            renderGalleryList();
        }
    };

    /**
     * Modal management
     */
    function openModal() {
        elements.modalOverlay.classList.add('active');
    }

    function closeModal() {
        elements.modalOverlay.classList.remove('active');
        currentEditingItem = null;
        currentEditingType = null;
    }

    function saveModalItem() {
        try {
            const type = currentEditingType;
            const isEditing = !!currentEditingItem;

            switch (type) {
                case 'blog': {
                    const title = document.getElementById('blogTitle').value.trim();
                    const content = document.getElementById('blogContent').value.trim();
                    
                    if (!title || !content) {
                        Utils.showToast('Title and content are required', 'error');
                        return;
                    }

                    const blogData = {
                        title,
                        content,
                        coverImage: document.getElementById('blogCoverImage').value,
                        date: new Date(document.getElementById('blogDate').value).toISOString(),
                        category: document.getElementById('blogCategory').value || 'Updates',
                        status: document.getElementById('blogStatus').value
                    };

                    if (isEditing) {
                        DataManager.updateBlog(currentEditingItem.id, blogData);
                    } else {
                        DataManager.addBlog(blogData);
                    }
                    break;
                }

                case 'client': {
                    const name = document.getElementById('clientName').value.trim();
                    
                    if (!name) {
                        Utils.showToast('Company name is required', 'error');
                        return;
                    }

                    const clientData = {
                        name,
                        logo: document.getElementById('clientLogo').value,
                        website: document.getElementById('clientWebsite').value,
                        industry: document.getElementById('clientIndustry').value,
                        description: document.getElementById('clientDescription').value
                    };

                    if (isEditing) {
                        DataManager.updateClient(currentEditingItem.id, clientData);
                    } else {
                        DataManager.addClient(clientData);
                    }
                    break;
                }

                case 'testimonial': {
                    const name = document.getElementById('testimonialName').value.trim();
                    const position = document.getElementById('testimonialPosition').value.trim();
                    const company = document.getElementById('testimonialCompany').value.trim();
                    const feedback = document.getElementById('testimonialFeedback').value.trim();

                    if (!name || !position || !company || !feedback) {
                        Utils.showToast('All fields are required', 'error');
                        return;
                    }

                    const testimonialData = {
                        clientName: name,
                        position,
                        company,
                        feedback,
                        rating: parseInt(document.getElementById('testimonialRating').value)
                    };

                    if (isEditing) {
                        DataManager.updateTestimonial = function(id, updates) {
                            const testimonials = currentData.testimonials;
                            const testimonial = testimonials.find(t => t.id === id);
                            if (testimonial) {
                                Object.assign(testimonial, updates);
                                DataManager.saveDraft();
                            }
                        };
                        DataManager.updateTestimonial(currentEditingItem.id, testimonialData);
                    } else {
                        DataManager.addTestimonial(testimonialData);
                    }
                    break;
                }

                case 'gallery': {
                    const title = document.getElementById('galleryTitle').value.trim();
                    const image = document.getElementById('galleryImage').value.trim();

                    if (!title || !image) {
                        Utils.showToast('Title and image URL are required', 'error');
                        return;
                    }

                    const galleryData = {
                        title,
                        image,
                        category: document.getElementById('galleryCategory').value,
                        description: document.getElementById('galleryDescription').value
                    };

                    if (isEditing) {
                        const gallery = currentData.gallery;
                        const item = gallery.find(g => g.id === currentEditingItem.id);
                        if (item) {
                            Object.assign(item, galleryData);
                            DataManager.saveDraft();
                        }
                    } else {
                        DataManager.addGalleryItem(galleryData);
                    }
                    break;
                }
            }

            Utils.showToast(isEditing ? 'Item updated!' : 'Item added!', 'success');
            closeModal();
            
            // Re-render the section
            const section = type === 'testimonial' ? 'testimonials' : type === 'gallery' ? 'gallery' : type + 's';
            showSection(section);

        } catch (error) {
            console.error('Error saving item:', error);
            Utils.showToast('Error saving item: ' + error.message, 'error');
        }
    }

    /**
     * Show/hide loader
     */
    function showLoader(show = true) {
        if (show) {
            elements.loader.classList.add('active');
        } else {
            elements.loader.classList.remove('active');
        }
    }

    function publishPosts() {
        const blogs = DataManager.getBlogs();
        const published = blogs.filter(b => b.status !== 'draft');
        const payload = {
            posts: published.map(b => ({
                id: b.id,
                title: b.title,
                content: b.content,
                date: b.date,
                category: b.category || 'News',
                status: b.status
            })),
            lastUpdated: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'posts.json';
        a.click();
        URL.revokeObjectURL(url);
        Utils.showToast('posts.json downloaded — save it to /data/posts.json and push to GitHub', 'success');
    }

    // Expose methods
    window.Dashboard = window.Dashboard || {};
    Object.assign(window.Dashboard, {
        showSection,
        editBlog: window.Dashboard.editBlog,
        deleteBlog: window.Dashboard.deleteBlog,
        editClient: window.Dashboard.editClient,
        deleteClient: window.Dashboard.deleteClient,
        editTestimonial: window.Dashboard.editTestimonial,
        deleteTestimonial: window.Dashboard.deleteTestimonial,
        editGallery: window.Dashboard.editGallery,
        deleteGallery: window.Dashboard.deleteGallery
    });

    return { init };
})();

// Initialize on load
document.addEventListener('DOMContentLoaded', Dashboard.init);
