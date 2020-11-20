export default class Download {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
        this.image = '../../assets/img/showup.jpg'
    }

    init() {
        this.btns.forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                let newLink = document.createElement('a');
                newLink.setAttribute('href', this.image);
                newLink.setAttribute('download', 'pen in the mouth');
                document.body.appendChild(newLink);
                newLink.click();
                document.body.removeChild(newLink);
            });
        });
    }
}