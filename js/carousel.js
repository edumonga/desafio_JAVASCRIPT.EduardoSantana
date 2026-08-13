let carouselArr = [];

class Carousel {

    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    static _sequence = 0;
    static _size = 0;
    static _interval = null;
    static _arr = [];
    static _time = 5000;

    static Start(arr) {
        if (!arr || arr.length === 0) {
            throw "O metodo Start precisa de um array com pelo menos um item";
        }

        Carousel._arr = arr;
        Carousel._size = arr.length;
        Carousel._sequence = 0;

        Carousel.Show();

        if (Carousel._interval !== null) {
            clearInterval(Carousel._interval);
        }

        Carousel._interval = setInterval(function () {
            Carousel.Next();
        }, Carousel._time);
    }

    static Stop() {
        clearInterval(Carousel._interval);
        Carousel._interval = null;
    }

    static Show() {
        const item = Carousel._arr[Carousel._sequence];
        if (!item) return;

        const divCarousel = document.getElementById("carousel");
        const divTitle = document.getElementById("carousel-title");

        divCarousel.style.backgroundImage = `url('${item.image}')`;
        divCarousel.style.backgroundRepeat = "no-repeat";
        divCarousel.style.backgroundPosition = "center";
        divCarousel.style.backgroundSize = "contain";

        divTitle.innerHTML = `<a href="${item.url}">${item.title}</a>`;

        Carousel.UpdateDots();
    }

    static Next() {
        Carousel._sequence++;
        if (Carousel._sequence >= Carousel._size) {
            Carousel._sequence = 0;
        }
        Carousel.Show();
    }

    static Previous() {
        Carousel._sequence--;
        if (Carousel._sequence < 0) {
            Carousel._sequence = Carousel._size - 1;
        }
        Carousel.Show();
    }

    static Prev() {
        Carousel.Previous();
    }

    static UpdateDots() {
        const dots = document.querySelectorAll("#carousel-wrapper button");
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.opacity = "0.6";
        }
    }
}

carouselArr.push(new Carousel("img/imagem_1.jpg", "Esta é a nova Ranger Ford 2022. Verifique as novidades.", "lancamento.html"));
carouselArr.push(new Carousel("img/imagem_2.jpg", "Ford, a nossa história", "lancamento.html"));
carouselArr.push(new Carousel("img/imagem_3.jpg", "Nova Ford Bronco Sport 2022", "lancamento.html"));

window.addEventListener("load", function () {
    Carousel.Start(carouselArr);
});
