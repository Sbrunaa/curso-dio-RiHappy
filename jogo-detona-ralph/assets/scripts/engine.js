const state ={
    // seção onde trabalha aparte visuvel do jogo
    view: {
        squares: document.querySelectorAll(".square"), //selecionna todas as divs do quadrado
        enemy: document.querySelector(".enemy"),//seleciona o inimigo atual
        timeLeft: document.querySelector("#time-left"),//elemento que mostra o tempo restante
        score: document.querySelector("#score"),//lemento que exibe a pontuação
        lifes: document.querySelector("#lifes"),//elemento que exibe as vidas restante
    },
    // seçãp onde trabalha os valores do jogo, parte logica
    values: {
        gameVelocity: 1000,//veleocidade do jogo em milissegundos
        hitPosition: 0,//posição do alvo que o jogador deve acertar
        result: 0,// pontuação do jogador
        curretTime: 60,//tempo de jogo em segundos
        curretLife: 3,//vidas iniciais do jogador
    },
    // seção onde guardam ações  que guradm identificadores de intervalos para o controle do jogo
    actions: {
        timeId: setInterval(randomSquare, 1000),//id para intervalos do movimento do inimigo
        countDownTimerId: setInterval(countDown, 1000),//id para contagem regressiva
    },
};
// função para diminuir o tempo do jogo
function countDown(){
    state.values.curretTime--;//reduz o tempo em 1 segundo
    state.view.timeLeft.textContent = state.values.curretTime;//atualiza o texto na página
    //verifica se o tempo do jogo acabou
    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);//para a contagem regressiva
        clearInterval(state.actions.timeId);// para o movimento do inimigo
        
        // Reduz uma vida
        state.values.curretLife--;
        state.view.lifes.textContent = `x${state.values.curretLife}`;//atualiza a exibição de vida
        // se ainda houver vida, oferece a opção de jogar novamente
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
            alert("Suas vidas acabaram. O seu resultado foi: " + state.values.result);//exibe a pontuação final
        }
    }
}

// Função para reiniciar o jogo com as vidas restantes
function resetGame() {
    state.values.curretTime = 60;//reinicia o tempo
    state.view.timeLeft.textContent = state.values.curretTime;//atualiza a exibição de tempo
    
    // Reinicia o temporizador e os inimigos
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
}
//função para tocar  som
function playSound(audioName){
    let audio = new Audio(`./assets/audios/${audioName}.m4a`);//cria um novo objeto de audio
    audio.volume = 0.2;//define o volume
    audio.play();//toca o som
}
//função que move o inimigo para posição aleatoria
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");// remove o inimigo
    });

    let randomNumber = Math.floor(Math.random() *9);//seleciona um indice aleatorio de quadrodos
    let randomSquare = state.view.squares[randomNumber];//pega o quadro aleatorio
    randomSquare.classList.add("enemy");//adiciona o inimigo ao uadrodo selecionado
    state.values.hitPosition = randomSquare.id;//amazena o posição do inimigo
}

// Função para adicionar o evento de clique aos quadrados
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++//incrementa a pontuação
                state.view.score.textContent = state.values.result;//atualiza a exibição da pontuação
                state.values.hitPosition = null;//reseta a posição do inimigo
                playSound("hit");//toca o som de acerto
            }
        });
    });
}
// Função principal que inicializa os eventos
function main(){
    addListenerHitBox();
}

// Inicializa o jogo chamando a função principal
main();