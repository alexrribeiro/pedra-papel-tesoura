var opcao, opcaoComputador, opcaoUsuario, resultado, vencedor, nomeUsuario, nomeCampeao, icone, iconeUsuario, iconeComputador;
var pontosUsuario = 0, pontosComputador = 0, pontosLider = 0;
const painelNomeUsuario = document.getElementById("nome-usuario");
const exibicaoUsuario = document.getElementById("escolha-usuario");
const exibicaoComputador = document.getElementById("escolha-computador");
const exibicaoVencedor = document.getElementById("vencedor-jogo");
const areaVencedor = document.getElementById("exibicao-vencedor");
const areaUsuario = document.getElementById("painel-usuario");
const areaComputador = document.getElementById("painel-computador");
const placarUsuario = document.getElementById("placar-usuario");
const placarComputador = document.getElementById("placar-computador");
const configuracoes = document.getElementById("settings-bg");
const campeao = document.getElementById("winner-bg");
const campeaoBody = document.getElementById("winner-body");
const nomeUsuarioPainel = document.getElementById("nome-usuario-painel");
// const botoesOpcao = document.querySelectorAll(".botao-opcao");

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

  if (pontosUsuario > pontosComputador) {
    pontosLider = pontosUsuario;
  }
  else if (pontosComputador > pontosLider) {
    pontosLider = pontosComputador;
  }

  return vencedor;
}

function jogarPedraPapelTesoura(opcaoUsuario) {
  iconeUsuario = obterIcone(opcaoUsuario);
  opcaoUsuario = verificarOpcao(opcaoUsuario);

  opcaoComputador = Math.floor(Math.random()*3);
  iconeComputador = obterIcone(opcaoComputador);
  opcaoComputador = verificarOpcao(opcaoComputador);

  document.getElementById("botao-pedra").setAttribute("disabled", true);
  document.getElementById("botao-papel").setAttribute("disabled", true);
  document.getElementById("botao-tesoura").setAttribute("disabled", true);

  var limite = determinarMaximoPontos();
  // console.log('limite', limite);
  
  while (pontosLider != limite) {
    verificarVencedor(opcaoUsuario, opcaoComputador);
    alterarPlacar();
    exibirIconesEscolhidos(iconeUsuario, iconeComputador);
    exibirNomeVencedor(vencedor);
    if (pontosLider == limite) {
      pontosLider == pontosUsuario ? nomeCampeao = 'user' : nomeCampeao = 'computer';
      exibirCampeao();
      zerarPontuacao();
    }
    break;
  }


  // console.log('pts usuario', pontosUsuario, 'pts computador', pontosComputador, 'pts lider', pontosLider);
}

function exibirCampeao() {
  let classBotao;
  campeao.classList.add('show');
  console.log(nomeCampeao);

  if (nomeCampeao == 'user') {
    campeaoBody.classList.remove('winner-computer');
    campeaoBody.classList.add('winner-user');
    campeaoBody.innerHTML = '<i class="fa-solid fa-trophy trofeu"></i>';
    campeaoBody.innerHTML += '<h2>Parabéns! Você venceu!</h2>';
    classBotao = 'winner-user-button'
  }
  else if (nomeCampeao == 'computer') {
    campeaoBody.classList.remove('winner-user');
    campeaoBody.classList.add('winner-computer');
    campeaoBody.innerHTML = '<i class="fa-solid fa-laptop-code laptop"></i>'
    campeaoBody.innerHTML += '<h2>Que pena! Você perdeu!</h2>';
    classBotao = 'winner-computer-button'
  }
  campeaoBody.innerHTML += `<p>${nomeUsuario} ${pontosUsuario} x ${pontosComputador} Computador`;
  campeaoBody.innerHTML += `<button class='button-panels ${classBotao}' onclick='sairPainelCampeao()'>OK</button>`
}

function exibirIconesEscolhidos(iconeUsuario, iconeComputador) {
  exibicaoUsuario.innerHTML = "<p><i class='" + iconeUsuario + " icone'></i></p>";
  exibicaoComputador.innerHTML = "<p><i class='" + iconeComputador + " icone'></i></p>";
}

function sairPainelCampeao() {
  campeao.classList.remove('show');
}

function exibirNomeVencedor(vencedor) {
  areaVencedor.style.display = "block";

  if (vencedor == "Usuario") {
    exibicaoVencedor.innerHTML = "Você venceu!<br>Toque aqui para continuar";
    areaVencedor.style.background = "var(--user-color-light)";
    areaUsuario.style.background = "var(--user-color)";
    areaComputador.style.background = "var(--background-color-dsb)";
  }
  else if (vencedor == "Computador") {
    exibicaoVencedor.innerHTML = "Você perdeu!<br>Toque aqui para continuar";
    areaVencedor.style.background = "var(--computer-color-light)";
    areaUsuario.style.background = "var(--background-color-dsb)";
    areaComputador.style.background = "var(--computer-color)";
  }
  else if (vencedor == "Ninguem") {
    exibicaoVencedor.innerHTML = "Ninguém venceu!<br>Toque aqui para continuar";
    areaVencedor.style.background = "var(--background-color-light)";
    areaUsuario.style.background = "var(--background-color-dsb)";
    areaComputador.style.background = "var(--background-color-dsb)";
  }
  else {
    exibicaoVencedor.innerHTML = "Ocorreu algum erro<br>&nbsp;";
  }
}

function alterarPlacar() {
  placarUsuario.innerHTML = pontosUsuario;
  placarComputador.innerHTML = pontosComputador;
}

function zerarPontuacao() {
  pontosUsuario = 0;
  pontosComputador = 0;
  pontosLider = 0;
  alterarPlacar();
  continuarJogo();
}

function continuarJogo() {
  areaComputador.style.background = 'var(--background-color-dsb)';
  areaUsuario.style.background = 'var(--background-color-dsb)';
  areaVencedor.style.background = 'var(--background-color-dsb-light)';
  exibicaoVencedor.innerHTML = "Boa sorte!<br>Toque em um dos botões";
  exibicaoUsuario.innerHTML = "&nbsp;";
  exibicaoComputador.innerHTML = "&nbsp;";
  document.getElementById("botao-pedra").removeAttribute("disabled");
  document.getElementById("botao-papel").removeAttribute("disabled");
  document.getElementById("botao-tesoura").removeAttribute("disabled");
}

function abrirConfiguracoes() {
  configuracoes.classList.add('show');
  document.formsettings.nome.focus();
}

function configurarJogo() {
  nomeUsuario = document.getElementById("txtNome").value;
  if (nomeUsuario == '') {
    nomeUsuario = "Você";
  }
  painelNomeUsuario.innerHTML = nomeUsuario;
  nomeUsuarioPainel.innerHTML = nomeUsuario;
}

function determinarMaximoPontos() {
  var maximoPontos = document.getElementById("txtMaxPontos").value;
  if (maximoPontos == 0) {
    maximoPontos = -1;
  }
  return maximoPontos;
}

function voltarProJogo() {
  configurarJogo();
  configuracoes.classList.remove('show');
}