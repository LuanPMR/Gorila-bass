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
    log('😴 Gorila descansou e recuperou stamina.');
    this.defending = false;
    atualizarImagem("descanso"); // Atualiza a imagem para a ação de descanso
    return true;
  }

}