/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle','nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }                                                    
    });
}
window.addEventListener('scroll', scrollActive);

/*===== HEADER SCROLL EFFECT =====*/
const header = document.querySelector('.l-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/*===== SCROLL REVEAL ANIMATION =====*/
// Custom implementation to replace ScrollReveal library
document.addEventListener('DOMContentLoaded', () => {
    // Set animation index for staggered animations
    const navItems = document.querySelectorAll('.nav__item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index + 1);
    });
    
    const footerIcons = document.querySelectorAll('.footer__icon');
    footerIcons.forEach((icon, index) => {
        icon.style.setProperty('--icon-index', index + 1);
    });
    
    // Initialize animation for elements that should animate on page load
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    // Intersection Observer for scroll animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer for different animation types
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    const slideUpObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    const zoomInObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    const slideLeftObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    const slideRightObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Staggered animation for service items
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all child elements to stagger
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, 100 * index);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Section titles
    document.querySelectorAll('.section-title').forEach(title => {
        fadeInObserver.observe(title);
    });
    
    // Service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.classList.add('slide-up');
        slideUpObserver.observe(item);
    });
    
    // Steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('zoom-in');
        zoomInObserver.observe(step);
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.classList.add('fade-in');
        fadeInObserver.observe(contactForm);
    }
    
    // Contact inputs with staggered animation
    const contactInputs = document.querySelectorAll('.contact__input');
    contactInputs.forEach((input, index) => {
        input.classList.add('stagger-item');
        input.style.transitionDelay = `${index * 0.1}s`;
    });
    
    if (contactInputs.length > 0) {
        const contactContainer = document.querySelector('.contact__container');
        if (contactContainer) {
            staggerObserver.observe(contactContainer);
        }
    }
    
    // Services grid with staggered animation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add('stagger-item');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    if (serviceItems.length > 0) {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            staggerObserver.observe(servicesGrid);
        }
    }
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.button, .read-more-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle touch events for mobile
    const touchElements = document.querySelectorAll('.service-item, .step, .button, .read-more-btn, .contact-btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, {passive: true});
    });
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Add specific mobile optimizations
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Optimize animations for mobile
        document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .zoom-in')
            .forEach(element => {
                element.style.transitionDuration = '0.3s';
            });
    }
});
