document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');

    // Функция открытия меню
    function openMenu() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия меню
    function closeMenuFunc() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработчики событий для меню
    navToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    menuOverlay.addEventListener('click', closeMenuFunc);

    // Закрытие меню при клике на пункт меню
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });

    // Предотвращение закрытия меню при клике на само меню
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Обработка анимации входа
    const enterButton = document.querySelector('.pulse-button');
    const introAnimation = document.querySelector('.intro-animation');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');

    if (enterButton) {
        enterButton.addEventListener('click', function() {
            // Добавляем класс для анимации исчезновения
            introAnimation.style.opacity = '0';
            
            setTimeout(() => {
                introAnimation.style.display = 'none';
                
                // Показываем экран загрузки
                loadingScreen.style.display = 'flex';
                requestAnimationFrame(() => {
                    loadingScreen.style.opacity = '1';
                });

                // Имитация загрузки
                setTimeout(() => {
                    // Скрываем экран загрузки
                    loadingScreen.style.opacity = '0';
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        
                        // Показываем основной контент
                        mainContent.style.display = 'block';
                        requestAnimationFrame(() => {
                            mainContent.style.opacity = '1';
                            document.body.classList.add('content-visible');
                        });
                    }, 500);
                }, 2000);
            }, 500);
        });
    }
}); 