// CMS Sync Bridge - Menghubungkan admin panel dengan frontend
// Pastikan data dari admin panel terupdate di halaman public

class CMSSyncBridge {
    constructor() {
        this.init();
    }

    init() {
        // Setup listener untuk perubahan data dari admin panel
        this.setupDataSyncListeners();
        
        // Setup periodic sync
        this.setupPeriodicSync();
        
        console.log('CMS Sync Bridge initialized');
    }

    setupDataSyncListeners() {
        // Listen untuk custom events dari admin panel
        window.addEventListener('cms-data-updated', (e) => {
            console.log('🔄 CMS data updated, refreshing frontend...');
            this.refreshFrontend();
        });

        // Listen untuk storage events (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('cms_')) {
                console.log('🔄 Storage changed, refreshing frontend...');
                this.refreshFrontend();
            }
        });
    }

    setupPeriodicSync() {
        // Sync setiap 10 detik
        setInterval(() => {
            this.refreshFrontend();
        }, 10000);
    }

    refreshFrontend() {
        // Trigger CMS Integration refresh jika ada
        if (window.cmsIntegration) {
            window.cmsIntegration.refreshData();
        }
        
        // Update hero section
        this.updateHeroSection();
        
        // Update products
        this.updateProducts();
        
        // Update footer
        this.updateFooter();
        
        // Update testimonials
        this.updateTestimonials();
        
        // Update gallery
        this.updateGallery();
        
        console.log('✅ Frontend refreshed');
    }

    updateHeroSection() {
        if (window.loadCMSData) {
            const pagesData = window.loadCMSData('index.json');
            if (pagesData) {
                // Update hero titles and descriptions
                const heroTitleSpan = document.getElementById('hero-title-span');
                const heroSubtitleSpan = document.getElementById('hero-subtitle-span');
                const heroDescription = document.getElementById('hero-description');

                if (heroTitleSpan) {
                    heroTitleSpan.textContent = pagesData.hero_title || 'Sale 20% Off';
                }

                if (heroSubtitleSpan) {
                    heroSubtitleSpan.textContent = pagesData.hero_subtitle || 'On Everything';
                }

                if (heroDescription) {
                    heroDescription.textContent = pagesData.hero_description || 'Explicabo esse amet tempora...';
                }

                // Update arrival section
                const arrivalTitle = document.getElementById('arrival-title');
                const arrivalDesc = document.getElementById('arrival-description');

                if (arrivalTitle) {
                    arrivalTitle.textContent = pagesData.arrival_title || '#NewArrivals';
                }

                if (arrivalDesc) {
                    arrivalDesc.textContent = pagesData.arrival_description || 'Vitae fugiat laboriosam...';
                }
            }
        }
    }

    updateProducts() {
        if (window.loadCMSData) {
            const data = window.loadCMSData('data.json');
            if (data && data.products) {
                const products = data.products;
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
        }
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
        if (window.loadCMSData) {
            const data = window.loadCMSData('data.json');
            if (data && data.site_settings) {
                const settings = data.site_settings;

                // Update footer contact information
                const addressLink = document.getElementById('footer-address-link');
                const addressSpan = document.getElementById('footer-address');
                const phoneLink = document.getElementById('footer-phone-link');
                const phoneSpan = document.getElementById('footer-phone');
                const emailLink = document.getElementById('footer-email-link');
                const emailSpan = document.getElementById('footer-email');

                if (addressLink && addressSpan) {
                    addressLink.href = `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`;
                    addressSpan.textContent = settings.address;
                }

                if (phoneLink && phoneSpan) {
                    phoneLink.href = `tel:${settings.phone}`;
                    phoneSpan.textContent = `Call ${settings.phone}`;
                }

                if (emailLink && emailSpan) {
                    emailLink.href = `mailto:${settings.email}`;
                    emailSpan.textContent = settings.email;
                }

                // Update social media links
                const socialLinks = {
                    'fa-facebook': settings.facebook_url,
                    'fa-twitter': settings.twitter_url,
                    'fa-linkedin': settings.linkedin_url,
                    'fa-instagram': settings.instagram_url,
                    'fa-pinterest': settings.pinterest_url
                };

                Object.entries(socialLinks).forEach(([iconClass, url]) => {
                    const link = document.querySelector(`.footer_social .${iconClass}`)?.parentElement;
                    if (link) {
                        link.href = url;
                        link.setAttribute('target', '_blank');
                    }
                });
            }
        }
    }

    updateTestimonials() {
        if (window.loadCMSData) {
            const data = window.loadCMSData('data.json');
            if (data && data.testimonials) {
                const testimonials = data.testimonials;
                const testimonialContainer = document.getElementById('testimonial-container');
                
                if (testimonialContainer) {
                    // Clear existing testimonials
                    testimonialContainer.innerHTML = '';
                    
                    // Render testimonials from CMS data
                    testimonials.forEach((testimonial, index) => {
                        const testimonialHTML = this.createTestimonialHTML(testimonial, index);
                        testimonialContainer.insertAdjacentHTML('beforeend', testimonialHTML);
                    });
                }
            }
        }
    }

    createTestimonialHTML(testimonial, index) {
        const isActive = index === 0 ? 'active' : '';
        return `
            <div class="carousel-item ${isActive}">
                <div class="box col-lg-10 mx-auto">
                    <div class="img_container">
                        <div class="img_box">
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
        if (window.loadCMSData) {
            const data = window.loadCMSData('data.json');
            if (data && data.gallery) {
                const gallery = data.gallery;
                const galleryContainer = document.getElementById('gallery-container');
                
                if (galleryContainer) {
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
            }
        }
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
}

// Initialize CMS Sync Bridge
document.addEventListener('DOMContentLoaded', () => {
    window.cmsSyncBridge = new CMSSyncBridge();
    
    // Global function untuk manual refresh
    window.refreshCMS = () => {
        if (window.cmsSyncBridge) {
            window.cmsSyncBridge.refreshFrontend();
        }
    };
    
    console.log('✅ CMS Sync Bridge ready');
});
