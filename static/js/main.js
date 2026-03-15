// shared utilities

// Page Load Transition
document.addEventListener("DOMContentLoaded", () => {
    // Reveal body after content is loaded
    document.body.classList.remove("page-exit");
});

document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    
    // Improved internal link check for both http and file protocols
    const isInternal = link.host === window.location.host || (window.location.protocol === 'file:' && !link.href.startsWith('http'));

    if (isInternal && !link.hash && link.target !== "_blank") {
        e.preventDefault();
        const href = link.href;
        document.body.classList.add("page-exit");
        
        // Wait for CSS transition (0.3s)
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }
});

// Toast Notification Utility
window.showToast = function(message, type = "info") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    container.appendChild(toast);
    
    // Trigger reflow to play animation
    void toast.offsetWidth;
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isFlex = window.getComputedStyle(navLinks).display === 'flex';
            if (isFlex && window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--color-bg-surface)';
                navLinks.style.padding = 'var(--space-4)';
            }
        });
    }
});
