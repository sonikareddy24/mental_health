// Sample data for stories
const sampleStories = {
    overcame: [
        {
            id: 1,
            title: "Finding Light in Darkness",
            preview: "After years of battling depression, I finally found a path forward. This is my journey of recovery...",
            author: "Sarah J.",
            date: "March 10, 2025",
            likes: 42,
            comments: 12,
            content: "I remember the day when I couldn't get out of bed. Not because I was physically unable to, but because mentally, I couldn't find a reason to. Depression had been my companion for years, but that morning marked the darkest point.<br><br>For three years, I had been struggling with what I later understood was major depressive disorder. It started subtly – a lack of interest in things I once loved, increased irritability, and a persistent feeling of emptiness. Gradually, it consumed more and more of my life.<br><br>My turning point came when my sister noticed I hadn't left my apartment in two weeks. She didn't judge me or try to offer quick solutions. She simply sat with me in the darkness, both literally and figuratively. Her presence reminded me that I wasn't completely alone.<br><br>Recovery wasn't linear. I started therapy, tried different medications, and slowly built a toolkit of coping strategies. Some days were better than others. I learned mindfulness techniques that helped ground me during overwhelming moments. I found a supportive community in a local group therapy session.<br><br>Today, I still have difficult days, but they no longer define me. Depression taught me compassion – for myself and for others struggling with invisible battles. If you're reading this and feeling hopeless, please remember: the darkness is not permanent, and you are not alone in it.",
            tags: ["Depression", "Recovery", "Therapy", "Hope"]
        },
        {
            id: 2,
            title: "Breaking Free from Anxiety",
            preview: "Anxiety controlled every aspect of my life until I decided to face it head-on...",
            author: "Michael T.",
            date: "February 25, 2025",
            likes: 37,
            comments: 9,
            content: "For as long as I can remember, anxiety was my constant companion. It whispered worst-case scenarios in my ear and kept me awake at night with racing thoughts. Simple tasks like grocery shopping or answering the phone became monumental challenges.<br><br>My anxiety manifested physically – racing heart, tight chest, sweaty palms. Sometimes I experienced full panic attacks that felt like I was dying. I began avoiding situations that might trigger these feelings, and gradually my world became smaller and smaller.<br><br>The journey to recovery began when I finally admitted to myself that this wasn't just 'being nervous' – I had an anxiety disorder. Naming it was powerful. I started with small exposures to things that made me anxious, slowly building my tolerance. I learned breathing techniques and cognitive behavioral strategies from my therapist.<br><br>A breakthrough came when I joined a rock climbing group. The focus required to climb, the supportive community, and the gradual conquering of fears on the wall became a metaphor for my larger battle with anxiety. Each small victory built my confidence.<br><br>Five years later, anxiety no longer controls my life. It still visits occasionally, but now I recognize it as just one part of me, not my entire identity. If you're struggling with anxiety, know that there is a path forward, even when it feels impossible.",
            tags: ["Anxiety", "Exposure Therapy", "CBT", "Community"]
        },
        {
            id: 3,
            title: "Healing from Trauma",
            preview: "After experiencing severe trauma, I discovered the strength within myself to heal and grow...",
            author: "Elena R.",
            date: "January 15, 2025",
            likes: 56,
            comments: 18,
            content: "There was a time when my life was clearly divided into 'before' and 'after.' The traumatic event that created this division left me feeling broken, afraid, and disconnected from myself and others.<br><br>In the early days after my trauma, I existed in survival mode. Flashbacks, nightmares, and hypervigilance dominated my experience. I struggled with feelings of shame and guilt that weren't mine to carry. Trust became nearly impossible.<br><br>My healing journey began unexpectedly when I adopted a rescue dog who had also experienced trauma. Caring for her and witnessing her gradual trust in the world again somehow gave me permission to seek help for myself. I found a therapist specialized in trauma and began the difficult work of processing what had happened.<br><br>EMDR therapy was transformative for me, helping to reprocess traumatic memories so they became less intrusive. I joined a support group where, for the first time, I felt truly understood by others with similar experiences. Slowly, I reclaimed parts of myself that trauma had stolen.<br><br>Today, while the trauma remains part of my story, it no longer defines me. I've discovered resilience I never knew I had. The 'after' part of my life now includes joy, connection, and a deep appreciation for peace when I find it. If you're in the depths of trauma recovery, please know that healing is possible – not perfect healing, but meaningful healing that allows life to be lived fully again.",
            tags: ["Trauma", "PTSD", "Recovery", "Resilience"]
        }
    ],
    struggling: [
        {
            id: 4,
            title: "Living with Bipolar Disorder",
            preview: "My ongoing journey with bipolar disorder has been filled with challenges and small victories...",
            author: "James K.",
            date: "March 5, 2025",
            likes: 29,
            comments: 15,
            content: "I was diagnosed with bipolar disorder at 23, though looking back, the signs were there much earlier. The extreme highs and devastating lows have been part of my life for over a decade now.<br><br>During manic episodes, I feel invincible – creative, energetic, and unstoppable. I've written entire novels in days, spent money I didn't have, and made impulsive decisions that took years to recover from. The depressive episodes that follow are equally extreme – darkness so heavy I can barely move, thoughts of worthlessness, and a profound emptiness.<br><br>Managing this condition is ongoing work. Medication has been crucial but finding the right combination took years of trial and error. Therapy helps me identify early warning signs of episode shifts. A strict sleep schedule and stress management are non-negotiable parts of my self-care.<br><br>I still struggle. Some days are harder than others. Relationships have been challenging to maintain, and I've had to be more selective about my work environment than most. But I'm learning to live with this part of myself rather than against it.<br><br>I don't know if I'll ever fully 'overcome' bipolar disorder, but I'm learning to thrive despite it. If you're newly diagnosed or struggling, know that while the path isn't easy, it is possible to build a meaningful life alongside this condition.",
            tags: ["Bipolar Disorder", "Mental Illness", "Ongoing Journey"]
        },
        {
            id: 5,
            title: "The Weight of OCD",
            preview: "My obsessive-compulsive disorder has been a daily battle that I'm still learning how to manage...",
            author: "David L.",
            date: "February 18, 2025",
            likes: 33,
            comments: 21,
            content: "Most people think OCD is about being tidy or washing hands. For me, it's the terrifying intrusive thoughts that come without warning and the hours of compulsive behaviors I perform to try to keep imagined disasters at bay.<br><br>My OCD centers around fears of contamination and harm. I can spend hours checking that doors are locked, appliances are turned off, or performing specific rituals to 'protect' my loved ones. The rational part of my brain knows these behaviors don't make sense, but the anxiety feels too overwhelming to resist.<br><br>Treatment has helped significantly. Exposure and Response Prevention therapy taught me to sit with the uncomfortable anxiety without performing compulsions. It's incredibly difficult – imagine someone telling you to just let a loved one die when your brain is convinced your ritual is the only thing keeping them safe.<br><br>I'm not completely better, and some days are still extremely difficult. Simple tasks can take hours, and big life changes or stress can trigger severe flare-ups. But I've made progress. I can now go days where OCD doesn't dominate my life completely.<br><br>I'm sharing this because OCD often happens in silence and shame. If you're struggling with thoughts and behaviors you can't control, please know you're not alone, and there is specialized help available that really can make a difference.",
            tags: ["OCD", "Intrusive Thoughts", "ERP Therapy", "Ongoing Struggle"]
        },
        {
            id: 6,
            title: "My Daily Dance with Social Anxiety",
            preview: "Social anxiety makes every interaction a challenge, but I'm learning to push through the fear...",
            author: "Ava M.",
            date: "March 1, 2025",
            likes: 41,
            comments: 16,
            content: "My heart pounds. My palms sweat. My mind races with all the ways I might embarrass myself. This is how I feel before virtually any social interaction – from important job interviews to simply ordering coffee.<br><br>Social anxiety disorder has been with me since childhood. I was the quiet kid who teachers worried about, the teenager who avoided parties, and now the adult who rehearses phone calls before making them. The fear of judgment is constant and exhausting.<br><br>I'm in therapy and learning tools to challenge my anxious thoughts. Cognitive restructuring helps me recognize when my fears are exaggerated. Gradual exposure to social situations helps build my confidence, though progress is slow and inconsistent.<br><br>Some days are better than others. I recently gave a presentation at work – something that would have been unthinkable a year ago. Other days, I cancel plans last minute because the anxiety feels too overwhelming.<br><br>I don't have a neat resolution to share yet. This is very much an ongoing struggle. But I'm committed to continuing this work because I've had glimpses of what life could be like without this constant fear. If you see yourself in this story, please know that reaching out for help, while terrifying, is a step worth taking.",
            tags: ["Social Anxiety", "Therapy", "Work in Progress"]
        }
    ]
};

// DOM elements
const storyModal = document.getElementById('storyModal');
const createStoryModal = document.getElementById('createStoryModal');
const closeModalBtn = document.getElementById('closeModal');
const closeCreateModalBtn = document.getElementById('closeCreateModal');
const addStoryBtn = document.querySelector('.add-story-btn');
const cancelStoryBtn = document.getElementById('cancelStory');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const likeBtn = document.getElementById('likeBtn');
const overcameStoriesContainer = document.getElementById('overcame-stories');
const strugglingStoriesContainer = document.getElementById('struggling-stories');
const filterButtons = document.querySelectorAll('.filter-btn');
const storiesColumns = document.querySelectorAll('.stories-column');
const storySearch = document.getElementById('storySearch');
const resourceCards = document.querySelectorAll('.resource-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load stories with delay for animation
    setTimeout(() => {
        loadStories('overcame', overcameStoriesContainer);
    }, 300);
    
    setTimeout(() => {
        loadStories('struggling', strugglingStoriesContainer);
    }, 600);
    
    // Initialize animations
    initAnimations();
    
    // Add event listeners
    setupEventListeners();
    
    // Load animate.css classes to elements
    addAnimationClasses();
});

// Function to load stories
function loadStories(category, container) {
    container.innerHTML = '';
    
    sampleStories[category].forEach((story, index) => {
        // Create a new story card with a slight delay for animation
        setTimeout(() => {
            const storyCard = createStoryCard(story);
            container.appendChild(storyCard);
        }, index * 150);
    });
}

// Function to create story card
function createStoryCard(story) {
    const storyCard = document.createElement('div');
    storyCard.className = 'story-card fade-in-bottom';
    storyCard.dataset.id = story.id;
    
    const authorInitials = story.author.split(' ').map(word => word[0]).join('');
    
    storyCard.innerHTML = `
        <h3 class="story-title">${story.title}</h3>
        <p class="story-preview">${story.preview}</p>
        <div class="story-meta">
            <div class="story-author">
                <div class="author-avatar">${authorInitials}</div>
                ${story.author}
            </div>
            <span>${story.date}</span>
        </div>
        <div class="story-actions">
            <button class="action-btn">
                <i class="far fa-heart"></i>
                <span class="action-count">${story.likes}</span>
            </button>
            <button class="action-btn">
                <i class="far fa-comment"></i>
                <span class="action-count">${story.comments}</span>
            </button>
            <button class="action-btn">
                <i class="far fa-bookmark"></i>
            </button>
        </div>
    `;
    
    // Add click event to open the story modal
    storyCard.addEventListener('click', () => {
        openStoryModal(story);
    });
    
    return storyCard;
}

// Function to open story modal
function openStoryModal(story) {
    // Set modal content
    document.querySelector('.modal-title').textContent = story.title;
    document.querySelector('.modal-author-name').textContent = story.author;
    document.querySelector('.modal-date').textContent = story.date;
    document.querySelector('.story-content').innerHTML = story.content;
    
    // Set author avatar initials
    const authorInitials = story.author.split(' ').map(word => word[0]).join('');
    document.querySelector('.modal-author-avatar').textContent = authorInitials;
    
    // Set like count
    document.querySelector('.modal-action-count').textContent = story.likes;
    
    // Clear and add tags
    const tagsContainer = document.querySelector('.story-tags');
    tagsContainer.innerHTML = '';
    story.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'story-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // Load comments for this story
    loadComments(story.id);
    
    // Show modal with animation
    storyModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Animate entrance
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('animate__animated', 'animate__fadeInUp');
    }, 100);
}

// Function to close story modal
function closeStoryModal() {
    document.querySelector('.modal-content').classList.remove('animate__fadeInUp');
    document.querySelector('.modal-content').classList.add('animate__fadeOutDown');
    
    setTimeout(() => {
        storyModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        document.querySelector('.modal-content').classList.remove('animate__animated', 'animate__fadeOutDown');
    }, 300);
}

// Function to load comments for a story
function loadComments(storyId) {
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = '';
    
    // Get comments for this story (or create empty array if none exist)
    const storyComments = getCommentsForStory(storyId);
    
    if (storyComments.length === 0) {
        const noComments = document.createElement('p');
        noComments.className = 'no-comments';
        noComments.textContent = 'Be the first to comment on this story.';
        commentsContainer.appendChild(noComments);
    } else {
        // Add all comments
        storyComments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });
    }
    
    // Update comment count display
    document.querySelector('.comment-count').textContent = storyComments.length;
}

// Function to get comments for a specific story
function getCommentsForStory(storyId) {
    // In a real app, this would fetch from a database
    // For this demo, we'll generate sample comments for each story
    
    // Sample comments data (simulating database)
    const sampleComments = {
        1: [
            { id: 101, author: "Maya R.", content: "Thank you for sharing your journey. Your story resonates with my own experience with depression.", date: "March 15, 2025", avatar: "MR" },
            { id: 102, author: "Alex P.", content: "The part about your sister sitting with you brought tears to my eyes. Sometimes just being present is the most powerful form of support.", date: "March 17, 2025", avatar: "AP" }
        ],
        2: [
            { id: 103, author: "Taylor J.", content: "Rock climbing as therapy - that's brilliant! I've found that physical activities that require focus have been helpful for my anxiety too.", date: "February 27, 2025", avatar: "TJ" }
        ],
        3: [
            { id: 104, author: "Jordan K.", content: "The concept of 'before and after' with trauma really hits home. Thank you for articulating this so well.", date: "January 20, 2025", avatar: "JK" },
            { id: 105, author: "Sam T.", content: "I'm just starting EMDR therapy. It's encouraging to hear it was helpful for you.", date: "February 5, 2025", avatar: "ST" },
            { id: 106, author: "Casey L.", content: "The parallel with your rescue dog is beautiful. Sometimes our healing comes from unexpected places.", date: "March 1, 2025", avatar: "CL" }
        ],
        4: [
            { id: 107, author: "Robin M.", content: "Living with bipolar disorder myself, I appreciate your candid sharing about both the manic and depressive episodes.", date: "March 10, 2025", avatar: "RM" },
            { id: 108, author: "Quinn P.", content: "The strict sleep schedule resonates - it's one of my non-negotiables too.", date: "March 12, 2025", avatar: "QP" }
        ],
        5: [
            { id: 109, author: "Morgan B.", content: "Your description of OCD is so accurate. People really don't understand it's not about being neat.", date: "February 20, 2025", avatar: "MB" },
            { id: 110, author: "Riley C.", content: "Just started ERP therapy and it's the hardest thing I've ever done. Your story gives me hope.", date: "March 1, 2025", avatar: "RC" }
        ],
        6: [
            { id: 111, author: "Skyler J.", content: "The rehearsing phone calls part - I do this too! It's exhausting but feels necessary.", date: "March 5, 2025", avatar: "SJ" },
            { id: 112, author: "Avery T.", content: "Congratulations on giving that presentation! That's a huge win.", date: "March 7, 2025", avatar: "AT" },
            { id: 113, author: "Drew K.", content: "I appreciate your honesty about this being an ongoing struggle rather than a neat success story. That's real life.", date: "March 10, 2025", avatar: "DK" }
        ]
    };
    
    return sampleComments[storyId] || [];
}

// Function to create a comment element
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item animate__animated animate__fadeIn';
    
    commentElement.innerHTML = `
        <div class="comment-author">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-meta">
                <div class="comment-author-name">${comment.author}</div>
                <div class="comment-date">${comment.date}</div>
            </div>
        </div>
        <div class="comment-content">${comment.content}</div>
        <div class="comment-actions">
            <button class="comment-like-btn"><i class="far fa-heart"></i> Like</button>
            <button class="comment-reply-btn"><i class="far fa-reply"></i> Reply</button>
        </div>
    `;
    
    // Add event listener for like button
    commentElement.querySelector('.comment-like-btn').addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-heart"></i> Liked';
        } else {
            this.innerHTML = '<i class="far fa-heart"></i> Like';
        }
    });
    
    return commentElement;
}

// Function to add a new comment
function addComment(storyId) {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    
    if (commentText === '') {
        // Shake the input to indicate it's required
        commentInput.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
            commentInput.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
        return;
    }
    
    // Create a new comment object
    const newComment = {
        id: Date.now(), // Use timestamp as unique ID
        author: "You", // In a real app, this would be the current user
        content: commentText,
        date: "Just now",
        avatar: "YO" // In a real app, this would be the user's avatar
    };
    
    // Add the comment to the beginning of the comments container
    const commentsContainer = document.querySelector('.comments-container');
    
    // Remove "no comments" message if it exists
    const noComments = commentsContainer.querySelector('.no-comments');
    if (noComments) {
        noComments.remove();
    }
    
    const commentElement = createCommentElement(newComment);
    commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
    
    // Update comment count
    const commentCount = document.querySelector('.comment-count');
    commentCount.textContent = parseInt(commentCount.textContent) + 1;
    
    // Clear input
    commentInput.value = '';
    
    // Show success animation
    const commentForm = document.querySelector('.comment-form');
    commentForm.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => {
        commentForm.classList.remove('animate__animated', 'animate__pulse');
    }, 1000);
    
    // In a real app, you would save this to a database
    console.log(`Added comment to story ${storyId}:`, newComment);
}

// Function to open create story modal
function openCreateStoryModal() {
    createStoryModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Focus on the title field
    setTimeout(() => {
        document.getElementById('storyTitle').focus();
    }, 500);
    
    // Add animation
    document.querySelector('.create-story-modal').classList.add('animate__animated', 'animate__zoomIn');
}

// Function to close create story modal
function closeCreateStoryModal() {
    document.querySelector('.create-story-modal').classList.remove('animate__zoomIn');
    document.querySelector('.create-story-modal').classList.add('animate__zoomOut');
    
    setTimeout(() => {
        createStoryModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        document.querySelector('.create-story-modal').classList.remove('animate__animated', 'animate__zoomOut');
        document.getElementById('storyForm').reset();
    }, 300);
}

// Function to toggle theme
function toggleTheme() {
    body.classList.toggle('dark-theme');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
    
    // Add animation to theme toggle
    themeToggle.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        themeToggle.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}

// Function to handle liking a story
function toggleLike() {
    likeBtn.classList.toggle('liked');
    const likeIcon = likeBtn.querySelector('i');
    const likeCount = likeBtn.querySelector('.modal-action-count');
    let count = parseInt(likeCount.textContent);
    
    if (likeBtn.classList.contains('liked')) {
        likeIcon.className = 'fas fa-heart';
        likeCount.textContent = count + 1;
        
        // Add heart animation
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        likeBtn.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    } else {
        likeIcon.className = 'far fa-heart';
        likeCount.textContent = count - 1;
    }
}

// Function to filter stories
function filterStories(filter) {
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide columns based on filter
    if (filter === 'all') {
        storiesColumns.forEach(column => {
            column.style.display = 'block';
        });
    } else {
        storiesColumns.forEach(column => {
            if (column.dataset.category === filter) {
                column.style.display = 'block';
            } else {
                column.style.display = 'none';
            }
        });
    }
}

// Function to search stories
function searchStories() {
    const searchTerm = storySearch.value.toLowerCase();
    
    // Loop through all story categories
    Object.keys(sampleStories).forEach(category => {
        const matchingStories = sampleStories[category].filter(story => 
            story.title.toLowerCase().includes(searchTerm) || 
            story.preview.toLowerCase().includes(searchTerm) ||
            story.author.toLowerCase().includes(searchTerm) ||
            story.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        // Update the respective container
        const container = category === 'overcame' ? overcameStoriesContainer : strugglingStoriesContainer;
        container.innerHTML = '';
        
        if (matchingStories.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'No stories found.';
            container.appendChild(noResults);
        } else {
            matchingStories.forEach(story => {
                const storyCard = createStoryCard(story);
                container.appendChild(storyCard);
            });
        }
    });
}

// Function to initialize animations
function initAnimations() {
    // Add floating animation to shapes
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animationDelay = Math.random() * 5 + 's';
    });
    
    // Add floating animation to icons
    document.querySelectorAll('.resource-icon').forEach(icon => {
        icon.classList.add('floating');
    });
    
    // Add glow effect to buttons
    document.querySelectorAll('.action-button, .resource-btn').forEach(btn => {
        btn.classList.add('glow-on-hover');
    });
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Function to add animation classes
function addAnimationClasses() {
    // Add animation classes to resource cards
    resourceCards.forEach((card, index) => {
        card.classList.add('animate__animated', 'animate__fadeIn');
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Function to set up all event listeners
function setupEventListeners() {
    // Modal event listeners
    closeModalBtn.addEventListener('click', closeStoryModal);
    closeCreateModalBtn.addEventListener('click', closeCreateStoryModal);
    addStoryBtn.addEventListener('click', openCreateStoryModal);
    cancelStoryBtn.addEventListener('click', closeCreateStoryModal);
    
    // Like button
    likeBtn.addEventListener('click', toggleLike);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterStories(btn.dataset.filter);
        });
    });
    
    // Search functionality
    storySearch.addEventListener('input', searchStories);
    
    // Close modal when clicking outside
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            closeStoryModal();
        }
    });
    
    createStoryModal.addEventListener('click', (e) => {
        if (e.target === createStoryModal) {
            closeCreateStoryModal();
        }
    });
    
    // Form submission (prevent default and show success message)
    document.getElementById('storyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('storyTitle').value;
        const type = document.getElementById('storyType').value;
        const content = document.getElementById('storyContent').value;
        const tags = document.getElementById('storyTags').value.split(',').map(tag => tag.trim());
        
        // Show success message and close modal
        showSuccessMessage('Your story has been shared successfully!');
        closeCreateStoryModal();
        
        // Reset form
        e.target.reset();
    });
    
    // Add comment form submission
    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get the current story ID from the modal
        const storyId = parseInt(document.querySelector('.modal-content').dataset.storyId);
        addComment(storyId);
    });
    
    // Add scroll animations
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax effect for header
        document.querySelector('header').style.backgroundPositionY = `${scrollY * 0.5}px`;
        
        // Reveal animations for elements as they come into view
        revealElementsOnScroll();
    });
    
    // Add hover effects to resource cards
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.resource-icon').classList.add('animate__animated', 'animate__heartBeat');
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.resource-icon').classList.remove('animate__animated', 'animate__heartBeat');
        });
    });
}
// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the visibility dropdown and hint element
    const visibilitySelect = document.getElementById('storyVisibility');
    const visibilityHint = document.getElementById('visibilityHint');
    
    // Set up event listener to update the hint text
    if (visibilitySelect && visibilityHint) {
        visibilitySelect.addEventListener('change', function() {
            switch(this.value) {
                case 'public':
                    visibilityHint.textContent = 'Your name will be displayed with your story';
                    break;
                case 'anonymous':
                    visibilityHint.textContent = 'Your story will be shared without revealing your identity';
                    break;
                case 'private':
                    visibilityHint.textContent = 'Only you will be able to see this story';
                    break;
            }
        });
    }
});
// Function to show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message animate__animated animate__fadeInUp';
    successMessage.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <p>${message}</p>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.classList.remove('animate__fadeInUp');
        successMessage.classList.add('animate__fadeOutDown');
        
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 3000);
}

// Function to reveal elements as they come into view
function revealElementsOnScroll() {
    const elements = document.querySelectorAll('.story-card:not(.visible), .resource-card:not(.visible)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}

// Add CSS for floating heart animation
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        color: red;
        font-size: 24px;
        animation: float 1s ease-in-out forwards;
    }

    @keyframes float {
        0% {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -100px);
            opacity: 0;
        }
    }

    .story-card.visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    .story-card {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .resource-card.visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    .resource-card {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .success-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
    }

    .success-icon {
        display: inline-block;
        margin-right: 10px;
    }
`;
document.head.appendChild(style);