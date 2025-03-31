// ======== Global Variables ========
let currentTestimonial = 0;
let testimonialInterval;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');


// ======== Color Changer ========
function changeColor(color) {
  const headphoneImage = document.getElementById('headphone-image');
  const customizeSection = document.getElementById('customize');

  customizeSection.className = `radial-${color}`;
  headphoneImage.classList.add('color-fade');
  headphoneImage.src = `./images/${color}.png`;
}
 
// ======== Testimonials ========
function showTestimonial(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
  showTestimonial(currentTestimonial);
}

function startAutoSlide() {
  testimonialInterval = setInterval(nextTestimonial, 8000);
}

function stopAutoSlide() {
  clearInterval(testimonialInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// ======== Swipe Support ========
function addSwipeSupport() {
  const slider = document.querySelector('.testimonial-slider');
  let startX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const swipeDistance = startX - endX;

    if (swipeDistance > 30) {
      nextTestimonial();
    } else if (swipeDistance < -30) {
      prevTestimonial();
    }
    resetAutoSlide();
  });
}

// ======== Use Case Animation ========
function animateUseCases() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.use-case-block').forEach(block => observer.observe(block));
}

// ======== Mobile Menu ========
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}

function closeMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.remove('active');
}



// ======== Signup Form Validation ========
function validateSignupForm(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const country = document.getElementById('country').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password')?.value.trim();  

  let errorMessage = '';

  if (firstName.length < 2) errorMessage += 'First name must be at least 2 characters long.<br>';
  if (country.length < 2) errorMessage += 'Country must be at least 2 characters long.<br>';
  if (!/^\d{7,15}$/.test(phone)) errorMessage += 'Phone number must be 7 to 15 digits.<br>';
  if (!/^\S+@\S+\.\S+$/.test(email)) errorMessage += 'Enter a valid email address.<br>';

  const messageBox = document.getElementById('form-message');

  if (errorMessage) {
    messageBox.innerHTML = errorMessage;
    messageBox.style.color = '#ff0066';
  } else {
    messageBox.innerHTML = 'Success! Form submitted.';
    messageBox.style.color = 'limegreen';
    document.getElementById('signupForm').reset();
  }
}
 

// ======== Init ========
function init() {
  showTestimonial(currentTestimonial);
  startAutoSlide();
  addSwipeSupport();
  animateUseCases();
  initMobileMenu();

  document.querySelectorAll('.testimonial-arrow').forEach(arrow => {
    arrow.addEventListener('click', resetAutoSlide);
  });

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', validateSignupForm);
  }
}





window.addEventListener('DOMContentLoaded', init);
