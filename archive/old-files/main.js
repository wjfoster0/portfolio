const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.box');
let currentIndex = 0;




function scrollToBox(index) {
    if (index >= 0 && index < boxes.length) {
      const box = boxes[index];
      const boxRect = box.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const containerScrollTop = container.scrollTop;
      const boxTopRelativeToContainer = boxRect.top - containerRect.top;
      const containerHeight = container.clientHeight;
      const boxHeight = box.offsetHeight;
  
      const scrollTo = containerScrollTop + boxTopRelativeToContainer - (containerHeight / 2) + (boxHeight / 2);
  
      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
  
      currentIndex = index;
      updateButtonVisibility(); // 🔥 add this line
    }
  }
  
document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    scrollToBox(currentIndex - 1);
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (currentIndex < boxes.length - 1) {
    scrollToBox(currentIndex + 1);
  }
});

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updateButtonVisibility() {
    if (currentIndex === 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
  
    if (currentIndex === boxes.length - 1) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }


container.addEventListener('scroll', handleScroll);

function handleScroll() {
  let closestIndex = 0;
  let closestDistance = Infinity;

  boxes.forEach((box, index) => {
    const rect = box.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== currentIndex) {
    currentIndex = closestIndex;
    updateButtonVisibility();
  }
}





const toggle = document.querySelector('.dropdown-toggle');
const menu = document.querySelector('.dropdown-menu');
const arrow = document.querySelector('.arrow-icon');

toggle.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from bubbling up
  const isOpen = menu.style.display === 'flex';

  menu.style.display = isOpen ? 'none' : 'flex';
  arrow.classList.toggle('arrow-rotate', !isOpen);
});

// Close dropdown if clicking outside
document.addEventListener('click', () => {
  menu.style.display = 'none';
  arrow.classList.remove('arrow-rotate');
});


updateButtonVisibility();


function copyDivText() {
  const text = document.getElementById("textToCopy").innerText;
  navigator.clipboard.writeText(text)
    .then(() => {
      const toast = document.getElementById("toast");
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    })
    .catch(err => console.error("Failed to copy: ", err));
}



