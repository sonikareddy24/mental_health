document.addEventListener('DOMContentLoaded', () => {
    
    // Breathe Widget Variables
    const circle = document.getElementById('breatheCircle');
    const text = document.getElementById('breatheText');
    const startBtn = document.getElementById('startBreatheBtn');
    const stopBtn = document.getElementById('stopBreatheBtn');
    
    let breatheInterval;
    let isBreathing = false;
    
    // Timings (in milliseconds)
    const BREATHE_IN = 4000;
    const HOLD = 4000;
    const BREATHE_OUT = 4000;
    const HOLD_OUT = 4000;
    const TOTAL_CYCLE = BREATHE_IN + HOLD + BREATHE_OUT + HOLD_OUT;

    function breatheAnimation() {
        // Breathe In
        text.textContent = 'Inhale...';
        circle.style.transition = `transform ${BREATHE_IN}ms ease-out`;
        circle.style.transform = 'scale(2.5)';
        
        setTimeout(() => {
            if (!isBreathing) return;
            // Hold In
            text.textContent = 'Hold...';
            
            setTimeout(() => {
                if (!isBreathing) return;
                // Breathe Out
                text.textContent = 'Exhale...';
                circle.style.transition = `transform ${BREATHE_OUT}ms ease-out`;
                circle.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    if (!isBreathing) return;
                    // Hold Out
                    text.textContent = 'Hold...';
                }, BREATHE_OUT);
                
            }, HOLD);
            
        }, BREATHE_IN);
    }

    startBtn.addEventListener('click', () => {
        isBreathing = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        
        breatheAnimation();
        breatheInterval = setInterval(breatheAnimation, TOTAL_CYCLE);
    });

    stopBtn.addEventListener('click', () => {
        isBreathing = false;
        clearInterval(breatheInterval);
        
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        
        text.textContent = 'Ready';
        circle.style.transition = 'transform 1s ease-out';
        circle.style.transform = 'scale(1)';
    });

});
