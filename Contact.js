document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navbarNav = document.querySelector(".navbar-nav")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        navbarNav.classList.toggle("active")
      })
    }
  
    // Contact form handling
    const contactForm = document.getElementById("contactForm")
    const successMessage = document.getElementById("successMessage")
    const submitBtn = contactForm.querySelector(".submit-btn")
  
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      // Show loading state
      submitBtn.classList.add("loading")
      submitBtn.querySelector(".btn-text").textContent = "Sending..."
  
      // Simulate form submission (replace with actual form handling)
      try {
        await simulateFormSubmission()
  
        // Hide form and show success message
        contactForm.style.display = "none"
        successMessage.classList.add("show")
  
        // Reset form after delay
        setTimeout(() => {
          contactForm.style.display = "flex"
          successMessage.classList.remove("show")
          contactForm.reset()
          submitBtn.classList.remove("loading")
          submitBtn.querySelector(".btn-text").textContent = "Send Message"
        }, 5000)
      } catch (error) {
        // Handle error
        console.error("Form submission error:", error)
        submitBtn.classList.remove("loading")
        submitBtn.querySelector(".btn-text").textContent = "Send Message"
  
        // Show error message (you can customize this)
        alert("There was an error sending your message. Please try again.")
      }
    })
  
    // Simulate form submission delay
    function simulateFormSubmission() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
    }
  
    // Form validation
    const formInputs = contactForm.querySelectorAll("input, select, textarea")
  
    formInputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearValidation)
    })
  
    function validateField(e) {
      const field = e.target
      const value = field.value.trim()
  
      // Remove existing validation classes
      field.classList.remove("error", "success")
  
      // Validate based on field type
      let isValid = true
  
      if (field.hasAttribute("required") && !value) {
        isValid = false
      } else if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        isValid = emailRegex.test(value)
      }
  
      // Add validation class
      if (value) {
        field.classList.add(isValid ? "success" : "error")
      }
    }
  
    function clearValidation(e) {
      const field = e.target
      field.classList.remove("error", "success")
    }
  
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll(
      ".contact-method, .contact-card, .contact-form-container, .info-header",
    )
  
    animatedElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = `all 0.6s ease ${index * 0.1}s`
      observer.observe(element)
    })
  
    // Add animation styles
    const style = document.createElement("style")
    style.textContent = `
          .animate-in {
              opacity: 1 !important;
              transform: translateY(0) !important;
          }
          
          .form-input.error,
          .form-select.error,
          .form-textarea.error {
              border-color: #ef4444;
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
          }
          
          .form-input.success,
          .form-select.success,
          .form-textarea.success {
              border-color: #10b981;
              box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }
      `
    document.head.appendChild(style)
  
    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
    emailLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const email = link.href.replace("mailto:", "")
  
        // Copy to clipboard
        navigator.clipboard
          .writeText(email)
          .then(() => {
            // Show temporary feedback
            const originalText = link.textContent
            link.textContent = "Email copied!"
            link.style.color = "#10b981"
  
            setTimeout(() => {
              link.textContent = originalText
              link.style.color = ""
            }, 2000)
          })
          .catch(() => {
            // Fallback: open email client
            window.location.href = link.href
          })
      })
    })
  
    // Auto-resize textarea
    const textareas = document.querySelectorAll("textarea")
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", function () {
        this.style.height = "auto"
        this.style.height = this.scrollHeight + "px"
      })
    })
  
    // Keyboard navigation improvements
    document.addEventListener("keydown", (e) => {
      // Escape key to close mobile menu
      if (e.key === "Escape" && navbarNav.classList.contains("active")) {
        navbarNav.classList.remove("active")
      }
  
      // Enter key on contact cards
      if (e.key === "Enter" && e.target.classList.contains("contact-card")) {
        const link = e.target.querySelector(".card-link")
        if (link) link.click()
      }
    })
  
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
  
    focusableElements.forEach((element) => {
      element.addEventListener("focus", function () {
        this.style.outline = "2px solid #8b5cf6"
        this.style.outlineOffset = "2px"
      })
  
      element.addEventListener("blur", function () {
        this.style.outline = ""
        this.style.outlineOffset = ""
      })
    })
  
    // Form field character counter for textarea
    const messageField = document.getElementById("message")
    if (messageField) {
      const maxLength = 500
      const counter = document.createElement("div")
      counter.className = "character-counter"
      counter.style.cssText = `
              font-size: 0.75rem;
              color: #64748b;
              text-align: right;
              margin-top: 0.25rem;
          `
  
      messageField.parentNode.appendChild(counter)
  
      function updateCounter() {
        const remaining = maxLength - messageField.value.length
        counter.textContent = `${remaining} characters remaining`
        counter.style.color = remaining < 50 ? "#ef4444" : "#64748b"
      }
  
      messageField.addEventListener("input", updateCounter)
      messageField.setAttribute("maxlength", maxLength)
      updateCounter()
    }
  
    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]')
    externalLinks.forEach((link) => {
      link.addEventListener("click", function () {
        this.style.opacity = "0.7"
        this.style.pointerEvents = "none"
  
        setTimeout(() => {
          this.style.opacity = ""
          this.style.pointerEvents = ""
        }, 1000)
      })
    })
  })
  