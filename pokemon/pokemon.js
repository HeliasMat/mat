class Pokemon {
    constructor(name, hp, type, moves) {
        this.name = name;
        this.hp = hp;
        this.type = type;
        this.moves = moves;
    }

    attack(enemy, moveIndex) {
        const damage = this.moves[moveIndex].damage;
        enemy.hp -= damage;
    }

    displayType() {
        return this.type;
    }
}
const pikachu = new Pokemon('Pikachu', 100, 'Électrique', [
    { name: 'Éclair', damage: 10 },
    { name: 'Vive-Attaque', damage: 5 },
    { name: 'Queue de Fer', damage: 15 },
    { name: 'Boule Élek', damage: 12 },
]);
    
    const salameche = new Pokemon('Salamèche', 100, 'Feu', [
    { name: 'Griffe', damage: 7 },
    { name: 'Flammèche', damage: 10 },
    { name: 'Dracosouffle', damage: 15 },
    { name: 'Lance-Flammes', damage: 20 },
]);

const bulbasaur = new Pokemon('Bulbasaur', 100, 'Grass', [
    { name: 'Scratch', damage: 7 },
    { name: 'Ember', damage: 10 },
    { name: 'Dragon Breath', damage: 15 },
    { name: 'Flamethrower', damage: 20 },
  ]);
  
  const squirtle = new Pokemon('Squirtle', 100, 'Water', [
    { name: 'Scratch', damage: 7 },
    { name: 'Ember', damage: 10 },
    { name: 'Dragon Breath', damage: 15 },
    { name: 'Flamethrower', damage: 20 },
  ]);

function displayPokemonDetails(pokemon, nameId, typeId, hpId, hpValueId, imageId) {
    document.getElementById(nameId).innerText = pokemon.name;
    document.getElementById(typeId).innerText = pokemon.displayType();
    updateHp(pokemon, hpId, hpValueId);
    document.getElementById(imageId).src = `${pokemon.name.toLowerCase()}.jpg`;
}


function updateHp(pokemon, hpElementId, hpValueElementId) {
    const hpElement = document.getElementById(hpElementId);
    const hpValueElement = document.getElementById(hpValueElementId);
    const percentage = (pokemon.hp / 100) * 100;
    hpElement.style.width = `${percentage}%`;
    hpValueElement.innerText = pokemon.hp;
}

function displayActionText(text) {
    const actionTextElement = document.getElementById('action-text');
    actionTextElement.innerText = text;
}

function performAttack(attacker, defender, moveIndex, hpElementId, hpValueElementId, actionText) {
    attacker.attack(defender, moveIndex);
    updateHp(defender, hpElementId, hpValueElementId);
    displayActionText(actionText);

    if (defender.hp <= 0) {
        alert(`Vous avez perdu`);
        return true;
    }
    return false;
}

function attack(moveIndex) {
    const playerWins = performAttack(pikachu, salameche, moveIndex, 'hp2', 'hp2-value', `Pikachu utilise ${pikachu.moves[moveIndex].name}!`);
    if(playerWins){
        window.location.href = '../index.html';
    }
    if (!playerWins) {
        setTimeout(() => {
            const enemyMoveIndex = Math.floor(Math.random() * salameche.moves.length);
            performAttack(salameche, pikachu, enemyMoveIndex, 'hp1', 'hp1-value', `Salameche utilise ${salameche.moves[enemyMoveIndex].name}!`);
        }, 500); // 2000 milliseconds (2 seconds) delay
    }
}


document.getElementById('pikachu-type').innerText = pikachu.displayType();
document.getElementById('salameche-type').innerText = salameche.displayType();
