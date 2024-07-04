class Character {
    constructor(name, maxHP) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
    }

    attack(target) {
        const damage = Math.floor(Math.random() * 20) + 10;
        target.takeDamage(damage);
        return damage;
    }

    takeDamage(damage) {
        this.currentHP -= damage;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
    }
}

const player = new Character("Player", 100);
const enemy = new Character("Enemy", 50);

const playerHpElement = document.getElementById("player-hp");
const enemyHpElement = document.getElementById("enemy-hp");
const attackButton = document.getElementById("attack-button");
const resetButton = document.getElementById("reset-button");

playerHpElement.textContent = player.currentHP;
enemyHpElement.textContent = enemy.currentHP;

attackButton.addEventListener("click", () => {
    const playerDamage = player.attack(enemy);
    const enemyDamage = enemy.attack(player);

    playerHpElement.textContent = player.currentHP;
    enemyHpElement.textContent = enemy.currentHP;

    if (player.currentHP <= 0 || enemy.currentHP <= 0) {
        endBattle(player.currentHP <= 0 ? "Enemy" : "Player");
    }
});

resetButton.addEventListener("click", () => {
    player.currentHP = player.maxHP;
    enemy.currentHP = enemy.maxHP;
    playerHpElement.textContent = player.currentHP;
    enemyHpElement.textContent = enemy.currentHP;
    attackButton.disabled = false;
});

function endBattle(winner) {
    attackButton.disabled = true;
    resetButton.style.display = "inline-block";
    alert(winner + " wins the battle!");
}
