let palavras = ["botulismo","meningite","coqueluche"];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let alfabeto = "abcdefghijklmnopqrstuvwxyz";
let letras = alfabeto.split("");

for (let posicao = 0; posicao < letras.length; posicao++) {
    let botao = document.createElement("button");
    let letra = document.createTextNode(letras[posicao]);
    botao.appendChild(letra);
    botao.setAttribute('onclick', 'letraescolhida(\''+letras[posicao]+'\')');
    botao.setAttribute('id', letras[posicao]);
    let div = document.getElementById("letras");
    div.appendChild(botao);
}
for (let posicao = 0; posicao < palavra.length; posicao++) {
    let span = document.createElement("span");
    span.setAttribute('id', posicao);
    let div = document.getElementById("palavra");
    div.appendChild(span);
}
let chances = 6;
let acertos = 0;
let imagem = 0;
function letraescolhida(letra) {
    let acertou = false;
    for (posicao = 0; posicao < palavra.length; posicao++) {
        if (letra === palavra[posicao]) {
            let span = document.getElementById(posicao);
            let letra1 = document.createTextNode(letra);
            span.appendChild(letra1);
            let botao = document.getElementById(letra);
            botao.removeAttribute('onclick');
            acertos++;
            acertou = true;
        }
    }
    if (acertou === false) {
        imagem++;
        document.getElementById("forca").src = "images/forca"+imagem+".jpg";
        var botao = document.getElementById(letra);
        botao.removeAttribute('onclick');
        chances--;
    }
    if (chances === 0) {
        let mensagem = document.createElement("p");
        let alert1 = document.createTextNode("Você perdeu!");
        mensagem.appendChild(alert1);
        let botao = document.createElement("button");
        let alert2 = document.createTextNode("jogar novamente");
        botao.appendChild(alert2);
        botao.setAttribute('class', 'novo-bt');
        botao.setAttribute('onclick', 'window.location.reload()');
        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }
    if (acertos === palavra.length) {
        let mensagem = document.createElement("p");
        let alert1 = document.createTextNode("Você venceu!");
        mensagem.appendChild(alert1);
        let botao = document.createElement("button");
        let alert2 = document.createTextNode("jogar novamente");
        botao.appendChild(alert2);
        botao.setAttribute('class', 'novo-bt');
        botao.setAttribute('onclick', 'window.location.reload()');
        let div = document.getElementById("novo");
        div.appendChild(mensagem);
        div.appendChild(botao);
    }
}