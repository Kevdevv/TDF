document.getElementById('workTimeForm').onsubmit = function (event) {
    event.preventDefault(); // Empêche le formulaire de soumettre normalement

    // Récupère les valeurs des champs de saisie
    let arrivalTime = document.getElementById('arrivalTime').value;
    let startBreakTime = document.getElementById('startBreakTime').value;
    let endBreakTime = document.getElementById('endBreakTime').value;
    let departureTime = document.getElementById('departureTime').value;

    // Crée des objets Date pour les heures
    let arrivalDateTime = new Date(`1970-01-01T${arrivalTime}Z`);
    let startBreakDateTime = new Date(`1970-01-01T${startBreakTime}Z`);
    let endBreakDateTime = new Date(`1970-01-01T${endBreakTime}Z`);
    let departureDateTime = new Date(`1970-01-01T${departureTime}Z`);

    // Calcule la durée réelle de la pause
    let actualBreakDurationMilliseconds = endBreakDateTime - startBreakDateTime;
    let minBreakDurationMilliseconds = 40 * 60 * 1000; // 40 minutes en millisecondes

    // Utilise la durée de pause minimale de 40 minutes ou la durée réelle si elle est plus longue
    let effectiveBreakDurationMilliseconds = Math.max(actualBreakDurationMilliseconds, minBreakDurationMilliseconds);

    // Calcule le temps total de travail, soustrayant la pause effective
    let totalWorkMilliseconds = (departureDateTime - arrivalDateTime) - effectiveBreakDurationMilliseconds;

    // Convertit les millisecondes en minutes totales
    let totalWorkMinutes = totalWorkMilliseconds / 1000 / 60;

    // Calcule les heures et les minutes
    let hours = Math.floor(totalWorkMinutes / 60);
    let minutes = Math.round(totalWorkMinutes % 60);

    // Ajoute un zéro devant les minutes si nécessaire
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Affiche le résultat
    document.getElementById('result').textContent = `Temps de travail total : ${hours}h${minutes}.`;
};



document.getElementById('calculateDeparture').onclick = function () {
    // Récupère les valeurs des champs de saisie nécessaires
    let arrivalTime = document.getElementById('arrivalTime').value;
    let startBreakTime = document.getElementById('startBreakTime').value;
    let endBreakTime = document.getElementById('endBreakTime').value;

    // Crée des objets Date pour les heures
    let arrivalDateTime = new Date(`1970-01-01T${arrivalTime}Z`);
    let startBreakDateTime = new Date(`1970-01-01T${startBreakTime}Z`);
    let endBreakDateTime = new Date(`1970-01-01T${endBreakTime}Z`);

    // Calcule la durée réelle de la pause
    let actualBreakDurationMilliseconds = endBreakDateTime - startBreakDateTime;
    let minBreakDurationMilliseconds = 40 * 60 * 1000; // 40 minutes en millisecondes

    // Utilise la durée de pause minimale de 40 minutes ou la durée réelle si elle est plus longue
    let effectiveBreakDurationMilliseconds = Math.max(actualBreakDurationMilliseconds, minBreakDurationMilliseconds);

    // Calcule le temps travaillé avant la pause
    let workMorningMilliseconds = startBreakDateTime - arrivalDateTime;

    // Ajoute 7 heures et 24 minutes en millisecondes pour la journée de travail
    let desiredWorkTime = 7 * 60 * 60 * 1000 + 24 * 60 * 1000; // 7 heures et 24 minutes

    // Calcule le temps restant à travailler après la pause ajustée
    let remainingWorkMilliseconds = desiredWorkTime - workMorningMilliseconds;

    // Calcule l'heure de départ nécessaire en ajoutant le temps restant après la fin de la pause effective
    let necessaryDepartureDateTime = new Date(startBreakDateTime.getTime() + effectiveBreakDurationMilliseconds + remainingWorkMilliseconds);

    // Formate l'heure de départ pour l'affichage
    let departureHour = necessaryDepartureDateTime.getUTCHours();
    let departureMinutes = necessaryDepartureDateTime.getUTCMinutes();

    if (departureMinutes < 10) {
        departureMinutes = '0' + departureMinutes;
    }

    // Affiche le résultat
    document.getElementById('result').textContent = `Heure de départ nécessaire : ${departureHour}h${departureMinutes}.`;
};


