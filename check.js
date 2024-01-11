document.addEventListener('DOMContentLoaded', function () {
    const pudełka = document.querySelectorAll('.pudełko');
    const obrazy = document.querySelectorAll('.karta');

    let draggedElement = null;
    let wynikiJuzWyswietlone = false;

    obrazy.forEach(obraz => {
        obraz.addEventListener('dragstart', function (event) {
            draggedElement = event.currentTarget;
        });
    });

    pudełka.forEach(pudełko => {
        pudełko.addEventListener('dragover', function (event) {
            event.preventDefault();
            pudełko.classList.add('pudełko-highlight');
        });

        pudełko.addEventListener('dragenter', function (event) {
            event.preventDefault();
        });

        pudełko.addEventListener('dragleave', function () {
            pudełko.classList.remove('pudełko-highlight');
        });

        pudełko.addEventListener('drop', function (event) {
            event.preventDefault();
            pudełko.classList.remove('pudełko-highlight');

            if (draggedElement) {
                const kontener = pudełko.querySelector('.kontener');
                kontener.appendChild(draggedElement);
                draggedElement = null;
            }
        });
    });

    obrazy.forEach(obraz => {
        obraz.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        obraz.addEventListener('dragenter', function (event) {
            event.preventDefault();
            obraz.classList.add('obraz-highlight');
        });

        obraz.addEventListener('dragleave', function () {
            obraz.classList.remove('obraz-highlight');
        });

        obraz.addEventListener('drop', function (event) {
            event.preventDefault();
            obraz.classList.remove('obraz-highlight');

            if (draggedElement) {
                const kontener = obraz.closest('.kontener');
                kontener.appendChild(draggedElement);
                draggedElement = null;
            }
        });
    });

    const sprawdzButton = document.querySelector('.buttonek.resizable');
    sprawdzButton.addEventListener('click', function () {
        if (!wynikiJuzWyswietlone) {
            sprawdzWynik();
            wynikiJuzWyswietlone = true;
        }
    });

    function sprawdzWynik() {
        let poprawneUmieszczenia = 0;
        let niepoprawneUmieszczenia = 0;

        pudełka.forEach(pudełko => {
            const idInContainer = Array.from(pudełko.querySelector('.kontener').children).map(item => item.id);

            idInContainer.forEach(itemId => {
                const cardCategory = document.getElementById(itemId).dataset.category;
                const containerCategory = pudełko.dataset.category;

                if (cardCategory === containerCategory) {
                    poprawneUmieszczenia++;
                } else {
                    niepoprawneUmieszczenia++;
                }
            });
        });

        const wynikiElement = document.createElement('div');
        wynikiElement.className = 'wyniki';
        wynikiElement.innerHTML = `
            <p>Poprawne umieszczenia: ${poprawneUmieszczenia}</p>
            <p>Niepoprawne umieszczenia: ${niepoprawneUmieszczenia}</p>
        `;

        document.body.appendChild(wynikiElement);
    }
});
