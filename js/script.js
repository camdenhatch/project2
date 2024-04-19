document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchText = document.getElementById('searchText');
    const resultsGrid = document.getElementById('resultsGrid');

    // Function to convert height in format 'xx inches' to 'x'ft x'in'
    function formatHeight(height) {
        const totalInches = parseInt(height);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return `${feet}' ${inches}"`;
    }

    // Function to fetch data and filter it
    async function fetchAndDisplayPlayers(nameFilter) {
        const response = await fetch('https://alnyb0ty3i.execute-api.us-east-1.amazonaws.com/sportsData');
        const data = await response.json();
        resultsGrid.innerHTML = ''; // Clear previous results

        data.forEach(team => {
            team.roster.forEach(player => {
                if (player.name.toLowerCase().includes(nameFilter.toLowerCase())) {
                    const playerElement = document.createElement('div');
                    playerElement.classList.add('player-card');
                    playerElement.innerHTML = `
                        <h3>${player.name}</h3>
                        <p>Height: ${formatHeight(player.height)}</p>
                        <p>Points Scored: ${team.statistics.avgPoints.value}</p>
                        <p>Team: ${team.name}</p>
                    `;
                    resultsGrid.appendChild(playerElement);
                }
            });
        });
    }

    // Search form submission event
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameFilter = searchText.value;
        if (nameFilter) {
            fetchAndDisplayPlayers(nameFilter);
        }
    });
});

