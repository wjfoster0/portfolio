function initCarousel(carouselId, autoScroll = true, scrollInterval = 3000) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.next');
    const prevButton = carousel.querySelector('.prev');
    
    let currentIndex = 0;
    let autoScrollInterval = null;
    
    // Variables for swipe detection
    let touchStartX = 0;
    let touchEndX = 0;
    
    function updateSlidePosition() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    
    function goToNext() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    }
    
    function goToPrev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    }
    
    function startAutoScroll() {
      if (autoScroll) {
        stopAutoScroll(); // Prevent multiple intervals
        autoScrollInterval = setInterval(goToNext, scrollInterval);
      }
    }
    
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
    
    // Swipe detection
    function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
    }
    
    function handleTouchMove(event) {
      touchEndX = event.touches[0].clientX;
    }
    
    function handleTouchEnd() {
      if (touchStartX > touchEndX + 50) {
        // Swipe left (next slide)
        goToNext();
      } else if (touchStartX < touchEndX - 50) {
        // Swipe right (previous slide)
        goToPrev();
      }
    }
  
    nextButton.addEventListener('click', goToNext);
    prevButton.addEventListener('click', goToPrev);
    window.addEventListener('resize', updateSlidePosition);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
  
    // Add touch event listeners for swiping
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
  
    updateSlidePosition();
    startAutoScroll();
  }
  
  // Initialize carousels
  initCarousel('carousel-1', true, 7000);
  initCarousel('carousel-2', true, 7000);
  initCarousel('carousel-3', true, 7000);
  initCarousel('carousel-4', true, 7000);
  initCarousel('carousel-5', true, 7000);
  initCarousel('carousel-6', true, 7000);
  