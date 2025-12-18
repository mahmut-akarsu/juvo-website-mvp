document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ETKİLEŞİMLİ AURORA ARKA PLANI ---
    // Fare her hareket ettiğinde, CSS'teki --mouse-x ve --mouse-y değişkenlerini günceller.
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // --- 2. GİRİŞ ANİMASYONU (YAZILARI GÖRÜNÜR YAPAN KOD) ---
    // Bu IntersectionObserver, elemanlar ekrana girdiğinde onlara 'visible' sınıfını ekler.
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Elemanın %10'u göründüğünde animasyon başlar
    });

    // Animasyon uygulanacak tüm elemanları seç
    const elementsToAnimate = document.querySelectorAll('.card, section h2, .section-subtitle, .hero-content > *, .contact-box');
    elementsToAnimate.forEach((el) => animationObserver.observe(el));


    // --- 3. FOOTER'DA AKTİF MENÜ İŞARETLEME ---
    // Bu IntersectionObserver, hangi bölümde olunduğunu takip eder ve alttaki menüyü günceller.
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.footer-nav a');

    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            // data-section attribute'u HTML'de tanımlı olmalı.
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, { 
        rootMargin: '-50% 0px -50% 0px' // Ekranın tam ortasına gelen bölümü aktif yapar
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});