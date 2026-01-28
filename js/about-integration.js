class AboutPageIntegration {
    constructor() {
        this.data = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.updateAboutPage();
    }

    async loadData() {
        try {
            // Load about data
            const aboutResponse = await fetch('/content/about.json');
            if (aboutResponse.ok) {
                this.data = await aboutResponse.json();
            } else {
                console.log('About data not found, using defaults');
                this.data = this.getDefaultData();
            }
        } catch (error) {
            console.log('Error loading about data:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            hero_title: "About Famms",
            hero_subtitle: "Your Trusted Fashion Partner Since 2020",
            hero_description: "We are dedicated to providing high-quality fashion products that combine style, comfort, and affordability for the modern consumer.",
            story_title: "Our Story",
            story_subtitle: "From a small idea to a fashion destination",
            story_content: "Founded in 2020, Famms began as a small boutique with a big vision: to make quality fashion accessible to everyone.",
            story_content_2: "Our journey has been driven by passion for fashion and commitment to customer satisfaction.",
            story_content_3: "Today, Famms stands as a testament to what can be achieved with dedication, hard work, and a genuine love for fashion.",
            mission_title: "Our Mission & Values",
            mission_subtitle: "What drives us every day",
            mission_1_title: "Quality First",
            mission_1_description: "We never compromise on quality. Every product is carefully selected and tested to ensure it meets our high standards.",
            mission_2_title: "Customer Focus",
            mission_2_description: "Our customers are at the center of everything we do. We listen, learn, and continuously improve based on your feedback.",
            mission_3_title: "Sustainability",
            mission_3_description: "We are committed to sustainable fashion practices that protect our planet and support ethical manufacturing.",
            team_title: "Meet Our Team",
            team_subtitle: "The passionate people behind Famms",
            team_1_name: "Sarah Johnson",
            team_1_role: "Founder & CEO",
            team_2_name: "Michael Chen",
            team_2_role: "Creative Director",
            team_3_name: "Emily Davis",
            team_3_role: "Marketing Manager",
            team_4_name: "James Wilson",
            team_4_role: "Operations Manager",
            stat_1_number: "50K+",
            stat_1_label: "Happy Customers",
            stat_2_number: "1000+",
            stat_2_label: "Products",
            stat_3_number: "50+",
            stat_3_label: "Brand Partners",
            stat_4_number: "4.9★",
            stat_4_label: "Average Rating",
            cta_title: "Ready to Experience the Famms Difference?",
            cta_description: "Join thousands of satisfied customers who have discovered their perfect style with us."
        };
    }

    updateAboutPage() {
        // Update hero section
        this.updateHeroSection();
        
        // Update story section
        this.updateStorySection();
        
        // Update gallery section
        this.updateGallerySection();
        
        // Update CTA section
        this.updateCTASection();
    }

    updateHeroSection() {
        const heroTitle = document.getElementById('about-hero-title');
        const heroSubtitle = document.getElementById('about-hero-subtitle');
        const heroDescription = document.getElementById('about-hero-description');

        if (heroTitle) heroTitle.textContent = this.data.hero_title;
        if (heroSubtitle) heroSubtitle.textContent = this.data.hero_subtitle;
        if (heroDescription) heroDescription.textContent = this.data.hero_description;
    }

    updateStorySection() {
        const storyTitle = document.getElementById('story-title');
        const storySubtitle = document.getElementById('story-subtitle');
        const storyContent = document.getElementById('story-content');
        const storyContent2 = document.getElementById('story-content-2');
        const storyContent3 = document.getElementById('story-content-3');

        if (storyTitle) storyTitle.textContent = this.data.story_title;
        if (storySubtitle) storySubtitle.textContent = this.data.story_subtitle;
        if (storyContent) storyContent.textContent = this.data.story_content;
        if (storyContent2) storyContent2.textContent = this.data.story_content_2;
        if (storyContent3) storyContent3.textContent = this.data.story_content_3;
    }

    updateGallerySection() {
        const galleryTitle = document.getElementById('gallery-title');
        const gallerySubtitle = document.getElementById('gallery-subtitle');
        const galleryContainer = document.getElementById('gallery-container');

        if (galleryTitle) galleryTitle.textContent = this.data.gallery_title;
        if (gallerySubtitle) gallerySubtitle.textContent = this.data.gallery_subtitle;

        if (galleryContainer && this.data.gallery_images) {
            galleryContainer.innerHTML = '';
            
            // Group images into sets of 4 for each carousel item
            const imagesPerSlide = 4;
            const totalSlides = Math.ceil(this.data.gallery_images.length / imagesPerSlide);
            
            for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
                const isActive = slideIndex === 0 ? 'active' : '';
                const startIndex = slideIndex * imagesPerSlide;
                const endIndex = Math.min(startIndex + imagesPerSlide, this.data.gallery_images.length);
                
                let galleryHTML = `<div class="carousel-item ${isActive}"><div class="gallery-row">`;
                
                for (let i = startIndex; i < endIndex; i++) {
                    galleryHTML += `
                        <img src="${this.data.gallery_images[i]}" class="gallery-item" alt="Gallery Image ${i + 1}">
                    `;
                }
                
                galleryHTML += '</div></div>';
                galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);
            }
        }
    }

    updateCTASection() {
        const ctaTitle = document.getElementById('cta-title');
        const ctaDescription = document.getElementById('cta-description');

        if (ctaTitle) ctaTitle.textContent = this.data.cta_title;
        if (ctaDescription) ctaDescription.textContent = this.data.cta_description;
    }

    // Method to refresh data (useful for real-time updates)
    async refreshData() {
        await this.loadData();
        this.updateAboutPage();
    }
}

// Initialize about page integration
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('about.html')) {
        window.aboutIntegration = new AboutPageIntegration();
        
        // Make refresh function available globally
        window.refreshAboutPage = () => {
            window.aboutIntegration.refreshData();
        };
    }
});
