
    function toggleChat() {
      const chat = document.getElementById('chatOverlay');
      chat.classList.toggle('open');
    }

    async function sendMessage() {
      const input = document.getElementById('userInput');
      const message = input.value.trim();
      const chatBox = document.getElementById('chatMessages');

      if (message !== '') {
        const userMsg = document.createElement('div');
        userMsg.classList.add('user');
        userMsg.textContent = message;
        chatBox.appendChild(userMsg);
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        const botMsg = document.createElement('div');
        botMsg.classList.add('bot');
        botMsg.innerHTML = `<em>Typing...</em>`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_OPENAI_KEY_HERE' // Replace with your OpenAI key
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "You are a helpful assistant for university students." },
                { role: "user", content: message }
              ]
            })
          });

          const data = await response.json();
          const reply = data.choices[0].message.content;
          botMsg.textContent = reply;
          chatBox.scrollTop = chatBox.scrollHeight;

        } catch (error) {
          botMsg.textContent = "Sorry, something went wrong.";
          console.error('ChatGPT API error:', error);
        }
      }
    }
 