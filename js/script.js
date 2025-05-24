class Gorila {
  constructor() {
    this.hp = 500;
    this.maxHp = 500;
    this.stamina = 50;
    this.maxStamina = 50;
    this.defending = false; 
    this.humans = Array(100).fill(true); 
  }

  attack() {
    if (this.stamina < 8) {
      log('Stamina insuficiente para atacar!');
      return false;
    }
    const kills = Math.floor(Math.random() * 5) + 1;
    let mortos = 0;
    for (let i = 0; i < this.humans.length && mortos < kills; i++) {
      if (this.humans[i]) {
        this.humans[i] = false;
        mortos++;
      }
    }
    this.stamina -= 8;
    log(`Gorila atacou e eliminou ${mortos} humano(s)!`);
    this.defending = false;
    atualizarImagem("ataque");
    return true;
  }

  defend() {
  if (this.stamina < 5) {
    log('Stamina insuficiente para defender!');
    return false;
  }
  
  this.stamina -= 5; 
  this.stamina = Math.min(this.stamina + 10, this.maxStamina);
  
  this.defending = true; 
  log('Gorila está se defendendo! Ele reduzirá o dano recebido e recuperará um pouco de stamina.');
  
  atualizarImagem("defesa");
  return true;
  }

  rest() {
    this.stamina = Math.min(this.stamina + 12, this.maxStamina);
    log('Gorila descansou e recuperou stamina.');
    this.defending = false;
    atualizarImagem("descanso"); 
    return true;
  }

  humanosAtacam() {
  const vivos = this.humanosRestantes(); 
  
  let danoBase = 1; 
  let danoMaximo = 5; 
  let danoTotal = 0;

  for (let i = 0; i < vivos; i++) {
    if (Math.random() < 0.06) { 
      danoTotal += Math.floor(Math.random() * (danoMaximo - danoBase + 1)) + danoBase;
    }
  }

  if (this.defending) {
    danoTotal = Math.floor(danoTotal / 2);
  }

  danoTotal = Math.max(1, danoTotal);

  this.hp = Math.max(0, this.hp - danoTotal);
  
  log(`Humanos atacaram e causaram ${danoTotal} de dano ao gorila.`);
  
  this.defending = false; 
  atualizarImagem("inicio"); 
}
}

const hpEl = document.getElementById('hp');
const staminaEl = document.getElementById('stamina');
const humansEl = document.getElementById('humans');
const logEl = document.getElementById('log');
const btnAttack = document.getElementById('btn-attack');
const btnDefend = document.getElementById('btn-defend');
const btnRest = document.getElementById('btn-rest');
const btnRestart = document.getElementById('btn-restart');
const gorilaImg = document.getElementById('gorila-img');

let game;

function atualizarImagem(acao) {
  const imagens = {
    inicio: ".img/gorila_parado.png",
    ataque: ".img/gorila_atacando.png",
    defesa: ".img/defesa_gorila.png",
    descanso: ".img/cansado_gorila.png",
    derrota: ".img/gorila_perdeu.png",
    vitoria: ".img/venceu_gorila.png"
  };

  gorilaImg.src = imagens[acao];
}

