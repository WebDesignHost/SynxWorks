
// Mobile-specific improvements and responsive enhancements
document.addEventListener('DOMContentLoaded', function() {
  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Enhanced mobile menu behavior
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      // Prevent body scroll when menu is open
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Enhanced header scroll effect for mobile
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on mobile scroll
    if (isMobile) {
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop;
  });

  // Enhanced touch interactions for mobile
  if (isMobile) {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.cta-button, .secondary-button, .ai-assistant-submit');
    buttons.forEach(button => {
      button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      });
      
      button.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });

    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  // Enhanced form handling for mobile
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check honeypot
      const honeypot = this.querySelector('input[name="company_website"]');
      if (honeypot.value) {
        alert('There was an error submitting your form. Please try again.');
        return;
      }
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const website = formData.get('website');
      const goal = formData.get('goal');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !website || !goal) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Show success message
      this.innerHTML = `
        <div class="form-success">
          <h3>Your strategy call is confirmed!</h3>
          <p>We'll email you within one business day to schedule your free 30-minute strategy session.</p>
          <a href="mailto:contact@synxworks.com" class="cta-button">Email Us: contact@synxworks.com</a>
        </div>
      `;
    });
  }

  // Enhanced smooth scroll with mobile considerations
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        // Use different scroll behavior for mobile
        if (isMobile) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Enhanced cursor click animation (desktop only)
  if (!isMobile) {
    const hero = document.querySelector('.hero');
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-click';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      
      ripple.classList.add('active');
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    };
    
    if (hero) {
      hero.addEventListener('click', createRipple);
    }
  }

  // Enhanced AI Assistant Form handling
  document.getElementById('aiAssistantForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInput = document.getElementById('aiPrompt').value.trim();
    if (!userInput) return;

    // Clear the hero form
    document.getElementById('aiPrompt').value = '';
    
    // Open the chat widget
    const chatWidget = document.getElementById('chat-widget-container');
    const chatButton = document.getElementById('chat-widget-button');
    
    if (chatWidget && chatButton) {
      chatWidget.classList.add('active');
      
      // Transfer the message to the widget
      const widgetPrompt = document.getElementById('widgetPrompt');
      if (widgetPrompt) {
        widgetPrompt.value = userInput;
        
        // Trigger the widget submit
        setTimeout(() => {
          const widgetSubmitButton = document.getElementById('widgetSubmitButton');
          if (widgetSubmitButton) {
            widgetSubmitButton.click();
          }
        }, 100);
      }
    }
  });

  // Handle Enter key in hero form textarea
  document.getElementById('aiPrompt').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('aiAssistantForm').dispatchEvent(new Event('submit'));
    }
  });

  // Enhanced Chat Widget Functionality
  const chatButton = document.getElementById('chat-widget-button');
  const chatWidget = document.getElementById('chat-widget-container');
  const minimizeButton = document.getElementById('minimize-chat');
  const widgetPrompt = document.getElementById('widgetPrompt');
  const widgetSubmitButton = document.getElementById('widgetSubmitButton');
  const widgetMessages = document.getElementById('widgetMessages');
  const widgetTypingIndicator = document.getElementById('widgetTypingIndicator');
  const widgetDots = document.getElementById('widgetDots');
  
  // Widget chat history
  const widgetChatHistory = [];
  let widgetDotInterval;
  
  // Toggle chat widget
  if (chatButton && chatWidget) {
    chatButton.addEventListener('click', function() {
      chatWidget.classList.toggle('active');
      if (chatWidget.classList.contains('active')) {
        widgetPrompt.focus();
        // Add mobile-specific behavior
        if (isMobile) {
          // Prevent body scroll when chat is open on mobile
          document.body.style.overflow = 'hidden';
        }
      } else {
        if (isMobile) {
          document.body.style.overflow = '';
        }
      }
    });
  }
  
  // Minimize chat widget
  if (minimizeButton) {
    minimizeButton.addEventListener('click', function() {
      chatWidget.classList.remove('active');
      if (isMobile) {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Handle widget form submission
  if (widgetSubmitButton && widgetPrompt) {
    widgetSubmitButton.addEventListener('click', handleWidgetSubmit);
    widgetPrompt.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleWidgetSubmit();
      }
    });
  }
  
  function handleWidgetSubmit() {
    const userInput = widgetPrompt.value.trim();
    if (!userInput) return;
    
    // Add user message to chat
    addMessageToWidget('user', userInput);
    
    // Clear input
    widgetPrompt.value = '';
    
    // Show typing indicator
    widgetTypingIndicator.style.display = 'block';
    
    let dotCount = 1;
    widgetDotInterval = setInterval(() => {
      dotCount = (dotCount % 3) + 1;
      widgetDots.textContent = '.'.repeat(dotCount);
    }, 500);
    
    // Add to history
    widgetChatHistory.push({ role: "user", content: userInput });
    
    // Real API call to OpenAI
    (async () => {
      try {
        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: widgetChatHistory })
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Clear typing indicator and start streaming
        clearInterval(widgetDotInterval);
        widgetTypingIndicator.style.display = 'none';

        // Create message element for streaming
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        widgetMessages.appendChild(messageElement);

        // Stream the response
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');

          // Keep the last incomplete line in buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const payload = line.replace('data: ', '');
              if (payload === '[DONE]') {
                // Add final response to history
                widgetChatHistory.push({ role: "assistant", content: fullResponse });
                widgetMessages.scrollTop = widgetMessages.scrollHeight;
                return;
              }

              // The server sends plain text content, not JSON
              if (payload.trim()) {
                fullResponse += payload;
                messageElement.textContent = fullResponse;
                widgetMessages.scrollTop = widgetMessages.scrollHeight;
              }
            }
          }
        }

        // Add final response to history
        widgetChatHistory.push({ role: "assistant", content: fullResponse });

      } catch (err) {
        clearInterval(widgetDotInterval);
        widgetTypingIndicator.style.display = 'none';
        addMessageToWidget('bot', '⚠️ Server error. Please try again.');
        console.error('API Error:', err);
      }
    })();

  }
  
  function addMessageToWidget(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    messageElement.textContent = message;
    widgetMessages.appendChild(messageElement);
    
    // Scroll to bottom
    widgetMessages.scrollTop = widgetMessages.scrollHeight;
  }
  
  // Adjust textarea height automatically
  if (widgetPrompt) {
    widgetPrompt.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
  }
  
  // Close widget when clicking outside
  document.addEventListener('click', function(e) {
    if (chatWidget && chatButton && !chatWidget.contains(e.target) && !chatButton.contains(e.target) && chatWidget.classList.contains('active')) {
      chatWidget.classList.remove('active');
      if (isMobile) {
        document.body.style.overflow = '';
      }
    }
  });

  // Enhanced viewport handling for mobile
  if (isMobile) {
    // Set viewport height for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
  }
});
    