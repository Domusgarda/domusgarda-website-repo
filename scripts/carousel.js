// variabile che prende il div di tutte le immagini
const carousel = document.querySelector('.carousel');

// array contente, una per slot, una delle immagini del carosello
const slides = Array.from(carousel.children);

// variabili dei pulsanti avanti e indietro del carosello
const nextButton = document.querySelector('.right-button');
const prevButton = document.querySelector('.left-button');

// variabile larghezza slide necessaria per lo spostamento delle slide. 
const slideWidth = slides[0].getBoundingClientRect().width;

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

const moveToSlide = (carousel, currentSlide, targetSlide) => {
    carousel.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove ('current-slide');
    targetSlide.classList.add ('current-slide');
}

// ora che ho la funzione che sposta avanti o indietro posso creare la funzione
// che muove effettivamente avanti e poi indietro le slide a seconda del click sul
// pulsante 'nextButton' o 'prevButton'

// aggiungo un EventListener che registra il click sul bottone avanti. Dichiaro le variabili
// necessarie per eseguire la funzione 'moveToSlide' e potermi così spostare avanti nelle slide
nextButton.addEventListener('click', e => {
    // costante che registra quale è in questo momento la slide corrente cercando la classe
    // presente '.current-slide'
    const currentSlide = carousel.querySelector('.current-slide');
    
    // costante che registra quale è in questo momento la slide successiva a quella corrente
    // tramite il parametro 'nextElementSibling'
    // chiamo la funzione 'moveToSlide' ora che ho gli elementi che mi servono per lo spostamento

    if(currentSlide === slides[slides.length - 1]){
        const firstSlide = 0;
        
        currentSlide.classList.remove('current-slide');
        const nextSlide = slides[firstSlide];
       
        nextSlide.classList.add('current-slide');
        moveToSlide(carousel, currentSlide, nextSlide);
    }else{
        const nextSlide = currentSlide.nextElementSibling;
        moveToSlide(carousel, currentSlide, nextSlide);
    }
})

// aggiungo un EventListener che registra il click sul bottone indietro.
prevButton.addEventListener('click', e => {
    // costante che registra quale è in questo momento la slide corrente cercando la classe
    // presente '.current-slide'
    const currentSlide = carousel.querySelector('.current-slide');
    
    if(currentSlide === slides[0]){
        const lastSlide = slides.length - 1;
        
        currentSlide.classList.remove('current-slide');
        const prevSlide = slides[lastSlide];

        prevSlide.classList.add('current-slide');
        moveToSlide(carousel, currentSlide, prevSlide);
    }else{
        const prevSlide = currentSlide.previousElementSibling;
        moveToSlide(carousel, currentSlide, prevSlide);
    }
    // costante che registra quale è in questo momento la slide precedente a quella corrente
    // tramite il parametro 'previousElementSibling'
    

    // chiamo la funzione 'moveToSlide' ora che ho gli elementi che mi servono per lo spostamento
    
})




// se slide[0] ha la classe '.current-slide' e viene premuto il tasto prevButton
// slide[slide.lenght -1] deve prendere la classe '.currentSlide' e comparire
