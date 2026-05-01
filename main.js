// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(11,13,18,0.97)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(11,13,18,0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ===== ACTIVE NAV LINK ON CLICK =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navLinks.classList.remove('open');
  });
});

// ===== FLOATING CARD PARALLAX ON MOUSE MOVE =====
const panel = document.querySelector('.hero-panel');
const cards = document.querySelectorAll('.panel-card');

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  cards.forEach((card, i) => {
    const depth = (i + 1) * 5;
    card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

// Reset on mouse leave
document.addEventListener('mouseleave', () => {
  cards.forEach(c => { c.style.transform = ''; });
});

// ===== INTERSECTION OBSERVER – fade-in on scroll =====
const observerOpts = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOpts);

document.querySelectorAll('.hero-content > *').forEach(el => {
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});


// ===== CONTACT FORM SUBMIT (Real Email via Formsubmit.co) =====
async function handleFormSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('sendBtn');
  const btnText = document.getElementById('sendBtnText');
  const btnLoader = document.getElementById('sendBtnLoader');
  const formEl = document.getElementById('contactMainForm');
  const successEl = document.getElementById('formSuccess');

  // Show loading state
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  btn.disabled = true;

  // Collect form data
  const formData = new FormData(formEl);

  try {
    const response = await fetch('https://formsubmit.co/ajax/skillmatch.career@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    const result = await response.json();

    if (result.success === 'true' || result.success === true) {
      // Hide form, show success message
      formEl.style.display = 'none';
      successEl.style.display = 'flex';

      // Reset after 5 seconds
      setTimeout(() => {
        formEl.style.display = 'flex';
        successEl.style.display = 'none';
        formEl.reset();
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btn.disabled = false;
      }, 5000);

    } else {
      throw new Error('Server error');
    }

  } catch (err) {
    // Fallback: show error
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    btnText.textContent = '✗ Failed! Try again';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    btn.disabled = false;

    setTimeout(() => {
      btnText.textContent = 'Send Message';
      btn.style.background = 'linear-gradient(135deg, #7c3aed, #a855f7)';
    }, 3000);
  }
}


// ===== NEWSLETTER SUBSCRIBE =====
function handleNewsletter(e) {
  e.preventDefault();
  const btn = document.getElementById('subBtn');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = 'linear-gradient(135deg, #7c3aed, #a855f7)';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}


