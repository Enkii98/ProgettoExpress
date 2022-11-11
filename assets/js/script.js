
let nome = document.getElementById('nome');
let cognome = document.getElementById('cognome');
let warning = document.querySelectorAll(".btn-warning");
let addBtn = document.getElementById('scrivi');

var elencoHTML;
var errore;
var erroreElenco;
var elenco = [];

window.addEventListener('DOMContentLoaded', init);

function init() {
	elencoHTML = document.getElementById('elenco');
	errore = document.getElementById('errore');
	erroreElenco = document.getElementById('erroreElenco');

	printData();
	eventHandler();
}

function eventHandler() {
	addBtn.addEventListener('click', function () {
		controlla();
	});
}

function printData() {
	fetch('http://localhost:3000/elenco')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			elenco = data;
			if (elenco.length > 0) {
				errore.innerHTML = '';
				elencoHTML.innerHTML = '';
				elenco.map(function (element) {
					elencoHTML.innerHTML +=
						`<li class="list-group-item"><button type="button" class="btn btn-danger me-2 " onClick="elimina(${element.id})"><i class="bi bi-trash3-fill"></i></button>
					 <button type="button" class="btn btn-warning " onClick="modifica(${element.id})"><i class="bi bi-pencil-fill"></i></button>
					${element.nome} ${element.cognome}</li>`;
				});
			} else {
				erroreElenco.innerHTML = 'Nessun elemento presente in elenco';
			}
		});
}

function controlla() {
	if (nome.value != '' && cognome.value != '') {
		var data = {
			nome: nome.value,
			cognome: cognome.value,
		};
		addData(data);
	} else {
		errore.innerHTML = 'Compilare correttamente i campi!';
		return;
	}
}

async function addData(data) {
	let response = await fetch('http://localhost:3000/elenco', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(data),
	});
	clearForm();
}

function clearForm() {
	nome.value = '';
	cognome.value = '';
}


function elimina(id) {

	window.alert("Vuoi eliminare l'utente? (operazione inreversibile)")

	fetch('http://localhost:3000/elenco/' + id, {
		method: "DELETE",
	})
		.then(res => res.json())
}

function modifica(id) {

	if ((nome.value || cognome.value) == "" ) {
		window.alert("devi inserire nome e/o cognome e premere il tasto modifica per modificare")
	}
	else {

		fetch('http://localhost:3000/elenco/' + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					"nome": document.getElementById("nome").value,
					"cognome": document.getElementById("cognome").value
				}
			)
		});


	}

}





