// 1) localStorage --> permanenza dei dati finché l'utente non li cancella tramite lo svuotamento dei dati di navigazione
// 2) sessionStorage --> permanenza dei dati finché il tab o la finestra intera non verranno chiusi

// entrambi utilizzano gli stessi metodi:
// .setItem(key, value) --> questo metodo salverà il valore nella chiave corrispondente all'interno dell'area di memoria del browser dedicata
// .getItem(key) --> cercherà un elemento con una particolare chiave, se la trova ritorna il valore associato e se non la troverà ritornerà null

// i valori ritornati dallo STORAGE sono SEMPRE STRINGHE!

// .removeItem(key) --> rimuoverà l'elemento corrispondente a quella chiave
// .clear() --> rimuoverà tutto il contenuto dello storage per quel dominio
const LIVE_LECTURE_KEY = "liveLecture"; // sfruttiamo una costante che NON SARA' POSSIBILE scrivere male,
// pena un bell'errore rosso in console che ci avverta del problema (cosa che non avveniva affatto se avessimo usato due stringhe distinte)

localStorage.setItem(LIVE_LECTURE_KEY, true); // questo true verrà convertito alla stringa "true"

const isLive = Boolean(localStorage.getItem(LIVE_LECTURE_KEY)); // stiamo prendendo il valore dal localStorage, che arriva come stringa,
// e lo forniamo al costruttore Boolean() per riconvertirlo nel suo booleano
console.log(isLive); // ora isLive è tornato ad essere un VERO booleano

if (isLive) {
  alert("siamo live!");
} else {
  alert("lezione ancora non iniziata");
}
