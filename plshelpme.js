// Initialize player data
let players = [
    { id: 1, name: "Cameron", score: 8000000 },
    { id: 2, name: "imtrapped", score: 2800 },
    { id: 3, name: "theyhaventgiven", score: 2500 },
    { id: 4, name: "mefood", score: 2100 },
    { id: 5, name: "fordays", score: 1900 }
];

// Track the next ID to assign
let nextId = 6;

// DOM elements
const playersList = document.getElementById('players-list');
const newPlayerName = document.getElementById('new-player-name');
const newPlayerScore = document.getElementById('new-player-score');
const addPlayerBtn = document.getElementById('add-player-btn');

// Sort players by score (highest first)
function sortPlayers() {
    players.sort((a, b) => b.score - a.score);
}

// Render the player list
function renderLeaderboard() {
    // Clear the current list
    playersList.innerHTML = '';
    
    // Sort players before rendering
    sortPlayers();
    
    // Create player rows
    players.forEach((player, index) => {
        const playerRow = document.createElement('div');
        playerRow.className = 'player-row';
        playerRow.dataset.id = player.id;
        
        playerRow.innerHTML = `
            <span class="rank">${index + 1}</span>
            <span class="player">${player.name}</span>
            <span class="score">${player.score}</span>
            <span class="actions">
                <button class="increase" onclick="updateScore(${player.id}, 100)">+100</button>
                <button class="increase" onclick="updateScore(${player.id}, 500)">+500</button>
                <button class="decrease" onclick="updateScore(${player.id}, -100)">-100</button>
                <button class="decrease" onclick="updateScore(${player.id}, -500)">-500</button>
            </span>
        `;
        
        playersList.appendChild(playerRow);
    });
}

// Update a player's score
function updateScore(playerId, change) {
    // Find the player
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    // Get the old position
    const oldIndex = players.indexOf(player);
    
    // Update score
    player.score += change;
    // Ensure score doesn't go below zero
    if (player.score < 0) player.score = 0;
    
    // Sort and render
    sortPlayers();
    renderLeaderboard();
    
    // Find new position and add highlight effect if changed
    const newIndex = players.indexOf(player);
    if (newIndex !== oldIndex) {
        const playerRow = document.querySelector(`.player-row[data-id="${player.id}"]`);
        playerRow.classList.add('highlight');
        // Remove the class after animation completes
        setTimeout(() => {
            playerRow.classList.remove('highlight');
        }, 2000);
    }
}

// Add a new player
function addPlayer() {
    const name = newPlayerName.value.trim();
    const score = parseInt(newPlayerScore.value) || 0;
    
    if (name === '') {
        alert('Please enter a player name');
        return;
    }
    
    // Add new player
    players.push({
        id: nextId++,
        name: name,
        score: score
    });
    
    // Clear inputs
    newPlayerName.value = '';
    newPlayerScore.value = '';
    
    // Update the display
    renderLeaderboard();
}

// Event listener for adding players
addPlayerBtn.addEventListener('click', addPlayer);

// Initialize the leaderboard
renderLeaderboard();
