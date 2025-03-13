!(function($) {
  "use strict";

  // Navigation active state on scroll
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');

          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        $('html, body').animate({
          scrollTop: 0
        }, 350);

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate section on load with hash
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section animation
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      // Start with width 0
      $(this).css("width", "0");
      
      // Animate to actual value with delay
      setTimeout(() => {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      }, 300);
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (keep for compatibility)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Venobox
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // NEW FEATURES

  // 1. Dark mode toggle
  $(document).ready(function() {
    $('#theme-toggle').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('light-mode');
      
      // Toggle icon
      const icon = $(this).find('i');
      if(icon.hasClass('icofont-moon')) {
        icon.removeClass('icofont-moon').addClass('icofont-sun');
      } else {
        icon.removeClass('icofont-sun').addClass('icofont-moon');
      }
      
      // Store preference
      const currentMode = $('body').hasClass('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentMode);
    });
    
    // Apply saved preference
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') {
      $('body').addClass('light-mode');
      $('#theme-toggle i').removeClass('icofont-moon').addClass('icofont-sun');
    }
  });

  // 2. Animated typing effect for header
  $(document).ready(function() {
    const typingElement = $('.typing');
    
    if(typingElement.length) {
      const originalText = typingElement.text();
      const texts = [
        "C++ Consultant",
        "Software Developer",
        "ML Enthusiast",
        "Problem Solver"
      ];
      
      let index = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      function type() {
        const currentText = texts[index];
        
        if(isDeleting) {
          // Deleting text
          typingElement.text(currentText.substring(0, charIndex - 1));
          charIndex--;
          typingSpeed = 50;
        } else {
          // Typing text
          typingElement.text(currentText.substring(0, charIndex + 1));
          charIndex++;
          typingSpeed = 100;
        }
        
        // Handle switching between typing and deleting
        if(!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 1000; // Pause at the end
        } else if(isDeleting && charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % texts.length;
          typingSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typingSpeed);
      }
      
      // Start typing effect
      setTimeout(type, 1000);
    }
  });

  // 3. Project details popup
  $(document).ready(function() {
    $('.details-link').on('click', function(e) {
      e.preventDefault();
      const title = $(this).closest('.project-box').find('h4').text();
      const desc = $(this).closest('.project-box').find('p').text();
      
      // Create modal if it doesn't exist
      if(!$('#project-modal').length) {
        $('body').append(`
          <div id="project-modal" class="project-modal">
            <div class="project-modal-content">
              <span class="close">&times;</span>
              <h2 id="modal-title"></h2>
              <p id="modal-desc"></p>
              <div id="modal-details"></div>
            </div>
          </div>
        `);
        
        // Close modal functionality
        $(document).on('click', '.close, .project-modal', function(e) {
          if(e.target === this || $(e.target).hasClass('close')) {
            $('#project-modal').fadeOut();
          }
        });
      }
      
      // Set content and show modal
      $('#modal-title').text(title);
      $('#modal-desc').text(desc);
      
      // Add more details based on project title
      let details = '<h3>Technologies Used</h3><ul>';
      
      if(title.includes('C++')) {
        details += '<li>C++17</li><li>STL</li><li>Optimization algorithms</li>';
      } else if(title.includes('Data Analysis')) {
        details += '<li>Python</li><li>Pandas</li><li>NumPy</li><li>Matplotlib</li>';
      } else if(title.includes('Machine Learning')) {
        details += '<li>TensorFlow</li><li>Scikit-learn</li><li>Keras</li>';
      } else if(title.includes('Deep Learning')) {
        details += '<li>PyTorch</li><li>CNN architecture</li><li>Transfer learning</li>';
      } else if(title.includes('Embedded')) {
        details += '<li>C++</li><li>Real-time OS</li><li>Microcontroller programming</li>';
      } else if(title.includes('Portfolio')) {
        details += '<li>HTML5</li><li>CSS3</li><li>JavaScript</li><li>jQuery</li>';
      }
      
      details += '</ul>';
      $('#modal-details').html(details);
      
      // Show modal
      $('#project-modal').fadeIn();
    });
  });

  // 4. Enhanced contact form
  $(document).ready(function() {
    $('#contact-form').on('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = $('#name').val();
      const email = $('#email').val();
      const subject = $('#subject').val();
      const message = $('#message').val();
      
      if(!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading status
      showFormMessage('Sending message...', 'loading');
      
      // Send form via AJAX
      $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(response) {
          // Clear form on success
          $('#contact-form')[0].reset();
          showFormMessage('Your message has been sent. Thank you!', 'success');
        },
        error: function() {
          showFormMessage('There was an error sending your message. Please try again.', 'error');
        }
      });
    });
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
      const messageDiv = $('#form-message');
      
      // Clear previous classes
      messageDiv.removeClass('text-success text-danger text-warning');
      
      // Add appropriate class
      if(type === 'success') {
        messageDiv.addClass('text-success');
      } else if(type === 'error') {
        messageDiv.addClass('text-danger');
      } else if(type === 'loading') {
        messageDiv.addClass('text-warning');
      }
      
      // Set message and show
      messageDiv.text(message).show();
      
      // Auto-hide success and error messages
      if(type === 'success' || type === 'error') {
        setTimeout(function() {
          messageDiv.fadeOut();
        }, 5000);
      }
    }
  });

})(jQuery);