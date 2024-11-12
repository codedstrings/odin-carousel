import '../styles/styles.css';

class Carousel {
    constructor() {
        this.slideIndex = 0;
        this.slideInterval = null;
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevButton = document.querySelector('.prev');
        this.nextButton = document.querySelector('.next');

        this.init();
    }

    init() {
        this.updateTrackWidth();
        this.showSlide(this.slideIndex);
        this.addEventListeners();
        this.startAutoSlide();
    }

    updateTrackWidth() {
        this.track.style.width = `${this.slides.length * 100}%`;
        this.slides.forEach(slide => {
            slide.style.width = `${100 / this.slides.length}%`;
        });
    }

    showSlide(n) {
        this.slideIndex = n;
        if (this.slideIndex >= this.slides.length) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slides.length - 1;

        const translateValue = -this.slideIndex * (100 / this.slides.length);
        this.track.style.transform = `translateX(${translateValue}%)`;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.slideIndex);
        });

        console.log(`Showing slide ${this.slideIndex}, translateX: ${translateValue}%`);
    }

    changeSlide(n) {
        this.showSlide(this.slideIndex + n);
        this.resetInterval();
    }

    resetInterval() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => this.changeSlide(1), 5000);
    }

    addEventListeners() {
        this.prevButton.addEventListener('click', () => {
            console.log('Previous button clicked');
            this.changeSlide(-1);
        });
        this.nextButton.addEventListener('click', () => {
            console.log('Next button clicked');
            this.changeSlide(1);
        });
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                this.showSlide(index);
                this.resetInterval();
            });
        });
    }
}

async function fetchimage(img) {
    try {
        const apikey = 'AlLGW1neq4NEfSsuuOAr3FwxA4pu2irj';
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&tag=cute+cat&rating=g`;
        const response = await fetch(url, { mode: 'cors' });
        const catData = await response.json();
        img.src = catData.data.images.original.url;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    new Carousel();
    const images = document.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => fetchimage(img)));
});