// Отримуємо всі елементи
const sideNavItems = document.querySelectorAll('.side-nav span');
const arrowPrev = document.querySelector('.arrow-prev');
const arrowNext = document.querySelector('.arrow-next');

// Функція для отримання поточного активного індексу
function getActiveIndex() {
    for (let i = 0; i < sideNavItems.length; i++) {
        if (sideNavItems[i].classList.contains('active')) {
            return i;
        }
    }
    return 0;
}

// Функція для зміни активного елемента
function setActiveIndex(index) {
    // Перевіряємо межі
    if (index < 0) index = sideNavItems.length - 1;
    if (index >= sideNavItems.length) index = 0;

    // Видаляємо active з усіх елементів
    sideNavItems.forEach(item => item.classList.remove('active'));
    
    // Додаємо active до потрібного елемента
    sideNavItems[index].classList.add('active');
}

// Обробка кліку на стрілку вперед (→)
arrowNext.addEventListener('click', function() {
    const currentIndex = getActiveIndex();
    setActiveIndex(currentIndex + 1);
});

// Обробка кліку на стрілку назад (←)
arrowPrev.addEventListener('click', function() {
    const currentIndex = getActiveIndex();
    setActiveIndex(currentIndex - 1);
});

// Мобільне меню
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.mobile-menu-overlay');
const menuClose = document.querySelector('.menu-close');

// Відкриття меню
menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Закриття меню
function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Закриття при кліку на посилання
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Зміна стилю header при скролі
const header = document.querySelector('header');

function handleScroll() {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll(); // Викликаємо один раз для початкового стану

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Видаляємо active з усіх кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Додаємо active до натиснутої кнопки
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            // Завжди показуємо всі елементи
            item.style.display = 'block';
            
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                // Активні елементи - світлі
                item.classList.remove('dimmed');
            } else {
                // Неактивні елементи - затемнені
                item.classList.add('dimmed');
            }
        });
    });
});
// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        // Закриваємо всі інші елементи
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherIcon.textContent = '+';
            }
        });
        
        // Перемикаємо поточний елемент
        item.classList.toggle('active');
        const icon = item.querySelector('.faq-icon');
        
        if (item.classList.contains('active')) {
            icon.textContent = '−';
        } else {
            icon.textContent = '+';
        }
    });
});
// Плавна навігація по секціях
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо всі посилання навігації (header, мобільне меню, footer)
    const navLinks = document.querySelectorAll('header nav a, .mobile-nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Якщо посилання починається з #, обробляємо плавну прокрутку
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Плавна прокрутка до секції
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Оновлюємо активний клас для всіх посилань
                    updateActiveLinks(targetId);
                    
                    // Якщо це мобільне меню - закриваємо його
                    if (this.closest('.mobile-nav')) {
                        closeMenu();
                    }
                }
            }
        });
    });
    
    // Функція для оновлення активних посилань
    function updateActiveLinks(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Оновлення активного пункту меню при прокрутці
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 150; // Додаємо offset для header
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                currentSection = sectionId;
            }
        });
        
        // Якщо знайдено активну секцію, оновлюємо посилання
        if (currentSection) {
            updateActiveLinks(currentSection);
        }
    }
    
    // Слухаємо подію прокрутки з throttle для оптимізації
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveNavOnScroll();
        });
    });
    
    // Викликаємо один раз для початкового стану
    updateActiveNavOnScroll();
});