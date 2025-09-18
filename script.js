const dot = document.getElementById('dot');
if (dot) {
  document.addEventListener('mousemove', e => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX - innerWidth / 2) * 0.1;
    const offsetY = (e.clientY - innerHeight / 2) * 0.1;
    dot.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });
}






const openModalBtns = document.querySelectorAll(".open-contact-modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalBox");

openModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalBackdrop.classList.remove("hidden");
  });
});

// Close modal if clicking outside the modal content
modalBackdrop.addEventListener("click", (e) => {
  if (!modalContent.contains(e.target)) {
    modalBackdrop.classList.add("hidden");
  }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalBackdrop.classList.add("hidden");
    }
  });



  const copyBtn = document.getElementById('copy-email');
const toast = document.getElementById('toast');
const textToCopy = 'wjfoster0@gmail.com';

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    // Show toast
    toast.textContent = 'Copied to clipboard!';
    toast.classList.add('show');

    // Hide toast after 2 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});


const mailToBtn = document.getElementById('mail-to');
const emailAddress = 'wjfoster0@gmail.com';

mailToBtn.addEventListener('click', () => {
  // Open mail client
  window.location.href = `mailto:${emailAddress}`;

  // Show toast
  toast.textContent = 'Opening emailer';
  toast.classList.add('show');

  // Hide toast after 2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
});


window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#about-me") {
    window.scrollTo(0, 0); // Scroll to top
    history.replaceState(null, "", window.location.pathname); // Remove hash
  }

  if (window.location.hash === "#my-projects") {
    window.scrollTo(0, 0); // Scroll to top
    history.replaceState(null, "", window.location.pathname); // Remove hash
  }
});




console.log("🟢 script.js loaded");

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const overlay = document.getElementById('sidebar-overlay');

console.log("menuToggle:", menuToggle);
console.log("sidebar:", sidebar);
console.log("closeSidebar:", closeSidebar);
console.log("overlay:", overlay);

function openSidebar() {
  sidebar.classList.add('open');
  overlay.style.display = 'block';
}

function closeSidebarFn() {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
}

if (menuToggle && closeSidebar && overlay && sidebar) {
  menuToggle.addEventListener('click', openSidebar);
  closeSidebar.addEventListener('click', closeSidebarFn);
  overlay.addEventListener('click', closeSidebarFn);

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebarFn);
  });
} else {
  console.warn("🚨 One or more sidebar elements not found.");
}

