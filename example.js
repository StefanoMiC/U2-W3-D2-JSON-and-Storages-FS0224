// questa variabile possiamo considerarla come il prodotto di una conversione di un file JSON in una variabile json contenente un vero oggetto

// questo è un oggetto JS, NON PIU' un elemento JSON
const person = {
  name: "Stefano",
  surname: "Miceli",
  teaching: true,
  webcamOn: true,
  numOfStudents: 29,
  location: {
    state: "Italy",
    region: "FVG",
    latitude: 45.8372,
    longitude: 23.1982
  },
  courseUnits: ["JS II", "UX/UI", "Bootstrap", "JS III", "React"],
  lectureFinished: null
};

// le graffe nel contesto globale (fuori da un qualche contenitore: variabili, parametri, array...) corrispondono ad un blocco o ambito separato,
// NON AD UN OGGETTO!
{
  let name = "stefano";
}

let name = "giovanni";

console.log(person);

document.body.innerHTML += person; // questa operazione converte in automatico l'oggetto a stringa col metodo .toString() ==> "[object Object]"

// stiamo convertendo un oggetto nativo JS nella notazione JSON (quindi in una semplice stringa contenente i caratteri che compongono l'oggetto)
const objToString = JSON.stringify(person);
console.log(objToString);

// in questo momento stiamo cercando di fare una conversione da JSON a oggetto nativo JS
const jsonToObj = JSON.parse(objToString);
console.log(jsonToObj);
// a questo punto abbiamo creato tutte nuove referenze in memoria, sia per l'oggetto principale, sia per tutte le sotto referenze presenti

// ora quindi possiamo modificare l'oggetto risultante nei suoi valori SENZA INTACCARE L'ORIGINALE, perché questo sarà un nuovo oggetto rispetto al primo.
jsonToObj.name = "Giovanni";
jsonToObj.location.region = "Tuscany";
// posto che oggi esiste un metodo migliore per ottenere questo effetto (vedi lezione precedente con structuredClone() )

console.log(person);
console.log(jsonToObj);
