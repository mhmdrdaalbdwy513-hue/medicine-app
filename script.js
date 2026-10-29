// فحص مواعيد الأدوية كل ثانية
setInterval(() => {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    // جلب قائمة الأدوية المحفوظة
    const medicines = JSON.parse(localStorage.getItem('medicines')) || [];

    medicines.forEach(med => {
        // إذا تطابق الوقت الحالي مع وقت الدواء في نفس الثانية الأولى من الدقيقة
        if (med.time === currentTime && now.getSeconds() === 0) {
            
            // 1. تشغيل صوت تنبيه
            let audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(e => console.log("تحذير: المتصفح يمنع تشغيل الصوت تلقائياً بدون تفاعل"));

            // 2. إظهار منبه مرئي على الشاشة
            alert(`⏰ حان موعد دواء: ${med.name}`);
        }
    });
}, 1000);
