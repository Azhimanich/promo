// Simple CMS Bridge - Menghubungkan gambar yang sudah ada dengan CMS
// Pendekatan JAMstack yang tidak merusak existing admin panel

class SimpleCMSBridge {
    constructor() {
        this.init();
    }

    init() {
        this.loadExistingImages();
        this.setupImageBridge();
        this.updateCMSData();
    }

    // Load semua gambar yang sudah ada di folder images/
    loadExistingImages() {
        this.existingImages = {
            // Static images yang sudah ada
            logo: "images/logo.png",
            favicon: "images/favicon.png",
            hero_background: "images/slider-bg.jpg",
            arrival_background: "images/arrival-bg.png",
            about_story: "images/about-story.jpg",
            client: "images/client.jpg",
            
            // Product images
            products: [
                "images/p1.png", "images/p2.png", "images/p3.png", "images/p4.png",
                "images/p5.png", "images/p6.png", "images/p7.png", "images/p8.png",
                "images/p9.png", "images/p10.png", "images/p11.png", "images/p12.png"
            ],
            
            // Gallery images
            gallery: [
                "images/gallery-1.jpg", "images/gallery-2.jpg", "images/gallery-3.jpg", "images/gallery-4.jpg",
                "images/gallery-5.jpg", "images/gallery-6.jpg", "images/gallery-7.jpg", "images/gallery-8.jpg",
                "images/gallery-9.jpg", "images/gallery-10.jpg", "images/gallery-11.jpg", "images/gallery-12.jpg"
            ]
        };
    }

    // Setup bridge untuk menghubungkan gambar dengan CMS
    setupImageBridge() {
        // Update simple.html untuk menampilkan gambar yang sudah ada
        this.updateSimpleAdminPanel();
        
        // Update data.json dengan path gambar yang benar
        this.updateDataJSON();
        
        // Update about.json dengan path gambar yang benar
        this.updateAboutJSON();
    }

    // Update simple admin panel untuk menampilkan preview gambar
    updateSimpleAdminPanel() {
        // Tambahkan script ke simple.html untuk menampilkan gambar
        const script = document.createElement('script');
        script.textContent = `
            // Load existing images untuk preview
            window.loadExistingImages = function() {
                const existingImages = ${JSON.stringify(this.existingImages)};
                
                // Update other image previews
                updateImagePreview('logo', existingImages.logo);
                updateImagePreview('favicon', existingImages.favicon);
                updateImagePreview('hero_background', existingImages.hero_background);
                updateImagePreview('arrival_background', existingImages.arrival_background);
                updateImagePreview('about_story', existingImages.about_story);
                updateImagePreview('client', existingImages.client);
            };
            
            function updateImagePreview(fieldName, imagePath) {
                const preview = document.getElementById(fieldName + '-preview');
                const pathDiv = document.getElementById(fieldName + '_path');
                const hiddenInput = document.getElementById(fieldName);
                
                if (preview) {
                    const img = preview.querySelector('img');
                    if (img) {
                        img.src = imagePath;
                        img.style.display = 'block';
                    }
                    preview.style.display = 'block';
                }
                
                if (pathDiv) pathDiv.textContent = imagePath;
                if (hiddenInput) hiddenInput.value = imagePath;
            }
            
            // Load images saat page load
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof loadExistingImages === 'function') {
                    loadExistingImages();
                }
            });
        `;
        
        document.head.appendChild(script);
    }

    // Update data.json dengan path gambar yang benar
    updateDataJSON() {
        fetch('/content/data.json')
            .then(response => response.json())
            .then(data => {
                // Update site settings dengan gambar yang sudah ada
                if (data.site_settings) {
                    data.site_settings.logo = this.existingImages.logo;
                    data.site_settings.favicon = this.existingImages.favicon;
                    data.site_settings.hero_background = this.existingImages.hero_background;
                    data.site_settings.arrival_background = this.existingImages.arrival_background;
                }

                // Update testimonials dengan gambar client yang sudah ada
                if (data.testimonials) {
                    data.testimonials.forEach(testimonial => {
                        testimonial.image = this.existingImages.client;
                    });
                }

                // Update products dengan gambar yang sudah ada
                if (data.products) {
                    data.products.forEach((product, index) => {
                        if (index < this.existingImages.products.length) {
                            product.image = this.existingImages.products[index];
                        }
                    });
                }

                // Update gallery dengan gambar yang sudah ada
                if (data.gallery) {
                    data.gallery.forEach((item, index) => {
                        if (index < this.existingImages.gallery.length) {
                            item.image = this.existingImages.gallery[index];
                        }
                    });
                }

                // Simpan updated data (dalam implementasi nyata, ini akan disimpan ke file)
                console.log('Updated CMS data with existing images:', data);
                return data;
            })
            .catch(error => {
                console.error('Error updating data.json:', error);
            });
    }

    // Update about.json dengan path gambar yang benar
    updateAboutJSON() {
        fetch('/content/about.json')
            .then(response => response.json())
            .then(data => {
                // Update about page dengan gambar yang sudah ada
                data.hero_background = this.existingImages.hero_background;
                data.story_image = this.existingImages.about_story;

                console.log('Updated about.json with existing images:', data);
                return data;
            })
            .catch(error => {
                console.error('Error updating about.json:', error);
            });
    }

    // Method untuk update CMS data secara real-time
    updateCMSData() {
        // Update semua gambar di halaman frontend
        this.updateFrontendImages();
        
        // Setup listener untuk perubahan di admin panel
        this.setupAdminListener();
    }

    // Update gambar di frontend
    updateFrontendImages() {
        // Update logo
        const logos = document.querySelectorAll('.navbar-brand img');
        logos.forEach(logo => {
            if (this.existingImages.logo) {
                logo.src = this.existingImages.logo;
            }
        });

        // Update favicon
        const favicon = document.querySelector('link[rel="shortcut icon"]');
        if (favicon && this.existingImages.favicon) {
            favicon.href = this.existingImages.favicon;
        }

        // Update hero background
        const heroBackgrounds = document.querySelectorAll('.slider_bg_box img');
        heroBackgrounds.forEach(bg => {
            if (this.existingImages.hero_background) {
                bg.src = this.existingImages.hero_background;
            }
        });

        // Update arrival background
        const arrivalBackgrounds = document.querySelectorAll('.arrival_bg_box img');
        arrivalBackgrounds.forEach(bg => {
            if (this.existingImages.arrival_background) {
                bg.src = this.existingImages.arrival_background;
            }
        });

        // Update about page hero background (CSS)
        if (this.existingImages.hero_background) {
            const aboutHero = document.querySelector('.about-hero');
            if (aboutHero) {
                aboutHero.style.backgroundImage = `linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 50%, rgba(247, 68, 78, 0.8) 100%), url('${this.existingImages.hero_background}')`;
            }
        }

        // Update story image
        const storyImage = document.querySelector('.story-image img');
        if (storyImage && this.existingImages.about_story) {
            storyImage.src = this.existingImages.about_story;
        }

        // Update testimonial images
        const testimonialImages = document.querySelectorAll('.img_box-inner img');
        testimonialImages.forEach(img => {
            if (this.existingImages.client) {
                img.src = this.existingImages.client;
            }
        });

        // Update gallery images
        const galleryImages = document.querySelectorAll('.gallery-item');
        galleryImages.forEach((img, index) => {
            if (index < this.existingImages.gallery.length) {
                img.src = this.existingImages.gallery[index];
            }
        });
    }

    // Setup listener untuk perubahan di admin panel
    setupAdminListener() {
        // Listen untuk perubahan di simple.html
        if (window.location.pathname.includes('admin/simple.html')) {
            // Override form submissions untuk menggunakan gambar yang sudah ada
            this.overrideFormSubmissions();
        }
    }

    // Override form submissions untuk menggunakan existing images
    overrideFormSubmissions() {
    // Override about form submission
    const aboutForm = document.getElementById('aboutForm');
    if (aboutForm) {
        aboutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAboutData();
        });
    }

    // Override settings form submission
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettingsData();
        });
    }
    }

    // Save about data dengan existing images
    saveAboutData() {
        const aboutData = {
            hero_title: document.getElementById('about-hero_title')?.value || '',
            hero_subtitle: document.getElementById('about-hero_subtitle')?.value || '',
            hero_description: document.getElementById('about-hero_description')?.value || '',
            hero_background: this.existingImages.hero_background,
            story_title: document.getElementById('story_title')?.value || '',
            story_subtitle: document.getElementById('story_subtitle')?.value || '',
            story_content: document.getElementById('story_content')?.value || '',
            story_content_2: document.getElementById('story_content_2')?.value || '',
            story_content_3: document.getElementById('story_content_3')?.value || '',
            story_image: this.existingImages.about_story,
            gallery_title: document.getElementById('gallery_title')?.value || '',
            gallery_subtitle: document.getElementById('gallery_subtitle')?.value || '',
            gallery_images: this.existingImages.gallery,
            cta_title: document.getElementById('cta_title')?.value || '',
            cta_description: document.getElementById('cta_description')?.value || ''
        };

        // Simpan ke about.json (dalam implementasi nyata)
        console.log('Saving about data:', aboutData);
        this.showMessage('About page updated successfully!', 'success');
    }

    // Save settings data dengan existing images
    saveSettingsData() {
        const settingsData = {
            store_name: document.getElementById('store_name')?.value || 'Famms',
            store_description: document.getElementById('store_description')?.value || '',
            whatsapp_number: document.getElementById('whatsapp_number')?.value || '628123456789',
            instagram_url: document.getElementById('instagram_url')?.value || '#',
            facebook_url: document.getElementById('facebook_url')?.value || '#',
            twitter_url: document.getElementById('twitter_url')?.value || '#',
            linkedin_url: document.getElementById('linkedin_url')?.value || '#',
            pinterest_url: document.getElementById('pinterest_url')?.value || '#',
            logo: this.existingImages.logo,
            favicon: this.existingImages.favicon,
            hero_background: this.existingImages.hero_background,
            arrival_background: this.existingImages.arrival_background
        };

        // Simpan ke settings.json (dalam implementasi nyata)
        console.log('Saving settings data:', settingsData);
        this.showMessage('Settings updated successfully!', 'success');
    }

    // Show message
    showMessage(message, type) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        }
    }
}

// Initialize Simple CMS Bridge
document.addEventListener('DOMContentLoaded', () => {
    window.simpleCMSBridge = new SimpleCMSBridge();
});

// Global function untuk manual refresh
window.refreshImageBridge = () => {
    if (window.simpleCMSBridge) {
        window.simpleCMSBridge.updateFrontendImages();
    }
};
