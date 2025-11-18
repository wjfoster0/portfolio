
// ---------------------
// Setup
// ---------------------
const tabButtons = document.querySelectorAll('.tab-button');   // only visible tabs
const triggers = document.querySelectorAll('.tab-trigger');    // any tab activator
const pill = document.createElement('div');
pill.className = 'sliding-pill';

const tabsContainer = document.querySelector('.tabs');
tabsContainer.appendChild(pill);

// ---------------------
// Movement Logic
// ---------------------
function movePill(activeTab) {
  const rect = activeTab.getBoundingClientRect();
  const containerRect = tabsContainer.getBoundingClientRect();

  pill.style.width = `${rect.width}px`;
  pill.style.transform = `translateX(${rect.left - containerRect.left}px)`;
}

// Hover lean toward a hovered tab
function leanToward(tab) {
  const activeTab = document.querySelector('.tab-button.active');
  if (!activeTab) return;

  const activeRect = activeTab.getBoundingClientRect();
  const hoverRect = tab.getBoundingClientRect();
  const containerRect = tabsContainer.getBoundingClientRect();

  const activeX = activeRect.left - containerRect.left;
  const hoverX = hoverRect.left - containerRect.left;

  const leanAmount = 0.1; // 10% toward the hovered tab
  const leanedX = activeX + (hoverX - activeX) * leanAmount;

  pill.style.transform = `translateX(${leanedX}px)`;
}

// ---------------------
// Activation Logic (reusable)
// ---------------------
function activateTabById(id) {
  // Deactivate everything
  tabButtons.forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  // Activate content
  const targetContent = document.getElementById(id);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // If there's a visible tab button with that ID → move the pill
  const visibleTab = [...tabButtons].find(t => t.dataset.tab === id);
  if (visibleTab) {
    visibleTab.classList.add('active');
    movePill(visibleTab);
  }
}

// ---------------------
// Setup initial tab
// ---------------------
const initial = tabButtons[0];
initial.classList.add('active');
activateTabById(initial.dataset.tab);

// ---------------------
// Handle clicks on ALL triggers
// ---------------------
triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const targetId = trigger.dataset.tab;
    activateTabById(targetId);
  });
});

// ---------------------
// Hover lean — ONLY on visible tab buttons
// ---------------------
tabButtons.forEach(tab => {
  tab.addEventListener('mouseenter', () => leanToward(tab));
  tab.addEventListener('mouseleave', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) movePill(activeTab);
  });
});



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


window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });



  const params = new URLSearchParams(window.location.search);
  const tabFromLink = params.get("tab");
  
  // Check if URL parameter matches a real tab
  const targetTabBtn = [...tabButtons].find(btn => btn.dataset.tab === tabFromLink);
  
  if (targetTabBtn) {
    // Valid tab in URL → load it
    activateTabById(tabFromLink);
  } else {
    // Fallback → always show tab 1
    const initial = tabButtons[0];
    initial.classList.add('active');
    activateTabById(initial.dataset.tab);
  }