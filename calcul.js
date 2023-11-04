document.getElementById('workTimeForm').onsubmit = function(event) {
    event.preventDefault(); // Empêche le formulaire de soumettre normalement

    // Récupère les valeurs des champs de saisie
    let arrivalTime = document.getElementById('arrivalTime').value;
    let startBreakTime = document.getElementById('startBreakTime').value;
    let endBreakTime = document.getElementById('endBreakTime').value;
    let departureTime = document.getElementById('departureTime').value;

    // Supposons que le travail ne passe pas minuit (pas de jour suivant)
    let arrivalDateTime = new Date(`1970-01-01T${arrivalTime}Z`);
    let startBreakDateTime = new Date(`1970-01-01T${startBreakTime}Z`);
    let endBreakDateTime = new Date(`1970-01-01T${endBreakTime}Z`);
    let departureDateTime = new Date(`1970-01-01T${departureTime}Z`);

    // Calcule le temps travaillé avant et après la pause
    let workMorningMilliseconds = startBreakDateTime - arrivalDateTime;
    let workAfternoonMilliseconds = departureDateTime - endBreakDateTime;

    // Calcule le temps total travaillé en millisecondes
    let totalWorkMilliseconds = workMorningMilliseconds + workAfternoonMilliseconds;

    // Convertit les millisecondes en minutes totales
    let totalWorkMinutes = totalWorkMilliseconds / 1000 / 60;

    // Calcule les heures et les minutes
    let hours = Math.floor(totalWorkMinutes / 60);
    let minutes = Math.round(totalWorkMinutes % 60);

    // Ajoute un zéro devant les minutes si nécessaire pour maintenir le format de deux chiffres
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Affiche le résultat
    document.getElementById('result').textContent = `Temps de travail total : ${hours}h${minutes}.`;
};
