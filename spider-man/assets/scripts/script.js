function handMouseEnter(){
   this.classList.add('card--hovered');
   document.body.id = `${this.id}-hovered`;
}

function handMouseLeave(){
    this.classList.remove('card--hovered');
    document.body.id ="";
}

function addEventListenersToCards(){
    const cardElements = document.getElementsByClassName('card');
    
    for(let index = 0; index < cardElements.length; index++){
        const card = cardElements[index];
        card.addEventListener('mouseenter', handMouseEnter);
        card.addEventListener('mouseleave', handMouseLeave);
    }
}
document.addEventListener("DOMContentLoaded", addEventListenersToCards, false);

function selectCarouselItem(selectedButtonElement) {
    const selectedItem = selectedButtonElement.id;
    const carousel = document.querySelector('.cards-carousel');
    const transform = carousel.style.transform;
    const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);
    const rotateYDeg = -120 * (Number(selectedItem) - 1);
    const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);
  
    carousel.style.transform = newTransform;
  
    const activeButtonElement = document.querySelector('.controller_button--active');
    activeButtonElement.classList.remove('controller_button--active');
    selectedButtonElement.classList.add('controlle__button--active');
  }