class TestimonialIntegration {
    constructor() {
        this.data = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.updateTestimonialPage();
    }

    async loadData() {
        try {
            // Load testimonial data
            const testimonialResponse = await fetch('/content/testimonial.json');
            if (testimonialResponse.ok) {
                this.data = await testimonialResponse.json();
            } else {
                console.log('Testimonial data not found, using defaults');
                this.data = this.getDefaultData();
            }
        } catch (error) {
            console.log('Error loading testimonial data:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            page_title: "Testimonial",
            section_title: "Customer's Testimonial",
            inner_page_title: "Testimonial",
            testimonials: [
                {
                    name: "Anna Trevor",
                    role: "Customer",
                    image: "images/client.jpg",
                    content: "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat."
                },
                {
                    name: "John Smith",
                    role: "Regular Customer",
                    image: "images/client.jpg",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
                },
                {
                    name: "Sarah Johnson",
                    role: "VIP Customer",
                    image: "images/client.jpg",
                    content: "Excellent service and quality products! The team is very professional and always ready to help. I highly recommend this store to anyone looking for fashion items."
                }
            ]
        };
    }

    updateTestimonialPage() {
        // Update page titles
        this.updatePageTitles();
        
        // Update section titles
        this.updateSectionTitles();
        
        // Update testimonials
        this.updateTestimonials();
    }

    updatePageTitles() {
        const pageTitle = document.getElementById('page-title');
        const innerPageTitle = document.getElementById('inner-page-title');

        if (pageTitle) {
            pageTitle.textContent = `${this.data.page_title} - Famms`;
        }

        if (innerPageTitle) {
            innerPageTitle.textContent = this.data.inner_page_title;
        }
    }

    updateSectionTitles() {
        const sectionTitle = document.getElementById('section-title');

        if (sectionTitle) {
            sectionTitle.textContent = this.data.section_title;
        }
    }

    updateTestimonials() {
        const container = document.getElementById('testimonial-container');
        if (!container) return;

        // Clear existing testimonials
        container.innerHTML = '';

        // Add testimonials from data
        this.data.testimonials.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active' : '';
            const testimonialHTML = this.createTestimonialHTML(testimonial, index + 1, isActive);
            container.insertAdjacentHTML('beforeend', testimonialHTML);
        });
    }

    createTestimonialHTML(testimonial, index, isActive) {
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
                        <h5 id="testimonial-${index}-name">${testimonial.name}</h5>
                        <h6 id="testimonial-${index}-role">${testimonial.role}</h6>
                        <p id="testimonial-${index}-content">${testimonial.content}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Method to refresh data (useful for real-time updates)
    async refreshData() {
        await this.loadData();
        this.updateTestimonialPage();
    }
}

// Initialize testimonial integration
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('testimonial.html')) {
        window.testimonialIntegration = new TestimonialIntegration();
        
        // Make refresh function available globally
        window.refreshTestimonialPage = () => {
            window.testimonialIntegration.refreshData();
        };
    }
});
