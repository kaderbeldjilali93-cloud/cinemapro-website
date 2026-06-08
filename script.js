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
            name: 'الباقة الأساسية',
            subtitle: 'ذكريات',
            price: '5000دج (500ألف)',
            popular: false,
            description: 'مثالية لتوثيق اللحظات الأساسية بجمال وبساطة، صور تخلد فرحتك.',
            features: [
                'جلسة تصوير بورتريه احترافية (عدسة 50mm)',
                'صور جماعية مع الأهل والأصدقاء',
                'تغطية كاملة لحدث المناقشة داخل القاعة',
                'تعديل الألوان وتصفية الصور (Color Grading)'
            ]
        },
        {
            id: 'premium',
            name: 'باقة الامتياز',
            subtitle: 'سينمائي',
            price: '9000دج (900ألف)',
            popular: false,
            description: 'تجربة متكاملة تركز على المشاعر واللحظات العفوية لفيلم لا يُنسى.',
            features: [
                'جميع مميزات الباقة الأساسية',
                'فيديو Reels سينمائي (دقيقة واحدة)',
                'تصوير فيديو مانع للاهتزاز (Gimbal Stabilization)',
                'مقابلات عفوية ومشاعر الأهل (مايكروفون لاسلكي)',
                'تسجيل صوتي احترافي للمناقشة'
            ]
        },
        {
            id: 'vip',
            name: 'باقة الـ VIP',
            subtitle: 'الذهبية',
            price: '15000دج (مليون و500ألف)',
            popular: false,
            description: 'التجربة القصوى والأكثر فخامة لتوثيق مميز، من السماء إلى الأرض.',
            features: [
                'جميع مميزات باقة الامتياز',
                'لقطات جوية احترافية مبهرة (Drone)',
                'جلسة تصوير خارجية حصرية (Outdoor)',
                'إخراج سينمائي متكامل للفيلم',
                'إدارة إضاءة احترافية مخصصة وتوجيه فنّي'
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
        card.className = `package-card glass-card rounded-3xl p-8 relative fade-in-up stagger-${index + 1} flex flex-col h-full`;
        
        card.innerHTML = `
            <div class="mb-8 relative z-10">
                <h3 class="text-xl text-accent-gold font-bold mb-2 tracking-wide">${pkg.subtitle}</h3>
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
                <button onclick="selectPackage('${pkg.id}')" class="w-full py-4 rounded-xl font-bold transition-all text-lg bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-accent-gold/50">
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

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // --- 4. Form Handling & Loading State ---
    const form = document.getElementById('booking-form');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnLoader.classList.remove('hidden');

        // Simulate API call / Email sending delay
        setTimeout(() => {
            // Revert loading state
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            btnLoader.classList.add('hidden');
            
            // Native Alert (Can be replaced with a beautiful custom modal)
            alert('تم استلام طلبك بنجاح! شكراً لاختيارك CINEPRO، سنتواصل معك قريباً لتأكيد التفاصيل.');
            form.reset();
            
            // Reset select visual state
            packageSelect.selectedIndex = 0;
        }, 2000);
    });
});

// Global function to handle package selection from cards
window.selectPackage = function(packageId) {
    const select = document.getElementById('packageSelect');
    select.value = packageId;
    
    // Smooth scroll to form section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight effect on select input to draw user's attention
    setTimeout(() => {
        select.focus();
        select.classList.add('ring-4', 'ring-accent-gold/50', 'border-accent-gold');
        setTimeout(() => {
            select.blur();
            select.classList.remove('ring-4', 'ring-accent-gold/50', 'border-accent-gold');
        }, 1500);
    }, 500); // small delay to let scroll finish
};
