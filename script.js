
// Logo scroll effect
window.addEventListener("scroll", () => {
  const logo = document.getElementById("siteLogo");
  if (window.scrollY > 100) {
    logo.style.transform = "translateX(50vw)";
    logo.style.transition = "all 0.5s ease";
    logo.style.height = "100px";
  } else {
    logo.style.transform = "translateX(0)";
    logo.style.height = "70px";
  }
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


//  Thank You Message
  document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('thankYouPopup');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      popup.classList.add('show-popup');
    } else {
      alert('❌ Something went wrong. Please try again.');
    }
  });
});

// Fade-in animation for Mission & Vision
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-in-up');
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
});


