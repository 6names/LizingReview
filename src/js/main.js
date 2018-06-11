// Browser detect
(function browsers() {
    var pageHtml = document.querySelector('html');
    
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    iOS && pageHtml.classList.add('ios');
    
    var browserDetect = {
        matchGroups: [
            [
                {uaString: 'win', className: 'win'},
                {uaString: 'mac', className: 'mac'},
                {uaString: 'android', className: 'android'},
                {uaString: 'linux', className: 'linux'}
            ],
            [
                {uaString: 'msie', className: 'trident'},
                {uaString: 'applewebkit', className: 'webkit'},
                {uaString: 'gecko', className: 'gecko'},
                {uaString: 'opera', className: 'presto'}
            ],
            [
                {uaString: 'msie 10.0', className: 'ie10'},
                {uaString: 'firefox', className: 'firefox'},
                {uaString: 'opera', className: 'opera'},
                {uaString: 'chrome', className: 'chrome'},
                {uaString: 'safari', className: 'safari'},
                {uaString: 'unknown', className: 'unknown'}
            ]
        ],
        
        init: function () {
            
            return {
                det: this.detect(),
                ts: this
            }
        },
        addClass: function (a) {
            this.pageHolder = {
                doc: document.documentElement,
                cl: document.documentElement.className += ' ' + a
            }
        },
        detect: function () {
            var a, s = 0;
            for (; s < this.matchGroups.length; s++) {
                a = this.matchGroups[s];
                var e, i = 0;
                for (; i < a.length; i++) {
                    
                    if (e = a[i] || 'string' === typeof e.uaString) {
                        if (this.uaMatch(e.uaString)) {
                            this.addClass(e.className);
                            break
                        }
                    } else {
                        for (var t = 0, r = !0; t < e.uaString.length; t++) if (!this.uaMatch(e.uaString[t])) {
                            r = !1;
                            break
                        }
                        if (r) {
                            this.addClass(e.className);
                            break
                        }
                    }
                }
            }
        },
        uaMatch: function (a) {
            
            return this.ua || (this.ua = navigator.userAgent.toLowerCase()), -1 !== this.ua.indexOf(a)
        }
    };
    browserDetect.init();
    
    
    // pixel ratio
    var retina = window.devicePixelRatio > 1 ? 'retina' : 'no-retina';
    pageHtml.classList.add(retina);
    
    if (pageHtml.classList.contains('ios') || pageHtml.classList.contains('android')) {
        pageHtml.classList.add('mobile');
    } else {
        pageHtml.classList.add('desktop');
    }
})();


// Navigation
var mobileNavClose = document.querySelector('.header__mobile-close'),
    mobileButton = document.querySelector('.header__mobile-button'),
    mobileNav = document.querySelector('.header__mobile'),
    allMobileElements = [mobileNavClose, mobileButton, mobileNav];

if (mobileNav) {
    mobileNavClose.addEventListener('click', function () {
        navClose();
    });
    
    mobileButton.addEventListener('click', function () {
        if (mobileButton.classList.contains('active')) {
            navClose();
        } else {
            navOpen();
        }
    });
}

function navClose() {
    allMobileElements.forEach(function (element) {
        element.classList.remove('active');
    });
}

function navOpen() {
    allMobileElements.forEach(function (element) {
        element.classList.add('active');
    })
}

// Modal
// Scrollbar width
function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    
    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    
    return w1 - w2;
}

// Get modal
function getModal(callBack) {
    var modalTriggers = document.querySelectorAll('.modal-trigger');
    
    for (var i = 0; i < modalTriggers.length; i++) {
        var trigger = modalTriggers[i];
        trigger.addEventListener('click', function (e) {
            var target = e.target.dataset.target;
            var targetModal = document.querySelector('.' + target);
            
            document.querySelector('.modal').classList.add('visually-hidden');
            targetModal.classList.remove('visually-hidden');
            
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = getScrollBarWidth() + 'px';
            document.querySelector('.modal__frame').classList.add('active');
            
            navClose();
            removeModal();
            
            if (callBack) {
                callBack();
            }
    
            // Update slider inside modal
            if (target === 'gallery-modal') {
                gallery.goTo(1);
            }
        });
    }
}
getModal(function () {

});

// Remove modal
function removeModal() {
    var modals = document.querySelectorAll('.modal');
    
    if (modals) {
        for (var i = 0; i < modals.length; i++) {
            var modal = modals[i];
            
            modal.addEventListener('click', function (e) {
                if (e.target.classList.contains('modal__close')) {
                    this.classList.add('visually-hidden');
                    document.body.classList.remove('modal-open');
                    document.body.removeAttribute('style');
                    e.preventDefault();
                }
            });
        }
    }
}

// Test modal
function testModal(target, callBack) {
    var modals = document.querySelectorAll('.modal');
    if (modals) {
        for (var i = 0; i < modals.length; i++) {
            var modal = modals[i];
            modal.classList.add('visually-hidden');
            document.querySelector('.' + target).classList.remove('visually-hidden');
            
            if (callBack) {
                callBack();
            }
        }
    }
}

// Dropdown
function dropDown(parent, triggers, content) {
    var trigger = parent.querySelectorAll(triggers);
    for (var i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.parentElement.querySelector(content).classList.remove('active');
            } else {
                this.classList.add('active');
                this.parentElement.querySelector(content).classList.add('active');
            }
        });
    }
}

// Form Elements
// Radio
function radio(parent) {
    var radioBtns = parent.querySelectorAll('input.radio-btn');
    
    for (var i = 0; i < radioBtns.length; i++) {
        var radio = radioBtns[i];
        var groupName = radio.getAttribute('name') + '-radio';
        var wrapper = document.createElement('div');
        wrapper.className = 'radio';
        wrapper.classList.add(groupName);
        radio.parentElement.insertBefore(wrapper, radio);
        wrapper.insertAdjacentElement('beforeend', radio);
        
        radio.addEventListener('change', function () {
            radioChange(this);
        });
        
        function radioChange(radio) {
            if (radio.checked) {
                var group = document.querySelectorAll('.' + groupName);
                for (var j = 0; j < group.length; j++) {
                    group[j].classList.remove('checked');
                    group[j].parentElement.classList.remove('checked');
                }
                
                radio.parentElement.parentElement.classList.add('checked');
                radio.parentElement.classList.add('checked');
            } else {
                radio.parentElement.parentElement.classList.remove('checked');
                radio.parentElement.classList.remove('checked');
            }
        }
        
        radioChange(radio);
    }
}

// Checkboxes
function checkbox(parent) {
    var checkBtns = parent.querySelectorAll('input.check');
    
    for (var i = 0; i < checkBtns.length; i++) {
        var wrapper = document.createElement('span');
        wrapper.className = 'checkbox';
        checkBtns[i].parentElement.insertBefore(wrapper, checkBtns[i]);
        wrapper.insertAdjacentElement('beforeend', checkBtns[i]);
        
        checkBtns[i].addEventListener('change', function () {
            checkChange();
        });
        
        function checkChange() {
            if (checkBtns[i].checked) {
                checkBtns[i].parentElement.parentElement.classList.add('checked');
                checkBtns[i].parentElement.classList.add('checked');
            } else {
                checkBtns[i].parentElement.parentElement.classList.remove('checked');
                checkBtns[i].parentElement.classList.remove('checked');
            }
        }
        
        checkChange();
    }
}

// File
function fileInput(parent) {
    var files = parent.querySelectorAll('input.file');
    
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        file.addEventListener('change', function () {
            file.parentElement.parentElement.querySelector('.file__list').innerHTML = file.value;
        });
    }
}

// Selects
function customSelects(parent, target, cb) {
    var selects = parent.querySelectorAll(target);
    if (selects) {
        for (var i = 0; i < selects.length; i++) {
            var select = selects[i];
            var wrapper = document.createElement('div');
            var optionsList = document.createElement('ul');
            var selected = document.createElement('div');
            
            wrapper.className = 'select';
            selected.className = 'select__value';
            optionsList.className = 'select__list';
            select.classList.add('visually-hidden');
            
            select.parentElement.insertBefore(wrapper, select);
            wrapper.insertAdjacentElement('beforeend', select);
            wrapper.insertAdjacentElement('beforeend', selected);
            wrapper.insertAdjacentElement('beforeend', optionsList);
            
            // Create options list
            var options = select.querySelectorAll('option');
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                var optionWrapper = document.createElement('li');
                optionWrapper.className = 'select__option';
                optionWrapper.innerHTML = option.innerHTML;
                optionsList.appendChild(optionWrapper);
                optionWrapper.dataset.val = option.value;
                
                if (option.selected) {
                    selected.innerHTML = options[j].innerHTML;
                    optionsList.children[j].classList.add('select__option_active');
                }
            }
            
            var allOptions = select.parentNode.querySelectorAll('.select__option');
            for (var k = 0; k < allOptions.length; k++) {
                var optionLi = allOptions[k];
                
                optionLi.addEventListener('click', function () {
                    disableActiveOptions();
                    this.classList.add('select__option_active');
                    selected.innerHTML = this.innerHTML;
                    select.value = this.dataset.val;
                });
                
                optionLi.addEventListener('touchend', function () {
                    disableActiveOptions();
                    this.classList.add('select__option_active');
                    selected.innerHTML = this.innerHTML;
                    select.value = this.dataset.val;
                });
                
                // Callback
                if (cb) {
                    cb(select.value);
                }
            }
            
            function disableActiveOptions() {
                for (var l = 0; l < allOptions.length; l++) {
                    allOptions[l].classList.remove('select__option_active');
                }
            }
            
            selected.addEventListener('click', function (e) {
                closeAll();
                openSelect();
            });
            
            document.addEventListener('click', function (e) {
                if (!e.target.classList.contains('select__value')) {
                    closeSelect();
                }
            });
            
            document.addEventListener('touchend', function (e) {
                if (!e.target.classList.contains('select__value')) {
                    closeSelect();
                }
            });
            
            function openSelect() {
                optionsList.classList.add('select__list_active');
                selected.classList.add('select__value_active');
            }
            
            function closeSelect() {
                optionsList.classList.remove('select__list_top');
                optionsList.classList.remove('select__list_active');
                selected.classList.remove('select__value_active');
            }
            
            function closeAll() {
                var lists = document.querySelectorAll('.select__list');
                var values = document.querySelectorAll('.select__value');
                
                for (var k = 0; k < lists.length; k++) {
                    lists[k].classList.remove('select__list_active');
                    values[k].classList.remove('select__value_active');
                }
            }
        }
    }
}

// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
function validate(formEl, callback) {
    var form = document.getElementById(formEl);
    
    if (form) {
        var inputs = form.querySelectorAll('input');
        var textareas = form.querySelectorAll('textarea');
        var selects = form.querySelectorAll('select');
        var re;
        
        // Selects
        for (var i = 0; i < selects.length; i++) {
            var options = selects[i].parentElement.querySelectorAll('.select__option');
            
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                option.addEventListener('click', function () {
                    if (this.dataset.val === 'empty') {
                        this.parentElement.parentElement.classList.add('error');
                        form.classList.add('invalid');
                        console.log(this);
                    } else {
                        this.parentElement.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                    }
                });
            }
        }
        
        function checkSelects() {
            for (var i = 0; i < selects.length; i++) {
                var select = selects[i];
                if (select.value === 'empty') {
                    select.parentElement.classList.add('error');
                    form.classList.add('invalid');
                } else {
                    select.parentElement.classList.remove('error');
                    form.classList.remove('invalid');
                }
            }
        }
        
        // Inputs
        function checkInputs(input) {
            if (input.dataset.required === 'required') {
                var name = input.getAttribute('name');
                var type = input.getAttribute('type');
                
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.parentElement.classList.add('error');
                        form.classList.add('invalid');
                    } else {
                        input.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                    }
                } else if (type === 'radio') {
                    var groupName = input.getAttribute('name');
                    var group = document.querySelectorAll('[name=' + groupName + '"]');
                    var i;
                    
                    for (i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
                    
                    var item;
                    var j = 0;
                    
                    if (i === group.length) {
                        for (j = 0; j < group.length; j++) {
                            item = group[j];
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                            form.classList.add('invalid');
                        }
                    } else {
                        for (j = 0; j < group.length; j++) {
                            item = group[j];
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                } else {
                    if (name) {
                        switch (name) {
                            case 'name':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'firstName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'lastName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'email':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'mail':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'phone':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            
                            default:
                                randomInput();
                        }
                    }
                    
                    function randomInput() {
                        if (input.value === '') {
                            input.classList.add('error');
                            form.classList.add('invalid');
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                    
                    function patternInput() {
                        if (!re.test(input.value)) {
                            input.classList.add('error');
                            form.classList.add('invalid');
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                }
            }
        }
        
        // Inputs listeners
        for (var k = 0; k < inputs.length; k++) {
            var type = inputs[k].getAttribute('type');
            var input = inputs[k];
            if (type === 'checkbox' || type === 'radio') {
                input.addEventListener('change', function () {
                    checkInputs(this);
                });
            } else {
                input.addEventListener('blur', function () {
                    checkInputs(this);
                });
                input.addEventListener('keyup', function () {
                    checkInputs(this);
                });
            }
        }
        
        // Textarea
        for (var l = 0; l < textareas.length; l++) {
            var textarea = textareas[l];
            textarea.addEventListener('blur', function () {
                checkInputs(this);
            });
        }
        
        // Submit listener
        form.addEventListener('submit', function (e) {
            
            for (var k = 0; k < inputs.length; k++) {
                checkInputs(inputs[k]);
            }
            
            for (var l = 0; l < textareas.length; l++) {
                checkInputs(textareas[l]);
            }
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if (callback) {
                    callback(e);
                }
            }
        });
    }
}

// Datepicker
var vacancy = document.getElementById('vacancy-form-date');
if (vacancy) {
    var vacancyDate = new Pikaday({
        field: vacancy,
        format: 'D MM YY',
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
}

// Form elements
checkbox(document.body);
radio(document.body);
fileInput(document.body);
customSelects(document.body, 'select');

// Form validations
validate('subscribe-form');

validate('event-registration', function (e) {
    formsConfirm(e, '.sidebar-form__title', '.sidebar-form__content');
    e.preventDefault();
});

validate('advertising-request', function (e) {
    formsConfirm(e, '.sidebar-form__title', '.sidebar-form__content');
    e.preventDefault();
});

validate('modal-subscribe-form', function (e) {
    testModal('confirm-modal');
    
    e.preventDefault();
});
validate('modal-vacancy-form', function (e) {
    testModal('confirm-modal');
    
    e.preventDefault();
});
validate('modal-request-form', function (e) {
    testModal('confirm-modal');
    
    e.preventDefault();
});

// Form confirm function
function formsConfirm(e, titleEl, contentEl) {
    var title = e.target.querySelector(titleEl);
    var content = e.target.querySelector(contentEl);
    
    title.innerHTML = 'Спасибо! <br/>Ваша заявка отправлена.';
    content.innerHTML = 'В ближайшее время наши менеджеры ответят на указаный Вами телефон или почту.';
    
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: e.target.getBoundingClientRect().top + window.pageYOffset - 45
    });
}

// Accordions
dropDown(document.body, '.vacancy__item-title', '.vacancy__item-content');
dropDown(document.body, '.advertising__item-title', '.advertising__item-content');
dropDown(document.body, '.selling__item-title', '.selling__item-content');
dropDown(document.body, '.accordion__title', '.accordion__content');

// Sliders
var slider, sliderI, sliderNav, sliderBtn;

var gallerySlider = document.querySelector('.modal__gallery-slider');
var gallery = tns({
    container: gallerySlider,
    slideBy: 'page',
    autoplay: false,
    controls: true,
    autoHeight: true
});
sliderNav = gallerySlider.parentElement.parentElement.querySelector('.tns-nav');
sliderBtn = gallerySlider.parentElement.parentElement.querySelector('.tns-controls');
gallerySlider.parentElement.parentElement.insertAdjacentElement('beforeend', sliderNav);
gallerySlider.parentElement.parentElement.querySelector('.tns-inner').insertAdjacentElement('beforeend', sliderBtn);

var magazineSlider = document.querySelectorAll('.magazine-preview__slider');
for (sliderI = 0; sliderI < magazineSlider.length; sliderI++) {
    slider = magazineSlider[sliderI];
    
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        autoHeight: true
    });
    sliderNav = slider.parentElement.parentElement.querySelector('.tns-nav');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', sliderNav);
}

var eventSlider = document.querySelectorAll('.event-preview__slider');
for (sliderI = 0; sliderI < eventSlider.length; sliderI++) {
    slider = eventSlider[sliderI];
    
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        autoHeight: true
    });
    sliderNav = slider.parentElement.parentElement.querySelector('.tns-nav');
    slider.parentElement.parentElement.insertAdjacentElement('beforeend', sliderNav)
}

// Anchors
var anchors = document.querySelectorAll('a.anchor');
if (anchors) {
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        
        anchor.addEventListener('click', function (e) {
            var link = anchor.getAttribute('href');
            var destination = document.querySelector(link).getBoundingClientRect().top + window.pageYOffset - 45;
            
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
    }
}

// Sidebar button
var sidebarBtn = document.querySelector('.sidebar__butn');
var pageAnchor = document.querySelector('.page-anchor');
var footer = document.querySelector('.footer');
var pageAnchorGap;

// Window Resize
window.addEventListener('resize', function () {
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
window.addEventListener('scroll', function () {
    windowScroll();
});

function windowScroll() {
    if (window.pageYOffset >= window.innerHeight) {
        pageAnchor.classList.add('active');
    } else {
        pageAnchor.classList.remove('active');
    }
    
    var scrollDistance = footer.getBoundingClientRect().top + window.pageYOffset;
    
    if (window.pageYOffset + window.innerHeight >= scrollDistance) {
        pageAnchor.style.position = 'absolute';
        pageAnchor.style.bottom = footer.offsetHeight + pageAnchorGap + 'px';
    } else {
        pageAnchor.removeAttribute('style');
    }
}

// Check if content loaded
document.addEventListener('DOMContentLoaded', function () {
    var pageHtml = document.querySelector('html');
    pageHtml.classList.add('loaded');
    windowResize();
});