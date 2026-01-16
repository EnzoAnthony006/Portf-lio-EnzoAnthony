<script>
  const wrapper = document.querySelector('.wrapper-projects');
  const cards = document.querySelectorAll('.cards-project');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 20; // largura + margin
  const maxIndex = cards.length - 1;

  function updateCarousel() {
    wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    wrapper.style.transition = 'transform 0.6s ease';
  }


  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      updateCarousel();
    });
  }


  let startX = 0;
  let isDragging = false;

  wrapper.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX;
    wrapper.style.cursor = 'grabbing';
  });

  wrapper.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const diff = e.pageX - startX;

    if (diff < -50 && currentIndex < maxIndex) currentIndex++;
    if (diff > 50 && currentIndex > 0) currentIndex--;

    updateCarousel();
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });


  wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;

    if (diff < -50 && currentIndex < maxIndex) currentIndex++;
    if (diff > 50 && currentIndex > 0) currentIndex--;

    updateCarousel();
  });
</script>
