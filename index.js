const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("API is Running! Use /api?url=LINK");
});

app.get('/api', async (req, res) => {
    const videoLink = req.query.url;

    if (!videoLink) {
        return res.status(400).json({
            status: false,
            creator: "AD HACKER",
            message: "Missing 'url' parameter"
        });
    }

    const apiUrl = 'https://api.vidssave.com/api/contentsite_api/media/parse';

    // Headers bilkul wahi jo aapke local par kaam kar rahe hain
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 16; I2304 Build/BP2A.250605.031.A3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.45 Mobile Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://vidssave.com',
        'Referer': 'https://vidssave.com/',
        'X-Requested-With': 'mark.via.gp',
        'sec-ch-ua-platform': '"Android"',
    };

    const data = new URLSearchParams({
        'auth': '20250901majwlqo',
        'domain': 'api-ak.vidssave.com',
        'origin': 'source',
        'link': videoLink
    });

    try {
        const response = await axios.post(apiUrl, data.toString(), { headers });

        // Credit ke saath response
        res.json({
            status: true,
            creator: "AD HACKER",
            credit: "API powered by AD ROHIT",
            result: response.data
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            creator: "AD HACKER",
            message: "Internal Server Error",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
