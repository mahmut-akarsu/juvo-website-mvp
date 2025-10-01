// Bu kod, sayfa kaydırıldığında hangi bölümde olunduğunu takip eder
// ve footer'daki ilgili linki aktif hale getirir.

document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.footer-nav a');

    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === id) {
                link.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, { 
        threshold: 0.5 // Bölümün en az %50'si ekranda göründüğünde aktif olur
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});