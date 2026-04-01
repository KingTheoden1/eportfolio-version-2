let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    const errorEl = document.getElementById('form__error');
    const name = event.target.user_name.value.trim();
    const email = event.target.user_email.value.trim();
    const message = event.target.message.value.trim();

    errorEl.textContent = '';

    if (!name) {
        errorEl.textContent = 'Please enter your name.';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        return;
    }
    if (!message) {
        errorEl.textContent = 'Please enter a message.';
        return;
    }

    loading.classList.add("modal__overlay--visible");
    emailjs
        .sendForm(
            'service_pam1byf',
            'template_22xcffh',
            event.target,
            'wKUaX5G9BLSi9hqyy'
        )
        .then(() => {
            loading.classList.remove("modal__overlay--visible");
            success.classList.add("modal__overlay--visible");
        })
        .catch(() => {
            loading.classList.remove("modal__overlay--visible");
            errorEl.textContent = 'The email service is temporarily unavailable. Please contact me directly at isaacfunes@icloud.com';
        });
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        document.body.classList.remove("modal--open");
    } else {
        isModalOpen = true;
        document.body.classList.add("modal--open");
    }
}

// Dropdown: click/tap to toggle, keyboard accessible, closes on outside tap
function initDropdown() {
    const dropdown = document.querySelector('.nav__link--dropdown');
    const menu = dropdown.querySelector('.dropdown__menu');
    const trigger = dropdown.querySelector('.nav__link--anchor');

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    function openDropdown() {
        menu.classList.add('dropdown__menu--open');
        trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        menu.classList.remove('dropdown__menu--open');
        trigger.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown() {
        menu.classList.contains('dropdown__menu--open') ? closeDropdown() : openDropdown();
    }

    // Click/tap to toggle (covers both desktop and mobile)
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDropdown();
    });

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
        }
    });

    // Close on Escape from anywhere
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('dropdown__menu--open')) {
            closeDropdown();
            trigger.focus();
        }
    });

    // Close when focus leaves dropdown
    dropdown.addEventListener('focusout', (e) => {
        if (!dropdown.contains(e.relatedTarget)) {
            closeDropdown();
        }
    });

    // Close when tapping/clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            closeDropdown();
        }
    });
}

// Scroll-triggered fade-in animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in--visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project, .section__title, .section__sub-description').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// CMS "Show more / Show less"
function initCmsToggle() {
    const cmsList = document.querySelector('#cms-projects .project__list');
    if (!cmsList) return;

    const allItems = Array.from(cmsList.querySelectorAll('.project'));
    const VISIBLE_COUNT = 6;

    if (allItems.length <= VISIBLE_COUNT) return;

    allItems.slice(VISIBLE_COUNT).forEach(item => item.classList.add('cms--hidden'));

    const btn = document.createElement('button');
    btn.className = 'cms__toggle-btn';
    btn.textContent = 'Show more';
    btn.setAttribute('aria-expanded', 'false');

    let expanded = false;
    btn.addEventListener('click', () => {
        expanded = !expanded;
        allItems.slice(VISIBLE_COUNT).forEach(item => {
            item.classList.toggle('cms--hidden', !expanded);
        });
        btn.textContent = expanded ? 'Show less' : 'Show more';
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    cmsList.after(btn);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) toggleModal();
});

document.addEventListener('DOMContentLoaded', () => {
    initDropdown();
    initScrollAnimations();
    initCmsToggle();
});
