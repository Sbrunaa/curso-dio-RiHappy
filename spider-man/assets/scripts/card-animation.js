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