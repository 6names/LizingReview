(function uiIcons() {
    const footer = document.querySelector('.footer');
    const icons = document.createElement('div');
    icons.className = 'ui-icons';
    const xhr = new XMLHttpRequest();
    
    footer.insertAdjacentElement('afterend', icons);
    
    xhr.open('GET', 'images/ui/ui-icons.svg', true);
    
    xhr.onload = function () {
        if (this.status === 200) {
            icons.innerHTML = this.responseText;
        }
    };
    
    xhr.send();
})();
