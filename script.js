// ======== Global Variables ========
let currentTestimonial = 0;
let testimonialInterval;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');

// ======== Features ========
function highlightFeature(el) {
  document.querySelectorAll('.feature').forEach(f => f.classList.remove('active-feature'));
  el.classList.add('active-feature');
}

// ======== Signup Form Validation ========
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const country = document.getElementById('country').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('form-message');

  if (!name || !country || !phone || !email) {
    message.innerText = 'Please fill out all fields!';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9\s()+-]+$/;

  if (!emailRegex.test(email)) {
    message.innerText = 'Invalid email address!';
    return false;
  }

  if (!phoneRegex.test(phone)) {
    message.innerText = 'Invalid phone number!';
    return false;
  }

  message.innerText = 'Successfully signed up!';
  return false; // Prevent submission (demo)
}

// ======== Dark Mode Toggle ========
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// ======== Color Changer ========
function changeColor(color) {
  const headphoneImage = document.getElementById('headphone-image');
  const customizeSection = document.getElementById('customize');
  const buttons = document.querySelectorAll('.color-options button');

  // Clear active button highlights
  buttons.forEach(btn => btn.classList.remove('active'));

  // Activate the clicked button
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(color)) {
      btn.classList.add('active');
    }
  });

  // Remove old radial classes, add the new one
  customizeSection.className = '';
  customizeSection.classList.add('radial-' + color);

  // Fade transition for the headphone image
  headphoneImage.classList.add('color-fade');
  setTimeout(() => {
    headphoneImage.src = `./images/${color}.png`;
    headphoneImage.classList.remove('color-fade');
  }, 10);
}

// ======== Testimonials Functions ========
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
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoSlide() {
  clearInterval(testimonialInterval);
}

// ======== Swipe Support for Mobile ========
function addSwipeSupport() {
  const slider = document.querySelector('.testimonial-slider');
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    const swipeDistance = startX - endX;

    if (swipeDistance > 30) {
      nextTestimonial(); // Swipe left → Next
      stopAutoSlide(); 
      startAutoSlide(); 
    } else if (swipeDistance < -30) {
      prevTestimonial(); // Swipe right → Previous
      stopAutoSlide(); 
      startAutoSlide(); 
    }
  });
}

// ======== Restart Auto Slide ========
function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// ======== Use Case Blocks Animation ========
function animateUseCases() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.use-case-block').forEach(block => observer.observe(block));
}

// ======== Init Everything ========
window.addEventListener('DOMContentLoaded', () => {
  // Testimonials
  showTestimonial(currentTestimonial);
  startAutoSlide();

  // Arrows click restart auto-slide
  document.querySelectorAll('.testimonial-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      resetAutoSlide();
    });
  });

  addSwipeSupport();
  animateUseCases();
});


const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});


function closeMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.remove('active'); // Or whatever class you toggle to show the menu
}

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('active');
});


window.addEventListener('DOMContentLoaded', () => {
  showTestimonial(currentTestimonial);
  startAutoSlide();
  addSwipeSupport(); 
});



function animateUseCases() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // stops watching after it's visible
      }
    });
  }, { threshold: 0.2 }); // adjust threshold if needed

  document.querySelectorAll('.use-case-block').forEach(block => {
    observer.observe(block);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  animateUseCases();
});


document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Stop the form from submitting

  // Grab field values
  const firstName = document.getElementById('firstName').value.trim();
  const country = document.getElementById('country').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let errorMessage = '';

  // Validation Rules
  if (firstName.length < 2) {
    errorMessage += 'First name must be at least 2 characters long.<br>';
  }

  if (country.length < 2) {
    errorMessage += 'Country must be at least 2 characters long.<br>';
  }

  if (!/^\d{7,15}$/.test(phone)) {
    errorMessage += 'Phone number must be 7 to 15 digits.<br>';
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorMessage += 'Enter a valid email address.<br>';
  }

  if (password.length < 6) {
    errorMessage += 'Password must be at least 6 characters long.<br>';
  }

  const messageBox = document.getElementById('form-message');

  if (errorMessage) {
    messageBox.innerHTML = errorMessage;
    messageBox.style.color = '#ff0066';
  } else {
    messageBox.innerHTML = 'Success! Form submitted.';
    messageBox.style.color = 'limegreen';

    // Optional: clear the form
    document.getElementById('signupForm').reset();

    // Proceed to submit data via AJAX or other method if needed
  }
});
