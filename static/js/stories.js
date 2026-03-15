document.addEventListener('DOMContentLoaded', () => {
    
    // --- State ---
    let stories = [];
    let selectedTags = new Set();
    
    // --- Elements ---
    const grid = document.getElementById('storiesGrid');
    const form = document.getElementById('storyForm');
    const postBody = document.getElementById('postBody');
    const charCount = document.getElementById('postCharCount');
    const filterCheckboxes = document.querySelectorAll('.tag-filter, .bot-filter');
    const searchInput = document.getElementById('searchInput');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    // Form Tag Selection
    const formTagChips = document.querySelectorAll('#postTags .tag-chip');
    formTagChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.classList.contains('active')) {
                chip.classList.remove('active');
            } else {
                // limit to 3
                const activeCount = document.querySelectorAll('#postTags .tag-chip.active').length;
                if (activeCount < 3) {
                    chip.classList.add('active');
                } else {
                    if(window.showToast) window.showToast('You can only select up to 3 tags.', 'warning');
                }
            }
        });
    });

    // Character Counter
    postBody.addEventListener('input', () => {
        const len = postBody.value.length;
        charCount.textContent = `${len} / 800`;
        if (len >= 800) charCount.style.color = '#f87171';
        else charCount.style.color = 'var(--color-text-muted)';
    });

    // --- Fetch & Render ---
    async function fetchStories() {
        try {
            const res = await fetch('http://localhost:5000/api/stories');
            if (res.ok) {
                stories = await res.json();
                renderStories();
            }
        } catch (e) {
            console.error("Could not load stories", e);
            grid.innerHTML = '<div class="empty-state">Could not connect to server. Please try again.</div>';
        }
    }

    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }

    function renderStories() {
        const query = searchInput.value.toLowerCase();
        
        // Gather active filters
        const activeTagFilters = Array.from(document.querySelectorAll('.tag-filter:checked')).map(cb => cb.value);
        const activeBotFilters = Array.from(document.querySelectorAll('.bot-filter:checked')).map(cb => cb.value);
        
        const filtered = stories.filter(s => {
            // Search text
            const textMatch = (s.title && s.title.toLowerCase().includes(query)) || 
                              (s.body && s.body.toLowerCase().includes(query));
            
            // Tag match
            const tagMatch = activeTagFilters.length === 0 || 
                             (s.tags && activeTagFilters.some(t => s.tags.includes(t)));
                             
            // Bot match
            const botMatch = activeBotFilters.length === 0 || 
                             (s.bot && activeBotFilters.includes(s.bot.toLowerCase()));
                             
            return textMatch && tagMatch && botMatch;
        });

        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state">No stories found matching your criteria.</div>';
            return;
        }

        filtered.forEach(story => {
            const card = document.createElement('div');
            card.className = 'story-card';
            
            // Tags HTML
            let tagsHTML = '';
            if (story.tags) {
                story.tags.forEach(t => {
                    tagsHTML += `<span class="badge" style="background:rgba(255,255,255,0.05);">${t}</span>`;
                });
            }

            // Bot Tag HTML
            let botHTML = '';
            if (story.bot) {
                const colors = { nova:'#f5c97a', mone:'#f4a8b8', atlas:'#7ab8e8', sol:'#a8d8a0', luna:'#c4a8e8' };
                botHTML = `<div class="story-bot-tag" style="color:${colors[story.bot] || 'white'}">Chatted with ${story.bot}</div>`;
            }

            // Truncate logic
            const isLong = story.body.length > 200;

            card.innerHTML = `
                <div class="story-meta">
                    <span>${story.author || 'Anonymous'}</span>
                    <span>${timeAgo(story.created_at)}</span>
                </div>
                <h3 class="story-title">${story.title}</h3>
                <div class="story-tags">${tagsHTML}</div>
                <p class="story-body" id="body-${story.id}">${story.body}</p>
                ${isLong ? `<button class="read-more-btn" data-id="${story.id}">Read more</button>` : ''}
                
                <div class="story-footer">
                    <button class="helpful-btn" data-id="${story.id}">
                        <svg class="helpful-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span class="helpful-count">${story.helpful || 0}</span>
                    </button>
                    ${botHTML}
                </div>
            `;
            grid.appendChild(card);
        });

        // Add Listeners to buttons inside grid
        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const bodyElem = document.getElementById(`body-${id}`);
                if (bodyElem.classList.contains('expanded')) {
                    bodyElem.classList.remove('expanded');
                    e.target.textContent = 'Read more';
                } else {
                    bodyElem.classList.add('expanded');
                    e.target.textContent = 'Show less';
                }
            });
        });

        document.querySelectorAll('.helpful-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const target = e.currentTarget;
                if (target.classList.contains('voted')) return;
                
                const id = target.getAttribute('data-id');
                try {
                    const res = await fetch(`http://localhost:5000/api/stories/${id}/helpful`, {
                        method: 'POST'
                    });
                    if (res.ok) {
                        const data = await res.json();
                        target.querySelector('.helpful-count').textContent = data.helpful;
                        target.classList.add('voted');
                        target.querySelector('.helpful-icon').setAttribute('fill', '#f43f5e');
                    }
                } catch(err) {
                    console.error("Failed to upvote", err);
                }
            });
        });
    }

    // --- Events ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitStoryBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        const activeTags = Array.from(document.querySelectorAll('#postTags .tag-chip.active')).map(el => el.getAttribute('data-val'));
        
        const payload = {
            title: document.getElementById('postTitle').value,
            body: document.getElementById('postBody').value,
            tags: activeTags,
            anonymous: true
        };

        try {
            const res = await fetch('http://localhost:5000/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                const newStory = await res.json();
                stories.unshift(newStory);
                renderStories();
                form.reset();
                document.querySelectorAll('#postTags .tag-chip.active').forEach(c => c.classList.remove('active'));
                charCount.textContent = '0 / 800';
                if(window.showToast) window.showToast("Your story was shared successfully.", "success");
            }
        } catch (err) {
            if(window.showToast) window.showToast("Failed to post story. Check connection.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Post Anonymously';
        }
    });

    searchInput.addEventListener('input', renderStories);
    filterCheckboxes.forEach(cb => cb.addEventListener('change', renderStories));
    
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterCheckboxes.forEach(cb => cb.checked = false);
        renderStories();
    });

    // --- Quotes Logic ---
    const quotes = [
        `"Healing doesn't mean the damage never existed. It means the damage no longer controls our lives."`,
        `"You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn't make you a negative person. It makes you human."`,
        `"Sometimes the bravest and most important thing you can do is just show up."`,
        `"It is okay to have days where all you do is breathe."`
    ];
    let quoteIndex = 0;
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        const qContainer = document.getElementById('dailyQuote');
        qContainer.innerHTML = ''; // trigger reflow
        const span = document.createElement('span');
        span.textContent = quotes[quoteIndex];
        qContainer.appendChild(span);
    }, 15000);

    // Initial Fetch
    fetchStories();
});
