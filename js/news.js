document.addEventListener("DOMContentLoaded", function () {
    fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData') // Replace with the actual API URL
        .then(response => response.json())
        .then(data => displayPlayers(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayPlayers(data) {
    const playersGrid = document.getElementById('playersGrid');

    for (const teamName in data) {
        const team = data[teamName];
        const roster = team.roster;
        for (const playerName in roster) {
            const player = roster[playerName];
            const playerStats = team.statistics;
            if (playerStats.avgPoints && playerStats.avgPoints.value > 10) {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.innerHTML = `
                    <h2 class="player-name">${player.name}</h2>
                    <p class="player-stats">Height: ${player.height}</p>
                    <p class="player-stats">Points per game: ${playerStats.avgPoints.value.toFixed(1)}</p>
                    <p class="player-stats">Team: ${team.name}</p>
                `;
                playersGrid.appendChild(playerCard);
            }
        }
    }
}

function loginUser(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Accept any input as valid:
    document.getElementById('loginForm').style.display = 'none';  // Hide login form
    document.getElementById('newsContent').style.display = 'block'; // Show news content

    return false; // Prevent page refresh
}


