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
    loader.innerHTML = 'Loading...'; // Optional text for the loader
    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'ai-message');
    aiMessage.appendChild(loader); // Add loader to AI message
    messagesDiv.appendChild(aiMessage);

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

        if (response.ok) {
            const data = await response.json();

            // Remove the loader and display the AI's response
            loader.remove();
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');
            const img = document.createElement('img');
            img.src = data.photoUrl;
            img.alt = "Generated Image";
            
            // Handle image loading errors
            img.onerror = () => {
                img.alt = "Failed to load image";
                img.src = ""; // Optionally clear the src to hide broken image icon
            };

            // Append the image to the container
            imgContainer.appendChild(img);
            aiMessage.appendChild(imgContainer);
            messagesDiv.appendChild(aiMessage);

            // Fade in the image once it loads
            img.onload = () => {
                img.classList.add('image-visible');
            };

        } else {
            // Remove loader and show error message
            loader.remove();
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('message', 'ai-message');
            errorMessage.textContent = 'Failed to generate image';
            messagesDiv.appendChild(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        loader.remove();
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'ai-message');
        errorMessage.textContent = 'An error occurred while generating the image.';
        messagesDiv.appendChild(errorMessage);
    }

    // Scroll to the bottom of the chat area
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
