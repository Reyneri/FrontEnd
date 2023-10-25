
const works = await getAllWorks();
const formulairePhoto = document.getElementById("formPhoto");


/* Retourner sur la page principale */
const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", async function () {
    const connectedToken = window.localStorage.getItem('appToken');
    console.log(connectedToken);
    if (connectedToken) {
        window.localStorage.removeItem("appToken");
        window.location.href = "index.html";
    }
})


 function adminConnected() {
    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const modify = document.querySelector('.modify');
    const token = window.localStorage.getItem("appToken");
    const barreAdmin = document.getElementById('edit-overlay-admin');

    if (token) {
        // Si l'utilisateur est connecté, montre le bouton de logout et cache le bouton de login
        logoutBtn.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        modify.classList.remove('hidden');
        barreAdmin.classList.remove('hidden');
    } else {
        // Si l'utilisateur log out, montre le bouton de login et cache le bouton de logout
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        modify.classList.add('hidden');
        barreAdmin.classList.add('hidden');
    }
};

