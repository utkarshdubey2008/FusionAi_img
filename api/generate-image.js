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

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        try {
            const response = await axios.post(api_url, payload, { headers });
            
            // Log response data to see the format
            console.log(response.data);

            // Extract image URL from the response
            const link = response.data.match(/(https:\/\/storage\.googleapis\.com\/[^\)]+)/);
            const photoUrl = link ? link[0] : null;

            if (!photoUrl) {
                return res.status(500).json({ error: 'Image URL not found in response' });
            }

            res.status(200).json({ photoUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to generate image' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
