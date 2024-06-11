const form = document.querySelector("form");
const cardRow = document.getElementById("card-row");

// i due campi input
const inputName = document.getElementById("event-name");
const inputDate = document.getElementById("event-date");

// area di memoria locale che salva gli eventi dopo averli creati
let events = [];

class AgendaEvent {
  constructor(name, date) {
    this.eventName = name;
    this.eventDate = date;
  }
}

const generateAlert = () => {
  // funzione che gestisce l'inserimento dell'alert nella pagina
  const container = document.querySelector(".container");

  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-info");
  alert.innerText = "Nessun elemento in memoria, creane uno tu";
  container.appendChild(alert);
};

const removeCard = event => {
  const card = event.currentTarget;
  const existingAppointments = JSON.parse(localStorage.getItem("events-memory")); // otteniamo l'array di oggetti
  // confrontare l'attributo data-eventname con la proprietà eventName sull'oggetto
  // gli attributi chiamati data-* si possono leggere facilmente usando la proprietà .dataset sul nodo
  const indexFound = existingAppointments.findIndex(obj => obj.eventName === card.dataset.eventname); // -1 se non trovato, numero di indice del primo elemento corrispondente

  if (indexFound !== -1) {
    // partendo dal click della card, risaliamo di un livello sulla colonna e la rimuoviamo
    existingAppointments.splice(indexFound, 1);

    // controlliamo ad ogni rimozione se siamo arrivati ad avere un array vuoto...
    if (existingAppointments.length === 0) {
      // se vuoto allora rimuoviamo la chiave
      localStorage.removeItem("events-memory");
      generateAlert(); // sapendo che non ci sono più elementi da visualizzare possiamo reintrodurre l'alert
    } else {
      // se ci sono ancora elementi, aggiorniamo la memoria con l'array aggiornato
      localStorage.setItem("events-memory", JSON.stringify(existingAppointments));
    }

    // a questo punto, dopo aver gestito il localStorage rimuoviamo anche l'elemento dal DOM
    // card.parentNode.remove();
    card.closest(".col").remove();
  }
};

const generateCard = appointment => {
  const col = document.createElement("div");
  col.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-eventname", appointment.eventName);

  // evento che gestisce la rimozione degli elementi, quando cliccati
  card.addEventListener("click", removeCard);

  card.innerHTML = `
  <div class="card-header">Evento</div>
  <div class="card-body">
    <h5 class="card-title">${appointment.eventName}</h5>
    <p class="card-text">${appointment.eventDate}</p>
  </div>
  `;

  col.appendChild(card);
  cardRow.appendChild(col);
};

form.addEventListener("submit", event => {
  event.preventDefault();

  const alert = document.querySelector(".alert"); // se alert è presente il querySelector ci ritorna il nodo di quell'elemento || null
  // se la variabile alert contiene un oggetto sarà truthy, se contiene null sarà falsy (non faremo nulla in quel caso)
  if (alert) {
    alert.remove();
  }
  // all'invio del form generiamo un nuovo oggetto
  const newEvent = new AgendaEvent(inputName.value, inputDate.value);

  // che inseriamo nella collezione eseterna "events"
  events.push(newEvent);
  // inviamo l'intera collezione con gli oggetti, convertita in JSON, al localStorage
  localStorage.setItem("events-memory", JSON.stringify(events));

  // a questo punto aggiungiamo a schermo una nuova card
  generateCard(newEvent);
  // e resettiamo i campi del form
  form.reset();
});

// quando la pagina verrà riaperta o ricaricata questa funzione si occuperà di ricavare di nuovo il dato degli appuntamenti in forma di array in formato JSON
// e ricreerà le card precedenti in autoamtico attraverso un ciclo sull'array degli appuntamenti
window.addEventListener("DOMContentLoaded", () => {
  // al caricamento della pagina andiamo a guardare se troviamo qualche dato dentro alla chiave "events-memory"
  const appointmentsFromStorage = localStorage.getItem("events-memory"); // se presente sarà una stringa in formato JSON con array di oggetti || null
  if (appointmentsFromStorage) {
    // la stringa JSON viene convertita in un vero array di oggetti
    const appointmentAsArray = JSON.parse(appointmentsFromStorage);

    // aggiorniamo l'array con gli elementi presenti in memoria
    events = appointmentAsArray;

    // cicliamo l'array e per ogni elemento generiamo una card in automatico nella pagina
    events.forEach(appointmentObj => generateCard(appointmentObj));
  } else {
    generateAlert();
  }
});
