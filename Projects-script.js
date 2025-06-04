document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navbarNav = document.querySelector(".navbar-nav")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        navbarNav.classList.toggle("active")
      })
    }
  
    // Project card flip functionality
    const flipButtons = document.querySelectorAll(".flip-card-btn, .flip-btn")
  
    flipButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".project-card")
        const cardInner = card.querySelector(".card-inner")
  
        // Add flipping animation class
        cardInner.classList.add("flipping")
  
        // Toggle flipped class after a small delay
        setTimeout(() => {
          card.classList.toggle("flipped")
          cardInner.classList.remove("flipping")
        }, 300)
      })
    })
  
    // Filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
    const searchInput = document.querySelector(".search-input")
  
    // Filter by category
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
        filterProjects(filterValue, searchInput.value)
      })
    })
  
    // Search functionality
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter")
        filterProjects(activeFilter, this.value)
      })
    }
  
    function filterProjects(category, searchTerm = "") {
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category")
        const title = card.querySelector(".project-title").textContent.toLowerCase()
        const description = card.querySelector(".project-description").textContent.toLowerCase()
        const techTags = Array.from(card.querySelectorAll(".tech-tag")).map((tag) => tag.textContent.toLowerCase())
  
        const categoryMatch = category === "all" || cardCategory === category
        const searchMatch =
          !searchTerm ||
          title.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()) ||
          techTags.some((tag) => tag.includes(searchTerm.toLowerCase()))
  
        if (categoryMatch && searchMatch) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 10)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    }
  
    // Project card hover effects
    projectCards.forEach((card) => {
      const image = card.querySelector(".project-image img")
  
      card.addEventListener("mouseenter", () => {
        if (image) {
          image.style.transform = "scale(1.05)"
        }
      })
  
      card.addEventListener("mouseleave", () => {
        if (image) {
          image.style.transform = "scale(1)"
        }
      })
    })
  
    // Load more functionality
    const loadMoreBtn = document.querySelector(".load-more-btn")
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        const btnText = this.querySelector(".btn-text")
        const btnIcon = this.querySelector(".btn-icon")
  
        // Show loading state
        btnText.textContent = "Loading..."
        btnIcon.innerHTML = `
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                      <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="16"></circle>
                  </svg>
              `
  
        // Simulate loading delay
        setTimeout(() => {
          // Reset button
          btnText.textContent = "Load More Projects"
          btnIcon.innerHTML = `
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                  `
  
          // Here you would typically load more projects from an API
          // For now, just show a message
          const message = document.createElement("div")
          message.className = "text-center mt-4 text-sm text-indigo-600"
          message.textContent = "All projects loaded!"
  
          loadMoreBtn.parentNode.appendChild(message)
          loadMoreBtn.style.display = "none"
        }, 1500)
      })
    }
  
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Observe elements for scroll animation
    document.querySelectorAll(".project-card, .hero-content, .filter-container").forEach((el) => {
      observer.observe(el)
    })
  
    // Add CSS animation class
    const style = document.createElement("style")
    style.textContent = `
          @keyframes spin {
              to { transform: rotate(360deg); }
          }
          .animate-spin {
              animation: spin 1s linear infinite;
          }
          .visible {
              opacity: 1;
              transform: translateY(0);
          }
      `
    document.head.appendChild(style)
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Escape key to close any flipped cards
      if (e.key === "Escape") {
        const flippedCards = document.querySelectorAll(".project-card.flipped")
        flippedCards.forEach((card) => {
          card.classList.remove("flipped")
        })
      }
  
      // Focus on search with '/' key
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault()
        searchInput.focus()
      }
    })
  
    // Prevent form submission on enter in search
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
      }
    })
  
    // Add aria labels for accessibility
    document.querySelectorAll(".flip-card-btn, .flip-btn").forEach((btn) => {
      btn.setAttribute("aria-label", "Flip card to see details")
    })
  
    document.querySelectorAll(".action-btn").forEach((btn) => {
      const text = btn.textContent.trim()
      btn.setAttribute("aria-label", text)
    })
  })
  