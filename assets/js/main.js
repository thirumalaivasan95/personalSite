// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  // Preloader Animation
  const loader = document.querySelector('.loader');
  const counter = document.querySelector('.counter');
  const progressBar = document.querySelector('.loading-bar-inner');

  let count = 0;
  const loaderDuration = 3000; // 3 seconds
  const interval = loaderDuration / 100;

  const loaderTimer = setInterval(() => {
    count++;
    counter.textContent = count;
    progressBar.style.width = `${count}%`;
    
    if (count >= 100) {
      clearInterval(loaderTimer);
      gsap.to(loader, {
        duration: 0.8,
        opacity: 0,
        pointerEvents: 'none',
        onComplete: () => {
          loader.style.display = 'none';
          // Start page animations
          initPageAnimations();
        }
      });
    }
  }, interval);

  // Initialize all page animations
  function initPageAnimations() {
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize particles background
    initParticles();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize section animations
    initSectionAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize timeline animation
    initTimeline();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize project modals
    initProjectModals();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize mobile navigation
    initMobileNav();
  }

  // Custom Cursor Implementation
  function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorText = document.querySelector('.cursor-text');

    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    });

    // Add cursor effect to interactive elements
    const cursorElements = document.querySelectorAll('[data-cursor-text]');
    cursorElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
        cursorText.textContent = element.getAttribute('data-cursor-text');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        cursorText.textContent = '';
      });
    });

    // Hide cursor on mobile devices
    if (isMobile()) {
      cursor.style.display = 'none';
    }
  }

  // Initialize particles background
  function initParticles() {
    particlesJS.load('particles-container', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#18d26e"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#18d26e",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Initialize Locomotive Scroll
  function initSmoothScroll() {
    // Initialize smooth scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    // Update scroll position for new content
    scroll.on('scroll', (instance) => {
      // Update animations based on scroll
      updateAnimationsOnScroll(instance);
    });

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#header') {
          scroll.scrollTo(0);
        } else {
          const target = document.querySelector(targetId);
          if (target) {
            scroll.scrollTo(target);
          }
        }
        
        // Close mobile nav if open
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          document.querySelector('.nav-overlay').classList.remove('active');
        }
      });
    });

    // Add the scroll instance to window for global access
    window.locomotiveScroll = scroll;
  }

  // Update animations when scrolling
  function updateAnimationsOnScroll(instance) {
    const scrollTop = instance.scroll.y;
    
    // Add active class to sections in viewport
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop - 300 && scrollTop < sectionTop + sectionHeight - 300) {
        section.classList.add('active');
      }
    });
  }

  // Initialize typing effect for the role text
  function initTypingEffect() {
    const typed = new Typed('#role-text', {
      strings: [
        'C++ Consultant',
        'Software Developer',
        'ML Enthusiast',
        'Problem Solver',
        'Data Scientist'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 1000,
      loop: true
    });
  }

  // Initialize section animations with GSAP
  function initSectionAnimations() {
    // GSAP animations for sections
    gsap.registerPlugin(ScrollTrigger);
    
    // Header content animation
    gsap.from('.header-content h1', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    });
    
    gsap.from('.header-content h2', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8
    });
    
    gsap.from('.nav-menu', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.1
    });
    
    gsap.from('.social-links', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.4
    });

    // Animate sections on scroll
    document.querySelectorAll('section').forEach(section => {
      gsap.from(section.querySelector('.section-header'), {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Initialize Splitting for text animations
    Splitting();
  }

  // Initialize counters with CounterUp
  function initCounters() {
    const countElements = document.querySelectorAll('.count');
    
    countElements.forEach(element => {
      const target = parseInt(element.getAttribute('data-count'));
      
      let count = {value: 0};
      
      gsap.to(count, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: element.closest('.count-box'),
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          element.textContent = Math.round(count.value);
        }
      });
    });
  }

  // Initialize skill progress bars
  function initSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    skillProgressBars.forEach(skill => {
      const percentage = skill.querySelector('.skill-name').getAttribute('data-percentage');
      const progressBar = skill.querySelector('.skill-progress-value');
      
      gsap.to(progressBar, {
        width: `${percentage}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skill,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // Timeline animation for experience section
  function initTimeline() {
    // Animate timeline progress bar
    gsap.to('.timeline-progress-bar', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.experience-timeline',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }
    });
    
    // Handle expand/collapse of timeline items
    const expandButtons = document.querySelectorAll('.experience-expand');
    expandButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-expand');
        const targetContent = document.getElementById(targetId);
        
        button.classList.toggle('active');
        
        if (!button.classList.contains('active')) {
          gsap.to(targetContent, {
            maxHeight: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              // Update locomotive scroll
              if (window.locomotiveScroll) {
                window.locomotiveScroll.update();
              }
            }
          });
        } else {
          gsap.to(targetContent, {
            maxHeight: targetContent.scrollHeight,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              // Update locomotive scroll
              if (window.locomotiveScroll) {
                window.locomotiveScroll.update();
              }
            }
          });
        }
      });
    });
  }

  // Project filtering functionality
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          // Get project category
          const category = item.getAttribute('data-category');
          
          // Show/hide based on filter
          if (filterValue === 'all' || category === filterValue) {
            // Show the item
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              onStart: () => {
                item.classList.remove('hidden');
              }
            });
          } else {
            // Hide the item
            gsap.to(item, {
              opacity: 0,
              scale: 0.9,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                item.classList.add('hidden');
              }
            });
          }
        });
        
        // Update locomotive scroll
        setTimeout(() => {
          if (window.locomotiveScroll) {
            window.locomotiveScroll.update();
          }
        }, 500);
      });
    });
  }

  // Project modals
  function initProjectModals() {
    const detailButtons = document.querySelectorAll('.project-details-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectModals = document.querySelectorAll('.project-modal');
    
    // Open modal
    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const projectId = button.getAttribute('data-project');
        const targetModal = document.getElementById(`${projectId}-modal`);
        
        if (targetModal) {
          // Show overlay
          modalOverlay.classList.add('active');
          
          // Show modal
          targetModal.classList.add('active');
          
          // Disable scroll
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    // Close modal function
    function closeModal() {
      modalOverlay.classList.remove('active');
      
      projectModals.forEach(modal => {
        modal.classList.remove('active');
      });
      
      // Enable scroll
      document.body.style.overflow = '';
    }
    
    // Close on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on close button click
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Contact form animation and validation
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Floating label effect
    inputs.forEach(input => {
      // Check if input has value on load
      if (input.value) {
        input.classList.add('has-value');
      }
      
      // Input focus events
      input.addEventListener('focus', () => {
        input.classList.add('focused');
      });
      
      // Input blur events
      input.addEventListener('blur', () => {
        input.classList.remove('focused');
        
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading
      showFormMessage('Sending your message...', 'loading');
      
      try {
        // Simulate form submission (replace with actual AJAX call)
        await simulateFormSubmission();
        
        // Clear form
        form.reset();
        
        // Show success message
        showFormMessage('Your message has been sent successfully!', 'success');
      } catch (error) {
        // Show error message
        showFormMessage('Failed to send message. Please try again later.', 'error');
      }
    });
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
      const loadingElement = form.querySelector('.loading');
      const errorElement = form.querySelector('.error-message');
      const successElement = form.querySelector('.success-message');
      
      // Hide all messages
      loadingElement.style.display = 'none';
      errorElement.style.display = 'none';
      successElement.style.display = 'none';
      
      // Show appropriate message
      if (type === 'loading') {
        loadingElement.textContent = message;
        loadingElement.style.display = 'block';
      } else if (type === 'error') {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      } else if (type === 'success') {
        successElement.textContent = message;
        successElement.style.display = 'block';
      }
      
      // Auto-hide success and error messages
      if (type === 'success' || type === 'error') {
        setTimeout(() => {
          if (type === 'success') {
            successElement.style.display = 'none';
          } else {
            errorElement.style.display = 'none';
          }
        }, 5000);
      }
    }
    
    // Simulate form submission for demo purposes
    function simulateFormSubmission() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly succeed or fail for demo
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error('Simulated form submission failure'));
          }
        }, 2000);
      });
    }
  }

  // Mobile navigation toggle
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.classList.toggle('mobile-nav-active');
      
      // Animate the toggle button
      const bars = navToggle.querySelectorAll('.nav-toggle-bar');
      
      if (navToggle.classList.contains('active')) {
        // Animate to X
        gsap.to(bars[0], {
          rotation: 45,
          y: 8,
          duration: 0.3
        });
        
        gsap.to(bars[1], {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(bars[2], {
          rotation: -45,
          y: -8,
          duration: 0.3
        });
      } else {
        // Animate back to hamburger
        gsap.to(bars[0], {
          rotation: 0,
          y: 0,
          duration: 0.3
        });
        
        gsap.to(bars[1], {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(bars[2], {
          rotation: 0,
          y: 0,
          duration: 0.3
        });
      }
      
      // Animate nav links
      const navLinks = navOverlay.querySelectorAll('a');
      
      if (navOverlay.classList.contains('active')) {
        gsap.fromTo(navLinks, 
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2
          }
        );
      }
    });
    
    // Close nav when clicking on a link
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('mobile-nav-active');
        
        // Animate back to hamburger
        const bars = navToggle.querySelectorAll('.nav-toggle-bar');
        
        gsap.to(bars[0], {
          rotation: 0,
          y: 0,
          duration: 0.3
        });
        
        gsap.to(bars[1], {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(bars[2], {
          rotation: 0,
          y: 0,
          duration: 0.3
        });
      });
    });
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle body class
    document.body.classList.toggle('light-mode');
    
    // Toggle icon
    const icon = themeToggle.querySelector('i');
    
    if (icon.classList.contains('fa-moon')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    
    // Store preference
    const currentMode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentMode);
  });
  
  // Apply saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  // Helper function to detect mobile devices
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
});

// Particles configuration
let particlesConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#18d26e"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#18d26e",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};