const emojis = [
   "🧀",
   "🧀",
   "🥗",
   "🥗",
   "🥩",
   "🥩",
   "🍠",
   "🍠",
   "🍛",
   "🍛",
   "🍟",
   "🍟",
   "🍤",
   "🍤",
   "🥟",
   "🥟"
];
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2: -1));

for(let i=0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick(){
    if(openCards.length < 2){
     this.classList.add("boxOpen");
     openCards.push(this);  
    }
    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
    console.log(openCards);
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen")
        openCards[1].classList.remove("boxOpen")
    }

    openCards = [];

    if(document.querySelector(".boxMatch").length === emojis.length){
        alert("Você venceu!")
    }
}
let startTime = 0;
let interval; // Para controle do tempo
let ranking = []; // Lista para o ranking

// Abre o modal de nome do jogador
function openPlayerModal() {
    document.getElementById("player-modal").style.display = "flex";
}

// Fecha o modal de nome do jogador
function closePlayerModal() {
    document.getElementById("player-modal").style.display = "none";
}

// Abre o modal do ranking
function openRankingModal() {
    document.getElementById("ranking-modal").style.display = "flex";
    updateRanking(); // Atualiza o ranking antes de exibir
}

// Fecha o modal do ranking
function closeRankingModal() {
    document.getElementById("ranking-modal").style.display = "none";
}

// Atualiza o ranking na interface
function updateRanking() {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = ""; // Limpa o ranking

    ranking.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.name} - Pontos: ${player.score} - Tempo: ${player.time}s`;
        rankingList.appendChild(listItem);
    });
}

// Inicia o jogo e o contador de tempo
function startGame() {
    const playerName = document.getElementById("player-name").value;
    if (!playerName.trim()) {
        alert("Por favor, insira seu nome!");
        return;
    }

    closePlayerModal(); // Fecha o modal de nome
    startTime = 0;

    // Inicia o cronômetro
    interval = setInterval(() => {
        startTime++;
        document.getElementById("timer").textContent = `Tempo: ${startTime}s`; // Atualiza o tempo na tela
    }, 1000);

    // Exibe o jogo
    document.querySelector(".game").style.display = "flex";
}


// Abre o modal de vitória
function openVictoryModal(playerName, timeTaken) {
    const victoryMessage = document.getElementById("victory-message");
    victoryMessage.textContent = `${playerName}, você venceu em ${timeTaken} segundos!`;
    document.getElementById("victory-modal").style.display = "flex";
}

// Fecha o modal de vitória
function closeVictoryModal() {
    document.getElementById("victory-modal").style.display = "none";
}

// Verifica se todas as caixas foram combinadas
function checkVictory() {
    const matchedBoxes = document.querySelectorAll(".boxMatch").length;
    if (matchedBoxes === emojis.length) {
        clearInterval(interval); // Para o cronômetro
        const timeTaken = startTime; // Tempo final

        const playerName = document.getElementById("player-name").value;
        const score = Math.max(1000 - timeTaken * 10, 0); // Pontuação baseada no tempo

        // Adiciona o jogador ao ranking
        ranking.push({ name: playerName, score: score, time: timeTaken });
        ranking.sort((a, b) => b.score - a.score); // Ordena pelo maior score

        // Abre o modal de vitória
        openVictoryModal(playerName, timeTaken);
    }
}

// Atualiza o ranking na interface
function updateRanking() {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = ""; // Limpa o ranking

    ranking.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.name} - Pontos: ${player.score} - Tempo: ${player.time}s`;
        rankingList.appendChild(listItem);
    });
}


// Atualiza a função checkMatch para verificar a vitória
function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    // Verifica se todas as caixas foram combinadas
    checkVictory();
}

// Mostra o modal de nome do jogador ao carregar a página
window.onload = openPlayerModal;
