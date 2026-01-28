// CMS Data Sync - Sinkronisasi data antara admin panel dan frontend
// Pastikan data persist dan sync dengan benar

class CMSDataSync {
    constructor() {
        this.baseURL = window.location.origin;
        this.init();
    }

    init() {
        // Initialize data jika kosong
        this.initializeDataIfEmpty();
        
        // Setup sync listeners
        this.setupSyncListeners();
        
        // Setup periodic sync
        this.setupPeriodicSync();
        
        console.log('CMS Data Sync initialized');
    }

    // Initialize data jika localStorage kosong
    initializeDataIfEmpty() {
        // Check dan initialize data.json
        if (!localStorage.getItem('cms_data.json')) {
            this.initializeDataJSON();
        }
        
        // Check dan initialize about.json
        if (!localStorage.getItem('cms_about.json')) {
            this.initializeAboutJSON();
        }
        
        // Check dan initialize settings.json
        if (!localStorage.getItem('cms_settings.json')) {
            this.initializeSettingsJSON();
        }
        
        // Check dan initialize index.json
        if (!localStorage.getItem('cms_index.json')) {
            this.initializeIndexJSON();
        }
        
        console.log('✅ CMS Data initialized');
    }

    initializeDataJSON() {
        const defaultData = {
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
                },
                {
                    title: "Women's Formal Dress",
                    price: "$95",
                    image: "images/p5.png",
                    category: "Women",
                    description: "Formal dress for business events",
                    whatsapp: "628123456789"
                },
                {
                    title: "Kids T-Shirt",
                    price: "$25",
                    image: "images/p6.png",
                    category: "Kids",
                    description: "Comfortable t-shirt for kids",
                    whatsapp: "628123456789"
                },
                {
                    title: "Women's Party Dress",
                    price: "$120",
                    image: "images/p7.png",
                    category: "Women",
                    description: "Stunning dress for parties",
                    whatsapp: "628123456789"
                },
                {
                    title: "Men's Sport Shirt",
                    price: "$55",
                    image: "images/p8.png",
                    category: "Men",
                    description: "Sport shirt for active lifestyle",
                    whatsapp: "628123456789"
                },
                {
                    title: "Men's Business Shirt",
                    price: "$80",
                    image: "images/p9.png",
                    category: "Men",
                    description: "Professional business shirt",
                    whatsapp: "628123456789"
                },
                {
                    title: "Men's Weekend Shirt",
                    price: "$60",
                    image: "images/p10.png",
                    category: "Men",
                    description: "Relaxed shirt for weekends",
                    whatsapp: "628123456789"
                },
                {
                    title: "Men's Classic Shirt",
                    price: "$70",
                    image: "images/p11.png",
                    category: "Men",
                    description: "Classic design shirt",
                    whatsapp: "628123456789"
                },
                {
                    title: "Women's Casual Dress",
                    price: "$58",
                    image: "images/p12.png",
                    category: "Women",
                    description: "Casual dress for everyday wear",
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
                },
                {
                    title: "Store Front",
                    image: "images/gallery-7.jpg",
                    category: "Store",
                    alt_text: "Modern store front design"
                },
                {
                    title: "Fashion Week",
                    image: "images/gallery-8.jpg",
                    category: "Events",
                    alt_text: "Fashion week runway show"
                },
                {
                    title: "Winter Collection",
                    image: "images/gallery-9.jpg",
                    category: "Fashion",
                    alt_text: "Winter fashion collection"
                },
                {
                    title: "Premium Quality",
                    image: "images/gallery-10.jpg",
                    category: "Products",
                    alt_text: "Premium quality fashion items"
                },
                {
                    title: "Customer Service",
                    image: "images/gallery-11.jpg",
                    category: "Store",
                    alt_text: "Excellent customer service"
                },
                {
                    title: "Fashion Show",
                    image: "images/gallery-12.jpg",
                    category: "Events",
                    alt_text: "Fashion show backstage"
                }
            ]
        };
        
        localStorage.setItem('cms_data.json', JSON.stringify(defaultData));
        console.log('✅ data.json initialized');
    }

    initializeAboutJSON() {
        const defaultAbout = {
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
        
        localStorage.setItem('cms_about.json', JSON.stringify(defaultAbout));
        console.log('✅ about.json initialized');
    }

    initializeSettingsJSON() {
        const defaultSettings = {
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
        
        localStorage.setItem('cms_settings.json', JSON.stringify(defaultSettings));
        console.log('✅ settings.json initialized');
    }

    initializeIndexJSON() {
        const defaultIndex = {
            hero_title: "Sale 20% Off",
            hero_subtitle: "On Everything",
            hero_description: "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.",
            arrival_title: "#NewArrivals",
            arrival_description: "Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!"
        };
        
        localStorage.setItem('cms_index.json', JSON.stringify(defaultIndex));
        console.log('✅ index.json initialized');
    }

    // Setup sync listeners untuk cross-tab communication
    setupSyncListeners() {
        // Listen untuk storage events (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('cms_')) {
                console.log('🔄 Data changed in another tab:', e.key);
                this.notifyFrontendUpdate();
            }
        });
        
        // Listen untuk custom events dari admin panel
        window.addEventListener('cms-data-changed', (e) => {
            console.log('🔄 CMS data changed:', e.detail);
            this.notifyFrontendUpdate();
        });
    }

    // Setup periodic sync
    setupPeriodicSync() {
        // Sync setiap 30 detik
        setInterval(() => {
            this.syncWithFrontend();
        }, 30000);
    }

    // Notify frontend untuk update
    notifyFrontendUpdate() {
        // Trigger custom event untuk frontend
        window.dispatchEvent(new CustomEvent('cms-data-updated', {
            detail: {
                timestamp: Date.now(),
                source: 'cms-sync'
            }
        }));
        
        // Trigger refresh jika CMS Integration ada
        if (window.cmsIntegration) {
            window.cmsIntegration.refreshData();
        }
        
        console.log('🔄 Frontend update notified');
    }

    // Sync dengan frontend
    syncWithFrontend() {
        // Check apakah ada perubahan data
        const currentData = this.getAllData();
        
        // Notify frontend jika ada perubahan
        this.notifyFrontendUpdate();
        
        console.log('🔄 Periodic sync completed');
    }

    // Get all data
    getAllData() {
        return {
            data: JSON.parse(localStorage.getItem('cms_data.json') || '{}'),
            about: JSON.parse(localStorage.getItem('cms_about.json') || '{}'),
            settings: JSON.parse(localStorage.getItem('cms_settings.json') || '{}'),
            index: JSON.parse(localStorage.getItem('cms_index.json') || '{}')
        };
    }

    // Save data dengan sync
    saveData(filename, data) {
        // Save ke localStorage
        localStorage.setItem(`cms_${filename}`, JSON.stringify(data));
        
        // Trigger sync event
        window.dispatchEvent(new CustomEvent('cms-data-changed', {
            detail: {
                filename: filename,
                data: data,
                timestamp: Date.now()
            }
        }));
        
        console.log(`💾 Data saved: ${filename}`, data);
    }

    // Load data dengan fallback
    loadData(filename) {
        try {
            // Try localStorage first
            const localData = localStorage.getItem(`cms_${filename}`);
            if (localData) {
                return JSON.parse(localData);
            }
            
            // Try fetching actual file
            return this.fetchFromFile(filename);
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return this.getDefaultData(filename);
        }
    }

    // Fetch dari file dengan fallback
    async fetchFromFile(filename) {
        try {
            const response = await fetch(`/content/${filename}`);
            if (response.ok) {
                const data = await response.json();
                // Save ke localStorage untuk cache
                localStorage.setItem(`cms_${filename}`, JSON.stringify(data));
                return data;
            }
        } catch (error) {
            console.log(`Could not fetch ${filename} from server, using fallback`);
        }
        
        return this.getDefaultData(filename);
    }

    // Get default data
    getDefaultData(filename) {
        const defaults = {
            'data.json': this.getDefaultDataJSON(),
            'about.json': this.getDefaultAboutJSON(),
            'settings.json': this.getDefaultSettingsJSON(),
            'index.json': this.getDefaultIndexJSON()
        };
        
        return defaults[filename] || {};
    }

    getDefaultDataJSON() {
        return JSON.parse(localStorage.getItem('cms_data.json') || '{}');
    }

    getDefaultAboutJSON() {
        return JSON.parse(localStorage.getItem('cms_about.json') || '{}');
    }

    getDefaultSettingsJSON() {
        return JSON.parse(localStorage.getItem('cms_settings.json') || '{}');
    }

    getDefaultIndexJSON() {
        return JSON.parse(localStorage.getItem('cms_index.json') || '{}');
    }

    // Clear all data (for reset)
    clearAllData() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('cms_')) {
                localStorage.removeItem(key);
            }
        });
        
        console.log('🗑️ All CMS data cleared');
        
        // Reinitialize
        this.initializeDataIfEmpty();
    }

    // Export data
    exportData() {
        const allData = this.getAllData();
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cms-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('📤 Data exported');
    }

    // Import data
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Import semua data
                    if (data.data) {
                        this.saveData('data.json', data.data);
                    }
                    if (data.about) {
                        this.saveData('about.json', data.about);
                    }
                    if (data.settings) {
                        this.saveData('settings.json', data.settings);
                    }
                    if (data.index) {
                        this.saveData('index.json', data.index);
                    }
                    
                    console.log('📥 Data imported successfully');
                    resolve(data);
                } catch (error) {
                    console.error('Error importing data:', error);
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
}

// Initialize CMS Data Sync
document.addEventListener('DOMContentLoaded', () => {
    window.cmsDataSync = new CMSDataSync();
});

// Global functions
window.saveCMSData = (filename, data) => {
    if (window.cmsDataSync) {
        window.cmsDataSync.saveData(filename, data);
    }
};

window.loadCMSData = (filename) => {
    if (window.cmsDataSync) {
        return window.cmsDataSync.loadData(filename);
    }
    return null;
};

window.exportCMSData = () => {
    if (window.cmsDataSync) {
        window.cmsDataSync.exportData();
    }
};

window.importCMSData = (file) => {
    if (window.cmsDataSync) {
        return window.cmsDataSync.importData(file);
    }
    return Promise.reject(new Error('CMS Data Sync not available'));
};

window.clearCMSData = () => {
    if (window.cmsDataSync) {
        window.cmsDataSync.clearAllData();
    }
};
