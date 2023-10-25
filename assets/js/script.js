document.querySelector('.Tous_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
    updateSelectedButton(this);
});


async function getAllWorks() {
    const reponse = await fetch ('http://localhost:5678/api/works');
    const data = await reponse.json();
    return data;
}

// Initialization de la gallerie

async function init(elements) {

    const gallery = document.querySelector('.gallery');
gallery.innerHTML="" ; // j'efface la galerie pour la remplir avec les element du work.json

//Attendre que la gallery se vide
await new promise(resolve => setTimeout(resolve, 0));

elements.forEach(element => {
    const figure =document.createElement('figure') ;
    const img = document.createElement('img') ;
    img.src =element.imageUrl ;
    const caption = document.createElement('figcaption') ;
    caption.innerText =element.title ;

    figure.appendChild(img) ;
    figure.appendChild(caption);
    gallery.appendChild(figure) ;
    
});
}

document.addEventListener('DOMContentLoaded', async () => {
    const allWorks = await getAllWorks();
    await init(allWorks);
});


// Filtrage et trie 

document.querySelector('.Objets_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 1);
    await init(filteredWorks);
    updateSelectedButton(this);
});


document.querySelector('.Appartements_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 2);
    await init(filteredWorks);
    updateSelectedButton(this);
});


document.querySelector('.Hotels-restaurants_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 3);
    await init(filteredWorks);
    updateSelectedButton(this);
});


// changement de la couleur du bouton

function updateSelectedButton(selectedButton) {
    const buttons = document.querySelectorAll('.projets-btn button');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}


// _______________________________________________________________


/*                      connection/login                   */

/* Partie Log-in */


const logIn = document.querySelector(".login-btn")

logIn.addEventListener("click", async function(){
    const loginPage = document.querySelector(".login-page")
    const indexPage = document.querySelector(".index-page")
    loginPage.style.display = "flex";
    indexPage.style.display = "none";
    const emailInput = document.getElementById("email-login");
    if (emailInput) {
        emailInput.focus();
    }
})

const loginButton = document.querySelector(".submitConnect");

loginButton.addEventListener("click", login);


async function login() {
    const email = document.getElementById("email-login").value;
    const password = document.querySelector(".login-password").value;

    const loginData = {
        "email": email,
        "password": password
    };

    const connexionState = await loginUser(loginData)

    if(connexionState =="userisconnected"){
        connected()
        window.location.reload();
    }else{
        alert("Erreur dans l’identifiant ou le mot de passe", data);
        const emailInput = document.querySelector(".login-email");
        emailInput.value = ""; // Efface l'email saisi
        emailInput.focus(); // Place le curseur dans le champ de saisie de l'email
        document.querySelector(".login-password").value = ""; // Efface le mot de passe saisi
    }
}



function connected () {
    const divElement = document.querySelector(".edition");
    const loginPage = document.querySelector(".login-page")
    const indexPage = document.querySelector(".index-page")
    const titleProjet = document.querySelector(".titleProjet")
    const modify = document.querySelector(".modify")
    const photoBtn = document.querySelector(".photo-btn")
    const loginBtn = document.querySelector(".login-btn")
    const logoutBtn = document.querySelector(".logout-btn")
    divElement.style.display = "flex";
    loginPage.style.display = "none";
    indexPage.style.display = "block";
    titleProjet.style.display = "none";
    modify.style.display = "flex";
    photoBtn.style.display = "inline-flex";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
}

 function checkconnection(){
    let connectedToken = window.localStorage.getItem("appToken")
    console.log(connectedToken);

    if(connectedToken){
       connected();
    }
}

checkconnection();

