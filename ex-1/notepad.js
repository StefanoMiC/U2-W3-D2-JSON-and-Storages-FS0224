const form = document.querySelector("form");
const textarea = document.getElementById("notes-textarea");
const loadBtn = document.getElementById("load-btn");
const resetBtn = document.getElementById("reset-btn");

const NOTEPAD_MEMORY = "notepad-memory";

form.addEventListener("submit", event => {
  // evitiamo il ricaricamento della pagina al click sul bottone submit
  event.preventDefault();

  // se siamo qui la textarea ha sicuramente del contenuto (perché è required)
  //   allora possiamo procedere alla:
  // 1) lettura e salvataggio del contenuto della textarea
  const note = textarea.value;
  // 2) al salvataggio di una nuova chiave nello storage contenente quel valore appena reperito
  localStorage.setItem(NOTEPAD_MEMORY, note);

  console.log("SALVATO");
});

loadBtn.addEventListener("click", () => {
  console.log("loading content...");

  // 1) lettura di un EVENTUALE dato contenuto nel localStorage
  const savedContent = localStorage.getItem(NOTEPAD_MEMORY); // ci restituisce un dato a stringa || null
  console.log(savedContent);
  // 2) SE presente, applicazione del dato nella textarea

  if (savedContent) {
    textarea.value = savedContent;
  } else {
    alert("non hai mai salvato una nota, salvala prima di riprovare");
  }
});

resetBtn.addEventListener("click", () => {
  const hasAccepted = confirm("vuoi davvero resettare?");

  if (hasAccepted) {
    console.log("accettato");
    // questo rimuove l'elemento nel localStorage
    localStorage.removeItem(NOTEPAD_MEMORY);
    // questo allinea l'interfaccia con la cancellazione del dato
    form.reset();
  } else {
    console.log("rifiutato");
    alert("non abbiamo cancellato i dati");
  }
});
