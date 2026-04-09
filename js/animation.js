const Animation = {
  init() {
    this.observe();
  },

  observe() {
    const elements = document.querySelectorAll('.fade-left, .fade-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }
};
