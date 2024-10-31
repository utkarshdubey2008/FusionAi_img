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
    try {
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

            // Check if there's an array of images
            if (Array.isArray(data.photoUrls)) {
                data.photoUrls.forEach(photoUrl => {
                    // Display the AI's response for each image
                    const aiMessage = document.createElement('div');
                    aiMessage.classList.add('message', 'ai-message');
                    aiMessage.innerHTML = `<div class="image-container"><img class="image-hidden" src="${photoUrl}" alt="Generated Image" /></div>`;
                    messagesDiv.appendChild(aiMessage);

                    // Fade in the image
                    const img = aiMessage.querySelector('img');
                    img.onload = () => img.classList.add('image-visible');

                    // Auto-scroll to the bottom after adding each image
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                });
            } else {
                // Handle single image case
                const aiMessage = document.createElement('div');
                aiMessage.classList.add('message', 'ai-message');
                aiMessage.innerHTML = `<div class="image-container"><img class="image-hidden" src="${data.photoUrl}" alt="Generated Image" /></div>`;
                messagesDiv.appendChild(aiMessage);

                // Fade in the image
                const img = aiMessage.querySelector('img');
                img.onload = () => img.classList.add('image-visible');

                // Auto-scroll to the bottom
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }

        } else {
            // Handle error response
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('message', 'ai-message');
            errorMessage.textContent = 'Failed to generate image';
            messagesDiv.appendChild(errorMessage);
        }

    } catch (error) {
        console.error("Error generating image:", error);
        loader.remove();
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'ai-message');
        errorMessage.textContent = 'Error generating image';
        messagesDiv.appendChild(errorMessage);
    }

    // Scroll to the bottom of the chat area
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
