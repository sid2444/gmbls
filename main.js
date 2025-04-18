// Initialize AOS Animation Library
AOS.init({
  duration: 800,
  easing: "ease",
  once: true,
  offset: 100,
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-menu a")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "flex"
  } else {
    scrollTopBtn.style.display = "none"
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Animated Counter
const counters = document.querySelectorAll(".counter")
const speed = 200

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.dataset.target
    let count = 0

    const updateCount = () => {
      const increment = target / speed

      if (count < target) {
        count += increment
        counter.innerText = Math.ceil(count)
        setTimeout(updateCount, 1)
      } else {
        counter.innerText = target
      }
    }

    updateCount()
  })
}

// Trigger counter animation when About section is in view
const aboutSection = document.getElementById("about")
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        aboutObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

aboutObserver.observe(aboutSection)

// Gallery Lightbox
const galleryItems = document.querySelectorAll(".gallery-img")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.getAttribute("src")
    const imgAlt = item.getAttribute("alt")

    // Create lightbox elements
    const lightbox = document.createElement("div")
    lightbox.classList.add("lightbox")

    const lightboxContent = document.createElement("div")
    lightboxContent.classList.add("lightbox-content")

    const closeBtn = document.createElement("span")
    closeBtn.classList.add("lightbox-close")
    closeBtn.innerHTML = "&times;"

    const img = document.createElement("img")
    img.setAttribute("src", imgSrc)
    img.setAttribute("alt", imgAlt)

    // Append elements
    lightboxContent.appendChild(closeBtn)
    lightboxContent.appendChild(img)
    lightbox.appendChild(lightboxContent)
    document.body.appendChild(lightbox)

    // Prevent body scrolling
    document.body.style.overflow = "hidden"

    // Close lightbox on click
    lightbox.addEventListener("click", () => {
      document.body.removeChild(lightbox)
      document.body.style.overflow = "auto"
    })

    // Close lightbox on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.querySelector(".lightbox")) {
        document.body.removeChild(lightbox)
        document.body.style.overflow = "auto"
      }
    })
  })
})

// Admin Login Modal
const adminModal = document.getElementById("adminModal")
const adminLoginBtn = document.getElementById("admin-login-btn")
const closeModal = document.querySelector(".close-modal")

adminLoginBtn.addEventListener("click", (e) => {
  e.preventDefault()
  adminModal.style.display = "block"
})

closeModal.addEventListener("click", () => {
  adminModal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === adminModal) {
    adminModal.style.display = "none"
  }
})

// Admin Login Form Submission
const adminLoginForm = document.getElementById("adminLoginForm")

adminLoginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  // Simple dummy authentication (for demonstration only)
  if (username === "admin" && password === "password") {
    alert("Login successful! Redirecting to admin dashboard...")
    // In a real application, you would redirect to an admin dashboard
  } else {
    alert("Invalid credentials. Please try again.")
  }
})

// Contact Form Validation and Submission
const bookingForm = document.getElementById("bookingForm")

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const phone = document.getElementById("phone").value
  const location = document.getElementById("location").value
  const service = document.getElementById("service").value
  const message = document.getElementById("message").value

  // Validate phone number (simple validation)
  const phoneRegex = /^\d{10}$/
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.")
    return
  }

  // In a real application, you would send this data to a server
  alert(`Thank you, ${name}! Your service request has been submitted. We will contact you shortly.`)
  bookingForm.reset()
})

// Add CSS for Lightbox
const lightboxStyle = document.createElement("style")
lightboxStyle.innerHTML = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1200;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border: 5px solid white;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
`
document.head.appendChild(lightboxStyle)
