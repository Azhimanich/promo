// CMS Integration for Famms Website - COMPLETE REBUILD
class CMSIntegration {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.updateAllPages();
        } catch (error) {
            console.error('Error initializing CMS:', error);
        }
    }

    async loadData() {
        try {
            console.log('🔄 Loading CMS data...');
            
            // Add cache busting
            const timestamp = Date.now();
            
            // Load all data files
            const [indexData, aboutData, settingsData, contactData] = await Promise.all([
                this.fetchJSON(`/content/index.json?t=${timestamp}`),
                this.fetchJSON(`/content/about.json?t=${timestamp}`),
                this.fetchJSON(`/content/settings.json?t=${timestamp}`),
                this.fetchJSON(`/content/contact.json?t=${timestamp}`)
            ]);

            // Load collections
            const [products, testimonials, gallery] = await Promise.all([
                this.loadCollection('products', timestamp),
                this.loadCollection('testimonials', timestamp),
                this.loadCollection('gallery', timestamp)
            ]);

            this.data = {
                pages: {
                    index: indexData || {},
                    about: aboutData || {},
                    contact: contactData || {}
                },
                products: products || [],
                testimonials: testimonials || [],
                gallery: gallery || [],
                site_settings: settingsData || {}
            };

            console.log('✅ CMS data loaded successfully');
        } catch (error) {
            console.error('❌ Error loading CMS data:', error);
            this.data = this.getDefaultData();
        }
    }

    async fetchJSON(url) {
        try {
            const response = await fetch(url);
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.log(`⚠️ Failed to load ${url}:`, error.message);
            return null;
        }
    }

    async loadCollection(collection, timestamp) {
        try {
            // Try to load index file first
            const indexResponse = await fetch(`/content/${collection}/index.json?t=${timestamp}`);
            if (indexResponse.ok) {
                const index = await indexResponse.json();
                const items = [];
                
                if (index[collection]) {
                    for (const file of index[collection]) {
                        const itemResponse = await fetch(`/content/${collection}/${file}?t=${timestamp}`);
                        if (itemResponse.ok) {
                            items.push(await itemResponse.json());
                        }
                    }
                }
                return items;
            } else {
                // Fallback: try to load individual files
                const files = await this.discoverFiles(collection);
                const items = [];
                
                for (const file of files) {
                    const itemResponse = await fetch(`/content/${collection}/${file}?t=${timestamp}`);
                    if (itemResponse.ok) {
                        items.push(await itemResponse.json());
                    }
                }
                return items;
            }
        } catch (error) {
            console.log(`⚠️ Failed to load ${collection} collection:`, error.message);
            return [];
        }
    }

    async discoverFiles(collection) {
        // Common file patterns for collections
        const patterns = {
            products: ['mens-shirt-1.json', 'mens-shirt-2.json', 'womens-dress-1.json', 'accessories-bag-1.json'],
            testimonials: ['testimonial-1.json', 'testimonial-2.json', 'testimonial-3.json'],
            gallery: ['gallery-1.json', 'gallery-2.json', 'gallery-3.json']
        };
        
        return patterns[collection] || [];
    }

    getDefaultData() {
        return {
            pages: {
                index: {
                    hero_title: "Sale 20% Off",
                    hero_subtitle: "On Everything",
                    hero_description: "Special offer on all products",
                    hero_button_text: "Shop Now",
                    hero_button_link: "#products",
                    arrival_title: "#NewArrivals",
                    arrival_description: "Check out our latest collection",
                    arrival_button_text: "Shop Now",
                    arrival_button_link: "#products"
                },
                about: {
                    hero_title: "About Famms",
                    hero_subtitle: "Your Trusted Fashion Partner",
                    hero_description: "We are dedicated to providing high-quality fashion products",
                    story_title: "Our Story",
                    story_subtitle: "From a small idea to a fashion destination",
                    story_content: "Founded in 2020, Famms began as a small boutique",
                    story_content_2: "Our journey has been driven by passion for fashion",
                    story_content_3: "Today, Famms stands as a testament to dedication",
                    gallery_title: "Our Gallery",
                    gallery_subtitle: "Explore our collection",
                    cta_title: "Ready to Experience the Famms Difference?",
                    cta_description: "Join thousands of satisfied customers"
                },
                contact: {
                    page_title: "Contact Us",
                    form_title: "Send us a message",
                    name_placeholder: "Enter your full name",
                    email_placeholder: "Enter your email",
                    subject_placeholder: "Enter subject",
                    message_placeholder: "Enter your message",
                    submit_text: "Send Message"
                }
            },
            products: [
                {
                    title: "Men's Shirt",
                    price: "$75",
                    image: "images/p1.png",
                    category: "Men",
                    whatsapp: "+628123456789"
                }
            ],
            testimonials: [
                {
                    name: "Anna Trevor",
                    role: "Customer",
                    content: "Great products and excellent service!",
                    image: "images/client.jpg",
                    rating: 5
                }
            ],
            gallery: [],
            site_settings: {
                store_name: "Famms",
                whatsapp_number: "+6281234567890",
                phone: "+62123456789",
                email: "info@famms.co.id",
                address: "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia"
            }
        };
    }

    updateAllPages() {
        // Update based on current page
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('about.html') || currentPath.endsWith('/about')) {
            this.updateAboutPage();
        } else if (currentPath.includes('contact.html') || currentPath.endsWith('/contact')) {
            this.updateContactPage();
        } else if (currentPath.includes('testimonial.html') || currentPath.endsWith('/testimonial')) {
            this.updateTestimonialPage();
        } else if (currentPath.includes('product.html') || currentPath.endsWith('/product')) {
            this.updateProductPage();
        } else {
            // Default: update home page
            this.updateHomePage();
            this.updateGlobalElements();
        }
    }

    updateHomePage() {
        const indexData = this.data.pages?.index || {};
        
        // Update hero section
        this.updateText('hero-title-span', indexData.hero_title);
        this.updateText('hero-subtitle-span', indexData.hero_subtitle);
        this.updateText('hero-description', indexData.hero_description);
        
        // Update hero buttons
        const heroButtons = document.querySelectorAll('.btn1');
        heroButtons.forEach(btn => {
            if (btn.textContent.includes('Shop') || btn.textContent.includes('Belanja')) {
                btn.textContent = indexData.hero_button_text || 'Shop Now';
                btn.href = indexData.hero_button_link || '#products';
            }
        });
        
        // Update arrival section
        this.updateText('arrival-title', indexData.arrival_title);
        this.updateText('arrival-description', indexData.arrival_description);
        
        // Update arrival buttons
        const arrivalButtons = document.querySelectorAll('.arrival_section a');
        arrivalButtons.forEach(btn => {
            if (btn.textContent.includes('Shop') || btn.textContent.includes('Belanja')) {
                btn.textContent = indexData.arrival_button_text || 'Shop Now';
                btn.href = indexData.arrival_button_link || '#products';
            }
        });
        
        // Update products
        this.updateProducts();
    }

    updateAboutPage() {
        const aboutData = this.data.pages?.about || {};
        
        // Update hero section
        this.updateText('about-hero-title', aboutData.hero_title);
        this.updateText('about-hero-subtitle', aboutData.hero_subtitle);
        this.updateText('about-hero-description', aboutData.hero_description);
        
        // Update story section
        this.updateText('story-title', aboutData.story_title);
        this.updateText('story-subtitle', aboutData.story_subtitle);
        this.updateText('story-content', aboutData.story_content);
        this.updateText('story-content-2', aboutData.story_content_2);
        this.updateText('story-content-3', aboutData.story_content_3);
        
        // Update gallery
        this.updateText('gallery-title', aboutData.gallery_title);
        this.updateText('gallery-subtitle', aboutData.gallery_subtitle);
        
        // Update CTA
        this.updateText('cta-title', aboutData.cta_title);
        this.updateText('cta-description', aboutData.cta_description);
    }

    updateContactPage() {
        const contactData = this.data.pages?.contact || {};
        
        // Update page title
        this.updateText('section-title', contactData.page_title);
        
        // Update form elements
        this.updatePlaceholder('input[name="name"]', contactData.name_placeholder);
        this.updatePlaceholder('input[type="email"]', contactData.email_placeholder);
        this.updatePlaceholder('input[name="subject"]', contactData.subject_placeholder);
        this.updatePlaceholder('textarea', contactData.message_placeholder);
        this.updateText('input[type="submit"]', contactData.submit_text);
    }

    updateTestimonialPage() {
        this.updateTestimonials();
    }

    updateProductPage() {
        this.updateProducts();
    }

    updateGlobalElements() {
        const settings = this.data.site_settings || {};
        
        // Update page title
        this.updateText('page-title', settings.store_name);
        
        // Update footer
        this.updateFooter();
        
        // Update navigation
        this.updateNavigation();
    }

    updateProducts() {
        const products = this.data.products || [];
        const container = document.getElementById('product-container');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const productHTML = this.createProductHTML(product);
            container.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    createProductHTML(product) {
        const waLink = product.whatsapp ? `https://wa.me/${product.whatsapp.replace(/[^\d]/g, '')}?text=I'm interested in ${product.title}` : '#';
        
        return `
            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="box">
                    <div class="option_container">
                        <div class="options">
                            <a href="" class="option1">${product.title}</a>
                            <a href="${waLink}" class="option2" target="_blank">Buy Now</a>
                        </div>
                    </div>
                    <div class="img-box">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="detail-box">
                        <h5>${product.title}</h5>
                        <h6>${product.price}</h6>
                    </div>
                </div>
            </div>
        `;
    }

    updateTestimonials() {
        const testimonials = this.data.testimonials || [];
        const container = document.getElementById('testimonial-container');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active' : '';
            const testimonialHTML = this.createTestimonialHTML(testimonial, isActive);
            container.insertAdjacentHTML('beforeend', testimonialHTML);
        });
    }

    createTestimonialHTML(testimonial, isActive) {
        return `
            <div class="carousel-item ${isActive}">
                <div class="box col-lg-10 mx-auto">
                    <div class="img_container">
                        <div class="img-box">
                            <div class="img_box-inner">
                                <img src="${testimonial.image}" alt="${testimonial.name}">
                            </div>
                        </div>
                    </div>
                    <div class="detail-box">
                        <h5>${testimonial.name}</h5>
                        <h6>${testimonial.role}</h6>
                        <p>${testimonial.content}</p>
                    </div>
                </div>
            </div>
        `;
    }

    updateFooter() {
        const settings = this.data.site_settings || {};
        
        // Update contact info
        this.updateText('footer-address', settings.address);
        this.updateText('footer-phone', settings.phone);
        this.updateText('footer-email', settings.email);
        
        // Update social links
        const socialLinks = {
            'footer-facebook': settings.facebook_url,
            'footer-twitter': settings.twitter_url,
            'footer-instagram': settings.instagram_url,
            'footer-linkedin': settings.linkedin_url,
            'footer-pinterest': settings.pinterest_url
        };
        
        Object.entries(socialLinks).forEach(([id, url]) => {
            const element = document.getElementById(id);
            if (element && url) {
                element.href = url;
                element.setAttribute('target', '_blank');
            }
        });
    }

    updateNavigation() {
        const settings = this.data.site_settings || {};
        
        // Update navbar brand
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.setAttribute('title', settings.store_name || 'Famms');
        }
    }

    updateText(id, text) {
        const element = document.getElementById(id);
        if (element && text) {
            element.textContent = text;
        }
    }

    updatePlaceholder(selector, placeholder) {
        const element = document.querySelector(selector);
        if (element && placeholder) {
            element.placeholder = placeholder;
        }
    }

    // Refresh data method
    async refreshData() {
        console.log('🔄 Refreshing CMS data after Netlify build...');
        try {
            this.data = null;
            await new Promise(resolve => setTimeout(resolve, 3000));
            await this.loadData();
            this.updateAllPages();
            console.log('✅ CMS data refreshed successfully');
        } catch (error) {
            console.error('❌ Error refreshing CMS data:', error);
        }
    }
}

// Initialize CMS Integration
document.addEventListener('DOMContentLoaded', () => {
    window.cmsIntegration = new CMSIntegration();
});

// Global refresh function
window.refreshCMS = () => {
    if (window.cmsIntegration) {
        window.cmsIntegration.refreshData();
    }
};

// Auto-refresh after CMS save
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'cms-save-success') {
        console.log('🔄 CMS save detected, waiting for Netlify build...');
        setTimeout(() => {
            window.refreshCMS();
        }, 5000);
    }
});

// Netlify CMS event listeners
if (window.CMS) {
    window.CMS.registerEventListener({
        'postSave': async ({ entry }) => {
            console.log('📝 CMS entry saved:', entry);
            setTimeout(() => {
                window.refreshCMS();
            }, 7000);
        }
    });
}
