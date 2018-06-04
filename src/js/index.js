import 'babel-polyfill';
import './components/icons';
import './components/browser-detect';
import {navClose, navOpen} from './components/mobile-nav';
import {Modal} from './components/modals';
import {Drop} from './components/accordions';
import {Forms} from './components/form-elemnts';
import {validate} from './components/validation';
import {tns} from '../../node_modules/tiny-slider/src/tiny-slider.module.js';
import '../../node_modules/pikaday/pikaday';

// Get Modal
Modal.createModalHolder();
Modal.getModal(() => {
    initFunc();
    navClose();
});

// Test modal
/*Modal.testModal('gallery-modal', () => {
    initFunc();
});*/


// Remove modal
Modal.removeModal();

// Modal inner functions
function initFunc() {
    const modalHolder = document.querySelector('.modal-holder');
    
    // Form elements inside modal
    Forms.checkbox(modalHolder);
    Forms.radio(modalHolder);
    Forms.file(document.body);
    Forms.customSelects(modalHolder, 'select');
    
    // Forms validation
    validate('modal-subscribe-form', e => {
        Modal.testModal('confirm-modal');
        e.preventDefault();
    });
    validate('modal-vacancy-form', e => {
        Modal.testModal('confirm-modal');
        e.preventDefault();
    });
    validate('modal-request-form', e => {
        Modal.testModal('confirm-modal');
        e.preventDefault();
    });
    
    // Datepicker
    const vacancyDate = document.getElementById('vacancy-form-date');
    if (vacancyDate) {
        require(['pikaday'], function (Pikaday) {
            const vacancyDate = new Pikaday({
                field: document.getElementById('vacancy-form-date'),
                firstDay: 1,
                minDate: new Date(),
                maxDate: new Date(2020, 12, 31),
                yearRange: [2000, 2020],
                i18n: {
                    previousMonth: 'Предыдущий',
                    nextMonth: 'Следующий',
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                }
            });
        });
    }
    
    // Gallery
    const gallerySlider = document.querySelectorAll('.modal__gallery-slider');
    Array.from(gallerySlider).forEach(slider => {
        tns({
            container: slider,
            slideBy: 'page',
            autoplay: false,
            controls: true,
            autoHeight: true
        });
        const nav = slider.parentElement.parentElement.querySelector('.tns-nav');
        const btns = slider.parentElement.parentElement.querySelector('.tns-controls');
        slider.parentElement.parentElement.insertAdjacentElement('beforeend', nav);
        slider.parentElement.parentElement.querySelector('.tns-inner').insertAdjacentElement('beforeend', btns);
    });
}

// Form elements
Forms.checkbox(document.body);
Forms.radio(document.body);
Forms.file(document.body);
Forms.customSelects(document.body, 'select');

// Form validations
validate('subscribe-form');

validate('event-registration', e => {
    formsConfirm(e, '.sidebar-form__title', '.sidebar-form__content');
    e.preventDefault();
});

validate('advertising-request', e => {
    formsConfirm(e, '.sidebar-form__title', '.sidebar-form__content');
    e.preventDefault();
});

// Form confirm function
function formsConfirm(e, titleEl, contentEl) {
    const title = e.target.querySelector(titleEl);
    const content = e.target.querySelector(contentEl);
    
    title.innerHTML = `Спасибо! <br/>Ваша заявка отправлена.`;
    content.innerHTML = `В ближайшее время наши менеджеры ответят на указаный Вами телефон или почту.`;
    
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: e.target.getBoundingClientRect().top + window.pageYOffset - 45
    });
}

// Accordions
Drop.dropDown(document.body, '.vacancy__item-title', '.vacancy__item-content');
Drop.dropDown(document.body, '.advertising__item-title', '.advertising__item-content');
Drop.dropDown(document.body, '.selling__item-title', '.selling__item-content');
Drop.dropDown(document.body, '.accordion__title', '.accordion__content');

// Sliders
const magazineSlider = document.querySelectorAll('.magazine-preview__slider');
Array.from(magazineSlider).forEach(slider => {
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        autoHeight: true
    });
    const nav = slider.parentElement.parentElement.querySelector('.tns-nav');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', nav)
});

const eventSlider = document.querySelectorAll('.event-preview__slider');
Array.from(eventSlider).forEach(slider => {
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        autoHeight: true
    });
    const nav = slider.parentElement.parentElement.querySelector('.tns-nav');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', nav)
});

// Anchors
const anchors = document.querySelectorAll('a.anchor');
const anchorsArr = Array.from(anchors);
if (anchors) {
    anchorsArr.forEach(anchor => {
        anchor.addEventListener('click', e => {
            const link = anchor.getAttribute('href');
            let destination = document.querySelector(link).getBoundingClientRect().top + window.pageYOffset - 45;
            
            if (anchor.classList.contains('page-anchor')) {
                destination = 0;
            }
            
            window.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: destination
            });
            
            e.preventDefault();
        });
    });
}

// Sidebar button
const sidebarBtn = document.querySelector('.sidebar__butn');
const pageAnchor = document.querySelector('.page-anchor');
const footer = document.querySelector('.footer');
let pageAnchorGap;

// Window Resize
window.addEventListener('resize', () => {
    windowResize();
});

function windowResize() {
    if (sidebarBtn) {
        if (window.innerWidth <= 960) {
            document.querySelector('.main__title').insertAdjacentElement('afterend', sidebarBtn);
        } else {
            document.querySelector('.main__sidebar').insertAdjacentElement('afterbegin', sidebarBtn);
        }
    }
    
    if (pageAnchor) {
        if (window.innerWidth <= 1024) {
            pageAnchorGap = 15;
        } else {
            pageAnchorGap = 40;
        }
    }
}

// Window Scroll
window.addEventListener('scroll', () => {
    windowScroll();
});

function windowScroll() {
    if (window.pageYOffset >= window.innerHeight) {
        pageAnchor.classList.add('active');
    } else {
        pageAnchor.classList.remove('active');
    }
    
    let scrollDistance = footer.getBoundingClientRect().top + window.pageYOffset ;
    
    if (window.pageYOffset + window.innerHeight >= scrollDistance) {
        pageAnchor.style.position = 'absolute';
        pageAnchor.style.bottom = `${footer.offsetHeight + pageAnchorGap}px`;
    } else {
        pageAnchor.removeAttribute('style');
    }
}

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    const pageHtml = document.querySelector('html');
    pageHtml.classList.add('loaded');
    windowResize();
});





