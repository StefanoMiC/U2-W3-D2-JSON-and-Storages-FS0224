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

// booleani
localStorage.setItem(LIVE_LECTURE_KEY, true); // questo true verrà convertito alla stringa "true" prima di essere inserito nel localStorage

const isLive = Boolean(localStorage.getItem(LIVE_LECTURE_KEY)); // stiamo prendendo il valore dal localStorage, che arriva come stringa,
// e lo forniamo al costruttore Boolean() per riconvertirlo nel suo booleano
console.log(isLive); // ora isLive è tornato ad essere un VERO booleano

if (isLive) {
  console.log("siamo live!");
} else {
  console.log("lezione ancora non iniziata");
}

const removeKey = () => {
  localStorage.removeItem(LIVE_LECTURE_KEY);
  console.log(localStorage.getItem(LIVE_LECTURE_KEY));
};

// numbers
localStorage.setItem("numberItem", 5829); // verrà convertito a stringa prima di essere inserito
// const numberFromStorage = localStorage.getItem("numberItem");
// console.log(typeof (numberFromStorage + 888)); // string

// servirà ri-convertire la stringa contenente il numero in un numero vero e proprio prima di utilizzarlo per operazioni matematiche!
const numberFromStorage = parseInt(localStorage.getItem("numberItem"));
console.log(numberFromStorage + 888); // 6717
console.log(typeof (numberFromStorage + 888)); // number

// arrays
// localStorage.setItem("arrayItem", [89, 90, 91, 100]); // questo array verrà convertito nella stringa "89, 90, 91, 100"
localStorage.setItem("arrayItem", JSON.stringify([89, 90, 91, 100])); // questo array verrà convertito nella stringa "89, 90, 91, 100"

const arrayFromStorage = JSON.parse(localStorage.getItem("arrayItem"));
console.log(arrayFromStorage);
arrayFromStorage.push(101);
console.log(arrayFromStorage);

// objects
const myObj = { name: "Stefano", surname: "Miceli" };
localStorage.setItem("objItem", JSON.stringify(myObj));

// const objFromStorage = localStorage.getItem("objItem"); // '{"name":"Stefano","surname":"Miceli"}'
const objFromStorage = JSON.parse(localStorage.getItem("objItem")); // object
console.log(objFromStorage.name);

// dates

localStorage.setItem("dateItem", new Date());

const dateFromStorage = localStorage.getItem("dateItem"); // qui riceviamo la stringa
const convertedStringToDate = new Date(dateFromStorage); // qui passiamo la stringa al costruttore delle date,
// che ci fornirà un oggetto Date con le caratteristiche contenute nella stringa fornita
console.log(convertedStringToDate.getDate()); // qui possiamo tranquillamente usare tutti i metodi delle date
