
// MOBILE NAV TOGGLE

const navToggle = document.querySelector('.nav-toggle');
const navButtons = document.querySelector('.nav-bar-buttons');

if (navToggle && navButtons) {
  navToggle.addEventListener('click', () => {
    const isOpen = navButtons.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.innerHTML = isOpen
      ? '<i data-lucide="x" class="icon"></i>'
      : '<i data-lucide="menu" class="icon"></i>';
    lucide.createIcons(); // re-render the swapped icon
  });

  // close menu when a nav button is clicked
  navButtons.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => {
      navButtons.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '<i data-lucide="menu" class="icon"></i>';
      lucide.createIcons();
    });
  });
}

//NAV BAR HOVER ON SCROLL

const navBar = document.querySelector('.nav-bar');

function handleNavScroll() {
  if (window.scrollY > 10) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load in case page loads already scrolled


//SEE MY WORK BUTTON SCROLL

const seeWorkBtn = document.querySelector('.see-work-btn');
if (seeWorkBtn) {
  seeWorkBtn.addEventListener('click', () => {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}


//OPEN CONTACT MODAL LOGIC BELOW

const openModalBtns = document.querySelectorAll(".open-contact-modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalBox");

openModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalBackdrop.classList.remove("hidden");
  });
});

modalBackdrop.addEventListener("click", (e) => {
  if (!modalContent.contains(e.target)) {
    modalBackdrop.classList.add("hidden");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalBackdrop.classList.add("hidden");
    if (typeof passwordBackdrop !== 'undefined' && passwordBackdrop) {
      passwordBackdrop.classList.add("hidden");
    }
  }
});
const midsummerLink = document.getElementById('midsummer-link');
const passwordBackdrop = document.getElementById('passwordBackdrop');
const passwordBox = document.getElementById('passwordBox');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordError = document.getElementById('passwordError');

if (passwordBackdrop) {
  if (midsummerLink) {
    midsummerLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (passwordError) passwordError.classList.add('hidden');
      if (passwordInput) passwordInput.value = '';
      passwordBackdrop.classList.remove('hidden');
      if (passwordInput) passwordInput.focus();
    });
  }

  passwordBackdrop.addEventListener('click', (e) => {
    if (!passwordBox || !passwordBox.contains(e.target)) {
      passwordBackdrop.classList.add('hidden');
    }
  });

  if (passwordSubmit && passwordInput && midsummerLink) {
    passwordSubmit.addEventListener('click', () => {
      const password = passwordInput.value.trim();
      if (password === 'showmethework') {
        window.location.href = midsummerLink.href;
      } else {
        if (passwordError) passwordError.classList.remove('hidden');
      }
    });
  }

  if (passwordInput && passwordSubmit) {
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        passwordSubmit.click();
      }
    });
  }
}

const copyBtn = document.getElementById('copy-email');
const toast = document.getElementById('toast');
const textToCopy = 'wjfoster0@gmail.com';

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (toast) {
        toast.textContent = 'Copied to clipboard!';
        toast.classList.add('show');

        setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
}


// BEFORE/AFTER SLIDER


function initBeforeAfterSlider(container) {
  const beforeLayer = container.querySelector('.ba-before');
  const handle = container.querySelector('.ba-handle');
  const beforeLabel = container.querySelector('.ba-label-before');
  const afterLabel = container.querySelector('.ba-label-after');
  const afterImg = container.querySelector('.ba-after img');
  let dragging = false;

  function applyAspectRatio() {
    if (afterImg.naturalWidth && afterImg.naturalHeight) {
      container.style.aspectRatio = `${afterImg.naturalWidth} / ${afterImg.naturalHeight}`;
    }
  }

  if (afterImg.complete) {
    applyAspectRatio();
  } else {
    afterImg.addEventListener('load', applyAspectRatio);
  }

  function setPosition(percent) {
    const clamped = Math.min(100, Math.max(0, percent));
    beforeLayer.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    handle.style.left = `${clamped}%`;

    beforeLabel.style.opacity = clamped < 15 ? clamped / 15 : 1;
    afterLabel.style.opacity = clamped > 85 ? (100 - clamped) / 15 : 1;
  }

  function moveFromClientX(clientX) {
    const rect = container.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(percent);
  }

  container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragging = true;
    moveFromClientX(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (dragging) moveFromClientX(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
  });

  container.addEventListener('touchstart', (e) => {
    dragging = true;
    moveFromClientX(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (dragging) moveFromClientX(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    dragging = false;
  });
}

document.querySelectorAll('.before-after').forEach(initBeforeAfterSlider);



function setPosition(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  beforeLayer.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  handle.style.left = `${clamped}%`;

  // fade labels out as the handle nears them
  beforeLabel.style.opacity = clamped < 15 ? clamped / 15 : 1;
  afterLabel.style.opacity = clamped > 85 ? (100 - clamped) / 15 : 1;
}


//VIDEO SPEED
const heroVideo = document.querySelector('.case-video');
if (heroVideo) {
  heroVideo.playbackRate = 0.5;
}