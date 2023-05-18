// variabile che prende il div di tutte le immagini
const apt_carousel = document.querySelector('.apt-carousel');

// array contente, una per slot, una delle immagini del carosello
const slides = Array.from(apt_carousel.children);

// variabili dei pulsanti avanti e indietro del carosello
const nextButton = document.querySelector('.right-button');
const prevButton = document.querySelector('.left-button');

// variabile larghezza slide necessaria per lo spostamento delle slide. 
const sectionWidth = document.querySelector('.apt1-carousel').getBoundingClientRect().width;
const imageWidth = slides[0].getBoundingClientRect().width;

const slideWidth = imageWidth + (sectionWidth - imageWidth);
console.log(slideWidth);

// funzione di posizionamento delle slide una a fianco a l'altra 
// sfruttando la larghezza delle slide come parametro di affiancamento.
// In sostanza sto impostando la caratteristiche di stile 'left' 
// per ogni elemento dell'Array 'slides', ma con una funzione dichiarata
// per poi andarla ad utilizzare in un ciclo forEach
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
// etc..

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

// Con questa funzione posso muovermi su una 'targetSlide' andando avanti o indietro
// con i relativi pulsanti. Inserisco le 3 variabili che mi servono
// ovvero 'carousel, currentSlide, targetSlide' e le utilizzo per generare lo spostamento.
// integro poi nel relativo EventListener se si tratterà di andare indietro al 'previousSibling'
// o avanti al 'nextSibling'

const moveToSlide = (apt_carousel, apt_currentSlide, targetSlide) => {
    apt_carousel.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    apt_currentSlide.classList.remove ('apt-current-slide');
    targetSlide.classList.add ('apt-current-slide');
}

// ora che ho la funzione che sposta avanti o indietro posso creare la funzione
// che muove effettivamente avanti e poi indietro le slide a seconda del click sul
// pulsante 'nextButton' o 'prevButton'

// aggiungo un EventListener che registra il click sul bottone avanti. Dichiaro le variabili
// necessarie per eseguire la funzione 'moveToSlide' e potermi così spostare avanti nelle slide
nextButton.addEventListener('click', e => {
    // costante che registra quale è in questo momento la slide corrente cercando la classe
    // presente '.current-slide'
    const apt_currentSlide = apt_carousel.querySelector('.apt-current-slide');
    
    // costante che registra quale è in questo momento la slide successiva a quella corrente
    // tramite il parametro 'nextElementSibling'
    // chiamo la funzione 'moveToSlide' ora che ho gli elementi che mi servono per lo spostamento

    if(apt_currentSlide === slides[slides.length - 1]){
        const firstSlide = 0;
        
        apt_currentSlide.classList.remove('apt-current-slide');
        const nextSlide = slides[firstSlide];
       
        nextSlide.classList.add('apt-current-slide');
        moveToSlide(apt_carousel, apt_currentSlide, nextSlide);
    }else{
        const nextSlide = apt_currentSlide.nextElementSibling;
        moveToSlide(apt_carousel, apt_currentSlide, nextSlide);
    }
})

// aggiungo un EventListener che registra il click sul bottone indietro.
prevButton.addEventListener('click', e => {
    // costante che registra quale è in questo momento la slide corrente cercando la classe
    // presente '.current-slide'
    const apt_currentSlide = apt_carousel.querySelector('.apt-current-slide');
    
    if(apt_currentSlide === slides[0]){
        const lastSlide = slides.length - 1;
        
        apt_currentSlide.classList.remove('apt-current-slide');
        const prevSlide = slides[lastSlide];

        prevSlide.classList.add('apt-current-slide');
        moveToSlide(apt_carousel, apt_currentSlide, prevSlide);
    }else{
        const prevSlide = apt_currentSlide.previousElementSibling;
        moveToSlide(apt_carousel, apt_currentSlide, prevSlide);
    }
    // costante che registra quale è in questo momento la slide precedente a quella corrente
    // tramite il parametro 'previousElementSibling'
    

    // chiamo la funzione 'moveToSlide' ora che ho gli elementi che mi servono per lo spostamento
    
})




// se slide[0] ha la classe '.current-slide' e viene premuto il tasto prevButton
// slide[slide.lenght -1] deve prendere la classe '.currentSlide' e comparire
