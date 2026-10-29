// طلب إذن الإشعارات من المتصفح عند فتح الصفحة
if ("Notification" in window) {
    Notification.requestPermission();
}

window.onload = function() {
    const name = localStorage.getItem("user_name");
    if (name) {
        showAppScreen();
    }
};

function saveProfile() {
    const name = document.getElementById("username").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;

    if (!name || !age || !height || !weight) {
        alert("برجاء إدخال جميع البيانات!");
        return;
    }

    localStorage.setItem("user_name", name);
    localStorage.setItem("user_age", age);
    localStorage.setItem("user_height", height);
    localStorage.setItem("user_weight", weight);

    showAppScreen();
}

function showAppScreen() {
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");

    const name = localStorage.getItem("user_name");
    const age = localStorage.getItem("user_age");
    const height = localStorage.getItem("user_height");
    const weight = localStorage.getItem("user_weight");

    document.getElementById("welcome-msg").innerText = "أهلاً بك، " + name;
    document.getElementById("user-stats").innerText = `العمر: ${age} سنة | الطول: ${height} سم | الوزن: ${weight} كجم`;
    
    loadMedicines();
}

function addMedicine() {
    const medName = document.getElementById("med-name").value;
    const medTime = document.getElementById("med-time").value;

    if (!medName || !medTime) {
        alert("برجاء إدخال اسم الدواء والوقت!");
        return;
    }

    let meds = JSON.parse(localStorage.getItem("meds") || "[]");
    meds.push({ name: medName, time: medTime });
    localStorage.setItem("meds", JSON.stringify(meds));

    document.getElementById("med-name").value = "";
    document.getElementById("med-time").value = "";

    loadMedicines();
    scheduleNotification(medName, medTime);
}

function loadMedicines() {
    const list = document.getElementById("med-list");
    list.innerHTML = "";
    let meds = JSON.parse(localStorage.getItem("meds") || "[]");

    meds.forEach(med => {
        let li = document.createElement("li");
        li.innerText = `💊 ${med.name} - الموعد: ${med.time}`;
        list.appendChild(li);
    });
}

function scheduleNotification(name, time) {
    const [hours, minutes] = time.split(":");
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeToWait = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
        if (Notification.permission === "granted") {
            new Notification("ميعاد الدواء!", {
                body: `حان الآن موعد أخذ دواء: ${name}`,
                icon: "https://cdn-icons-png.flaticon.com/512/883/883407.png"
            });
        } else {
            alert(`تذكير: حان موعد أخذ دواء ${name}`);
        }
    }, timeToWait);
}