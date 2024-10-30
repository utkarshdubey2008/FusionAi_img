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
        document.getElementById('result').innerHTML = `<img src="${data.photoUrl}" alt="Generated Image" />`;
    } else {
        document.getElementById('result').innerText = 'Failed to generate image';
    }
});
