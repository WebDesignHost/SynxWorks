'use client';

import { useEffect, useRef } from 'react';

export default function MainContent() {
  const widgetChatHistory = useRef<Array<{role: 'user' | 'assistant', content: string}>>([]);

  useEffect(() => {
    // AI Assistant Form handling
    const aiAssistantForm = document.getElementById('aiAssistantForm') as HTMLFormElement;
    if (aiAssistantForm) {
      const handleAiFormSubmit = async (e: Event) => {
        e.preventDefault();

        const aiPrompt = document.getElementById('aiPrompt') as HTMLTextAreaElement;
        if (!aiPrompt) return;
        
        const userInput = aiPrompt.value.trim();
        if (!userInput) return;

        // Clear the hero form
        aiPrompt.value = '';
        
        // Open the chat widget
        const chatWidget = document.getElementById('chat-widget-container');
        const chatButton = document.getElementById('chat-widget-button');

        // Clear and blur the hero form so the user isn't still typing there
        aiPrompt.blur();

        if (chatWidget) {
          chatWidget.classList.add('active');
        }

        // Transfer the message and focus the widget input
        const widgetPrompt = document.getElementById('widgetPrompt') as HTMLTextAreaElement;
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
      };

      aiAssistantForm.addEventListener('submit', handleAiFormSubmit);

      // Handle Enter key in hero form textarea
      const aiPrompt = document.getElementById('aiPrompt') as HTMLTextAreaElement;
      if (aiPrompt) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            aiAssistantForm.dispatchEvent(new Event('submit'));
          }
        };
        aiPrompt.addEventListener('keydown', handleKeyDown);
      }
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (contactForm) {
      const handleContactSubmit = (e: Event) => {
        e.preventDefault();
        
        // Check honeypot
        const honeypot = contactForm.querySelector('input[name="company_website"]') as HTMLInputElement;
        if (honeypot && honeypot.value) {
          // This is spam, show generic error
          alert('There was an error submitting your form. Please try again.');
          return;
        }
    
        // Get form data
        const formData = new FormData(contactForm);
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
        contactForm.innerHTML = `
          <div class="form-success">
            <h3>Your strategy call is confirmed!</h3>
            <p>We'll email you within one business day to schedule your free 30-minute strategy session.</p>
            <a href="mailto:contact@synxworks.com" class="cta-button">Email Us: contact@synxworks.com</a>
          </div>
        `;
      };

      contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle') as HTMLButtonElement;
    const nav = document.querySelector('nav') as HTMLElement;
    const header = document.querySelector('header') as HTMLElement;
    
    if (menuToggle && nav) {
      const handleMenuToggle = () => {
        nav.classList.toggle('active');
      };

      menuToggle.addEventListener('click', handleMenuToggle);

      // Close mobile menu when clicking outside
      const handleOutsideClick = (e: Event) => {
        const target = e.target as Element;
        if (!nav.contains(target) && !menuToggle.contains(target) && nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      };

      document.addEventListener('click', handleOutsideClick);
    }
    
    // Header scroll effect
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      // Add scrolled class if page loads already scrolled
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      }
    }
    
    // Cursor click animation
    const hero = document.querySelector('.hero') as HTMLElement;
    if (hero) {
      const createRipple = (e: MouseEvent) => {
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
    }
    
    // Smooth scroll offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      const handleAnchorClick = (e: Event) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = (target as HTMLElement).offsetTop - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      };

      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Chat widget elements
    const chatButton = document.getElementById('chat-widget-button');
    const chatWidget = document.getElementById('chat-widget-container');
    const minimizeButton = document.getElementById('minimize-chat');
    const widgetPrompt = document.getElementById('widgetPrompt') as HTMLTextAreaElement;
    const widgetSubmitButton = document.getElementById('widgetSubmitButton');
    const widgetMessages = document.getElementById('widgetMessages');
    const widgetTypingIndicator = document.getElementById('widgetTypingIndicator');
    
    // Only set up chat widget if the elements exist
    if (chatButton && chatWidget) {
      // Toggle chat widget
      const handleChatToggle = () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && widgetPrompt) {
          widgetPrompt.focus();
        }
      };

      chatButton.addEventListener('click', handleChatToggle);
    }
    
    // Minimize chat widget (if the elements exist)
    if (minimizeButton && chatWidget) {
      const handleMinimize = () => {
        chatWidget.classList.remove('active');
      };

      minimizeButton.addEventListener('click', handleMinimize);
    }

    // Widget form submission handling
    const handleWidgetSubmit = () => {
      if (!widgetPrompt) return;
      
      const userInput = widgetPrompt.value.trim();
      if (!userInput) return;
      
      // Add user message to chat
      addMessageToWidget('user', userInput);
      
      // Clear input
      widgetPrompt.value = '';
      
      // Show typing indicator
      if (widgetTypingIndicator) {
        widgetTypingIndicator.style.display = 'block';
      }
      
      // Add to history
      widgetChatHistory.current.push({ role: "user", content: userInput });
      
      // Real API call to OpenAI - Updated to use /api/chat
      (async () => {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: widgetChatHistory.current })
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          // Clear typing indicator and start streaming
          if (widgetTypingIndicator) {
            widgetTypingIndicator.style.display = 'none';
          }

          // Create message element for streaming
          const messageElement = document.createElement('div');
          messageElement.className = 'message bot-message';
          if (widgetMessages) {
            widgetMessages.appendChild(messageElement);
          }

          // Stream the response
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let fullResponse = '';

          if (!reader) {
            throw new Error('Failed to get response reader');
          }

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
                  widgetChatHistory.current.push({ role: "assistant", content: fullResponse });
                  if (widgetMessages) {
                    widgetMessages.scrollTop = widgetMessages.scrollHeight;
                  }
                  return;
                }

                // The server sends plain text content, not JSON
                if (payload.trim()) {
                  fullResponse += payload;
                  messageElement.textContent = fullResponse;
                  if (widgetMessages) {
                    widgetMessages.scrollTop = widgetMessages.scrollHeight;
                  }
                }
              }
            }
          }

          // Add final response to history
          widgetChatHistory.current.push({ role: "assistant", content: fullResponse });

        } catch (err) {
          if (widgetTypingIndicator) {
            widgetTypingIndicator.style.display = 'none';
          }
          addMessageToWidget('bot', '⚠️ Server error. Please try again.');
          console.error('API Error:', err);
        }
      })();
    };

    const addMessageToWidget = (sender: 'user' | 'bot', message: string) => {
      if (!widgetMessages) return;
      
      const messageElement = document.createElement('div');
      messageElement.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
      messageElement.textContent = message;
      widgetMessages.appendChild(messageElement);
      
      // Scroll to bottom
      widgetMessages.scrollTop = widgetMessages.scrollHeight;
    };
    
    // Handle widget form submission (if the elements exist)
    if (widgetSubmitButton) {
      widgetSubmitButton.addEventListener('click', handleWidgetSubmit);
    }
    
    if (widgetPrompt) {
      const handleWidgetKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleWidgetSubmit();
        }
      };

      widgetPrompt.addEventListener('keydown', handleWidgetKeyDown);

      // Adjust textarea height automatically
      const handleInput = () => {
        widgetPrompt.style.height = 'auto';
        widgetPrompt.style.height = Math.min(widgetPrompt.scrollHeight, 120) + 'px';
      };

      widgetPrompt.addEventListener('input', handleInput);
    }
    
    // Close widget when clicking outside
    if (chatWidget && chatButton) {
      const handleOutsideClick = (e: Event) => {
        const target = e.target as Element;
        if (chatWidget && chatButton && 
            !chatWidget.contains(target) && 
            !chatButton.contains(target) && 
            chatWidget.classList.contains('active')) {
          chatWidget.classList.remove('active');
        }
      };

      document.addEventListener('click', handleOutsideClick);
    }

    // Cleanup function
    return () => {
      // Remove all event listeners to prevent memory leaks
      // This would need to be implemented for each event listener
    };
  }, []);

  return (
    <>
      {/* ********  HEADER (was partials/header.html)  ******** */}
      <header>
        <div className="container header-container">
          <a className="logo" href="#">
            <span className="logo-mark">SV</span> SynxWorks
          </a>

          <button className="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>

          <nav>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </nav>

          <a className="cta-button" href="#contact">Get a Quote</a>
        </div>
      </header>
      <section className="hero">
        <div className="bg-pattern">
        </div>
        <div className="animated-element animated-cursor">
        </div>
        <div className="animated-element animated-chart">
        </div>
        <div className="container hero-content">
          <span className="tag">
            Web Design That Delivers Results
          </span>
          <h1>
            Smart Sites That Drive Business Growth
          </h1>
          <p>
            We create websites focused on turning visitors into paying customers, helping your business grow with measurable results.
          </p>
          {/* HTML */}
          <form className="ai-assistant-form" id="aiAssistantForm">
            <textarea id="aiPrompt" placeholder="Ask SynxBot something..."></textarea>
            <button aria-label="Send message" className="ai-assistant-submit" id="aiSubmitButton" type="submit">
              <svg aria-hidden="true" className="send-icon" viewBox="0 0 24 24">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z">
                </path>
              </svg>
            </button>
          </form>
          <a className="cta-button" href="#services">
            See How We Can Help
          </a>
          <a className="secondary-button" href="#results">
            View Client Results
          </a>
        </div>
      </section>
      <section id="results">
        <div className="container">
          <div className="section-title">
            <h2>
              Real Business Results
            </h2>
            <p>
              Our clients don&apos;t just get websites—they get measurable growth for their businesses
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                247%
              </div>
              <div className="stat-label">
                Average increase in lead generation
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                83%
              </div>
              <div className="stat-label">
                Higher conversion rates
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                $42k
              </div>
              <div className="stat-label">
                Average revenue increase
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                3.2x
              </div>
              <div className="stat-label">
                Return on investment
              </div>
            </div>
          </div>
          <div className="case-studies">
            <div className="case-study">
              <div className="case-study-content">
                <h3>
                  Mountain View Dental
                </h3>
                <p>
                  Local dental practice struggling to fill appointment slots with traditional marketing.
                </p>
                <div className="case-study-result">
                  <span>
                    Result:
                  </span>
                  38 new patients per month (↑215%)
                </div>
              </div>
            </div>
            <div className="case-study">
              <div className="case-study-content">
                <h3>
                  Elite Home Services
                </h3>
                <p>
                  Home cleaning service looking to expand their premium client base in affluent neighborhoods.
                </p>
                <div className="case-study-result">
                  <span>
                    Result:
                  </span>
                  $27,500 monthly revenue increase
                </div>
              </div>
            </div>
            <div className="case-study">
              <div className="case-study-content">
                <h3>
                  CrossFit Revolution
                </h3>
                <p>
                  New fitness studio trying to compete with established gyms in a crowded market.
                </p>
                <div className="case-study-result">
                  <span>
                    Result:
                  </span>
                  78 membership signups in first month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services">
        <div className="container">
          <div className="section-title">
            <h2>
              How We Help You Grow
            </h2>
            <p>
              We don&apos;t just build websites—we build business growth engines
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg className="svg-icon" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z">
                  </path>
                </svg>
              </div>
              <h3>
                Client-Attracting Design
              </h3>
              <p>
                Custom designs that speak to your ideal clients and compel them to take action. Our sites don&apos;t just look good—they convert visitors into paying customers.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg className="svg-icon" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z">
                  </path>
                </svg>
              </div>
              <h3>
                Revenue-Focused Strategy
              </h3>
              <p>
                Everything we build is focused on your bottom line—clear paths to purchase, irresistible offers, and automated follow-up systems that close deals.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg className="svg-icon" viewBox="0 0 24 24">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z">
                  </path>
                </svg>
              </div>
              <h3>
                Growth Optimization
              </h3>
              <p>
                We continually improve your site based on real visitor behavior and conversion data, ensuring your business keeps growing month after month.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="process">
        <div className="container">
          <div className="section-title">
            <h2>
              Our Simple, Effective Process
            </h2>
            <p>
              How we transform your online presence into a client-attracting machine
            </p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <h3>
                Business Discovery
              </h3>
              <p>
                We dig deep to understand your business goals, target clients, and what sets you apart from competitors.
              </p>
            </div>
            <div className="process-step">
              <h3>
                Revenue Strategy
              </h3>
              <p>
                We design a custom website strategy that focuses on attracting leads and converting them into paying clients.
              </p>
            </div>
            <div className="process-step">
              <h3>
                Client-Focused Design
              </h3>
              <p>
                We create a website that speaks directly to your ideal clients and guides them to take action.
              </p>
            </div>
            <div className="process-step">
              <h3>
                Launch &amp; Growth
              </h3>
              <p>
                Your site goes live, and we implement ongoing optimization to continually increase your leads and revenue.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>
              What Our Clients Say
            </h2>
            <p>
              Business owners who transformed their results with SynxWorks
            </p>
          </div>
          <div className="testimonials">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                &quot;
              </div>
              <p className="testimonial-text">
                After working with SynxWorks, our monthly revenue increased by over $20,000. Their focus on actual business results rather than just technical details made all the difference.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <h4>
                    Michael Reynolds
                  </h4>
                  <p>
                    CEO, Reynolds Financial
                  </p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                &quot;
              </div>
              <p className="testimonial-text">
                The number of qualified leads coming through our website tripled in the first 60 days. Their process was seamless, and the results have been incredible.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <h4>
                    Sarah Johnson
                  </h4>
                  <p>
                    Owner, Elite Home Services
                  </p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                &quot;
              </div>
              <p className="testimonial-text">
                Our new website has helped us book 38 new patient appointments each month—that&apos;s over $45,000 in additional annual revenue. Best investment we&apos;ve made in years.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <h4>
                    Dr. James Wilson
                  </h4>
                  <p>
                    Mountain View Dental
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq">
        <div className="container">
          <div className="section-title">
            <h2>
              Common Questions
            </h2>
            <p>
              Everything you need to know about working with us
            </p>
          </div>
          <div className="faq-section">
            <div className="faq-item">
              <details>
                <summary className="faq-question">
                  How long will it take to build my new website?
                </summary>
                <div className="faq-answer">
                  Most of our client websites launch within 2-4 weeks from our initial discovery call. Our streamlined process ensures you get a high-performing website without unnecessary delays.
                </div>
              </details>
            </div>
            <div className="faq-item">
              <details>
                <summary className="faq-question">
                  What makes your websites different from others?
                </summary>
                <div className="faq-answer">
                  Unlike typical web designers who focus on aesthetics alone, we build every site with a clear business goal: generating leads and sales. Our websites are strategic tools designed to attract your ideal clients and convert them into customers.
                </div>
              </details>
            </div>
            <div className="faq-item">
              <details>
                <summary className="faq-question">
                  How much does a new website cost?
                </summary>
                <div className="faq-answer">
                  Our websites typically range from $3,000-$8,000 depending on your specific business needs. We offer payment plans to make it accessible, and most importantly, our sites are designed to deliver a positive ROI within months.
                </div>
              </details>
            </div>
            <div className="faq-item">
              <details>
                <summary className="faq-question">
                  Will I be able to update the website myself?
                </summary>
                <div className="faq-answer">
                  Absolutely! We build all our websites with user-friendly content management systems that make it easy for you to make basic updates. We also offer maintenance plans for businesses that prefer we handle everything.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="container">
          <div className="section-title">
            <h2>
              Grow Your Business With Us
            </h2>
            <p>
              Book your free strategy call to see how we can help you attract more clients and increase revenue
            </p>
          </div>
          <div className="contact-form-container">
            <form className="contact-form" id="contactForm">
              <div className="form-group">
                <label htmlFor="name">
                  Your Name *
                </label>
                <input id="name" name="name" placeholder="John Smith" required type="text"/>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email Address *
                </label>
                <input id="email" name="email" placeholder="john@yourbusiness.com" required type="email"/>
              </div>
              <div className="form-group">
                <label htmlFor="website">
                  Business/Website URL *
                </label>
                <input id="website" name="website" placeholder="https://yourbusiness.com" required type="url"/>
              </div>
              <div className="form-group">
                <label htmlFor="goal">
                  What&apos;s Your Main Goal? *
                </label>
                <select id="goal" name="goal" required>
                  <option value="">
                    Select your primary goal
                  </option>
                  <option value="more-leads">
                    Get more leads/customers
                  </option>
                  <option value="new-website">
                    Create a new website
                  </option>
                  <option value="redesign">
                    Improve existing website
                  </option>
                  <option value="funnel">
                    Build sales funnel
                  </option>
                  <option value="other">
                    Something else
                  </option>
                </select>
              </div>
              <div className="contact-benefits">
                <div className="contact-benefit">
                  <div className="benefit-icon">
                    ✓
                  </div>
                  <span className="benefit-text">
                    Free 30-min strategy call
                  </span>
                </div>
                <div className="contact-benefit">
                  <div className="benefit-icon">
                    ✓
                  </div>
                  <span className="benefit-text">
                    Custom growth plan
                  </span>
                </div>
                <div className="contact-benefit">
                  <div className="benefit-icon">
                    ✓
                  </div>
                  <span className="benefit-text">
                    No obligation
                  </span>
                </div>
              </div>
              <div className="form-group message-group">
                <label htmlFor="message">
                  Tell us about your business (optional)
                </label>
                <textarea id="message" name="message" placeholder="What do you sell? Who are your ideal clients? What are your biggest challenges?"></textarea>
              </div>
              {/* Honeypot field */}
              <input autoComplete="off" className="honeypot" name="company_website" tabIndex={-1} type="text"/>
              <button className="cta-button submit-button" type="submit">
                Get Your Free Strategy Call
              </button>
            </form>
          </div>
        </div>
      </section>
        <footer>
        <div className="container">
          <div className="footer-content">

            <div className="footer-col">
              <h4>SynxWorks</h4>
              <p>Building websites that grow your business and increase your revenue.</p>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Client-Attracting Websites</a></li>
                <li><a href="#">Lead Generation Systems</a></li>
                <li><a href="#">Conversion Optimization</a></li>
                <li><a href="#">Local Business Growth</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Process</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <div className="social-icons">
                <div className="social-icons">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/your-page" className="social-icon" aria-label="LinkedIn">
                    <svg className="svg-icon" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>

                  {/* Twitter (X) */}
                  <a href="https://twitter.com/your-handle" className="social-icon" aria-label="Twitter">
                    <svg className="svg-icon" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="https://instagram.com/your-handle" className="social-icon" aria-label="Instagram">
                    <svg className="svg-icon" viewBox="0 0 24 24">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a href="https://facebook.com/your-page" className="social-icon" aria-label="Facebook">
                    <svg className="svg-icon" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>

          </div>{/* /.footer-content */}

          <div className="copyright">
            <p>© 2025 SynxWorks. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </div>
        </div>
      </footer>
      {/* Floating Chat Widget Button and Container */}
      <div className="chat-widget-container" id="chat-widget-container">
        <div className="chat-header">
          <div className="chat-title">
            <span>
              SynxBot Assistant
            </span>
          </div>
          <button className="minimize-button" id="minimize-chat">
            −
          </button>
        </div>
        <div className="chat-messages" id="widgetMessages">
        </div>
        <div className="chat-input-container">
          <textarea id="widgetPrompt" placeholder="Ask SynxBot something..."></textarea>
          <button className="ai-assistant-submit" id="widgetSubmitButton">
            <svg aria-hidden="true" className="send-icon" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z">
              </path>
            </svg>
          </button>
        </div>
        <div className="typing-indicator" id="widgetTypingIndicator" style={{display: 'none'}}>
          SynxBot is typing
          <span id="widgetDots">
            .
          </span>
        </div>
      </div>
      <button className="chat-widget-button" id="chat-widget-button">
        <div className="ai-face">
          <img src="chatbot.png" className="ai-icon" alt="AI Icon" />
        </div>
      </button>
    </>
  );
}