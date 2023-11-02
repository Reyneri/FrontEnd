


const projetBtn = document.querySelector('.projets-btn')
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const modify = document.querySelector('.btn-modify');
const barreAdmin = document.getElementById('edit-overlay-admin');


async function getAllWorks() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const data = await reponse.json();
    console.log(data)
    return data;
}


// Initialization de la gallerie

async function init(elements) {

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ""; // j'efface la galerie pour la remplir avec les element du work.json

    //Attendre que la gallery se vide
    await new Promise(resolve => setTimeout(resolve, 0));

    elements.forEach(element => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = element.imageUrl;
        const caption = document.createElement('figcaption');
        caption.innerText = element.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);

    });
    adminConnected()
}

document.addEventListener('DOMContentLoaded', async () => {
    const allWorks = await getAllWorks();
    await init(allWorks);
});


// Filtrage et trie 
document.querySelector('.Tous_btn').addEventListener('click', async function () {
    const allWorks = await getAllWorks();
    await init(allWorks);
    updateSelectedButton(this);
});


document.querySelector('.Objets_btn').addEventListener('click', async function () {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 1);
    await init(filteredWorks);
    updateSelectedButton(this);
});


document.querySelector('.Appartements_btn').addEventListener('click', async function () {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 2);
    await init(filteredWorks);
    updateSelectedButton(this);
});


document.querySelector('.Hotels-restaurants_btn').addEventListener('click', async function () {
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



// qund cette fonction appele on affiche tout les element
// Fonction pour activer l'interface admin
async function adminConnected() {
    const token = window.localStorage.getItem("appToken");
    console.log("Token récupéré : ", token);


    if (token) {
        projetBtn.style.display = "none"
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        modify.style.display = "block";
        barreAdmin.style.display = "flex";
    } else {
        projetBtn.style.display = "flex"
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        modify.style.display = "none";
        barreAdmin.style.display = "none";
    }
}

// function isDisconnected{}
function disconnected() {
    const token = window.localStorage.getItem("appToken");

    if (token) {
        window.localStorage.removeItem("appToken")
    }
}
logoutBtn.addEventListener("click", disconnected);


let isadminConnected = true;

// Quand on clique sur un des bouton modifier admin (.overlay-text) ou  
// bouton modifier Projet en admin (.btn-modify) on ouvre le modal (.modal-container)
// Le modal ne peux apparaitre que si adminConnected et clique bouton modifier en adminConnected
document.querySelector('.overlay-text').addEventListener('click', async function () {
    if (isadminConnected) {
        showModal();
    }
});

document.querySelector('.btn-modify').addEventListener('click', async function () {
    if (isadminConnected) {
        showModal();
    }
});



// 1. Affichage du modal principal
const showModal = () => {
    document.getElementById('modal-container').style.display = "flex";
};

// 2. Vérification si l'utilisateur est administrateur
console.log(isadminConnected);

// 3. Fermeture du modal
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', async function () {
        closeModal();
    });
});

const closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    const modalContainerAjout = document.getElementById('modal-container-ajout');
    if (modalContainer) {
        modalContainer.style.display = "none";
    }
    if (modalContainerAjout) {
        modalContainerAjout.style.display = "none";
    }
};

// 4. Affichage et masquage du modal d'ajout de photo
const modalContainerAjout = document.getElementById('modal-container-ajout');
const showAjoutModal = () => {
    modalContainerAjout.style.display = "flex";
};

const hideAjoutModal = () => {
    modalContainerAjout.style.display = "none";
};

// 5. Gestionnaire d'événement pour le bouton d'ajout de photo
const triggerAjoutModal = document.getElementById('modal-trigger-ajout');
triggerAjoutModal.addEventListener('click', async function () {
    closeModal(); // 🛠️ Appellera désormais la fonction réparée
    showAjoutModal();
});

// 6. Gestionnaire d'événement pour le bouton de retour du modal d'ajout de photo
const backAjoutModal = document.querySelector('.row-modal');
backAjoutModal.addEventListener('click', async function () {
    hideAjoutModal();
    showModal();
});






// Misc 

document.querySelector('.supprimer-photos').addEventListener('click', async function () {
    const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer la galerie ?');
    if (isConfirmed) {
        // Appel  API pour supprimer tous les fichier de la galerie ici
        // Utiliser fetch ou autre pour envoyer la requête à l'API
    }
});

