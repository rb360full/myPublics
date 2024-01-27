!localStorage.getItem("dbVersion") ? localStorage.setItem("dbVersion", 1) : null;
let dbVersion = parseInt(localStorage.getItem("dbVersion"));
let idCounter = parseInt(localStorage.getItem("idCounter")) || 0;
let db = null;
let dbStore = null;

const btnSubmit = document.querySelector("form");
const nameInput = document.querySelector('input[type="text"]');
const passInput = document.querySelector('input[type="password"]');
const emailInput = document.querySelector('input[type="email"]');
const tbody = document.querySelector("tbody");
// const removeElement = document.querySelectorAll(".delete");

let dbOpenReq = indexedDB.open("Reza", dbVersion);

dbOpenReq.addEventListener("success", (e) => {
    console.log("Open success :", e);
    getUsers();
});
dbOpenReq.addEventListener("error", (e) => console.log(e));
dbOpenReq.addEventListener("upgradeneeded", (e) => {
    db = e.target.result;

    dbStore = !db.objectStoreNames.contains("users") ? db.createObjectStore("users", { keyPath: "id" }) : null;

    localStorage.setItem("dbVersion", dbVersion + 1);
});

btnSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let tx = db.transaction("users", "readwrite");
    tx.addEventListener("comleted", (e) => {
        console.log("sub suc");
    });

    tx.addEventListener("error", (e) => {
        console.log("tx Error : ", e);
    });

    let store = tx.objectStore("users");
    let storeLenght = store.indexNames.lenght;
    console.log(storeLenght);
    console.log(store);
    idCounter++;
    localStorage.setItem("idCounter", idCounter);
    let newUser = { id: idCounter, name: nameInput.value, pass: passInput.value, email: emailInput.value };

    let txRequest = store.add(newUser);
    txRequest.addEventListener("success", (e) => { });
    getUsers();
    clearValues();
});

function getUsers() {
    let tx = db.transaction("users", "readonly");
    tx.addEventListener("complete", () => {
        console.log("tx completed");
    });
    tx.addEventListener("error", () => {
        console.log("tx error");
    });

    let store = tx.objectStore("users");

    let request = store.getAll();
    request.addEventListener("success", (event) => {
        console.log("request success");
        let usersArray = request.result;
        let mapArray = usersArray
            .map((user) => {
                return `
            <tr class="">
            <td scope="row">${user.id}</td>
            <td>${user.name}</td>
            <td>${user.pass}</td>
            <td>${user.email}</td>
            <td><a href="##" id="${user.id}" class="delete">Remove</a></td>
            </tr>`;
            })
            .join("");

        tbody.innerHTML = mapArray;
    });
    request.addEventListener("error", (err) => console.log("request error : ", err));
}

function removeItem(e) {
    let id = Number(e.target.id);
    console.log(e.target.id);
    let tx = db.transaction("users", "readwrite");
    tx.addEventListener("error", (e) => {
        console.log("tx Remove error", e);
    });
    tx.addEventListener("complete", (e) => {
        console.log("tx Remove completed");
    });
    let req = tx.objectStore("users").delete(id);
}

tbody.addEventListener("click", (e) => {
    removeItem(e);
    getUsers();
});

function clearValues() {
    nameInput.value = "";
    passInput.value = "";
    emailInput.value = "";
}
