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

  // Add a safety timeout to ensure the loader doesn't get stuck
  const safetyTimeout = setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
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
  }, loaderDuration + 2000); // Wait 5 seconds total before forcing completion

  const loaderTimer = setInterval(() => {
    count++;
    if (counter) counter.textContent = count;
    if (progressBar) progressBar.style.width = `${count}%`;
    
    if (count >= 100) {
      clearInterval(loaderTimer);
      clearTimeout(safetyTimeout); // Clear the safety timeout since we completed normally
      if (loader) {
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
    }
  }, interval);

  // Add a window load event to ensure resources are fully loaded
  window.addEventListener('load', function() {
    // If the counter hasn't reached 100 yet, speed it up
    if (count < 100) {
      // Speed up to complete in 1 second
      clearInterval(loaderTimer);
      const remainingCount = 100 - count;
      const fastInterval = 1000 / remainingCount;
      
      const fastTimer = setInterval(() => {
        count++;
        if (counter) counter.textContent = count;
        if (progressBar) progressBar.style.width = `${count}%`;
        
        if (count >= 100) {
          clearInterval(fastTimer);
          clearTimeout(safetyTimeout);
          if (loader) {
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
        }
      }, fastInterval);
    }
  });

  // Initialize all page animations
  function initPageAnimations() {
    try {
      // Register GSAP plugins if available
      if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
      
      // Initialize custom cursor
      initCustomCursor();
      
      // Initialize particles background
      initParticles();
      
      // Initialize typing effect
      initTypingEffect();
      
      // Initialize section animations
      initSectionAnimations();
      
      // Initialize counters - improved version
      initCounters();
      
      // Initialize skill progress bars - improved version
      initSkillBars();
      
      // Initialize timeline animation - improved version
      initTimeline();
      
      // Initialize project filtering
      initProjectFiltering();
      
      // Initialize project modals
      initProjectModals();
      
      // Initialize contact form
      initContactForm();
      
      // Initialize mobile navigation
      initMobileNav();
      
      // Initialize scrolling and navigation effects
      initNavigation();
      
      // Initialize sticky header
      initStickyHeader();
      
      // Check for visible elements immediately
      checkVisibleElements();
      
      // And check again after a short delay
      setTimeout(checkVisibleElements, 500);
      setTimeout(checkVisibleElements, 1000);
    } catch (error) {
      console.error("Error initializing animations:", error);
    }
  }

  // Custom Cursor Implementation
  function initCustomCursor() {
    try {
      const cursor = document.querySelector('.cursor');
      if (!cursor) return;
      
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');
      const cursorText = document.querySelector('.cursor-text');

      document.addEventListener('mousemove', (e) => {
        if (cursor) {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
          });
        }
      });

      // Add cursor effect to interactive elements
      const cursorElements = document.querySelectorAll('[data-cursor-text]');
      cursorElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          if (cursor && cursorText) {
            cursor.classList.add('cursor-active');
            cursorText.textContent = element.getAttribute('data-cursor-text');
          }
        });
        
        element.addEventListener('mouseleave', () => {
          if (cursor && cursorText) {
            cursor.classList.remove('cursor-active');
            cursorText.textContent = '';
          }
        });
      });

      // Hide cursor on mobile devices
      if (isMobile()) {
        cursor.style.display = 'none';
      }
    } catch (error) {
      console.error("Custom cursor error:", error);
    }
  }

  // Initialize particles background
  function initParticles() {
    try {
      if (typeof particlesJS === 'undefined') {
        console.warn('particles.js is not loaded');
        return;
      }
      
      particlesJS('particles-container', {
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
    } catch (error) {
      console.error("Particles initialization error:", error);
    }
  }

  // Initialize typing effect for the role text
  function initTypingEffect() {
    try {
      const roleText = document.getElementById('role-text');
      if (!roleText || typeof Typed === 'undefined') return;
      
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
    } catch (error) {
      console.error("Typing effect error:", error);
    }
  }

  // Initialize section animations with GSAP
  function initSectionAnimations() {
    try {
      // Check if GSAP is loaded
      if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded');
        return;
      }
      
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
        const header = section.querySelector('.section-header');
        if (header) {
          gsap.from(header, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });
        }
      });

      // Initialize Splitting for text animations if available
      if (typeof Splitting !== 'undefined') {
        Splitting();
      }
    } catch (error) {
      console.error("Section animations error:", error);
    }
  }

  // IMPROVED: Initialize counters with direct DOM manipulation
  function initCounters() {
    try {
      const countElements = document.querySelectorAll('.count');
      if (!countElements.length) return;
      
      // Set all counters to zero initially for visual consistency
      countElements.forEach(counter => {
        counter.textContent = '0';
        
        // Store the target value for future reference
        if (!counter.dataset.targetValue) {
          counter.dataset.targetValue = counter.getAttribute('data-count');
        }
      });
      
      // Function to animate a specific counter
      function animateCounter(counter) {
        // Skip if already animating
        if (counter.dataset.animating === 'true') return;
        
        const target = parseInt(counter.dataset.targetValue || counter.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        // Mark as animating
        counter.dataset.animating = 'true';
        
        // Start from zero
        let current = 0;
        
        // Calculate timing for smooth animation
        const duration = 3500; // 1.5 seconds
        const steps = 30; // number of steps to take
        const stepValue = Math.ceil(target / steps);
        const stepDuration = duration / steps;
        
        // Start counter animation
        const interval = setInterval(() => {
          current += stepValue;
          
          // Check if we've reached or exceeded the target
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          
          // Update counter display
          counter.textContent = current;
        }, stepDuration);
      }
      
      // Use Intersection Observer for efficient detection of visible counters
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const counter = entry.target;
              animateCounter(counter);
              observer.unobserve(counter); // No need to observe once triggered
            }
          });
        }, { threshold: 0.1 }); // Trigger when 10% visible
        
        // Observe all counters
        countElements.forEach(counter => {
          observer.observe(counter);
        });
      }
      
      // Fallback to scroll-based detection
      window.addEventListener('scroll', function() {
        countElements.forEach(counter => {
          // Skip if already animating
          if (counter.dataset.animating === 'true') return;
          
          // Check if counter is in viewport
          const rect = counter.getBoundingClientRect();
          const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isInViewport) {
            animateCounter(counter);
          }
        });
      });
      
      // Check for visible counters immediately
      setTimeout(() => {
        countElements.forEach(counter => {
          const rect = counter.getBoundingClientRect();
          const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isInViewport) {
            animateCounter(counter);
          }
        });
      }, 100);
    } catch (error) {
      console.error("Counters initialization error:", error);
      
      // Fallback: Just set the values directly if animation fails
      document.querySelectorAll('.count').forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        if (!isNaN(target)) {
          element.textContent = target;
        }
      });
    }
  }

  // IMPROVED: Initialize skill progress bars with direct DOM manipulation
  function initSkillBars() {
    try {
      const skillProgressBars = document.querySelectorAll('.skill-progress');
      if (!skillProgressBars.length) return;
      
      // Reset all skill bars to zero width initially
      skillProgressBars.forEach(skillBar => {
        const progressValue = skillBar.querySelector('.skill-progress-value');
        if (progressValue) {
          progressValue.style.width = '0%';
          
          // Add smooth transition for animation
          progressValue.style.transition = 'width 1.5s ease-out';
        }
      });
      
      // Function to animate a specific skill bar
      function animateSkillBar(skillBar) {
        // Skip if already animating
        if (skillBar.dataset.animating === 'true') return;
        
        const skillName = skillBar.querySelector('.skill-name');
        const progressValue = skillBar.querySelector('.skill-progress-value');
        
        if (!skillName || !progressValue) return;
        
        const percentage = skillName.getAttribute('data-percentage');
        if (!percentage) return;
        
        // Mark as animating
        skillBar.dataset.animating = 'true';
        
        // Use CSS transition for smooth animation
        progressValue.style.width = percentage + '%';
      }
      
      // Use Intersection Observer for efficient detection of visible skill bars
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const skillBar = entry.target;
              animateSkillBar(skillBar);
              observer.unobserve(skillBar); // No need to observe once triggered
            }
          });
        }, { threshold: 0.1 }); // Trigger when 10% visible
        
        // Observe all skill bars
        skillProgressBars.forEach(skillBar => {
          observer.observe(skillBar);
        });
      }
      
      // Fallback to scroll-based detection
      window.addEventListener('scroll', function() {
        skillProgressBars.forEach(skillBar => {
          // Skip if already animating
          if (skillBar.dataset.animating === 'true') return;
          
          // Check if skill bar is in viewport
          const rect = skillBar.getBoundingClientRect();
          const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isInViewport) {
            animateSkillBar(skillBar);
          }
        });
      });
      
      // Check for visible skill bars immediately
      setTimeout(() => {
        skillProgressBars.forEach(skillBar => {
          const rect = skillBar.getBoundingClientRect();
          const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isInViewport) {
            animateSkillBar(skillBar);
          }
        });
      }, 100);
    } catch (error) {
      console.error("Skill bars initialization error:", error);
      
      // Fallback: Just set the values directly if animation fails
      document.querySelectorAll('.skill-progress').forEach(skillBar => {
        const skillName = skillBar.querySelector('.skill-name');
        const progressValue = skillBar.querySelector('.skill-progress-value');
        
        if (skillName && progressValue) {
          const percentage = skillName.getAttribute('data-percentage');
          progressValue.style.width = percentage + '%';
        }
      });
    }
  }

  // FIXED: Timeline animation for experience section
  function initTimeline() {
    try {
      const timelines = document.querySelectorAll('.experience-timeline');
      timelines.forEach(timeline => {
        const progressBar = timeline.querySelector('.timeline-progress-bar');
        if (!progressBar) return;

        function updateTimelineProgress() {
          const rect = timeline.getBoundingClientRect();
          const viewHeight = window.innerHeight;
          let percentage = 0;

          if (rect.top < viewHeight && rect.bottom > 0) {
            const visibleHeight = Math.min(viewHeight - rect.top, rect.height);
            percentage = (visibleHeight / rect.height) * 100;
          }
          progressBar.style.height = `${Math.max(0, Math.min(100, percentage))}%`;
        }

        window.addEventListener('scroll', updateTimelineProgress);
        window.addEventListener('resize', updateTimelineProgress);
        updateTimelineProgress();
      });
    } catch (error) {
      console.error("Timeline initialization error:", error);
    }
  }

  // Project filtering functionality
  function initProjectFiltering() {
    try {
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
        });
      });
    } catch (error) {
      console.error("Project filtering error:", error);
    }
  }

  // Project modals
  function initProjectModals() {
    try {
      const detailButtons = document.querySelectorAll('.project-details-btn');
      const modalOverlay = document.querySelector('.modal-overlay');
      const projectModals = document.querySelectorAll('.project-modal');
      
      if (!modalOverlay) return;
      
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
    } catch (error) {
      console.error("Project modals error:", error);
    }
  }

  // Contact form animation and validation
  function initContactForm() {
    try {
      const form = document.getElementById('contact-form');
      if (!form) return;
      
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
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        
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
          // Get form data
          const formData = new FormData(form);
          
          // Send AJAX request
          const response = await fetch(form.getAttribute('action'), {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Parse response
          const data = await response.json();
          
          if (data.success) {
            // Clear form
            form.reset();
            
            // Show success message
            showFormMessage(data.message || 'Your message has been sent successfully!', 'success');
          } else {
            // Show error message
            showFormMessage(data.message || 'Failed to send message. Please try again later.', 'error');
          }
        } catch (error) {
          console.error('Form submission error:', error);
          // Show error message
          showFormMessage('Failed to send message. Please try again later.', 'error');
        }
      });
      
      // Helper function to show form messages
      function showFormMessage(message, type) {
        const loadingElement = form.querySelector('.loading');
        const errorElement = form.querySelector('.error-message');
        const successElement = form.querySelector('.success-message');
        
        if (!loadingElement || !errorElement || !successElement) return;
        
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
            if (type === 'success' && successElement) {
              successElement.style.display = 'none';
            } else if (type === 'error' && errorElement) {
              errorElement.style.display = 'none';
            }
          }, 5000);
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);
    }
  }

  // Mobile navigation toggle
  function initMobileNav() {
    try {
      const navToggle = document.querySelector('.nav-toggle');
      const navOverlay = document.querySelector('.nav-overlay');
      
      if (!navToggle || !navOverlay) return;
      
      const toggleNav = (show) => {
        const bars = navToggle.querySelectorAll('.nav-toggle-bar');
        const navLinks = navOverlay.querySelectorAll('a');
        
        if (!bars || bars.length !== 3) return;
        
        if (show === true || (show === undefined && !navToggle.classList.contains('active'))) {
          // Show navigation
          navToggle.classList.add('active');
          navOverlay.classList.add('active');
          document.body.classList.add('mobile-nav-active');
          
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
          
          // Animate links
          if (navLinks.length > 0) {
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
        } else {
          // Hide navigation
          navToggle.classList.remove('active');
          navOverlay.classList.remove('active');
          document.body.classList.remove('mobile-nav-active');
          
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
      };
      
      // Toggle when clicking the hamburger icon
      navToggle.addEventListener('click', () => {
        toggleNav();
      });
      
      // Close when clicking a link
      navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggleNav(false);
        });
      });
      
      // Close when pressing escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
          toggleNav(false);
        }
      });
      
      // Close when clicking outside the navigation menu
      navOverlay.addEventListener('click', (e) => {
        // Only close if the click was directly on the overlay (not on a child element)
        if (e.target === navOverlay) {
          toggleNav(false);
        }
      });
    } catch (error) {
      console.error("Mobile navigation error:", error);
    }
  }

  // Setup navigation and smooth scrolling
  function initNavigation() {
    try {
      // All navigation links (both desktop and mobile)
      const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .nav-overlay-menu a[href^="#"]');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          
          // Close mobile nav if open
          if (document.body.classList.contains('mobile-nav-active')) {
            document.body.classList.remove('mobile-nav-active');
            
            const navOverlay = document.querySelector('.nav-overlay');
            if (navOverlay) navOverlay.classList.remove('active');
            
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) navToggle.classList.remove('active');
            
            // Reset hamburger icon
            const bars = document.querySelectorAll('.nav-toggle-bar');
            if (bars && bars.length === 3) {
              gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
              gsap.to(bars[1], { opacity: 1, duration: 0.3 });
              gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
            }
          }
          
          // Smooth scroll to target section
          if (targetId === '#header') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } else {
            const target = document.querySelector(targetId);
            if (target) {
              const headerOffset = document.getElementById('header').classList.contains('sticky-header') ? 70 : 0;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    } catch (error) {
      console.error("Navigation initialization error:", error);
    }
  }

  // Sticky header functionality
  function initStickyHeader() {
    try {
      const header = document.getElementById('header');
      const headerContainer = header.querySelector('.container');
      
      if (!header || !headerContainer) return;
      
      // Function to handle scroll events
      function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Check if we're viewing the home section (first screen)
        const isHomeSection = scrollPosition < windowHeight * 0.5;
        
        // Apply sticky header class when scrolled down
        if (scrollPosition > 50) {
          header.classList.add('sticky-header');
          document.body.classList.add('has-sticky-header');
        } else {
          header.classList.remove('sticky-header');
          document.body.classList.remove('has-sticky-header');
        }
        
        // Toggle header transparency class based on current section
        if (isHomeSection && scrollPosition < 50) {
          // On home section and not scrolled - transparent header
          headerContainer.classList.add('transparent-bg');
        } else {
          // On other sections or scrolled - filled header
          headerContainer.classList.remove('transparent-bg');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavLinks();
      }
      
      // Function to update active navigation links
      function updateActiveNavLinks() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        // Determine which section is currently in view
        let currentSection = '';
        
        if (scrollPosition < 100) {
          currentSection = '#header';
        } else {
          sections.forEach(section => {
            // Adjust the offset to account for the sticky header
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSection = '#' + section.getAttribute('id');
            }
          });
        }
        
        // Update active class on navigation links
        if (currentSection) {
          document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === currentSection) {
              item.classList.add('active');
            }
          });
          
          // Update mobile menu active state as well
          document.querySelectorAll('.nav-overlay-menu li').forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === currentSection) {
              item.classList.add('active');
            }
          });
        }
      }
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      // Initialize on page load
      headerContainer.classList.add('transparent-bg');
      handleScroll();
    } catch (error) {
      console.error("Sticky header initialization error:", error);
    }
  }

  // Function to check which elements are currently visible and animate them
  function checkVisibleElements() {
    try {
      // Helper function to check if element is in viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
          rect.bottom >= -100
        );
      }
      
      // Check and animate counters
      document.querySelectorAll('.count').forEach(counter => {
        // Skip if already animating
        if (counter.dataset.animating === 'true') return;
        
        // Check if counter's parent is visible
        const box = counter.closest('.count-box');
        if (box && isInViewport(box)) {
          const target = parseInt(counter.getAttribute('data-count'));
          if (isNaN(target)) return;
          
          // Start from zero
          counter.textContent = '0';
          counter.dataset.animating = 'true';
          
          // Calculate timing for smooth animation
          const duration = 1500; // 1.5 seconds
          const steps = 30; // number of steps to take
          const stepValue = Math.ceil(target / steps);
          const stepDuration = duration / steps;
          
          // Start counter animation
          let current = 0;
          const interval = setInterval(() => {
            current += stepValue;
            
            // Check if we've reached or exceeded the target
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            
            // Update counter display
            counter.textContent = current;
          }, stepDuration);
        }
      });
      
      // Check and animate skill bars
      document.querySelectorAll('.skill-progress').forEach(skillBar => {
        // Skip if already animating
        if (skillBar.dataset.animating === 'true') return;
        
        if (isInViewport(skillBar)) {
          const progressValue = skillBar.querySelector('.skill-progress-value');
          const skillName = skillBar.querySelector('.skill-name');
          
          if (progressValue && skillName) {
            const percentage = skillName.getAttribute('data-percentage');
            if (percentage) {
              skillBar.dataset.animating = 'true';
              progressValue.style.transition = 'width 1.5s ease-out';
              progressValue.style.width = percentage + '%';
            }
          }
        }
      });
    } catch (error) {
      console.error("Check visible elements error:", error);
    }
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Toggle body class
      document.body.classList.toggle('light-mode');
      
      // Toggle icon
      const icon = themeToggle.querySelector('i');
      
      if (icon) {
        if (icon.classList.contains('fa-moon')) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
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
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }

  // Helper function to detect mobile devices
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Add scroll event listener for animation checks
  window.addEventListener('scroll', function() {
    // Use debounce to limit how often this runs
    if (window.scrollCheckTimeout) clearTimeout(window.scrollCheckTimeout);
    window.scrollCheckTimeout = setTimeout(checkVisibleElements, 100);
  });
  
  // Ensure animations get triggered even if scroll events don't fire
  window.addEventListener('load', function() {
    checkVisibleElements();
    setTimeout(checkVisibleElements, 500);
    setTimeout(checkVisibleElements, 1000);
  });
});