/*
    Valendu Academy Chatbot Script
    Predefined smart replies with typing effect
    No API / No Backend — works on GitHub Pages
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM References ---
    const toggleBtn = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const sendBtn = document.getElementById('chatbotSend');
    const inputField = document.getElementById('chatbotInput');
    const messagesBox = document.getElementById('chatbotMessages');

    // --- Toggle Chat Window ---
    toggleBtn.addEventListener('click', () => {
        const isOpen = chatWindow.classList.toggle('open');
        toggleBtn.classList.toggle('active');

        // Send welcome message on first open
        if (isOpen && messagesBox.children.length === 0) {
            sendWelcome();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        toggleBtn.classList.remove('active');
    });

    // --- Send Message on Button Click ---
    sendBtn.addEventListener('click', handleSend);

    // --- Send Message on Enter Key ---
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // --- Handle Send Logic ---
    function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        inputField.value = '';

        // Show typing indicator, then reply
        showTyping();
        setTimeout(() => {
            removeTyping();
            const reply = getBotReply(text);
            appendMessage(reply, 'bot');
        }, 1200);
    }

    // --- Welcome Message ---
    function sendWelcome() {
        setTimeout(() => {
            showTyping();
            setTimeout(() => {
                removeTyping();
                appendMessage(
                    '👋 Welcome to <strong>Valendu Academy</strong>! I\'m your virtual assistant. How can I help you today?<br><br>Try typing: <em>join, fees, trial, location, contact</em>',
                    'bot'
                );
                // Add WhatsApp button after welcome
                appendWhatsAppLink();
            }, 800);
        }, 400);
    }

    // --- Predefined Bot Replies ---
    function getBotReply(message) {
        const msg = message.toLowerCase();

        if (msg.includes('join') || msg.includes('admission')) {
            return 'To join Valendu Academy, please fill out the registration form on our website or contact us on WhatsApp. ⚽';
        }
        if (msg.includes('fees') || msg.includes('fee') || msg.includes('cost') || msg.includes('price')) {
            return 'Fees depend on the training program. Please contact us on WhatsApp for full details. 💰';
        }
        if (msg.includes('trial')) {
            return 'Trial sessions are available every weekend. Contact us to book your slot. 🏟️';
        }
        if (msg.includes('location') || msg.includes('address') || msg.includes('where')) {
            return 'You can find our academy location in the Contact section of our website. 📍';
        }
        if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('whatsapp')) {
            return 'You can join our official WhatsApp channel for updates and queries. 📞';
        }
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return 'Hello! 👋 Welcome to Valendu Academy. How can I assist you?';
        }
        if (msg.includes('thank')) {
            return 'You\'re welcome! Feel free to reach out anytime. ⚽🏆';
        }
        if (msg.includes('training') || msg.includes('program')) {
            return 'We offer Beginner Training, Advanced Training, Strength & Conditioning, and Match Practice. Check our Training section for details! 💪';
        }
        if (msg.includes('achievement') || msg.includes('champion') || msg.includes('winner')) {
            return 'We\'re proud of our achievements: District Team Captain, District Champion (Player of the Tournament), State Championship Winner, and National Round selection! 🏅';
        }

        // Default
        return 'Thank you for messaging Valendu Academy. Please type your query like: <em>join, fees, trial, contact</em>. 🤖';
    }

    // --- Append Message to Chat ---
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
        messagesBox.appendChild(msgDiv);
        scrollToBottom();
    }

    // --- Append WhatsApp Link ---
    function appendWhatsAppLink() {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('chat-msg', 'bot');
        linkDiv.innerHTML = `
            <div class="msg-bubble">
                <a href="https://whatsapp.com/channel/0029Vb7achN2kNFiwk0ICg3p" target="_blank" class="chat-whatsapp-link">
                    <i class="fab fa-whatsapp"></i> Join Official WhatsApp Channel
                </a>
            </div>
        `;
        messagesBox.appendChild(linkDiv);
        scrollToBottom();
    }

    // --- Typing Indicator ---
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-msg', 'bot');
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        messagesBox.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    // --- Auto Scroll ---
    function scrollToBottom() {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

});
