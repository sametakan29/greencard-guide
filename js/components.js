// components.js — dynamically load navbar and footer templates
(function() {
  async function loadComponent(id, path) {
    try {
      const response = await fetch('templates/' + path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
      setActiveNavLink();
    } catch (error) {
      console.warn('Could not load component:', path, error);
    }
  }
  
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Load navbar and footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (navbarContainer) {
      loadComponent('navbar-container', 'navbar.html');
    }
    
    if (footerContainer) {
      loadComponent('footer-container', 'footer.html');
    }
  }
})();
