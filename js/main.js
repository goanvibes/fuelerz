'use strict';

(() => {
  const body = document.body;
  const page = body.dataset.page;
  
  // Highlight active nav link on Desktop
  document.querySelectorAll('.nav-links a').forEach(a => { 
    if (a.dataset.nav === page) a.classList.add('active'); 
  });
  
  // 1. DYNAMIC MOBILE MENU GENERATION
  const navLinksContainer = document.querySelector('.nav-links');
  if (navLinksContainer) {
    // Create the full screen overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-nav-overlay';
    
    // Create the content wrapper
    const mobileContent = document.createElement('div');
    mobileContent.className = 'mobile-nav-content';
    
    // Clone all desktop links into the mobile menu
    navLinksContainer.querySelectorAll('a').forEach(link => {
      const clonedLink = link.cloneNode(true);
      // Ensure the active state carries over visually
      if (clonedLink.dataset.nav === page) clonedLink.classList.add('active');
      mobileContent.appendChild(clonedLink);
    });
    
    // Append a massive WhatsApp CTA button at the bottom of the mobile menu
    const mobileCta = document.createElement('a');
    mobileCta.className = 'btn btn-primary liquid-glass-button';
    mobileCta.style.marginTop = '24px';
    mobileCta.href = 'https://wa.me/917722011476?text=Hi%20Fuelerz%2C%20I%20want%20to%20start%20a%20project.';
    mobileCta.target = '_blank';
    mobileCta.rel = 'noopener';
    mobileCta.innerHTML = 'Start a project <span>→</span>';
    mobileContent.appendChild(mobileCta);
    
    // Mount it directly to the body, escaping the restricted header!
    mobileOverlay.appendChild(mobileContent);
    document.body.appendChild(mobileOverlay);
    
    // Add click listener to close the menu when a link is clicked
    mobileOverlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        body.classList.remove('menu-open');
        const toggle = document.querySelector('.menu-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Mobile menu toggle logic
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => { 
      const isOpen = body.classList.toggle('menu-open'); 
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); 
    });
  }
  
  // 3. Performance-optimized Intersection Observer for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => { 
      entries.forEach(entry => { 
        if (entry.isIntersecting) { 
          requestAnimationFrame(() => {
            entry.target.classList.add('visible'); 
          });
          observer.unobserve(entry.target); 
        } 
      }); 
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
  
  // 4. Project Tabs
  const tabs = document.querySelectorAll('[data-order-tab]');
  const select = document.querySelector('#projectType');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => { 
      tabs.forEach(t => t.classList.remove('active')); 
      tab.classList.add('active'); 
      if (select) select.value = tab.dataset.orderTab;
    });
  });
  
  // 5. Reusable WhatsApp routing function
  const sendToWhatsApp = (formData, templateBuilder) => {
    const message = templateBuilder(formData);
    const waUrl = `https://wa.me/917722011476?text=${message}`;
    window.open(waUrl, '_blank', 'noopener');
  };

  // Order Form Handling
  const orderForm = document.querySelector('#fuelerzOrderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => { 
      e.preventDefault(); 
      const data = new FormData(orderForm); 
      sendToWhatsApp(data, (d) => `Hi Fuelerz, I want to start a project.%0A%0AName: ${encodeURIComponent(d.get('name') || '')}%0ABrand: ${encodeURIComponent(d.get('brand') || '')}%0AProject: ${encodeURIComponent(d.get('type') || '')}%0ADetails: ${encodeURIComponent(d.get('message') || '')}`);
    });
  }
  
  // Feedback Form Handling
  const feedbackForm = document.querySelector('#feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => { 
      e.preventDefault(); 
      const data = new FormData(feedbackForm); 
      sendToWhatsApp(data, (d) => `Fuelerz feedback.%0A%0AName: ${encodeURIComponent(d.get('name') || '')}%0ABrand: ${encodeURIComponent(d.get('brand') || '')}%0AType: ${encodeURIComponent(d.get('type') || '')}%0AMessage: ${encodeURIComponent(d.get('message') || '')}`);
    });
  }
})();
