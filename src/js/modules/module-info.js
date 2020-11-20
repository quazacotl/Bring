export default class ModuleInfo {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    showText() {
        this.btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                this.message = btn.parentNode.nextElementSibling;
                this.message.style.display = 'block';
                this.message.classList.add('animated', 'fadeInUp')
            });
        });
    }
}