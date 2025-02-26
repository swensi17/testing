document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Кастомный курсор
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.7)';
        cursorFollower.style.transform = 'scale(0.7)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });

    // Анимация статистики
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = stat.getAttribute('data-count');
        let current = 0;
        const increment = target === '∞' ? 1 : target / 50;
        const updateCount = () => {
            if (target === '∞' && current >= 100) {
                stat.textContent = '∞';
                return;
            }
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        updateCount();
    });

    // Мобильное меню
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Слайдер цитат
    const quotes = document.querySelectorAll('.quote-slide');
    let currentQuote = 0;

    function showNextQuote() {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }

    setInterval(showNextQuote, 5000);

    // Анимация появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.memory-card, .story-content, .love-letter, .polaroid').forEach(el => {
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

        heart.addEventListener('animationend', function() {
            heart.remove();
        });
    }

    setInterval(createHeart, 3000);

    // Параллакс эффект для фона героя
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

    // Эффект при наведении на ссылки
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
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