
  document.getElementById('aiAssistantForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInput = document.getElementById('aiPrompt').value.trim();
    if (!userInput) return;

    // Clear the hero form
    document.getElementById('aiPrompt').value = '';
    
    // Open the chat widget
    const chatWidget = document.getElementById('chat-widget-container');
    const chatButton = document.getElementById('chat-widget-button');

	document.getElementById('aiAssistantForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const aiPromptEl = document.getElementById('aiPrompt');
  const userInput = aiPromptEl.value.trim();
  if (!userInput) return;

  // Clear and blur the hero form so the user isn't still typing there
  aiPromptEl.value = '';
  aiPromptEl.blur();

  // Open the chat widget
  const chatWidget = document.getElementById('chat-widget-container');
  if (chatWidget) chatWidget.classList.add('active');

  // Transfer the message and focus the widget input
  const widgetPrompt = document.getElementById('widgetPrompt');
  const widgetSubmitButton = document.getElementById('widgetSubmitButton');
  if (widgetPrompt) {
    widgetPrompt.value = userInput;
    // Put the caret at the end and focus so the user can keep typing
    widgetPrompt.focus();
    widgetPrompt.setSelectionRange(widgetPrompt.value.length, widgetPrompt.value.length);

    // Trigger the widget submit and then return focus for follow-ups
    setTimeout(() => {
      if (widgetSubmitButton) widgetSubmitButton.click();
      widgetPrompt.focus(); // keep focus inside the widget
    }, 120);
  }
});

    
    if (chatWidget && chatButton) {
      chatWidget.classList.add('active');
	// Inside your aiAssistantForm submit handler, right after you open the widget:
if (chatWidget && chatButton) {
  chatWidget.classList.add('active');

  // 👇 move the caret out of the hero form
  const heroTextarea = document.getElementById('aiPrompt');
  if (heroTextarea) heroTextarea.blur();

  // Transfer the message to the widget
  const widgetPrompt = document.getElementById('widgetPrompt');
  if (widgetPrompt) {
    widgetPrompt.value = userInput;

    // 👇 focus the widget input and place the caret at the end
    requestAnimationFrame(() => {
      widgetPrompt.focus();
      const end = widgetPrompt.value.length;
      try { widgetPrompt.setSelectionRange(end, end); } catch (_) {}
    });

    // Trigger the widget submit
    setTimeout(() => {
      const widgetSubmitButton = document.getElementById('widgetSubmitButton');
      if (widgetSubmitButton) {
        widgetSubmitButton.click();

        // 👇 keep focus in the widget input for the next message
        requestAnimationFrame(() => widgetPrompt.focus());
      }
    }, 100);
  }
}

      
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



        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Cursor click animation
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
        
        hero.addEventListener('click', createRipple);

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check honeypot
            const honeypot = this.querySelector('input[name="company_website"]');
            if (honeypot.value) {
                // This is spam, show generic error
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

        // Smooth scroll offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('chat-widget-button');
  const chatWidget = document.getElementById('chat-widget-container');
  const minimizeButton = document.getElementById('minimize-chat');
  const widgetPrompt = document.getElementById('widgetPrompt');
  const widgetSubmitButton = document.getElementById('widgetSubmitButton');
  const widgetMessages = document.getElementById('widgetMessages');
  const widgetTypingIndicator = document.getElementById('widgetTypingIndicator');
  // Widget chat history
  const widgetChatHistory = [];
  
  // Toggle chat widget
  chatButton.addEventListener('click', function() {
    chatWidget.classList.toggle('active');
    if (chatWidget.classList.contains('active')) {
      widgetPrompt.focus();
    }
  });
  
  // Minimize chat widget
  minimizeButton.addEventListener('click', function() {
    chatWidget.classList.remove('active');
  });
  
  // Handle widget form submission
  widgetSubmitButton.addEventListener('click', handleWidgetSubmit);
  widgetPrompt.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleWidgetSubmit();
    }
  });
  
  function handleWidgetSubmit() {
    const userInput = widgetPrompt.value.trim();
    if (!userInput) return;
    
    // Add user message to chat
    addMessageToWidget('user', userInput);
    
    // Clear input
    widgetPrompt.value = '';
    
    // Add to history
    widgetChatHistory.push({ role: "user", content: userInput });
    
    // Real API call to OpenAI
    (async () => {
      try {
        const API_URL =
  location.hostname === 'localhost'
    ? 'http://localhost:3000/api/gpt'
    : 'https://synxbot.onrender.com/api/gpt';

const res = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: widgetChatHistory })
});


        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Clear typing indicator and start streaming
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
  widgetPrompt.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
  
  // Close widget when clicking outside
  document.addEventListener('click', function(e) {
    if (!chatWidget.contains(e.target) && !chatButton.contains(e.target) && chatWidget.classList.contains('active')) {
      chatWidget.classList.remove('active');
    }
  });
});
    
