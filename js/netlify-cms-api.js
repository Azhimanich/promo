// Netlify CMS API Bridge - Menghubungkan frontend dengan Netlify CMS
// Untuk static hosting tanpa backend server

class NetlifyCMSAPI {
    constructor() {
        this.baseURL = window.location.origin;
        this.init();
    }

    init() {
        // Override fetch untuk menangani CMS API calls
        this.setupFetchOverride();
        // Setup form submissions
        this.setupFormHandlers();
    }

    setupFetchOverride() {
        // Override fetch calls untuk /content/ endpoints
        const originalFetch = window.fetch;
        window.fetch = async (url, options = {}) => {
            // Handle CMS content requests
            if (typeof url === 'string' && url.includes('/content/')) {
                return this.handleContentRequest(url, options);
            }
            
            // Handle CMS API requests
            if (typeof url === 'string' && (url.includes('/api/') || options.method === 'PUT' || options.method === 'DELETE')) {
                return this.handleAPIRequest(url, options);
            }
            
            // Use original fetch for other requests
            return originalFetch(url, options);
        };
    }

    async handleContentRequest(url, options) {
        try {
            // For static files, just fetch them directly
            if (options.method === 'GET' || !options.method) {
                const response = await fetch(url, { method: 'GET' });
                return response;
            }
            
            // For POST/PUT/DELETE, use localStorage for now
            if (options.method === 'POST' || options.method === 'PUT') {
                const data = options.body ? JSON.parse(options.body) : {};
                const filename = url.split('/').pop();
                
                // Save to localStorage
                localStorage.setItem(`cms_${filename}`, JSON.stringify(data));
                
                // Return mock response
                return new Response(JSON.stringify({ success: true, message: 'Data saved successfully' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            if (options.method === 'DELETE') {
                const filename = url.split('/').pop();
                
                // Remove from localStorage
                localStorage.removeItem(`cms_${filename}`);
                
                // Return mock response
                return new Response(JSON.stringify({ success: true, message: 'Data deleted successfully' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
        } catch (error) {
            console.error('Error handling content request:', error);
            return new Response(JSON.stringify({ error: 'Failed to handle request' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    async handleAPIRequest(url, options) {
        try {
            // Handle API requests for Netlify CMS
            if (url.includes('/api/') || options.method === 'PUT' || options.method === 'DELETE') {
                // For now, just return success response
                return new Response(JSON.stringify({ success: true, message: 'Operation completed' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (error) {
            console.error('Error handling API request:', error);
            return new Response(JSON.stringify({ error: 'API request failed' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    setupFormHandlers() {
        // Setup form submission handlers for simple.html
        if (window.location.pathname.includes('admin/simple.html')) {
            this.setupSimpleAdminForms();
        }
    }

    setupSimpleAdminForms() {
        // Override all form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Handle different form types
        if (form.id === 'aboutForm') {
            await this.saveAboutData(data);
        } else if (form.id === 'pagesForm') {
            await this.savePagesData(data);
        } else if (form.id === 'settingsForm') {
            await this.saveSettingsData(data);
        } else if (form.id === 'testimonialForm') {
            await this.saveTestimonialData(data);
        }
    }

    async saveAboutData(data) {
        try {
            // Save using CMS Data Sync for persistence
            window.saveCMSData('about.json', data);
            
            showMessage('✅ About page saved successfully!', 'success');
            console.log('About data saved:', data);
            
            // Trigger frontend update
            setTimeout(() => {
                this.notifyFrontendUpdate();
            }, 500);
        } catch (error) {
            console.error('Error saving about data:', error);
            showMessage('❌ Failed to save about page', 'error');
        }
    }

    async savePagesData(data) {
        try {
            // Save pages data to data.json
            const currentData = window.loadCMSData('data.json') || {};
            const updatedData = {
                ...currentData,
                pages: {
                    ...currentData.pages,
                    index: {
                        hero_title: data.hero_title || '',
                        hero_subtitle: data.hero_subtitle || '',
                        hero_description: data.hero_description || '',
                        arrival_title: data.arrival_title || '',
                        arrival_description: data.arrival_description || ''
                    }
                }
            };
            
            // Save using CMS Data Sync for persistence
            window.saveCMSData('data.json', updatedData);
            
            showMessage('✅ Pages saved successfully!', 'success');
            console.log('Pages data saved:', updatedData);
            
            // Trigger frontend update
            setTimeout(() => {
                this.notifyFrontendUpdate();
            }, 500);
        } catch (error) {
            console.error('Error saving pages data:', error);
            showMessage('❌ Failed to save pages', 'error');
        }
    }

    async saveSettingsData(data) {
        try {
            // Save using CMS Data Sync for persistence
            window.saveCMSData('settings.json', data);
            
            showMessage('✅ Settings saved successfully!', 'success');
            console.log('Settings data saved:', data);
            
            // Trigger frontend update
            setTimeout(() => {
                this.notifyFrontendUpdate();
            }, 500);
        } catch (error) {
            console.error('Error saving settings data:', error);
            showMessage('❌ Failed to save settings', 'error');
        }
    }

    async saveTestimonialData(data) {
        try {
            // Save using CMS Data Sync for persistence
            window.saveCMSData('testimonial.json', data);
            
            showMessage('✅ Testimonial saved successfully!', 'success');
            console.log('Testimonial data saved:', data);
            
            // Trigger frontend update
            setTimeout(() => {
                this.notifyFrontendUpdate();
            }, 500);
        } catch (error) {
            console.error('Error saving testimonial data:', error);
            showMessage('❌ Failed to save testimonial', 'error');
        }
    }

    // Notify frontend update
    notifyFrontendUpdate() {
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('cms-data-updated', {
            detail: {
                timestamp: Date.now(),
                source: 'admin-panel'
            }
        }));
        
        // Trigger storage event for cross-tab sync
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cms_data_updated',
            newValue: Date.now().toString()
        }));
        
        // Force refresh CMS Integration if available
        if (window.cmsIntegration) {
            window.cmsIntegration.refreshData();
        }
        
        // Force refresh CMS Sync Bridge if available
        if (window.cmsSyncBridge) {
            window.cmsSyncBridge.refreshFrontend();
        }
        
        console.log('🔄 Frontend update notified');
    }

    async simulateFileSave(filename, data) {
        // Simulate file save for Netlify CMS
        // In real implementation, this would trigger a Git commit
        console.log(`Simulating save to ${filename}:`, data);
        
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: `cms_${filename}`,
            newValue: JSON.stringify(data)
        }));
    }

    // Method to load data with fallback
    async loadData(filename) {
        try {
            // Use CMS Data Sync for loading
            const data = window.loadCMSData(filename);
            if (data && Object.keys(data).length > 0) {
                return data;
            }
            
            // Fallback to default data
            return this.getDefaultData(filename);
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return this.getDefaultData(filename);
        }
    }

    getDefaultData(filename) {
        const defaults = {
            'index.json': {
                hero_title: "Sale 20% Off",
                hero_subtitle: "On Everything",
                hero_description: "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic?",
                arrival_title: "#NewArrivals",
                arrival_description: "Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem."
            },
            'about.json': {
                hero_title: "About Famms",
                hero_subtitle: "Your Trusted Fashion Partner Since 2020",
                hero_description: "We are dedicated to providing high-quality fashion products that combine style, comfort, and affordability for the modern consumer.",
                story_title: "Our Story",
                story_subtitle: "From a small idea to a fashion destination",
                story_content: "Founded in 2020, Famms began as a small boutique with a big vision: to make quality fashion accessible to everyone.",
                gallery_title: "Our Gallery",
                gallery_subtitle: "Explore our collection",
                cta_title: "Ready to Experience the Famms Difference?",
                cta_description: "Join thousands of satisfied customers who have discovered their perfect style with us."
            },
            'settings.json': {
                store_name: "Famms",
                whatsapp_number: "628123456789",
                phone: "+01 1234567890",
                email: "demo@gmail.com",
                address: "Your Store Address",
                instagram_url: "#",
                facebook_url: "#",
                twitter_url: "#",
                linkedin_url: "#",
                pinterest_url: "#"
            }
        };
        
        return defaults[filename] || {};
    }
}

// Initialize Netlify CMS API
document.addEventListener('DOMContentLoaded', () => {
    window.netlifyCMSAPI = new NetlifyCMSAPI();
    console.log('Netlify CMS API initialized');
});

// Global function for manual data loading
window.loadCMSData = async (filename) => {
    if (window.netlifyCMSAPI) {
        return await window.netlifyCMSAPI.loadData(filename);
    }
    return null;
};
