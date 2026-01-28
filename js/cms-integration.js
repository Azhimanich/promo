// CMS Integration for Famms Website
class CMSIntegration {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.updateHeroSection();
            this.updateArrivalSection();
            this.updateProducts();
            this.updateFooter();
            this.updateGlobalSettings();
            this.updateTestimonials();
            this.updateGallery();
            this.updateAboutPage();
            this.updateSiteImages();
        } catch (error) {
            console.error('Error initializing CMS:', error);
        }
    }

    async loadData() {
        try {
            console.log('Loading CMS data...');
            
            // Try CMS Data Sync first
            if (window.loadCMSData) {
                const data = window.loadCMSData('data.json');
                if (data && Object.keys(data).length > 0) {
                    this.data = data;
                    console.log('✅ Data loaded from CMS Data Sync');
                    return;
                }
            }
            
            // Fallback to original file loading
            await this.loadFromFiles();
        } catch (error) {
            console.error('Error loading CMS data:', error);
            this.data = this.getDefaultData();
        }
    }

    async loadFromFiles() {
        // Add cache busting untuk selalu dapat file terbaru
        const timestamp = Date.now();
        
        // Load main data file
        const mainResponse = await fetch(`/content/data.json?t=${timestamp}`);
        if (mainResponse.ok) {
            this.data = await mainResponse.json();
            console.log('✅ Main data loaded from files');
        } else {
            throw new Error(`Main data file not found: ${mainResponse.status}`);
        }

            // Load products index
            try {
                const productsIndexResponse = await fetch(`/content/products/index.json?t=${timestamp}`);
                if (productsIndexResponse.ok) {
                    const productsIndex = await productsIndexResponse.json();
                    const products = [];
                    
                    // Load individual product files
                    for (const file of productsIndex.products || []) {
                        const productResponse = await fetch(`/content/products/${file}?t=${timestamp}`);
                        if (productResponse.ok) {
                            products.push(await productResponse.json());
                        }
                    }
                    
                    if (products.length > 0) {
                        this.data.products = products;
                    }
                } else {
                    // Fallback untuk development
                    const productFiles = ['mens-shirt-1.json', 'mens-shirt-2.json', 'mens-shirt-3.json', 'mens-shirt-4.json', 'mens-shirt-5.json', 'mens-shirt-6.json', 'womens-dress-1.json', 'womens-dress-2.json', 'womens-dress-3.json', 'womens-dress-4.json', 'kids-tshirt-1.json', 'accessories-bag-1.json'];
                    const products = [];
                    
                    for (const file of productFiles) {
                        const productResponse = await fetch(`/content/products/${file}?t=${timestamp}`);
                        if (productResponse.ok) {
                            products.push(await productResponse.json());
                        }
                    }
                    
                    if (products.length > 0) {
                        this.data.products = products;
                    }
                }
            } catch (error) {
                console.log('Error loading products index:', error);
            }

            // Load page settings
            try {
                const indexResponse = await fetch(`/content/index.json?t=${timestamp}`);
                if (indexResponse.ok) {
                    const indexData = await indexResponse.json();
                    this.data.pages.index = { ...this.data.pages.index, ...indexData };
                }
            } catch (error) {
                console.log('Index settings file not available');
            }

            // Load testimonials
            try {
                const testimonialFiles = ['testimonial-1.json', 'testimonial-2.json', 'testimonial-3.json'];
                const testimonials = [];
                
                for (const file of testimonialFiles) {
                    const testimonialResponse = await fetch(`/content/testimonials/${file}`);
                    if (testimonialResponse.ok) {
                        testimonials.push(await testimonialResponse.json());
                    }
                }
                
                if (testimonials.length > 0) {
                    this.data.testimonials = testimonials;
                }
            } catch (error) {
                console.log('Testimonial files not available, using main data');
            }

            // Load gallery
            try {
                const galleryFiles = ['gallery-1.json', 'gallery-2.json', 'gallery-3.json', 'gallery-4.json', 'gallery-5.json', 'gallery-6.json', 'gallery-7.json', 'gallery-8.json', 'gallery-9.json', 'gallery-10.json', 'gallery-11.json', 'gallery-12.json'];
                const gallery = [];
                
                for (const file of galleryFiles) {
                    const galleryResponse = await fetch(`/content/gallery/${file}`);
                    if (galleryResponse.ok) {
                        gallery.push(await galleryResponse.json());
                    }
                }
                
                if (gallery.length > 0) {
                    this.data.gallery = gallery;
                }
            } catch (error) {
                console.log('Gallery files not available, using main data');
            }

            // Load about page data
            try {
                const aboutResponse = await fetch('/content/about.json');
                if (aboutResponse.ok) {
                    const aboutData = await aboutResponse.json();
                    this.data.about = { ...this.data.about, ...aboutData };
                }
            } catch (error) {
                console.log('About page file not available');
            }

            // Load site settings
            try {
                const settingsResponse = await fetch('/content/settings.json');
                if (settingsResponse.ok) {
                    const settingsData = await settingsResponse.json();
                    this.data.site_settings = { ...this.data.site_settings, ...settingsData };
                }
            } catch (error) {
                console.log('Settings file not available');
            }

        } catch (error) {
            console.error('Error loading CMS data:', error);
            // Fallback to default data if JSON fails to load
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            pages: {
                index: {
                    hero_title: "Sale 20% Off",
                    hero_subtitle: "On Everything",
                    hero_description: "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic?",
                    arrival_title: "#NewArrivals",
                    arrival_description: "Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem."
                }
            },
            products: [
                {
                    title: "Men's Shirt",
                    price: "$75",
                    image: "images/p1.png",
                    wa_link: "https://wa.me/628123456789?text=Saya+ingin+beli+Men's+Shirt"
                }
            ],
            site_settings: {
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
    }

    updateHeroSection() {
        const heroData = this.data.pages?.index;
        if (!heroData) return;

        // Update hero titles and descriptions with new IDs
        const heroTitleSpan = document.getElementById('hero-title-span');
        const heroSubtitleSpan = document.getElementById('hero-subtitle-span');
        const heroDescription = document.getElementById('hero-description');

        if (heroTitleSpan) {
            heroTitleSpan.textContent = heroData.hero_title || 'Sale 20% Off';
        }

        if (heroSubtitleSpan) {
            heroSubtitleSpan.textContent = heroData.hero_subtitle || 'On Everything';
        }

        if (heroDescription) {
            heroDescription.textContent = heroData.hero_description || 'Explicabo esse amet tempora quibusdam laudantium...';
        }

        // Fallback to old selectors if new IDs don't exist
        const heroTitles = document.querySelectorAll('.detail-box h1 span:not(#hero-title-span):not(#hero-subtitle-span)');
        const heroSubtitles = document.querySelectorAll('.detail-box h1 br');
        const heroDescriptions = document.querySelectorAll('.detail-box p:not(#hero-description)');

        heroTitles.forEach(title => {
            if (title.textContent.includes('Sale')) {
                title.textContent = heroData.hero_title || 'Sale 20% Off';
            }
        });

        heroSubtitles.forEach(subtitle => {
            const nextElement = subtitle.nextElementSibling;
            if (nextElement && nextElement.textContent.includes('On Everything')) {
                nextElement.textContent = heroData.hero_subtitle || 'On Everything';
            }
        });

        heroDescriptions.forEach(desc => {
            if (desc.textContent.includes('Explicabo esse amet')) {
                desc.textContent = heroData.hero_description || 'Explicabo esse amet tempora quibusdam...';
            }
        });
    }

    updateArrivalSection() {
        const arrivalData = this.data.pages?.index;
        if (!arrivalData) return;

        // Update arrival section with new ID
        const arrivalTitle = document.getElementById('arrival-title');
        const arrivalDesc = document.getElementById('arrival-description');

        if (arrivalTitle) {
            arrivalTitle.textContent = arrivalData.arrival_title || '#NewArrivals';
        }

        if (arrivalDesc) {
            arrivalDesc.textContent = arrivalData.arrival_description || 'Vitae fugiat laboriosam officia...';
        }

        // Fallback to old selectors if new IDs don't exist
        const oldArrivalTitle = document.querySelector('.arrival_section h2:not(#arrival-title)');
        const oldArrivalDesc = document.querySelector('.arrival_section p:not(#arrival-description)');

        if (oldArrivalTitle) {
            oldArrivalTitle.textContent = arrivalData.arrival_title || '#NewArrivals';
        }

        if (oldArrivalDesc) {
            oldArrivalDesc.textContent = arrivalData.arrival_description || 'Vitae fugiat laboriosam officia...';
        }
    }

    updateProducts() {
        const products = this.data.products || [];
        const productContainers = document.querySelectorAll('.product_section .row');

        productContainers.forEach(container => {
            // Clear existing products
            container.innerHTML = '';

            // Render products from CMS data
            products.forEach(product => {
                const productHTML = this.createProductHTML(product);
                container.insertAdjacentHTML('beforeend', productHTML);
            });
        });
    }

    createProductHTML(product) {
        return `
            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="box">
                    <div class="option_container">
                        <div class="options">
                            <a href="" class="option1">
                                ${product.title}
                            </a>
                            <a href="${product.wa_link}" class="option2" target="_blank">
                                Buy Now
                            </a>
                        </div>
                    </div>
                    <div class="img-box">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="detail-box">
                        <h5>
                            ${product.title}
                        </h5>
                        <h6>
                            ${product.price}
                        </h6>
                    </div>
                </div>
            </div>
        `;
    }

    updateFooter() {
        const settings = this.data.site_settings;
        if (!settings) return;

        console.log('Updating footer with settings:', settings);

        // Update footer contact information with new IDs
        const addressLink = document.getElementById('footer-address-link');
        const addressSpan = document.getElementById('footer-address');
        const phoneLink = document.getElementById('footer-phone-link');
        const phoneSpan = document.getElementById('footer-phone');
        const emailLink = document.getElementById('footer-email-link');
        const emailSpan = document.getElementById('footer-email');

        if (addressLink && addressSpan) {
            addressLink.href = `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`;
            addressSpan.textContent = settings.address;
            console.log('Updated address:', settings.address);
        }

        if (phoneLink && phoneSpan) {
            phoneLink.href = `tel:${settings.phone}`;
            phoneSpan.textContent = `Call ${settings.phone}`;
            console.log('Updated phone:', settings.phone);
        }

        if (emailLink && emailSpan) {
            emailLink.href = `mailto:${settings.email}`;
            emailSpan.textContent = settings.email;
            console.log('Updated email:', settings.email);
        }

        // Update footer logo
        const footerLogo = document.getElementById('footer-logo');
        if (footerLogo) {
            footerLogo.textContent = settings.store_name;
            console.log('Updated footer logo:', settings.store_name);
        }

        // Update social media links (IDs already exist)
        const socialLinks = {
            'fa-facebook': { url: settings.facebook_url, id: 'footer-facebook' },
            'fa-twitter': { url: settings.twitter_url, id: 'footer-twitter' },
            'fa-linkedin': { url: settings.linkedin_url, id: 'footer-linkedin' },
            'fa-instagram': { url: settings.instagram_url, id: 'footer-instagram' },
            'fa-pinterest': { url: settings.pinterest_url, id: 'footer-pinterest' }
        };

        Object.entries(socialLinks).forEach(([iconClass, social]) => {
            const link = document.querySelector(`.footer_social .${iconClass}`)?.parentElement;
            const linkById = document.getElementById(social.id);
            
            if (linkById) {
                linkById.href = social.url;
                linkById.setAttribute('target', '_blank');
                console.log(`Updated ${social.id}:`, social.url);
            }
        });

        console.log('Footer update completed');
    }

    updateGlobalSettings() {
        const settings = this.data.site_settings;
        if (!settings) return;

        console.log('Updating global settings with:', settings);

        // Update page title with new ID
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = `${settings.store_name} - Fashion HTML Template`;
            console.log('Updated page title:', settings.store_name);
        }

        // Fallback to original selector
        const originalTitleElement = document.querySelector('title:not(#page-title)');
        if (originalTitleElement) {
            originalTitleElement.textContent = `${settings.store_name} - Fashion HTML Template`;
        }

        // Update navbar brand
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.setAttribute('title', settings.store_name);
            console.log('Updated navbar brand title:', settings.store_name);
        }

        // Update meta description if store description exists
        if (settings.store_description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', settings.store_description);
                console.log('Updated meta description:', settings.store_description);
            }
        }

        // Update all instances of store name in navigation
        const allBrandElements = document.querySelectorAll('.navbar-brand, .footer-logo');
        allBrandElements.forEach(element => {
            if (element.tagName === 'A' && element.querySelector('img')) {
                // Keep image, just update title
                element.setAttribute('title', settings.store_name);
            } else if (element.textContent.includes('Famms')) {
                element.textContent = settings.store_name;
            }
        });

        console.log('Global settings update completed');
    }

    // Method to refresh data (useful for real-time updates)
    async refreshData() {
        await this.loadData();
        this.updateHeroSection();
        this.updateArrivalSection();
        this.updateProducts();
        this.updateFooter();
        this.updateGlobalSettings();
        this.updateTestimonials();
        this.updateGallery();
        this.updateAboutPage();
        this.updateSiteImages();
    }

    updateTestimonials() {
        const testimonials = this.data.testimonials || [];
        const testimonialContainer = document.getElementById('testimonial-container');
        
        if (!testimonialContainer) return;
        
        // Clear existing testimonials
        testimonialContainer.innerHTML = '';
        
        // Render testimonials from CMS data
        testimonials.forEach((testimonial, index) => {
            const testimonialHTML = this.createTestimonialHTML(testimonial, index);
            testimonialContainer.insertAdjacentHTML('beforeend', testimonialHTML);
        });
    }

    createTestimonialHTML(testimonial, index) {
        const isActive = index === 0 ? 'active' : '';
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

    updateGallery() {
        const gallery = this.data.gallery || [];
        const galleryContainer = document.getElementById('gallery-container');
        
        if (!galleryContainer) return;
        
        // Clear existing gallery items
        galleryContainer.innerHTML = '';
        
        // Group gallery items into rows of 4
        const rows = [];
        for (let i = 0; i < gallery.length; i += 4) {
            rows.push(gallery.slice(i, i + 4));
        }
        
        // Render gallery rows
        rows.forEach((row, rowIndex) => {
            const isActive = rowIndex === 0 ? 'active' : '';
            const galleryRowHTML = this.createGalleryRowHTML(row, isActive);
            galleryContainer.insertAdjacentHTML('beforeend', galleryRowHTML);
        });
    }

    createGalleryRowHTML(galleryItems, isActive) {
        const itemsHTML = galleryItems.map(item => 
            `<img src="${item.image}" class="gallery-item" alt="${item.alt_text || item.title}">`
        ).join('');
        
        return `
            <div class="carousel-item ${isActive}">
                <div class="gallery-row">
                    ${itemsHTML}
                </div>
            </div>
        `;
    }

    updateAboutPage() {
        const aboutData = this.data.about;
        if (!aboutData) return;

        // Update hero section
        this.updateElement('about-hero-title', aboutData.hero_title);
        this.updateElement('about-hero-subtitle', aboutData.hero_subtitle);
        this.updateElement('about-hero-description', aboutData.hero_description);
        
        // Update story section
        this.updateElement('story-title', aboutData.story_title);
        this.updateElement('story-subtitle', aboutData.story_subtitle);
        this.updateElement('story-content', aboutData.story_content);
        this.updateElement('story-content-2', aboutData.story_content_2);
        this.updateElement('story-content-3', aboutData.story_content_3);
        
        // Update story image
        const storyImage = document.querySelector('.story-image img');
        if (storyImage && aboutData.story_image) {
            storyImage.src = aboutData.story_image;
            storyImage.alt = 'Our Story';
        }
        
        // Update gallery section
        this.updateElement('gallery-title', aboutData.gallery_title);
        this.updateElement('gallery-subtitle', aboutData.gallery_subtitle);
        
        // Update mission section
        this.updateElement('mission-title', aboutData.mission_title);
        this.updateElement('mission-subtitle', aboutData.mission_subtitle);
        
        // Update team section
        this.updateElement('team-title', aboutData.team_title);
        this.updateElement('team-subtitle', aboutData.team_subtitle);
        
        // Update CTA section
        this.updateElement('cta-title', aboutData.cta_title);
        this.updateElement('cta-description', aboutData.cta_description);
    }

    updateSiteImages() {
        const settings = this.data.site_settings;
        if (!settings) return;

        // Update logo
        const logos = document.querySelectorAll('.navbar-brand img');
        logos.forEach(logo => {
            if (settings.logo) {
                logo.src = settings.logo;
            }
        });

        // Update favicon
        const favicon = document.querySelector('link[rel="shortcut icon"]');
        if (favicon && settings.favicon) {
            favicon.href = settings.favicon;
        }

        // Update hero background
        const heroBackgrounds = document.querySelectorAll('.slider_bg_box img');
        heroBackgrounds.forEach(bg => {
            if (settings.hero_background) {
                bg.src = settings.hero_background;
            }
        });

        // Update arrival background
        const arrivalBackgrounds = document.querySelectorAll('.arrival_bg_box img');
        arrivalBackgrounds.forEach(bg => {
            if (settings.arrival_background) {
                bg.src = settings.arrival_background;
            }
        });

        // Update about page hero background (CSS)
        if (settings.hero_background) {
            const aboutHero = document.querySelector('.about-hero');
            if (aboutHero) {
                aboutHero.style.backgroundImage = `linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(247, 68, 78, 0.8) 100%), url('${settings.hero_background}')`;
            }
        }
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    }

    // Method untuk refresh data setelah CMS update
    async refreshData() {
        console.log('Refreshing CMS data...');
        try {
            await this.loadData();
            this.updateHeroSection();
            this.updateArrivalSection();
            this.updateProducts();
            this.updateFooter();
            this.updateGlobalSettings();
            this.updateTestimonials();
            this.updateGallery();
            this.updateAboutPage();
            this.updateSiteImages();
            console.log('CMS data refreshed successfully');
        } catch (error) {
            console.error('Error refreshing CMS data:', error);
        }
    }
}

// Initialize CMS Integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cmsIntegration = new CMSIntegration();
});

// Make it available globally for manual refresh
window.refreshCMS = () => {
    if (window.cmsIntegration) {
        window.cmsIntegration.refreshData();
    }
};

// Auto-refresh setelah CMS save (Netlify CMS)
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'cms-save-success') {
        console.log('CMS save detected, refreshing data...');
        setTimeout(() => {
            window.refreshCMS();
        }, 1000); // Tunggu 1 detik untuk deploy selesai
    }
});

// Listen untuk Netlify CMS events
if (window.CMS) {
    window.CMS.registerEventListener({
        'postSave': async ({ entry }) => {
            console.log('CMS entry saved:', entry);
            // Refresh data setelah save
            setTimeout(() => {
                window.refreshCMS();
            }, 2000);
        }
    });
}
