// Super Simple Gallery - Yang Pasti Jalan!
class SimpleGallery {
    constructor() {
        this.images = [];
        this.init();
    }

    init() {
        this.loadDefaultImages();
        this.displayImages();
    }

    loadDefaultImages() {
        // Load dari localStorage atau default
        const saved = localStorage.getItem('simple_gallery_images');
        if (saved) {
            try {
                this.images = JSON.parse(saved);
            } catch (e) {
                this.images = this.getDefaultImages();
            }
        } else {
            this.images = this.getDefaultImages();
        }
    }

    getDefaultImages() {
        return [
            { id: 1, name: 'gallery-1.jpg', path: 'images/gallery-1.jpg', category: 'gallery' },
            { id: 2, name: 'gallery-2.jpg', path: 'images/gallery-2.jpg', category: 'gallery' },
            { id: 3, name: 'gallery-3.jpg', path: 'images/gallery-3.jpg', category: 'gallery' },
            { id: 4, name: 'gallery-4.jpg', path: 'images/gallery-4.jpg', category: 'gallery' },
            { id: 5, name: 'gallery-5.jpg', path: 'images/gallery-5.jpg', category: 'gallery' },
            { id: 6, name: 'gallery-6.jpg', path: 'images/gallery-6.jpg', category: 'gallery' }
        ];
    }

    displayImages() {
        const container = document.getElementById('imageGallery');
        if (!container) return;

        container.innerHTML = '';

        if (this.images.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 20px;">No images found</div>';
            return;
        }

        this.images.forEach(image => {
            const card = document.createElement('div');
            card.style.cssText = `
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin: 10px;
                width: 280px;
                display: inline-block;
                vertical-align: top;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            `;
            
            card.innerHTML = `
                <div style="margin-bottom: 10px;">
                    <img src="${image.path}" alt="${image.name}" 
                         style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px;"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjE0MCIgeT0iOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='">
                </div>
                <div style="margin-bottom: 10px;">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">${image.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 12px;">${image.path}</p>
                </div>
                <div style="margin-top: 10px;">
                    <button onclick="editGalleryImage(${image.id})" 
                            style="padding: 5px 10px; margin: 2px; border: none; border-radius: 4px; cursor: pointer; background: #3498db; color: white; font-size: 12px;">
                        ✏️ Edit
                    </button>
                    <button onclick="deleteGalleryImage(${image.id})" 
                            style="padding: 5px 10px; margin: 2px; border: none; border-radius: 4px; cursor: pointer; background: #e74c3c; color: white; font-size: 12px;">
                        🗑️ Delete
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    addImage(imageData) {
        const newId = Math.max(...this.images.map(img => img.id), 0) + 1;
        const newImage = {
            id: newId,
            ...imageData
        };
        this.images.push(newImage);
        this.saveToStorage();
        this.displayImages();
        return newImage;
    }

    updateImage(id, imageData) {
        const index = this.images.findIndex(img => img.id === id);
        if (index !== -1) {
            this.images[index] = { ...this.images[index], ...imageData };
            this.saveToStorage();
            this.displayImages();
            return true;
        }
        return false;
    }

    deleteImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.saveToStorage();
        this.displayImages();
    }

    saveToStorage() {
        try {
            localStorage.setItem('simple_gallery_images', JSON.stringify(this.images));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    getImage(id) {
        return this.images.find(img => img.id === id);
    }

    getAllImages() {
        return this.images;
    }
}

// Global functions
window.editGalleryImage = function(id) {
    const gallery = window.simpleGallery;
    if (!gallery) return;
    
    const image = gallery.getImage(id);
    if (!image) return;
    
    // Populate form
    document.getElementById('galleryImageId').value = image.id;
    document.getElementById('galleryImageName').value = image.name;
    document.getElementById('galleryImagePath').value = image.path;
    document.getElementById('galleryImagePathDisplay').textContent = image.path;
    document.getElementById('galleryImageCategory').value = image.category;
    document.getElementById('galleryModalTitle').textContent = 'Edit Gallery Image';
    
    // Show modal
    document.getElementById('galleryModal').style.display = 'block';
};

window.deleteGalleryImage = function(id) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    const gallery = window.simpleGallery;
    if (!gallery) return;
    
    gallery.deleteImage(id);
    showMessage('Image deleted successfully!');
};

// Initialize immediately
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Simple Gallery...');
    window.simpleGallery = new SimpleGallery();
    console.log('Simple Gallery initialized with', window.simpleGallery.getAllImages().length, 'images');
    
    // Update message
    const messageDiv = document.getElementById('gallery-message');
    if (messageDiv) {
        messageDiv.innerHTML = `<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; border: 1px solid #c3e6cb;">
            Gallery loaded successfully (${window.simpleGallery.getAllImages().length} images)
        </div>`;
    }
});
