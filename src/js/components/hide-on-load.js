// Hidden elements
export function hideOnLoad() {
    const hiddenElements = document.querySelectorAll('.hide');
    
    Array.from(hiddenElements).forEach(hide => {
        if (!hide.classList.contains('visible')) {
            setTimeout(() => {
                hide.style.display = 'none';
            }, 100);
            setTimeout(() => {
                hide.classList.add('visible');
            }, 200)
        }
        
    });
}