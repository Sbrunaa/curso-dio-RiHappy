const state ={
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        curretLife: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        
        // Reduz uma vida
        state.values.curretLife--;
        state.view.lifes.textContent = `x${state.values.curretLife}`;
        
        if (state.values.curretLife > 0) {
            // Pergunta se o usuário deseja jogar novamente
            let playAgain = confirm("O tempo acabou! Você quer jogar novamente?");
            if (playAgain) {
                // Reinicia o jogo
                resetGame();
            } else {
                alert("Fim de jogo! O seu resultado foi: " + state.values.result);
            }
        } else {
            alert("Game Over! Suas vidas acabaram. O seu resultado foi: " + state.values.result);
        }
    }
}

// Função para reiniciar o jogo com as vidas restantes
function resetGame() {
    state.values.curretTime = 60;
    state.view.timeLeft.textContent = state.values.curretTime;
    
    // Reinicia o temporizador e os inimigos
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(audioName){
    let audio = new Audio(`./assets/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() *9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function main(){
    addListenerHitBox();
}

main();