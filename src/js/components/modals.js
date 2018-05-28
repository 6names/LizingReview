export class Modal {
    // Scrollbar width
    static getScrollBarWidth() {
        const inner = document.createElement('p');
        inner.style.width = '100%';
        inner.style.height = '200px';
        
        const outer = document.createElement('div');
        outer.style.position = 'absolute';
        outer.style.top = '0px';
        outer.style.left = '0px';
        outer.style.visibility = 'hidden';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.overflow = 'hidden';
        outer.appendChild(inner);
        
        document.body.appendChild(outer);
        const w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let w2 = inner.offsetWidth;
        if (w1 === w2) w2 = outer.clientWidth;
        document.body.removeChild(outer);
        
        return w1 - w2;
    }
    
    // Create modal holder
    static createModalHolder() {
        const footer = document.querySelector('.footer');
        const modalHolder = document.createElement('div');
        modalHolder.className = 'modal-holder';
        footer.insertAdjacentElement('afterend', modalHolder);
    }
    
    // Get modal
    static getModal(callBack) {
        const xhr = new XMLHttpRequest();
        const modalHolder = document.querySelector('.modal-holder');
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        
        Array.from(modalTriggers).forEach(trigger => {
            trigger.addEventListener('click', e => {
                xhr.open('GET', `modals/${e.target.getAttribute('data-target')}.html`, true);
                
                xhr.onload = function () {
                    if (this.status === 200) {
                        modalHolder.innerHTML = `
                        <div class="modal" tabindex="-1">
                            <div class="modal__row">
                                <div class="modal__cell">
                                    ${this.responseText}
                                    <div class="modal__close modal__close_wide"></div>
                                </div>
                            </div>
                        </div>`;
                        
                        modalHolder.classList.add('modal-holder_active');
                        document.body.classList.add('modal-open');
                        document.body.style.paddingRight = `${Modal.getScrollBarWidth()}px`;
                        document.querySelector('.modal__frame').classList.add('active');
                        
                        if (callBack) {
                            callBack();
                        }
                    }
                };
                
                xhr.send();
                
                e.preventDefault();
            });
        });
    }
    
    // Remove modal
    static removeModal() {
        const modalHolder = document.querySelector('.modal-holder');
        
        if (modalHolder) {
            modalHolder.addEventListener('click', e => {
                if (e.target.classList.contains('modal__close')) {
                    document.querySelector('.modal').remove();
                    modalHolder.classList.remove('modal-holder_active');
                    document.body.classList.remove('modal-open');
                    document.body.removeAttribute('style');
                    e.preventDefault();
                }
            });
        }
    }
    
    // Test modal
    static testModal(target, callBack) {
        const xhr = new XMLHttpRequest();
        const modalHolder = document.querySelector('.modal-holder');
        
        xhr.open('GET', `modals/${target}.html`, true);
        
        xhr.onload = function () {
            if (this.status === 200) {
                modalHolder.innerHTML = `
                        <div class="modal" tabindex="-1">
                            <div class="modal__row">
                                <div class="modal__cell">
                                    ${this.responseText}
                                    <div class="modal__close modal__close_wide"></div>
                                </div>
                            </div>
                        </div>`;
                
                modalHolder.classList.add('modal-holder_active');
                document.body.classList.add('modal-open');
                document.body.style.paddingRight = `${Modal.getScrollBarWidth()}px`;
                document.querySelector('.modal__frame').classList.add('active');
                
                if (callBack) {
                    callBack();
                }
            }
        };
        
        xhr.send();
    }
}
