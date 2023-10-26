
// Fonction pour activer l'interface admin
async function adminConnected() {
    const token = window.localStorage.getItem("appToken");
    const loginBtn = document.querySelector('.login-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const modify = document.querySelector('.modify');
    const barreAdmin = document.getElementById('edit-overlay-admin');

    if (token) {
        logoutBtn.classList.remove('hidden');  
        loginBtn.classList.add('hidden');
        modify.classList.remove('hidden');
        barreAdmin.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        modify.classList.add('hidden');
        barreAdmin.classList.add('hidden');
    }
}

// Fonction pour se connecter
async function loginUser(userData) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (response.ok) {
        const token = data.token;
        window.localStorage.setItem("appToken", token);
        return "userisConnected";
    } else {
        return false;
    }
}


// Fonction pour récupérer tous les travaux
async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok) {
        const works = await response.json();
        return works;
    } else {
        return null;
    }
}



// Sélection du formulaire de login
const loginForm = document.getElementById('pages-login');

// Écouteur d'événement pour l'email et mot de passe
loginForm.addEventListener('submit', async function (event) {
    // Empeche l'action par défaut du formulaire
    event.preventDefault();

    // Récup les valeurs des champs
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    // Crée un objet userData
    const userData = {
        "email": email,
        "password": password
    };

    const loginSuccess = await loginUser(userData);
    if (loginSuccess == "userisConnected") {
        // Mise à jour de l'interface admin
        adminConnected();
        window.location.href = "../../index.html";  // Changed from reload to href

        // Récupération des projets
        const works = await getAllWorks();
        console.log("Projets récupérés", works);
    } else {
        console.log("Erreur de connexion");
    }

    console.log("Formulaire soumis avec les données suivantes:");
    console.log(`Email: ${email}`);
    console.log(`Mot de passe: ${password}`);
});






