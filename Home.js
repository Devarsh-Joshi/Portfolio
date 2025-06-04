// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarNav.style.display = navbarNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Search tag removal
    const tagRemoveButtons = document.querySelectorAll('.tag-remove');
    tagRemoveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.remove();
        });
    });

    // Search input functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    addSearchTag(searchTerm);
                    this.value = '';
                }
            }
        });
    }

    // Add search tag function
    function addSearchTag(term) {
        const searchTags = document.querySelector('.search-tags');
        const newTag = document.createElement('div');
        newTag.className = 'search-tag';
        newTag.innerHTML = `
            <span>${term}</span>
            <button class="tag-remove">×</button>
        `;
        
        // Add event listener to new remove button
        newTag.querySelector('.tag-remove').addEventListener('click', function(e) {
            e.preventDefault();
            newTag.remove();
        });
        
        searchTags.appendChild(newTag);
    }

    // Carousel functionality
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add carousel logic here
            console.log('Carousel button clicked');
        });
    });

    // Popular tag clicks
    const popularTags = document.querySelectorAll('.popular-tag');
    popularTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            addSearchTag(tagText);
        });
    });

    // Card hover animations
    const cards = document.querySelectorAll('.detail-card, .small-card, .featured-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.detail-card, .small-card, .featured-card, .stats-card, .trending-card, .search-card, .activity-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Add pulse animation to trending arrows
    const trendingArrows = document.querySelectorAll('.trending-arrow');
    trendingArrows.forEach(arrow => {
        arrow.classList.add('pulse');
    });

    // Filter and sort functionality
    const filterBtn = document.querySelector('.control-btn:first-child');
    const sortBtn = document.querySelector('.control-btn:last-child');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Add filter logic here
            console.log('Filter clicked');
            this.style.background = this.style.background === 'rgb(139, 92, 246)' ? '' : '#8b5cf6';
            this.style.color = this.style.color === 'white' ? '' : 'white';
        });
    }
    
    if (sortBtn) {
        sortBtn.addEventListener('click', function() {
            // Add sort logic here
            console.log('Sort clicked');
            this.style.background = this.style.background === 'rgb(139, 92, 246)' ? '' : '#8b5cf6';
            this.style.color = this.style.color === 'white' ? '' : 'white';
        });
    }

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn-primary, .control-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
});

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Update stats with animation
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = formatNumber(Math.floor(currentValue));
        }, 20);
    });
}

// Initialize stats animation on page load
window.addEventListener('load', function() {
    setTimeout(updateStats, 500);
});