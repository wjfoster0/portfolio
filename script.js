const dot = document.getElementById('dot');
    
document.addEventListener('mousemove', e => {
  const { innerWidth, innerHeight } = window;
  const offsetX = (e.clientX - innerWidth / 2) * 0.1;
  const offsetY = (e.clientY - innerHeight / 2) * 0.1;
  dot.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
});