document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chatContainer');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const quickActionsContainer = document.getElementById('quickActions');

  const addMessage = (text, sender, avatar = '') => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    if (sender === 'user') {
      avatar = '👤'; // User avatar
    } else if (sender === 'bot') {
      avatar = '🤖'; // Bot avatar
    }

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    avatarDiv.textContent = avatar;
    messageDiv.appendChild(avatarDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');

    const messageTextDiv = document.createElement('div');
    messageTextDiv.classList.add('message-text');
    messageTextDiv.innerHTML = text; // Use innerHTML to allow basic formatting if needed

    contentDiv.appendChild(messageTextDiv);
    messageDiv.appendChild(contentDiv);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  // Initial bot message
  // addMessage(`Hey! I'm PocketAI, your mobile companion. Ask me anything or use quick actions above!`, 'bot');

  const sendMessage = async (messageText) => {
    const message = messageText || messageInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    messageInput.value = '';
    
    // Show typing indicator
    const thinkingMessage = addMessage('Thinking...', 'bot-thinking', '🤖');
    const thinkingIndicator = chatContainer.lastChild; // Get the added thinking message div

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();

      // Remove typing indicator
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }
      
      if (response.ok) {
        addMessage(data.reply, 'bot');
      } else {
        addMessage(`Error from AI: ${data.error || 'Unknown error'}`, 'bot');
      }

    } catch (error) {
      console.error('Error:', error);
      
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }
      
      addMessage('Sorry, something went wrong with the connection.', 'bot');
    }
  };

  // Handle quick actions
  quickActionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) {
      const prompt = e.target.dataset.prompt;
      messageInput.value = prompt; // Pre-fill input with prompt
      messageInput.focus();
    }
  });


  sendBtn.addEventListener('click', () => sendMessage());
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
