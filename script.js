const storyElement = document.getElementById("story");
const storyImageElement = document.getElementById("storyImage");
const storyTextElement = document.getElementById("storyText");
const storyAudioElement = document.getElementById("storyAudio");

const choicesElement = document.getElementById("choices");

const inventoryItemsElement = document.getElementById("inventoryItems");
const inventory = [];

const story = [
  {
    id: 1,
    text: "Vous vous réveillez dans une forêt sombre et mystérieuse. Il y a deux chemins devant vous. Lequel choisissez-vous?",
    choices: [
      { text: "Prendre le chemin de gauche", nextId: 2 },
      { text: "Prendre le chemin de droite", nextId: 3 },
    ],
  },
  {
    id: 2,
    previousId: 1,
    text: "Vous avez pris le chemin de gauche et vous êtes arrivé à une rivière. Que voulez-vous faire?",
    choices: [
      { text: "Traverser la rivière", nextId: 4 },
      { text: "Longer la rivière", nextId: 5 },
    ],
  },
  {
    id: 3,
    previousId: 1,
    text: "Vous avez pris le chemin de droite et vous êtes arrivé à une grotte sombre. Que voulez-vous faire?",
    choices: [
      { text: "Entrer dans la grotte", nextId: 6 },
      { text: "Continuer à marcher", nextId: 7 },
    ],
  },
  {
    id: 4,
    previousId: 2,
    text: "En traversant la rivière, vous trouvez un vieux sac à dos contenant une carte. Que voulez-vous faire?",
    choices: [
      { text: "Prendre la carte", nextId: 8, addItem: "Carte" },
      { text: "Ignorer la carte", nextId: 9 },
    ],
  },
  {
    id: 5,
    previousId: 2,
    text: "En longeant la rivière, vous tombez sur un pont suspendu. Voulez-vous le traverser?",
    choices: [
      { text: "Traverser le pont", nextId: 10 },
      { text: "Continuer à longer la rivière", nextId: 11 },
    ],
  },
  {
    id: 6,
    previousId: 3,
    text: "Dans la grotte, vous trouvez une vieille épée rouillée. Voulez-vous la prendre?",
    choices: [
      { text: "Prendre l'épée", nextId: 12, addItem: "Épée_rouillée" },
      { text: "Laisser l'épée", nextId: 13 },
    ],
  },
  {
    id: 7,
    previousId: 3,
    text: "Vous continuez à marcher et trouvez une clairière avec un vieux puits. Voulez-vous regarder à l'intérieur?",
    choices: [
      { text: "Regarder à l'intérieur du puits", nextId: 14 },
      { text: "Ignorer le puits", nextId: 15 },
    ],
  },
  {
    id: 8,
    previousId: 4,
    text: "Vous trouvez une porte verrouillée. Que voulez-vous faire?",
    choices: [
      { text: "Utiliser la clé mystérieuse", nextId: 10, requiredItem: "clé_mystérieuse" },
      { text: "Chercher une autre entrée", nextId: 22 },
    ],

  },
  {
    id: 9,
    previousId: 4,
    text: "Vous décidez de chercher une autre entrée et découvrez un passage secret. Que voulez-vous faire?",
    choices: [
      { text: "Emprunter le passage secret",  action: () => openNewWindow('memory-game/memory-game.html')},
      { text: "Revenir en arrière", nextId: 8 },
    ],
  },
  {
    id: 10,
    previousId: 5,
    text: "Vous traversez le pont et vous arrivez à une vieille tour. Voulez-vous entrer?",
    choices: [
      { text: "Entrer dans la tour",  action: () => openNewWindow('tic-tac-toe/tic-tac-toe.html') },
      { text: "Revenir en arrière", nextId: 5 },
    ],
  },
  {
    id: 11,
    previousId: 5,
    text: "Vous continuez à longer la rivière et vous trouvez un petit village. Voulez-vous explorer le village?",
    choices: [
      { text: "Explorer le village",  action: () => openNewWindow('pokemon/pokemon.html')},
      { text: "Revenir en arrière", nextId: 5 },
    ],
  },
  {
    id: 12,
    previousId: 6,
    text: "Avec l'épée rouillée en main, vous vous sentez plus en sécurité. Quel chemin voulez-vous prendre?",
    choices: [
      { text: "Prendre le chemin étroit", nextId: 19 },
      { text: "Prendre le chemin large", nextId: 20 },
    ],
  },
  {
    id: 13,
    previousId: 6,
    text: "Vous décidez de laisser l'épée et de continuer votre route. Quel chemin voulez-vous prendre?",
    choices: [
      { text: "Prendre le chemin étroit", nextId: 19 },
      { text: "Prendre le chemin large", nextId: 20 },
    ],
  },
  {
    id: 14,
    previousId: 7,
    text: "En regardant à l'intérieur du puits, vous trouvez une clé mystérieuse. Que voulez-vous faire?",
    choices: [
      { text: "Prendre la clé", nextId: 21, addItem: "clé_mystérieuse" },
      { text: "Laisser la clé", nextId: 15 },
    ],
  },
  {
    id: 15,
    previousId: 7,
    text: "Vous décidez d'ignorer le puits et de continuer votre route. Quel chemin voulez-vous prendre?",
    choices: [
      { text: "Prendre le chemin étroit", nextId: 19 },
      { text: "Prendre le chemin large", nextId: 20 },
    ],
  },
  {
    id: 22,
    previousId: 8,
    text: "Vous arrivez à une salle où un vieux maître d'échecs vous défie à une partie. Acceptez-vous?",
    choices: [
      { text: "Accepter le défi", nextId: 23, action: () => openNewWindow('chess/chess.html'),},
      { text: "Revenir en arrière", nextId: 8 },
    ],
  },
  
  // ... (ajoutez plus d'éléments d'histoire)
];


function openNewWindow(path) {
  window.location.href = path;
}



const backButton = document.getElementById("backButton");
const historyStack = [];


function pushToHistoryStack(storyId) {
  historyStack.push(storyId);
}
  

function goBack() {
  if (historyStack.length <= 1) return;

  historyStack.pop(); // Retirer l'élément actuel
  const previousId = historyStack.pop(); // Retirer et obtenir l'élément précédent
  showStory(previousId);
}

function addItemToInventory(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);

    const inventoryItem = document.createElement("div");
    inventoryItem.className = "inventoryItem";

    const itemImage = document.createElement("img");
    itemImage.src = `images/inventory/${item}.jpg`;
    itemImage.alt = item;

    const itemName = document.createElement("p");
    itemName.textContent = item;

    inventoryItem.appendChild(itemImage);
    inventoryItem.appendChild(itemName);
    inventoryItemsElement.appendChild(inventoryItem);
  }
}

function showStory(storyId) {
  // Fade out the current story and choices
  storyTextElement.classList.add("fade-out");
  choicesElement.classList.add("fade-out");

  // Set a delay to update the content and fade it back in
  setTimeout(() => {
    const currentStory = story.find((item) => item.id === storyId);

    storyImageElement.src = `images/${storyId}.jpg`;
    storyTextElement.textContent = currentStory.text;

    // Fade in the updated story and choices
    storyTextElement.classList.remove("fade-out");
    choicesElement.classList.remove("fade-out");

    choicesElement.innerHTML = "";

    for (let choice of currentStory.choices) {
      const button = document.createElement("button");

      if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
        button.disabled = true;
        button.title = `Vous avez besoin de ${choice.requiredItem} pour débloquer ce choix.`;
      } else {
        button.onclick = () => {
          if (choice.addItem) {
            addItemToInventory(choice.addItem);
          }
        
          if (choice.action) {
            choice.action();
          }
        
          showStory(choice.nextId);
        };        
      }

      button.textContent = choice.text;
      choicesElement.appendChild(button);
    }

    // Update and play the audio for the new story step
    storyAudioElement.src = `audio/${storyId}.mp3`;
    storyAudioElement.play();
  }, 500); // Delay for the fade-out animation

  pushToHistoryStack(storyId);

  if (currentStory.previousId) {
    backButton.style.display = "inline-block";
    backButton.onclick = goBack;
  } else {
    backButton.style.display = "none";
  }
}

showStory(1);
