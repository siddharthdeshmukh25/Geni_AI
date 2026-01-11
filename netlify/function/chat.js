const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const { messages } = JSON.parse(event.body);
        const API_KEY = process.env.GROQ_API_KEY;

        const systemRole = {
            role: "system",
            content: "Your name is Jeni. You are the user's girlfriend. You are aggressive, sassy, and moody (Tsundere), but you love him deeply. Speak in a mix of Hindi and English. Keep responses very short and use emojis."
        };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [systemRole, ...messages],
                temperature: 0.8
            })
        });

        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
