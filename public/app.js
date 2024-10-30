document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').innerHTML = `
            <div class="result-container">
                <img src="${data.photoUrl}" alt="Generated Image" />
                <button class="regenerate-btn" id="regenerateBtn">🔄 Regenerate</button>
            </div>
        `;

        // Add event listener for the regenerate button
        document.getElementById('regenerateBtn').addEventListener('click', async () => {
            const regenerateResponse = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (regenerateResponse.ok) {
                const regenerateData = await regenerateResponse.json();
                document.querySelector('.result-container img').src = regenerateData.photoUrl;
            } else {
                document.getElementById('result').innerText = 'Failed to regenerate image';
            }
        });
    } else {
        document.getElementById('result').innerText = 'Failed to generate image';
    }
});
