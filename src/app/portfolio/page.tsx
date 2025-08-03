'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function PortfolioPage() {
  useEffect(() => {
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
      const handleChatToggle = () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && widgetPrompt) {
          widgetPrompt.focus();
        }
      };

      chatButton.addEventListener('click', handleChatToggle);
    }
    
    // Minimize chat widget
    if (minimizeButton && chatWidget) {
      const handleMinimize = () => {
        chatWidget.classList.remove('active');
      };

      minimizeButton.addEventListener('click', handleMinimize);
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
  }, []);

  return (
    <>
      <div className="bg-pattern"></div>
      <div className="animated-element floating-circle"></div>
      <div className="animated-element floating-square"></div>
      <div className="animated-element floating-dots"></div>
      
      <header>
        <div className="container header-container">
          <Link href="/" className="logo">
            <span className="logo-mark">SV</span>
            SynxWorks
          </Link>
          <button className="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>
          <nav>
            <ul>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#process">Process</Link></li>
              <li><Link href="/#results">Results</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
            </ul>
          </nav>
          <Link href="/#contact" className="cta-button">Get a Quote</Link>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <span className="tag">Our Work</span>
          <h1>Portfolio of Client Success</h1>
          <p>Explore our collection of websites designed to convert visitors into customers and drive business growth.</p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <p>Each website designed with business results in mind</p>
          </div>
          
          <div className="portfolio-item">
            <div className="portfolio-content">
              <h3 className="portfolio-title">Mountain View Dental</h3>
              <p className="portfolio-description">A modern, patient-focused website that helped this dental practice attract 38 new patients per month and significantly increase their revenue.</p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Website Design</span>
                <span className="portfolio-tag">Lead Generation</span>
                <span className="portfolio-tag">Healthcare</span>
              </div>
              <a href="#" className="cta-button">View Case Study</a>
            </div>
            <div className="portfolio-image-container">
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Mountain View Dental Website" className="portfolio-image" />
            </div>
          </div>
          
          <div className="portfolio-item">
            <div className="portfolio-content">
              <h3 className="portfolio-title">Elite Home Services</h3>
              <p className="portfolio-description">A premium service website that targets affluent homeowners and generated $27,500 in monthly revenue increase for this home cleaning business.</p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Website Design</span>
                <span className="portfolio-tag">Service Business</span>
                <span className="portfolio-tag">Local SEO</span>
              </div>
              <a href="#" className="cta-button">View Case Study</a>
            </div>
            <div className="portfolio-image-container">
              <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Elite Home Services Website" className="portfolio-image" />
            </div>
          </div>
          
          <div className="portfolio-item">
            <div className="portfolio-content">
              <h3 className="portfolio-title">CrossFit Revolution</h3>
              <p className="portfolio-description">A dynamic fitness website that helped this new gym stand out in a competitive market and sign up 78 new members in the first month.</p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Website Design</span>
                <span className="portfolio-tag">Fitness Industry</span>
                <span className="portfolio-tag">Membership Business</span>
              </div>
              <a href="#" className="cta-button">View Case Study</a>
            </div>
            <div className="portfolio-image-container">
              <img src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="CrossFit Revolution Website" className="portfolio-image" />
            </div>
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
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg className="svg-icon" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg className="svg-icon" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg className="svg-icon" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg className="svg-icon" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
            <span>SynxBot Assistant</span>
          </div>
          <button className="minimize-button" id="minimize-chat">−</button>
        </div>
        <div className="chat-messages" id="widgetMessages"></div>
        <div className="chat-input-container">
          <textarea id="widgetPrompt" placeholder="Ask SynxBot something..."></textarea>
          <button className="ai-assistant-submit" id="widgetSubmitButton">
            <svg className="send-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
        <div className="typing-indicator" id="widgetTypingIndicator" style={{display: 'none'}}>
          SynxBot is typing<span id="widgetDots">.</span>
        </div>
      </div>
      <button className="chat-widget-button" id="chat-widget-button">
        <div className="ai-face">
          <img src="chatbot.png" className="ai-icon" alt="AI Icon" />
        </div>
      </button>

      {/* Portfolio-specific styles */}
      <style jsx>{`
        /* Portfolio styles */
        .portfolio-section {
          padding: 80px 0;
        }
        .section-title {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: var(--text-color);
        }
        .section-title p {
          font-size: 1.125rem;
          color: var(--lighter-text);
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Portfolio item */
        .portfolio-item {
          display: flex;
          align-items: center;
          margin-bottom: 120px;
        }
        .portfolio-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        .portfolio-content {
          flex: 1;
          padding: 0 40px;
        }
        .portfolio-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--text-color);
        }
        .portfolio-description {
          color: var(--lighter-text);
          font-size: 1.1rem;
          margin-bottom: 25px;
        }
        .portfolio-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }
        .portfolio-tag {
          background-color: var(--light-gray);
          color: var(--lighter-text);
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.875rem;
        }
        .portfolio-image-container {
          flex: 1;
          position: relative;
        }
        .portfolio-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
          cursor: pointer;
        }
        .portfolio-item:nth-child(1) .portfolio-image {
          transform: perspective(1000px) rotateY(-5deg) rotateX(3deg);
        }
        .portfolio-item:nth-child(2) .portfolio-image {
          transform: perspective(1000px) rotateY(5deg) rotateX(-2deg);
        }
        .portfolio-item:nth-child(3) .portfolio-image {
          transform: perspective(1000px) rotateY(-3deg) rotateX(-4deg);
        }
        .portfolio-image-container:hover .portfolio-image {
          transform: perspective(1000px) rotateY(0) rotateX(0);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}