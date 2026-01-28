// CMS Performance Optimization Module
class CMSOptimization {
    constructor() {
        this.cache = new Map();
        this.lazyImages = new Set();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCaching();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
    }

    // Lazy Loading untuk gambar
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe semua gambar dengan data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
            this.lazyImages.add(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Loading placeholder
        img.style.opacity = '0.5';
        
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.style.opacity = '1';
            img.removeAttribute('data-src');
            this.lazyImages.delete(img);
        };
        
        tempImg.onerror = () => {
            img.style.opacity = '1';
            img.src = 'images/placeholder.jpg'; // Fallback image
        };
        
        tempImg.src = src;
    }

    // Image optimization
    setupImageOptimization() {
        // Tambah loading="lazy" ke semua gambar
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.loading = 'lazy';
        });

        // Optimasi gambar CMS
        this.optimizeCMSImages();
    }

    optimizeCMSImages() {
        // Product images
        document.querySelectorAll('.img-box img').forEach(img => {
            this.addImageErrorHandling(img);
            this.addImageLoadingSpinner(img);
        });

        // Gallery images
        document.querySelectorAll('.gallery-item').forEach(img => {
            this.addImageErrorHandling(img);
            this.addImageLoadingSpinner(img);
        });

        // Testimonial images
        document.querySelectorAll('.img_box-inner img').forEach(img => {
            this.addImageErrorHandling(img);
            this.addImageLoadingSpinner(img);
        });
    }

    addImageErrorHandling(img) {
        img.onerror = () => {
            img.src = 'images/placeholder.jpg';
            img.alt = 'Image not available';
            console.warn(`Failed to load image: ${img.src}`);
        };
    }

    addImageLoadingSpinner(img) {
        const spinner = document.createElement('div');
        spinner.className = 'image-loading-spinner';
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #f7444e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 1;
        `;
        
        img.parentElement.style.position = 'relative';
        img.parentElement.insertBefore(spinner, img);
        
        img.onload = () => {
            spinner.remove();
        };
    }

    // Caching system
    setupCaching() {
        // Cache CMS data
        this.cacheCMSData();
        
        // Cache images
        this.cacheImages();
    }

    cacheCMSData() {
        const cacheKey = 'cms_data';
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
            try {
                const data = JSON.parse(cachedData);
                const now = Date.now();
                
                // Cache valid for 5 minutes
                if (now - data.timestamp < 300000) {
                    this.cache.set('cms_data', data.content);
                    return;
                }
            } catch (e) {
                console.warn('Invalid cached CMS data');
            }
        }
    }

    cacheImages() {
        // Preload critical images
        const criticalImages = [
            'images/logo.png',
            'images/favicon.png',
            'images/slider-bg.jpg'
        ];

        criticalImages.forEach(src => {
            if (!this.cache.has(src)) {
                const img = new Image();
                img.onload = () => this.cache.set(src, true);
                img.src = src;
            }
        });
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);

        // CMS error handling
        this.setupCMSErrorHandling();
    }

    handleImageError(img) {
        if (!img.dataset.fallback) {
            img.src = 'images/placeholder.jpg';
            img.dataset.fallback = 'true';
            img.alt = 'Image not available';
        }
    }

    setupCMSErrorHandling() {
        // Override CMS integration error handling
        if (window.cmsIntegration) {
            const originalLoadData = window.cmsIntegration.loadData;
            
            window.cmsIntegration.loadData = async function() {
                try {
                    return await originalLoadData.call(this);
                } catch (error) {
                    console.error('CMS Load Error:', error);
                    this.showCMSErrorNotification();
                    return this.getDefaultData();
                }
            };
        }
    }

    showCMSErrorNotification() {
        const notification = document.createElement('div');
        notification.className = 'cms-error-notification';
        notification.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>CMS Error:</strong> Unable to load latest content. Showing cached version.
                <button type="button" class="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        `;
        
        document.body.insertBefore(notification, document.body.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        // Monitor CMS load times
        this.monitorCMSPerformance();
        
        // Monitor image load times
        this.monitorImagePerformance();
    }

    monitorCMSPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                const cmsLoadTime = timing.loadEventEnd - timing.navigationStart;
                
                console.log(`CMS Load Time: ${cmsLoadTime}ms`);
                
                // Log slow loads
                if (cmsLoadTime > 3000) {
                    console.warn('Slow CMS load detected:', cmsLoadTime);
                }
            });
        }
    }

    monitorImagePerformance() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        console.log(`All ${totalImages} images loaded`);
                    }
                });
            }
        });
    }

    // Utility methods
    refreshCache() {
        this.cache.clear();
        localStorage.removeItem('cms_data');
        this.setupCaching();
    }

    getCacheStats() {
        return {
            cacheSize: this.cache.size,
            lazyImagesCount: this.lazyImages.size,
            memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : 'N/A'
        };
    }

    // Cleanup
    destroy() {
        this.cache.clear();
        this.lazyImages.clear();
        
        // Remove event listeners
        window.removeEventListener('error', this.handleImageError);
    }
}

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .cms-error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
    }
    
    .img-box {
        position: relative;
        overflow: hidden;
    }
    
    .img-box img {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize optimization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cmsOptimization = new CMSOptimization();
    
    // Make refresh method available globally
    window.refreshCMSCache = () => {
        if (window.cmsOptimization) {
            window.cmsOptimization.refreshCache();
        }
    };
    
    // Make stats available globally
    window.getCMSStats = () => {
        if (window.cmsOptimization) {
            return window.cmsOptimization.getCacheStats();
        }
    };
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.cmsOptimization) {
        window.cmsOptimization.destroy();
    }
});
