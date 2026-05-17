document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chatContainer');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');

  const addMessage = (text, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = text;
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const sendMessage = async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(`<strong>You:</strong> ${message}`, 'user');
    messageInput.value = '';
    
    // Show typing indicator
    addMessage('<strong>AI:</strong> Thinking...', 'bot-thinking');

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
      const thinkingIndicator = document.querySelector('.bot-thinking');
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }

      addMessage(`<strong>AI:</strong> ${data.reply}`, 'bot');

    } catch (error) {
      console.error('Error:', error);
      
      const thinkingIndicator = document.querySelector('.bot-thinking');
      if (thinkingIndicator) {
        thinkingIndicator.remove();
      }
      
      addMessage('<strong>AI:</strong> Sorry, something went wrong.', 'bot');
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
