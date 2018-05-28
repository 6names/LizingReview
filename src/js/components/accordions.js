export class Drop {
    // Tabs
    static tabs(parent, triggers, contents) {
        const triggerList = parent.querySelectorAll(triggers);
        const triggersArr = Array.from(triggerList);
        const contentList = parent.querySelectorAll(contents);
        const contentArr = Array.from(contentList);
        
        triggersArr.forEach(trigger => {
            trigger.addEventListener('click', () => {
                let i = triggersArr.indexOf(trigger);
                
                for (let t of document.querySelectorAll(triggers)) {
                    t.classList.remove('current');
                }
                
                for (let c of document.querySelectorAll(contents)) {
                    c.classList.remove('current');
                }
                contentArr[i].classList.add('current');
                trigger.classList.add('current');
            });
        });
    }
    
    // Accordions
    static accordion(parent, triggers, content) {
        Array.from(parent.querySelectorAll(triggers)).forEach(trigger => {
            trigger.addEventListener('click', () => {
                if (trigger.classList.contains('active')) {
                    trigger.classList.remove('active');
                    trigger.parentElement.querySelector(content).classList.remove('active');
                } else {
                    for (let item of document.querySelectorAll(triggers)) {
                        item.classList.remove('active');
                    }
                    for (let item of document.querySelectorAll(content)) {
                        item.classList.remove('active');
                    }
                    trigger.classList.add('active');
                    trigger.parentElement.querySelector(content).classList.add('active');
                }
            });
        });
    }

    // Dropdown
    static dropDown(parent, triggers, content) {
        Array.from(parent.querySelectorAll(triggers)).forEach(trigger => {
            trigger.addEventListener('click', () => {
                Array.from(trigger.querySelectorAll('span')).forEach(text => {
                    text.classList.toggle('hidden');
                });
                
                if (trigger.classList.contains('active')) {
                    trigger.classList.remove('active');
                    trigger.parentElement.querySelector(content).classList.remove('active');
                } else {
                    trigger.classList.add('active');
                    trigger.parentElement.querySelector(content).classList.add('active');
                }
            });
        });
    }
}

