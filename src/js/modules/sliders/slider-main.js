import Slider from './slider'

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
        this.prevBtnsModule = document.querySelectorAll('.prevmodule');
        this.nextBtnsModule = document.querySelectorAll('.nextmodule');
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.teacherPopUp.style.display = 'none';

            if (this.slideIndex === 3) {
                setTimeout(() => {
                    this.teacherPopUp.style.display = 'block';
                    this.teacherPopUp.classList.add('animated', 'fadeInUp');
                }, 3000);
            } else {
                this.teacherPopUp.classList.remove( 'fadeInUp');
            }

        } catch (e) {}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.prevBtnsModule.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        this.nextBtnsModule.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.teacherPopUp = document.querySelector('.hanson');
            } catch (e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}