document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 2. Dynamic Data Injection: Pricing Packages ---
    const packagesData = [
        {
            id: 'basic',
            name: 'لمة لحباب',
            subtitle: 'صور فقط',
            price: '5000دج (500ألف)',
            popular: false,
            description: 'توثيق دافئ لأجمل لحظاتك مع العائلة والأصدقاء بصور احترافية.',
            features: [
                'صور بورتريه احترافية تبرز فرحتك (عدسة 50mm)',
                'لقطات عفوية توثق فرحة العائلة والأصدقاء',
                'تغطية كاملة لأجواء المناقشة داخل القاعة',
                'تعديل الألوان وتصفية الصور (Color Grading)'
            ]
        },
        {
            id: 'premium',
            name: 'اللحظة السينمائية',
            subtitle: 'تريند',
            price: '6500دج (650ألف)',
            popular: false,
            description: 'فيديو ريلز احترافي مع لقطات درون، مثالي للسوشيال ميديا.',
            features: [
                'فيديو "ريلز" سينمائي يخطف الأنفاس',
                'جلسة تصوير بورتريه (عدسة 50mm)',
                'لقطات جوية إبداعية بالدرون',
                'موسيقى ومؤثرات صوتية تلامس المشاعر'
            ]
        },
        {
            id: 'vip',
            name: 'الذكرى الخالدة',
            subtitle: 'الـ VIP',
            price: '13000دج (مليون و300ألف)',
            popular: false,
            description: 'التغطية الشاملة والمثالية لتوثيق يومك من البداية إلى النهاية.',
            features: [
                'تغطية شاملة من فريقنا المتكامل (تصوير + فيديو + درون)',
                'تسجيل مقابلات عفوية مع الوالدين والأحباب',
                'مرافقة كاملة من كواليس التحضيرات إلى الاحتفال الخارجي',
                'أولوية في المونتاج وتسليم سريع للعمل'
            ]
        }
    ];

    const packagesContainer = document.getElementById('packages-container');
    const packageSelect = document.getElementById('packageSelect');

    // Render Packages (Equal hierarchy — no "popular" styling)
    packagesData.forEach((pkg, index) => {
        // Render Feature list
        const featuresHTML = pkg.features.map(feature => `
            <li class="flex items-start text-slate-300 mb-4 text-sm font-medium">
                <span class="feature-check">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </span>
                <span class="leading-relaxed opacity-90">${feature}</span>
            </li>
        `).join('');

        const card = document.createElement('div');

        // تحديد اتجاه الحركة لكل بطاقة (0 هي الأولى، 1 هي الثانية، 2 هي الثالثة)
        let animClass = 'fade-in-up';
        if (index === 0 || index === 2) animClass = 'fade-in-left';
        if (index === 1) animClass = 'fade-in-right';

        card.className = `package-card glass-card rounded-3xl p-8 relative ${animClass} stagger-${index + 1} flex flex-col h-full`;

        card.innerHTML = `
            <div class="mb-8 relative z-10 text-center">
                <h3 class="text-xl text-accent-red font-bold mb-2 tracking-wide">${pkg.subtitle}</h3>
                <h2 class="text-3xl font-extrabold text-white mb-4">${pkg.name}</h2>
                <p class="text-slate-400 text-sm h-12 leading-relaxed opacity-80">${pkg.description}</p>
            </div>
            
            <div class="mb-8 pb-8 border-b border-white/10 relative z-10">
                <div class="flex items-baseline justify-center gap-1">
                    <span class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">${pkg.price}</span>
                </div>
            </div>
            
            <ul class="flex-grow mb-10 text-right relative z-10">
                ${featuresHTML}
            </ul>
            
            <div class="mt-auto relative z-10">
                <button onclick="selectPackage('${pkg.id}')" class="w-full py-4 rounded-xl font-bold text-lg text-white btn-glass-3d">
                    اختيار الباقة
                </button>
            </div>
        `;
        packagesContainer.appendChild(card);

        // Populate Select Dropdown in the form
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = `${pkg.name} - ${pkg.price}`;
        packageSelect.appendChild(option);
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    // تفعيل المراقبة لجميع الحركات الجديدة
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(element => {
        observer.observe(element);
    });

    // --- 4. Form Handling & Telegram Integration ---
    const form = document.getElementById('booking-form');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // إظهار حالة التحميل للزر
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnLoader.classList.remove('hidden');

        // جلب البيانات من حقول الفورم
        const fullName = document.getElementById('fullName').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const university = document.getElementById('university').value;
        const date = document.getElementById('date').value;

        // جلب اسم الباقة بدلاً من الـ ID تاعها
        const packageSelect = document.getElementById('packageSelect');
        const packageName = packageSelect.options[packageSelect.selectedIndex].text;

        // ==========================================
        const telegramBotToken = '8807976727:AAHkwNZSg9P7Go5cprUE7KQbGce11eo6S2Y'
        const chatId = '-1491880675'
        // ==========================================

        // تصميم الرسالة اللي راح توصلك في التليغرام
        const message = `
🎓 <b>طلب حجز جديد (CINEPRO)</b> 🎓

👤 <b>الاسم:</b> ${fullName}
📱 <b>الواتساب:</b> ${whatsapp}
🏫 <b>الجامعة:</b> ${university}
📅 <b>تاريخ المناقشة:</b> ${date}
📦 <b>الباقة المختارة:</b> ${packageName}
        `;

        const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        try {
            // إرسال البيانات عبر API تيليجرام
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML' // باش تظهر الرسالة منسقة و Bold
                })
            });

            if (response.ok) {
                // إرجاع الزر لحالته الطبيعية
                submitBtn.disabled = false;
                btnText.style.opacity = '1';
                btnLoader.classList.add('hidden');

                // رسالة نجاح الحجز
                alert('تم استلام طلبك بنجاح! شكراً لاختيارك CINEPRO، سنتواصل معك قريباً لتأكيد التفاصيل.');

                // تفريغ الفورم
                form.reset();
                packageSelect.selectedIndex = 0;
            } else {
                throw new Error('فشل في الإرسال');
            }
        } catch (error) {
            // في حالة وجود خطأ (مثلاً انقطاع الأنترنت)
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            btnLoader.classList.add('hidden');
            alert('عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر الواتساب.');
        }
    });
});

// Global function to handle package selection from cards
window.selectPackage = function (packageId) {
    const select = document.getElementById('packageSelect');
    select.value = packageId;

    // Smooth scroll to form section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });

    // Highlight effect on select input to draw user's attention
    setTimeout(() => {
        select.focus();
        select.classList.add('ring-4', 'ring-accent-red/50', 'border-accent-red');
        setTimeout(() => {
            select.blur();
            select.classList.remove('ring-4', 'ring-accent-red/50', 'border-accent-red');
        }, 1500);
    }, 500);
};
