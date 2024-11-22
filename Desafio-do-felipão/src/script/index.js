function classificacao (){
    let nomeHeroi = document.getElementById("nomeHeroi").value.trim();
    let totalXp = parseInt(document.getElementById("totalXp").value);

    let nivel;

    if(totalXp <=1000){
        nivel= "Ferro";
    }else if(totalXp >=1001 && totalXp<=2000){
        nivel= "Bronze";
    }else if(totalXp >=2001 && totalXp <=5000){
        nivel = "Prata";
    }else if(totalXp >=5001 && totalXp <=7000){
        nivel= "Ouro";
    }else if(totalXp >=7001 && totalXp <=8000){
        nivel= "Platina";
    }else if(totalXp >=8001 && totalXp <=9000){
        nivel = "Ascendente";
    }else if(totalXp >9001 && totalXp <=10000){
         nivel = "Imortal";
    }else {
        nivel = "Radiante";
    }
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `O Herói de nome <strong>${nomeHeroi}</strong> está no nível de <strong>${nivel}</strong>.`;
}