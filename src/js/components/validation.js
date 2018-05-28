// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
export function validate(formEl, callback) {
    const form = document.getElementById(formEl);
    
    if (form) {
        const inputs = form.querySelectorAll('input');
        const textareas = form.querySelectorAll('textarea');
        const selects = form.querySelectorAll('select');
        const textareasArr = Array.from(textareas);
        const selectsArr = Array.from(selects);
        const inputsArr = Array.from(inputs);
        // const btn = form.querySelector('[type="submit"');
        let re;
        let error;
        // btn.disabled = true;
        
        // Selects
        selectsArr.forEach(select => {
            error = select.dataset.errorMessage;
            const options = select.parentElement.querySelectorAll('.select__option');
            const optionsArr = Array.from(options);
    
            optionsArr.forEach(option => {
                option.addEventListener('click', () => {
                    if (option.dataset.val === 'empty') {
                        select.parentElement.classList.add('error');
                        form.classList.add('invalid');
                        if (error) {
                            addErrorMessage(select.parentElement);
                        }
                    } else {
                        select.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                        removeErrorMessage(select.parentElement);
                    }
    
                    // enableButton();
                });
            });
        });
        
        function checkSelects() {
            Array.from(selects).forEach(select => {
                error = select.dataset.errorMessage;
                if (select.value === 'empty') {
                    select.parentElement.classList.add('error');
                    form.classList.add('invalid');
                    if (error) {
                        addErrorMessage(select.parentElement);
                    }
                } else {
                    select.parentElement.classList.remove('error');
                    form.classList.remove('invalid');
                    removeErrorMessage(select.parentElement);
                }
            });
        }
        
        // Inputs
        function checkInputs(input) {
            if (input.dataset.required === 'required') {
                const name = input.getAttribute('name');
                const type = input.getAttribute('type');
                error = input.dataset.errorMessage;
    
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.parentElement.classList.add('error');
                        form.classList.add('invalid');
                        if (error) {
                            addErrorMessage(input);
                        }
                    } else {
                        input.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                        removeErrorMessage(input);
                    }
                } else if (type === 'radio') {
                    const groupName = input.getAttribute('name');
                    const group = Array.from(document.querySelectorAll(`[name="${groupName}"]`));
                    let i;
        
                    for (i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
        
                    if (i === group.length) {
                        for (let item of group) {
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        }
                    } else {
                        for (let item of group) {
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
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
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}\-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}\-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
        
                            default: randomInput();
                        }
                    }
                    
                    function randomInput() {
                        if (input.value === '') {
                            input.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
                        }
                    }
                    
                    function patternInput() {
                        if (!re.test(input.value)) {
                            input.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
                        }
                    }
                }
            }
        }
        
        // Add error message
        function addErrorMessage(input) {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.innerHTML = error;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling == null || !input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.insertAdjacentElement('afterend', message);
                }
                
            } else {
                if (input.nextElementSibling == null) {
                    input.insertAdjacentElement('afterend', message);
                }
            }
        }
    
        // Remove error message
        function removeErrorMessage(input) {
            const message = input.nextSibling;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling != null && input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.nextElementSibling.remove();
                }
            } else {
                if (input.nextElementSibling != null) {
                    message.remove();
                }
            }
        }
        
        // Inputs listeners
        inputsArr.forEach(input => {
            const type = input.getAttribute('type');
            if (type === 'checkbox' || type === 'radio') {
                input.addEventListener('change', () => {
                    checkInputs(input);
                    // enableButton();
                });
            } else {
                input.addEventListener('blur', () => {
                    checkInputs(input);
                    // enableButton();
                });
            }
        });
    
        // Textarea
        textareasArr.forEach(textarea => {
            textarea.addEventListener('blur', () => {
                checkInputs(textarea);
                // enableButton();
            });
        });
        
        // Button
        /*function enableButton() {
            btn.disabled = form.querySelectorAll('.error').length > 0;
        }*/
        
        // Submit listener
        form.addEventListener('submit', (e) => {
            inputsArr.forEach(input => {
                checkInputs(input);
            });
            textareasArr.forEach(textarea => {
                checkInputs(textarea);
            });
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if(callback) {
                    callback(e);
                }
            }
        });
    }
}
