let opcao, opcaoComputador, opcaoUsuario, resultado, vencedor, icone, iconeUsuario, iconeComputador;
let pontosUsuario = 0, pontosComputador = 0;
const exibicaoUsuario = document.getElementById("escolha-usuario");
const exibicaoComputador = document.getElementById("escolha-computador");
const exibicaoVencedor = document.getElementById("vencedor-jogo");
const areaVencedor = document.getElementById("exibicao-vencedor");
const areaUsuario = document.getElementById("painel-usuario");
const areaComputador = document.getElementById("painel-computador");
const placarUsuario = document.getElementById("placar-usuario");
const placarComputador = document.getElementById("placar-computador")

function verificarOpcao(opcao) {
  switch (opcao) {
    case 0:
      opcao = "Pedra";
      break;
    case 1:
      opcao = "Papel";
      break;
    case 2:
      opcao = "Tesoura";
      break;
    default:
      opcao = "Erro";
      break;
  }

  return opcao;
}

function obterIcone(opcao) {
  switch (opcao) {
    case 0:
      icone = "icon-hand-grab-o";
      break;
    case 1:
      icone = "icon-hand-paper-o";
      break;
    case 2:
      icone = "icon-hand-scissors-o";
      break;
    default:
      icone = "X";
      break;
  }

  return icone;
}

function verificarVencedor(opcaoUsuario, opcaoComputador) {
  if (
    (opcaoUsuario == "Pedra" && opcaoComputador == "Pedra") ||
    (opcaoUsuario == "Papel" && opcaoComputador == "Papel") ||
    (opcaoUsuario == "Tesoura" && opcaoComputador == "Tesoura")
  ){
    vencedor = "Ninguem";
  }
  else if (
    (opcaoUsuario == "Pedra" && opcaoComputador == "Papel") ||
    (opcaoUsuario == "Papel" && opcaoComputador == "Tesoura") ||
    (opcaoUsuario == "Tesoura" && opcaoComputador == "Pedra")
  ){
    vencedor = "Computador";
    pontosComputador++;
  }
  else if (
    (opcaoUsuario == "Pedra" && opcaoComputador == "Tesoura") ||
    (opcaoUsuario == "Papel" && opcaoComputador == "Pedra") ||
    (opcaoUsuario == "Tesoura" && opcaoComputador == "Papel")
  ){
    vencedor = "Usuario";
    pontosUsuario++;
    }
  else{
    vencedor = "Erro";
  }

  return vencedor;
}

function jogarPedraPapelTesoura(opcaoUsuario) {
  iconeUsuario = obterIcone(opcaoUsuario);
  opcaoUsuario = verificarOpcao(opcaoUsuario);

  opcaoComputador = Math.floor(Math.random()*3);
  iconeComputador = obterIcone(opcaoComputador);
  opcaoComputador = verificarOpcao(opcaoComputador);

  verificarVencedor(opcaoUsuario, opcaoComputador);
  alterarPlacar();
  exibirIconesEscolhidos(iconeUsuario, iconeComputador);
  exibirNomeVencedor(vencedor);
}

function exibirIconesEscolhidos(iconeUsuario, iconeComputador) {
  exibicaoUsuario.innerHTML = "<p><i class='" + iconeUsuario + " icone'></i></p>";
  exibicaoComputador.innerHTML = "<p><i class='" + iconeComputador + " icone'></i></p>";
}

function exibirNomeVencedor(vencedor) {
  areaVencedor.style.display = "block";

  if (vencedor == "Usuario") {
    exibicaoVencedor.innerHTML = "Você venceu!";
    areaVencedor.style.background = "var(--user-color-light)";
    areaUsuario.style.background = "var(--user-color)";
    areaComputador.style.background = "var(--background-color-dsb)";
  }
  else if (vencedor == "Computador") {
    exibicaoVencedor.innerHTML = "Você perdeu!";
    areaVencedor.style.background = "var(--computer-color-light)";
    areaUsuario.style.background = "var(--background-color-dsb)";
    areaComputador.style.background = "var(--computer-color)";
  }
  else if (vencedor == "Ninguem") {
    exibicaoVencedor.innerHTML = "Ninguém venceu!";
    areaVencedor.style.background = "var(--background-color-light)";
    areaUsuario.style.background = "var(--background-color-dsb)";
    areaComputador.style.background = "var(--background-color-dsb)";
  }
  else {
    exibicaoVencedor.innerHTML = "Ocorreu algum erro";
  }
}

function alterarPlacar() {
  placarUsuario.innerHTML = pontosUsuario;
  placarComputador.innerHTML = pontosComputador;
}

function zerarPontuacao() {
  pontosUsuario = 0;
  pontosComputador = 0;
  alterarPlacar();
}