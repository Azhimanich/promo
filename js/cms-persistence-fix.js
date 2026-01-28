// CMS Persistence Fix - Memastikan data persist dan tidak reset
// Solusi untuk masalah data hilang setelah refresh

class CMSPersistenceFix {
    constructor() {
        this.init();
    }

    init() {
        // Override localStorage untuk debugging
        this.setupLocalStorageDebug();
        
        // Setup persistence check
        this.setupPersistenceCheck();
        
        // Fix CMS Data Sync initialization
        this.fixCMSDataSync();
        
        console.log('CMS Persistence Fix initialized');
    }

    setupLocalStorageDebug() {
        // Monitor localStorage changes
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            console.log(`📝 localStorage.setItem: ${key}`, value);
            return originalSetItem.call(this, key, value);
        };

        const originalGetItem = localStorage.getItem;
        localStorage.getItem = function(key) {
            const value = originalGetItem.call(this, key);
            console.log(`📖 localStorage.getItem: ${key}`, value);
            return value;
        };
    }

    setupPersistenceCheck() {
        // Check data persistence every 5 seconds
        setInterval(() => {
            this.checkDataPersistence();
        }, 5000);

        // Initial check
        setTimeout(() => {
            this.checkDataPersistence();
        }, 1000);
    }

    checkDataPersistence() {
        const keys = ['cms_data.json', 'cms_about.json', 'cms_settings.json', 'cms_index.json'];
        const status = {};

        keys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    status[key] = {
                        exists: true,
                        size: data.length,
                        keys: Object.keys(parsed),
                        valid: true
                    };
                } catch (e) {
                    status[key] = {
                        exists: true,
                        size: data.length,
                        error: 'Invalid JSON',
                        valid: false
                    };
                }
            } else {
                status[key] = {
                    exists: false,
                    valid: false
                };
            }
        });

        console.log('🔍 Data Persistence Check:', status);

        // Auto-fix missing data
        this.autoFixMissingData(status);
    }

    autoFixMissingData(status) {
        let needsFix = false;

        Object.entries(status).forEach(([key, info]) => {
            if (!info.exists || !info.valid) {
                console.log(`⚠️ ${key} needs fixing`);
                needsFix = true;
            }
        });

        if (needsFix) {
            console.log('🔧 Auto-fixing missing data...');
            this.restoreDefaultData();
        }
    }

    restoreDefaultData() {
        // Restore default data if missing
        if (!localStorage.getItem('cms_data.json')) {
            const defaultData = this.getDefaultData();
            localStorage.setItem('cms_data.json', JSON.stringify(defaultData));
            console.log('✅ Restored default data.json');
        }

        if (!localStorage.getItem('cms_about.json')) {
            const defaultAbout = this.getDefaultAbout();
            localStorage.setItem('cms_about.json', JSON.stringify(defaultAbout));
            console.log('✅ Restored default about.json');
        }

        if (!localStorage.getItem('cms_settings.json')) {
            const defaultSettings = this.getDefaultSettings();
            localStorage.setItem('cms_settings.json', JSON.stringify(defaultSettings));
            console.log('✅ Restored default settings.json');
        }

        if (!localStorage.getItem('cms_index.json')) {
            const defaultIndex = this.getDefaultIndex();
            localStorage.setItem('cms_index.json', JSON.stringify(defaultIndex));
            console.log('✅ Restored default index.json');
        }

        // Trigger update event
        window.dispatchEvent(new CustomEvent('cms-data-restored', {
            detail: { timestamp: Date.now() }
        }));
    }

    fixCMSDataSync() {
        // Override CMS Data Sync initialization
        if (window.cmsDataSync) {
            const originalInit = window.cmsDataSync.init;
            window.cmsDataSync.init = function() {
                console.log('🔧 Fixing CMS Data Sync initialization...');
                
                // Ensure data exists before initialization
                this.initializeDataIfEmpty();
                
                // Call original init
                originalInit.call(this);
            };
        }
    }

    getDefaultData() {
        return {
            pages: {
                index: {
                    hero_title: "Sale 20% Off",
                    hero_subtitle: "On Everything",
                    hero_description: "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.",
                    arrival_title: "#NewArrivals",
                    arrival_description: "Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!"
                }
            },
            products: [
                {
                    title: "Men's Premium Shirt",
                    price: "$75",
                    image: "images/p1.png",
                    category: "Men",
                    description: "High-quality premium shirt for men",
                    whatsapp: "628123456789"
                },
                {
                    title: "Men's Casual Shirt",
                    price: "$65",
                    image: "images/p2.png",
                    category: "Men",
                    description: "Comfortable casual shirt for daily wear",
                    whatsapp: "628123456789"
                },
                {
                    title: "Women's Elegant Dress",
                    price: "$85",
                    image: "images/p3.png",
                    category: "Women",
                    description: "Elegant dress for special occasions",
                    whatsapp: "628123456789"
                },
                {
                    title: "Women's Summer Dress",
                    price: "$68",
                    image: "images/p4.png",
                    category: "Women",
                    description: "Perfect dress for summer season",
                    whatsapp: "628123456789"
                }
            ],
            site_settings: {
                store_name: "Famms",
                store_description: "Toko fashion online terpercaya di Indonesia dengan koleksi terkini dan kualitas terbaik.",
                whatsapp_number: "+6281234567890",
                instagram_url: "https://instagram.com/famms",
                facebook_url: "https://facebook.com/famms",
                twitter_url: "https://twitter.com/famms",
                linkedin_url: "https://linkedin.com/company/famms",
                pinterest_url: "https://pinterest.com/famms",
                address: "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia",
                phone: "+62123456789",
                email: "info@famms.co.id",
                logo: "images/logo.png",
                favicon: "images/favicon.png",
                hero_background: "images/slider-bg.jpg",
                arrival_background: "images/arrival-bg.png"
            },
            testimonials: [
                {
                    name: "Anna Trevor",
                    role: "Customer",
                    content: "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.",
                    image: "images/client.jpg",
                    rating: 5
                },
                {
                    name: "Michael Chen",
                    role: "Regular Customer",
                    content: "Excellent service and high-quality products! The team at Famms really knows fashion. I've been a loyal customer for over a year and couldn't be happier with their collection and customer service.",
                    image: "images/client.jpg",
                    rating: 5
                },
                {
                    name: "Sarah Johnson",
                    role: "Fashion Enthusiast",
                    content: "Famms has completely transformed my wardrobe! Their trendy designs and affordable prices make it easy to stay fashionable without breaking the bank. Highly recommend!",
                    image: "images/client.jpg",
                    rating: 5
                }
            ],
            gallery: [
                {
                    title: "Fashion Collection 2024",
                    image: "images/gallery-1.jpg",
                    category: "Fashion",
                    alt_text: "Latest fashion collection showcase"
                },
                {
                    title: "Premium Products",
                    image: "images/gallery-2.jpg",
                    category: "Products",
                    alt_text: "Premium product display"
                },
                {
                    title: "Store Interior",
                    image: "images/gallery-3.jpg",
                    category: "Store",
                    alt_text: "Beautiful store interior design"
                },
                {
                    title: "Fashion Event",
                    image: "images/gallery-4.jpg",
                    category: "Events",
                    alt_text: "Fashion show event"
                },
                {
                    title: "Summer Collection",
                    image: "images/gallery-5.jpg",
                    category: "Fashion",
                    alt_text: "Summer fashion collection"
                },
                {
                    title: "Accessories Line",
                    image: "images/gallery-6.jpg",
                    category: "Products",
                    alt_text: "Fashion accessories collection"
                }
            ]
        };
    }

    getDefaultAbout() {
        return {
            hero_title: "About Famms",
            hero_subtitle: "Your Trusted Fashion Partner Since 2020",
            hero_description: "We are dedicated to providing high-quality fashion products that combine style, comfort, and affordability for the modern consumer.",
            story_title: "Our Story",
            story_subtitle: "From a small idea to a fashion destination",
            story_content: "Founded in 2020, Famms began as a small boutique with a big vision: to make quality fashion accessible to everyone. What started as a modest store in the heart of the city has grown into a trusted name in the fashion industry.",
            story_content_2: "Our journey has been driven by passion for fashion and commitment to customer satisfaction. We believe that great style shouldn't come with a great price tag, and that's why we work directly with manufacturers to bring you the best deals without compromising on quality.",
            story_content_3: "Today, Famms stands as a testament to what can be achieved with dedication, hard work, and a genuine love for fashion. We continue to evolve, adapt, and grow, always keeping our customers at the heart of everything we do.",
            gallery_title: "Galeri Kami",
            gallery_subtitle: "Koleksi fashion terbaik kami",
            gallery_images: [
                "images/gallery-1.jpg",
                "images/gallery-2.jpg",
                "images/gallery-3.jpg",
                "images/gallery-4.jpg",
                "images/gallery-5.jpg",
                "images/gallery-6.jpg",
                "images/gallery-7.jpg",
                "images/gallery-8.jpg",
                "images/gallery-9.jpg",
                "images/gallery-10.jpg",
                "images/gallery-11.jpg",
                "images/gallery-12.jpg"
            ],
            cta_title: "Ready to Experience the Famms Difference?",
            cta_description: "Join thousands of satisfied customers who have discovered their perfect style with us."
        };
    }

    getDefaultSettings() {
        return {
            store_name: "Famms",
            store_description: "Toko fashion online terpercaya di Indonesia dengan koleksi terkini dan kualitas terbaik.",
            whatsapp_number: "+6281234567890",
            instagram_url: "https://instagram.com/famms",
            facebook_url: "https://facebook.com/famms",
            twitter_url: "https://twitter.com/famms",
            linkedin_url: "https://linkedin.com/company/famms",
            pinterest_url: "https://pinterest.com/famms",
            address: "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia",
            phone: "+62123456789",
            email: "info@famms.co.id"
        };
    }

    getDefaultIndex() {
        return {
            hero_title: "Sale 20% Off",
            hero_subtitle: "On Everything",
            hero_description: "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.",
            arrival_title: "#NewArrivals",
            arrival_description: "Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!"
        };
    }

    // Method untuk memaksa refresh semua data
    forceRefreshAllData() {
        console.log('🔄 Force refreshing all data...');
        
        // Clear cache
        localStorage.removeItem('cms_cache_timestamp');
        
        // Restore default data
        this.restoreDefaultData();
        
        // Trigger events
        window.dispatchEvent(new CustomEvent('cms-data-force-refresh', {
            detail: { timestamp: Date.now() }
        }));
        
        // Refresh page setelah delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

// Initialize CMS Persistence Fix
document.addEventListener('DOMContentLoaded', () => {
    window.cmsPersistenceFix = new CMSPersistenceFix();
    
    // Global function untuk manual fix
    window.fixCMSPersistence = () => {
        if (window.cmsPersistenceFix) {
            window.cmsPersistenceFix.forceRefreshAllData();
        }
    };
    
    console.log('✅ CMS Persistence Fix ready');
});
