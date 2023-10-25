// Selection du formulaire login 

const loginForm = document.getElementById('pages-login')

// Ecouteur  d'evement  pour la soumission du mot de pass et adress mail 

loginForm.addEventListener('submit', async function (event) {

    // Empêche l'action par défaut du formulaire
    event.preventDefault();

    // Récupère les valeurs des champs d'entrée
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    // Crée un objet userData
    const userData = {
        email: email,
        password: password
    }

    const loginSucess = await loginUser(userData)
    if (loginSucess) {
        //    Appel la fonction LoginUser

        await loginUser(userData);

        if (loginSucess) {
            adminConnected();  // Mise à jour Interfaces Admin
            window.location.href = "../../index.html";
            const works = await getAllWorks();
            console.log("Projet récuperérés", works)
        } else {
            // affiche message erreur
            console.log("Erreur de connexion")
        }
    }
    // control 
    console.log("Formulaire soumis avec les données suivantes:");
    console.log(`Email: ${email}`);
    console.log(`Mot de passe: ${password}`);


});

async function loginUser(userData) {
    try {
        // Ton code pour appeler l'API ou faire d'autres choses
        console.log("UserData:", userData);
        return true; // retourne true si la connexion réussit
    } catch (error) {
        console.log("Erreur:", error);
        return false; // retourne false si la connexion échoue
    }
}
