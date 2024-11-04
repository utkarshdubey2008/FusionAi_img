const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        const payload = {
            messages: [{ content: prompt, role: 'user' }],
            user_id: uuidv4(),
            codeModelMode: true,
            agentMode: {
                mode: true,
                id: "ImageGenerationLV45LJp",
                name: "Image Generation"
            },
        };

        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
        };

        const api_url = "https://www.blackbox.ai/api/chat";

        try {
            const response = await axios.post(api_url, payload, { headers });
            
            // Log the full response data for debugging
            console.log("API Response:", response.data);

            // Attempt to extract image URL from response
            const link = response.data.match(/(https:\/\/storage\.googleapis\.com\/[^\)]+)/);
            const photoUrl = link ? link[0] : null;

            if (!photoUrl) {
                // Log the failure reason and return an error
                console.error("Failed to find image URL in response:", response.data);
                return res.status(500).json({ error: 'Image URL not found in response' });
            }

            res.status(200).json({ photoUrl });
        } catch (error) {
            console.error("Error:", error.message || error);
            res.status(500).json({ error: 'Failed to generate image' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
