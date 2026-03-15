document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Bot Configuration Data
    // ----------------------------------------------------------------------
    const botsConfig = {
        'nova': {
            name: 'Nova',
            color: 'var(--bot-nova)',
            avatar: 'static/assets/avatars/nova_avatar_1773572533263.png',
            desc: "Your upbeat, energetic cheerleader.",
            specialties: ['Motivation', 'Energy', 'Positivity'],
            replies: ["I need a push", "I'm unmotivated", "Let's celebrate a win"],
            welcome: "Hey hey hey! 🌟 I'm Nova — and I am SO glad you're here. What's going on today? Let's talk!"
        },
        'mone': {
            name: 'Mone',
            color: 'var(--bot-mone)',
            avatar: 'static/assets/avatars/mone_avatar_1773572549179.png',
            desc: "Your comforting, reassuring presence.",
            specialties: ['Comfort', 'Reassurance', 'Validation'],
            replies: ["I feel overwhelmed", "I'm feeling vulnerable", "I need comfort"],
            welcome: "Hi there. I'm Mone. Take your time, I'm here to listen. What's on your mind?"
        },
        'atlas': {
            name: 'Atlas',
            color: 'var(--bot-atlas)',
            avatar: 'static/assets/avatars/atlas_avatar_1773572567223.png',
            desc: "A deep listener for heavy days.",
            specialties: ['No toxic positivity', 'Grounded', 'Holding space'],
            replies: ["Today is really heavy", "I'm grieving", "I just want to vent"],
            welcome: "Hello. I'm Atlas. You are safe here. Would you like to share how you're doing?"
        },
        'sol': {
            name: 'Sol',
            color: 'var(--bot-sol)',
            avatar: 'static/assets/avatars/sol_avatar_1773572582068.png',
            desc: "Warm stress relief and practical grounding.",
            specialties: ['Stress Relief', 'Grounding', 'Perspective'],
            replies: ["I'm so stressed", "I feel stuck", "Help me ground myself"],
            welcome: "Hey! I'm Sol. I hope you're having a good day. If not, we can find the bright side together. What's up?"
        },
        'luna': {
            name: 'Luna',
            color: 'var(--bot-luna)',
            avatar: 'static/assets/avatars/luna_avatar_1773572598725.png',
            desc: "Serene companion for anxiety and calm.",
            specialties: ['Breathing', 'Anxiety Relief', 'Sleep'],
            replies: ["Help me calm down", "I'm feeling anxious", "Breathing exercise", "I can't sleep"],
            welcome: "Welcome. I am Luna. Let's take a deep breath together. How can I support your peace today?"
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const rawBotId = urlParams.get('bot') || 'nova';
    const botId = rawBotId.toLowerCase();
    const config = botsConfig[botId] || botsConfig['nova'];

    // ----------------------------------------------------------------------
    // Initialize UI Elements
    // ----------------------------------------------------------------------
    document.documentElement.style.setProperty('--bot-color', config.color);
    document.getElementById('sidebarAvatar').src = config.avatar;
    document.getElementById('sidebarName').textContent = config.name;
    document.getElementById('sidebarName').style.color = config.color;
    document.getElementById('sidebarDesc').textContent = config.desc;
    document.getElementById('headerAvatar').src = config.avatar;
    document.getElementById('headerAvatar').style.borderColor = config.color;
    document.getElementById('headerName').textContent = config.name;

    const specsContainer = document.getElementById('sidebarSpecialties');
    config.specialties.forEach(sp => {
        let span = document.createElement('span');
        span.className = 'badge';
        span.textContent = sp;
        specsContainer.appendChild(span);
    });

    const qrContainer = document.getElementById('quickReplies');
    config.replies.forEach(rep => {
        let btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = rep;
        btn.onclick = () => {
            chatInput.value = rep;
            chatInput.dispatchEvent(new Event('input'));
            chatInput.focus();
        };
        qrContainer.appendChild(btn);
    });

    // ----------------------------------------------------------------------
    // State & History Management
    // ----------------------------------------------------------------------
    const STORAGE_KEY = `bridges_chat_${botId}`;
    let conversationHistory = [];
    let currentMood = null;

    function loadHistory() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                conversationHistory = JSON.parse(stored);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function saveHistory() {
        // Keep only last 20 elements
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(conversationHistory.length - 20);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    }

    // ----------------------------------------------------------------------
    // Chat UI Rendering
    // ----------------------------------------------------------------------
    const chatWindow = document.getElementById('chatWindow');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const charCounter = document.getElementById('charCounter');

    function formatTime(dateObj = new Date()) {
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Initial render
    loadHistory();
    if (conversationHistory.length === 0) {
        // First time
        renderMessage("model", config.welcome, null, false);
    } else {
        // Add restored divider
        let div = document.createElement('div');
        div.className = 'chat-divider';
        div.innerHTML = `<span>Restored Session</span>`;
        chatWindow.insertBefore(div, typingIndicator);
        
        conversationHistory.forEach(msg => {
            renderMessage(msg.role, msg.content, msg.time || formatTime(), false, true);
        });
    }

    /**
     * Renders a message bubble to the chat window
     * @param {string} role "user" or "model"
     * @param {string} text Markdown or plaintext content
     * @param {string} time Formatted time string
     * @param {boolean} stream Whether to typewriter the text
     * @param {boolean} isRestore True if restoring from history
     */
    function renderMessage(role, text, time = null, stream = false, isRestore = false) {
        const isUser = (role === "user");
        const row = document.createElement('div');
        row.className = `message-row ${isUser ? 'user' : 'bot'}`;

        const bubble = document.createElement('div');
        bubble.className = "message-bubble";
        if (!isUser) bubble.classList.add("prose");

        const tstamp = document.createElement('span');
        tstamp.className = 'message-time';
        tstamp.textContent = time || formatTime();

        // Render crisis banner bypass
        if (!isUser && text.includes("iCall at 9152987821")) {
             const crisis = document.createElement('div');
             crisis.className = "crisis-banner";
             crisis.innerHTML = `<h4>In Crisis?</h4><p>We care about you. Please reach out to <a href="tel:9152987821">iCall at 9152987821</a> or <a href="tel:18602662345">Vandrevala Foundation at 1860-2662-345</a>.</p>`;
             row.appendChild(crisis);
             bubble.style.marginTop = "8px";
        }

        if (isUser) {
            bubble.textContent = text;
            bubble.appendChild(tstamp);
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.textContent = 'YOU';
            
            row.appendChild(bubble);
            row.appendChild(avatar);
        } else {
            const avatar = document.createElement('img');
            avatar.src = config.avatar;
            avatar.className = 'message-avatar';
            row.appendChild(avatar);
            
            if (stream) {
                // Typwriter effect
                const htmlContent = marked.parse(text);
                bubble.innerHTML = `<div class="stream-content"></div>`;
                bubble.appendChild(tstamp);
                row.appendChild(bubble);
                
                chatWindow.insertBefore(row, typingIndicator);
                scrollChat();

                let d = bubble.querySelector('.stream-content');
                let i = 0;
                // Hacky plain text stream, then map to markdown.
                // For safety and speed in this demo, we'll just insert the HTML slowly or fully if complex.
                // Real streaming would parse HTML tags accurately. Here we just fade it in or typewriter char by char if purely text
                d.innerHTML = htmlContent;
                d.style.opacity = '0';
                d.style.transition = 'opacity 0.5s ease';
                setTimeout(()=> d.style.opacity = '1', 50);

            } else {
                bubble.innerHTML = isUser ? text : marked.parse(text);
                bubble.appendChild(tstamp);
                row.appendChild(bubble);
            }
        }

        if (!stream) {
            chatWindow.insertBefore(row, typingIndicator);
            scrollChat();
        }
        
        if (!isRestore && (role === "user" || !stream)) {
            // we save upon user send or bot fully completed stream
            // But since stream is just a fade-in here, we can save it safely.
        }
    }

    function scrollChat() {
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    }

    // ----------------------------------------------------------------------
    // Input Logic & Resizing
    // ----------------------------------------------------------------------
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight) + 'px';
        
        const len = chatInput.value.length;
        if (len > 0) {
            sendBtn.disabled = false;
        } else {
            sendBtn.disabled = true;
        }

        if (len > 200) {
            charCounter.classList.add('show');
            charCounter.textContent = `${len} / 500`;
            if (len >= 500) charCounter.classList.add('limit');
            else charCounter.classList.remove('limit');
        } else {
            charCounter.classList.remove('show');
        }

        if (len > 500) chatInput.value = chatInput.value.slice(0, 500);
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) handleSend();
        }
    });

    sendBtn.addEventListener('click', handleSend);

    async function handleSend() {
        let text = chatInput.value.trim();
        if (!text) return;

        // Reset input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.disabled = true;
        charCounter.classList.remove('show');

        // Add user mood context if selected for the first message
        if (currentMood && conversationHistory.length < 2) {
            text = `[User selected mood: ${currentMood.toUpperCase()}] ` + text;
        }

        const msgObj = { role: 'user', content: text, time: formatTime() };
        conversationHistory.push(msgObj);
        saveHistory();
        renderMessage("user", text, msgObj.time, false);

        // Show typing
        typingIndicator.style.display = 'flex';
        scrollChat();

        try {
            // Ensure connection to Flask Server on port 5000
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bot: botId,
                    history: conversationHistory.map(m => ({role: m.role, content: m.content}))
                })
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            
            const data = await res.json();
            const reply = data.reply;
            
            typingIndicator.style.display = 'none';
            
            const botMsgObj = { role: 'model', content: reply, time: formatTime() };
            conversationHistory.push(botMsgObj);
            saveHistory();
            renderMessage("model", reply, botMsgObj.time, true);

        } catch (err) {
            console.error(err);
            typingIndicator.style.display = 'none';
            // Show error state gracefully
            const errorMsg = "The server seems to be resting. Please start it with `python app.py` and refresh.";
            renderMessage("model", errorMsg, formatTime(), false);
            
            // Show toast as well
            if(window.showToast) window.showToast("Connection failed. Check backend server.", "error");
        }
    }

    // ----------------------------------------------------------------------
    // Mood Button Logic
    // ----------------------------------------------------------------------
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMood = btn.getAttribute('data-mood');
        });
    });

    // ----------------------------------------------------------------------
    // Clear History
    // ----------------------------------------------------------------------
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        if(confirm("Are you sure you want to clear this private conversation history?")) {
            localStorage.removeItem(STORAGE_KEY);
            conversationHistory = [];
            // Remove all from DOM except welcome
            const nodes = Array.from(chatWindow.children);
            nodes.forEach(n => {
                if (n.id !== 'typingIndicator') {
                    n.remove();
                }
            });
            renderMessage("model", config.welcome, null, false);
        }
    });

});
