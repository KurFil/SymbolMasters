document.addEventListener('DOMContentLoaded', function () {
    let czasWMinutach = 1   ;
    let czasWsekundach = czasWMinutach * 60;

    const timerElement = document.querySelector('.timer');

    let poprawneUmieszczenia = 0;
    let niepoprawneUmieszczenia = 0;

    function aktualizujWynik() {
        console.log(`Poprawne umieszczenia: ${poprawneUmieszczenia}`);
        console.log(`Niepoprawne umieszczenia: ${niepoprawneUmieszczenia}`);
    }

    function aktualizujTimer() {
        const minuty = Math.floor(czasWsekundach / 60);
        const sekundy = czasWsekundach % 60;

        const czasTekst = `${minuty}:${sekundy < 10 ? '0' : ''}${sekundy}`;

        timerElement.textContent = czasTekst;

        if (czasWsekundach === 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Czas minął!';
            // Po zakończeniu czasu, możesz również wywołać funkcję aktualizującą wynik
            aktualizujWynik();
        } else {
            czasWsekundach--;
        }
    }

    const timerInterval = setInterval(aktualizujTimer, 1000);

    // ... (reszta kodu obsługującego przeciąganie i upuszczanie)
    
    const sprawdzButton = document.querySelector('.buttonek.resizable');
    sprawdzButton.addEventListener('click', function () {
        // Dodaj aktualizację wyników tutaj
        aktualizujWynik();
    });
});
