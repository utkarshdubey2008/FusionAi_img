document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;

    if (!prompt) {
        alert('Please enter a prompt.');
        return; // Don't proceed if the prompt is empty
    }

    // Display the user's message
    const messagesDiv = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = prompt;
    messagesDiv.appendChild(userMessage);

    // Show loader while generating the image
    const loader = document.createElement('div');
    loader.classList.add('loader');
    messagesDiv.appendChild(loader);

    // Clear prompt area
    document.getElementById('prompt').value = '';

    // Scroll to the bottom of the chat area
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Call your backend API
    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    // Remove loader
    loader.remove();

    if (response.ok) {
        const data = await response.json();

        // Display the AI's response
        const aiMessage = document.createElement('div');
        aiMessage.classList.add('message', 'ai-message');
        aiMessage.innerHTML = `<img class="image-hidden" src="${data.photoUrl}" alt="Generated Image" />`;
        messagesDiv.appendChild(aiMessage);

        // Fade in the image
        const img = aiMessage.querySelector('img');
        img.onload = () => img.classList.add('image-visible');

        // Show regenerate button
        document.getElementById('regenerateBtn').style.display = 'block';

    } else {
        // Handle error response
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'ai-message');
        errorMessage.textContent = 'Failed to generate image';
        messagesDiv.appendChild(errorMessage);
    }

    // Scroll to the bottom of the chat area
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Regenerate image on button click
document.getElementById('regenerateBtn').addEventListener('click', async () => {
    const lastMessage = document.querySelector('.user-message:last-child');
    const prompt = lastMessage.textContent;

    // Show loader while regenerating the image
    const messagesDiv = document.getElementById('messages');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    messagesDiv.appendChild(loader);

    // Clear any existing regenerate button display
    document.getElementById('regenerateBtn').style.display = 'none';

    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    // Remove loader
    loader.remove();

    if (response.ok) {
        const data = await response.json();

        // Display the AI's response
        const aiMessage = document.createElement('div');
        aiMessage.classList.add('message', 'ai-message');
        aiMessage.innerHTML = `<img class="image-hidden" src="${data.photoUrl}" alt="Generated Image" />`;
        messagesDiv.appendChild(aiMessage);

        // Fade in the image
        const img = aiMessage.querySelector('img');
        img.onload = () => img.classList.add('image-visible');

        // Show regenerate button
        document.getElementById('regenerateBtn').style.display = 'block';

    } else {
        // Handle error response
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'ai-message');
        errorMessage.textContent = 'Failed to regenerate image';
        messagesDiv.appendChild(errorMessage);
    }

    // Scroll to the bottom of the chat area
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
