document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;

    // Show loading animation
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.getElementById('result').innerHTML = ''; // Clear previous results
    document.getElementById('result').appendChild(loader);

    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    // Remove loader after response
    loader.remove();

    if (response.ok) {
        const data = await response.json();

        // Create a new image container for animation
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';

        const image = document.createElement('img');
        image.src = data.photoUrl;
        image.alt = 'Generated Image';
        image.className = 'image-hidden'; // Initially hidden for animation

        const regenerateBtn = document.createElement('button');
        regenerateBtn.className = 'regenerate-btn';
        regenerateBtn.id = 'regenerateBtn';
        regenerateBtn.innerText = '🔄 Regenerate';

        resultContainer.appendChild(image);
        resultContainer.appendChild(regenerateBtn);
        document.getElementById('result').appendChild(resultContainer);

        // Fade in the image
        setTimeout(() => {
            image.classList.remove('image-hidden');
            image.classList.add('image-visible');
        }, 100); // Delay to allow for the loading animation

        // Add event listener for the regenerate button
        regenerateBtn.addEventListener('click', async () => {
            const regenerateResponse = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (regenerateResponse.ok) {
                const regenerateData = await regenerateResponse.json();
                image.src = regenerateData.photoUrl;
                
                // Reset image visibility for fade-in effect
                image.classList.remove('image-visible');
                image.classList.add('image-hidden');

                // Fade in the new image
                setTimeout(() => {
                    image.classList.remove('image-hidden');
                    image.classList.add('image-visible');
                }, 100);
            } else {
                document.getElementById('result').innerText = 'Failed to regenerate image';
            }
        });
    } else {
        document.getElementById('result').innerText = 'Failed to generate image';
    }
});
