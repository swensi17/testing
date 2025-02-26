document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Закрыть мобильное меню после клика
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Добавляем анимацию для всех важных элементов
    document.querySelectorAll('.memory-card, .story-content, .love-letter, .polaroid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Создаем падающие сердечки
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);

        // Удаляем сердечко после анимации
        heart.addEventListener('animationend', function() {
            heart.remove();
        });
    }

    // Добавляем стили для падающих сердечек
    const style = document.createElement('style');
    style.textContent = `
        .falling-heart {
            position: fixed;
            top: -20px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 999;
            animation: fall linear forwards;
        }

        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }

        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .memory-card.visible {
            transform: translateY(0) scale(1) !important;
        }
    `;
    document.head.appendChild(style);

    // Создаем сердечки периодически
    setInterval(createHeart, 3000);

    // Добавляем эффект параллакса для фона героя
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Анимация для поляроидных фотографий
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('mousemove', (e) => {
            const rect = polaroid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            polaroid.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });

        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.transform = 'rotate(-3deg)';
        });
    });

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить валидацию формы и отправку данных
        const formData = new FormData(this);
        alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}); 