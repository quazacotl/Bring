import Slider from './slider'

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    nextSlide() {
        if (this.container.classList.contains('feed__slider')) {
            this.container.insertBefore(this.slides[0], this.container.querySelector('.slick-prev'));
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });


        this.slides[0].classList.add(this.activeClass);
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {
            if (this.container.classList.contains('feed__slider')) {
                this.container.insertBefore(this.slides[this.slides.length - 3], this.slides[0]);
                this.decorizeSlides();
            } else {
                this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
                this.decorizeSlides();
            }
        });
    }

    autoplaySlides() {
        let timerID = setInterval(() => this.nextSlide(), this.autoplay);
        this.slides.forEach(slide => {
            slide.addEventListener('mouseover', () => {
                clearInterval(timerID);
            });
            slide.addEventListener('mouseout', () => {
                timerID = setInterval(() => this.nextSlide(), this.autoplay);
            });
        });
    }

    init() {
        this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            this.autoplaySlides();
        }
    }
};