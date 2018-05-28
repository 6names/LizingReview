export class Forms {
    // Amount input
    static amountInput(parent, min, max) {
        const amountInputs = parent.querySelectorAll('input.amount-input');
        
        Array.from(amountInputs).forEach(amount => {
            const wrapper = document.createElement('div');
            wrapper.className = 'amount';
            
            amount.before(wrapper);
            wrapper.append(amount);
            
            const amountUp = document.createElement('button');
            amountUp.className = 'amount-up';
            amountUp.innerHTML = '+';
            wrapper.append(amountUp);
            
            const amountDown = document.createElement('button');
            amountDown.className = 'amount-down';
            amountDown.innerHTML = '-';
            wrapper.append(amountDown);
            
            amount.addEventListener('keyup', () => {
                if (isNaN(amount.value)) {
                    amount.value = min;
                }
            });
            
            amountUp.addEventListener('click', () => {
                if (amount.value === max) {
                    amount.value = max;
                } else {
                    amount.value = (++amount.value).toString();
                }
            });
            
            amountDown.addEventListener('click', () => {
                if (amount.value === min) {
                    amount.value = min;
                } else {
                    amount.value = (--amount.value).toString();
                }
            });
        });
    }

    // Radio
    static radio(parent) {
        const radioBtns = parent.querySelectorAll('input.radio-btn');
        
        Array.from(radioBtns).forEach(radio => {
            const groupName = `${radio.getAttribute('name')}-radio`;
            const wrapper = document.createElement('div');
            wrapper.className = 'radio';
            wrapper.classList.add(groupName);
            radio.parentElement.insertBefore(wrapper, radio);
            wrapper.insertAdjacentElement('beforeend', radio);
            
            radio.addEventListener('change', () => {
                radioChange();
            });
            
            function radioChange() {
                if (radio.checked) {
                    for (let item of document.querySelectorAll(`.${groupName}`)) {
                        item.classList.remove('checked');
                        item.parentElement.classList.remove('checked');
                    }
                    radio.parentElement.parentElement.classList.add('checked');
                    radio.parentElement.classList.add('checked');
                } else {
                    radio.parentElement.parentElement.classList.remove('checked');
                    radio.parentElement.classList.remove('checked');
                }
            }
            
            radioChange();
        });
    }

    // Checkboxes
    static checkbox(parent) {
        const checkBtns = parent.querySelectorAll('input.check');
        
        Array.from(checkBtns).forEach(check => {
            const wrapper = document.createElement('span');
            wrapper.className = 'checkbox';
            check.parentElement.insertBefore(wrapper, check);
            wrapper.insertAdjacentElement('beforeend', check);
            
            check.addEventListener('change', () => {
                checkChange();
            });
            
            function checkChange() {
                if (check.checked) {
                    check.parentElement.parentElement.classList.add('checked');
                    check.parentElement.classList.add('checked');
                } else {
                    check.parentElement.parentElement.classList.remove('checked');
                    check.parentElement.classList.remove('checked');
                }
            }
            
            checkChange();
        });
    }

    // File
    static file(parent) {
        const files = parent.querySelectorAll('input.file');
        
        Array.from(files).forEach(file => {
            file.addEventListener('change', () => {
                file.parentElement.parentElement.querySelector('.file__list').innerHTML = file.value;
            });
            
        });
    }

    // Selects
    static customSelects(parent, target, cb) {
        const selects = parent.querySelectorAll(target);
        if (selects) {
            Array.from(selects).forEach(select => {
                const wrapper = document.createElement('div');
                const optionsList = document.createElement('ul');
                const selected = document.createElement('div');
                
                wrapper.className = 'select';
                selected.className = 'select__value';
                optionsList.className = 'select__list';
                select.classList.add('visually-hidden');
    
                select.parentElement.insertBefore(wrapper, select);
                wrapper.insertAdjacentElement('beforeend', select);
                
                const options = select.querySelectorAll('option');
                Array.from(options).forEach((option, i) => {
                    const optionWrapper = document.createElement('li');
                    optionWrapper.className = 'select__option';
                    optionWrapper.appendChild(document.createTextNode(option.innerHTML));
                    optionsList.appendChild(optionWrapper);
                    optionWrapper.dataset.val = option.value;
                    
                    function currentOption() {
                        for (let item of select.parentNode.querySelectorAll('.select__option')) {
                            item.classList.remove('select__option-active');
                        }
                        optionWrapper.classList.add('select__option-active');
                        selected.innerHTML = optionWrapper.innerHTML;
                        select.value = optionWrapper.dataset.val;
                        closeSelect();
                        
                        // Callback
                        if (cb) {
                            cb(select.value);
                        }
                    }
                    
                    optionWrapper.addEventListener('click', () => currentOption());
                    optionWrapper.addEventListener('touchend', () => currentOption());
                });
                
                optionsList.children[0].classList.add('select__option-active');
    
    
                wrapper.insertAdjacentElement('beforeend', selected);
                wrapper.insertAdjacentElement('beforeend', optionsList);
                
                selected.innerHTML = options[0].innerHTML;
                
                select.addEventListener('change', () => {
                    selected.innerHTML = select.value;
                });
                
                selected.addEventListener('click', () => {
                    closeAll();
                    openSelect();
                });
                
                function openSelect() {
                    optionsList.classList.add('select__list-active');
                    selected.classList.add('select__value-active');
                }
                
                function closeSelect() {
                    optionsList.classList.remove('select__list-active');
                    selected.classList.remove('select__value-active');
                }
                
                function closeAll() {
                    Array.from(document.querySelectorAll('.select__list')).forEach((list) => {
                        list.classList.remove('select__list-active');
                    });
                    Array.from(document.querySelectorAll('.select__value')).forEach((value) => {
                        value.classList.remove('select__value-active');
                    });
                }
                
                document.addEventListener('click', e => {
                    if (!e.target.classList.contains('select__value')) {
                        closeSelect();
                    }
                });
                
                document.addEventListener('touchend', e => {
                    if (!e.target.classList.contains('select__value')) {
                        closeSelect();
                    }
                });
                
            });
        }
    }
}