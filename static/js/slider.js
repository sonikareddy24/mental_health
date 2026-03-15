document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.bot-card'));
    const dots = Array.from(document.querySelectorAll('.indicator-dot'));
    const heroSection = document.querySelector('.hero-section');
    
    let currentIndex = 0;
    
    function updateSlider() {
        cards.forEach((card, index) => {
            // Remove existing classes
            card.classList.remove('active', 'prev', 'next', 'hidden');
            
            // Apply new classes based on index
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update background gradient color based on active bot
        if (heroSection && cards[currentIndex]) {
            const botColor = cards[currentIndex].getAttribute('data-color') || '#a78bfa';
            heroSection.style.background = `radial-gradient(circle at 50% 100%, ${botColor}15 0%, transparent 60%)`;
        }
    }

    // Handle Clicks
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateSlider();
            } else {
                // If it's already active and the click wasn't ALREADY on the button
                // we redirect manually to make the whole card feel like a link.
                if (!e.target.closest('.bot-chat-btn')) {
                    const botId = card.getAttribute('data-bot');
                    window.location.href = `chat.html?bot=${botId}`;
                }
            }
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Handle Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }
    });

    // Handle touch (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderTrack = document.querySelector('.slider-track');
    
    if (sliderTrack) {
        sliderTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        sliderTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe Left -> Next
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }
        if (touchEndX > touchStartX + threshold) {
            // Swipe Right -> Prev
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        }
    }

    // Initialize
    updateSlider();
});
