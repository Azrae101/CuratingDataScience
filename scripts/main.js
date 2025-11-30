// Simple interactive features for the exhibition

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image gallery functionality
class ImageGallery {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.images = this.container.querySelectorAll('.gallery-image');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Add navigation buttons
        this.createNavigation();
        this.showImage(0);
    }
    
    createNavigation() {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.className = 'gallery-nav prev';
        prevBtn.addEventListener('click', () => this.prevImage());
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.className = 'gallery-nav next';
        nextBtn.addEventListener('click', () => this.nextImage());
        
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
    }
    
    showImage(index) {
        this.images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
        this.currentIndex = index;
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    }
    
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    }
}

// Initialize galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle for nav
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // Close menu when clicking a link (optional UX)
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Initialize any image galleries
    const galleryContainers = document.querySelectorAll('.image-gallery');
    galleryContainers.forEach(container => {
        new ImageGallery(container.id);
    });
    
    // Add loading animation for data visualizations
    const visualizations = document.querySelectorAll('.data-visualization');
    visualizations.forEach(viz => {
        viz.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
    });
});