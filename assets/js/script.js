


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
    const token = window.localStorage.getItem('appToken');
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
        await loadAndShowModalGallery();
    }
});


document.querySelector('.btn-modify').addEventListener('click', async function () {
    if (isadminConnected) {
        showModal();
        await loadAndShowModalGallery();
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
    clearPhotoAjout()
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


//7. Gestion de la photo ajouter et previw de l'image -  

document.getElementById('ajouterPhotoBtn').addEventListener('click', function () {
    document.getElementById('inputPhoto').click();
});

document.getElementById('inputPhoto').addEventListener('change', async function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            document.querySelector('.ajout-photo-after').appendChild(imgElement);
            document.querySelector('.ajout-photo-before').style.display = 'none';
            document.querySelector('.ajout-photo-after').style.display = 'flex';
        }
        reader.readAsDataURL(file);
    }
});



window.addEventListener('resetImageAfter', function () {
    const imgContainer = document.querySelector('.ajout-photo-after');
    while (imgContainer.firstChild) {
        imgContainer.removeChild(imgContainer.firstChild);
    }
    document.querySelector('.ajout-photo-before').style.display = 'flex';
    document.querySelector('.ajout-photo-after').style.display = 'none';
});



const clearPhotoAjout = () => {
    const ajoutPhotoAfter = document.querySelector('.ajout-photo-after');
    const ajoutPhotoBefore = document.querySelector('.ajout-photo-before');
    ajoutPhotoAfter.innerHTML = '';
    ajoutPhotoBefore.style.display = 'flex';  // Afficher la section d'ajout de photo
    ajoutPhotoAfter.style.display = 'none';   // Cache la section des photos ajoutées
};

//8. Projection photo de la galerie dans le modal connection API




// Initialisation de la Gallerie du modal 
async function initModalGallery(elements) {
    const modalGallery = document.querySelector('.tri-photos');
    modalGallery.innerHTML = ""; // Nettoie le contenu précédent

    elements.forEach(element => {
        const container = document.createElement('div');
        container.classList.add('img-modal-container');
        container.setAttribute('data-projet-id', element.id); // Utilisation de data- pour l'attribut personnalisé

        const img = document.createElement('img');
        img.src = element.imageUrl;

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash-can';
        icon.addEventListener('click', async function () {
            const projetId = this.parentNode.getAttribute('data-projet-id');
            const token = window.localStorage.getItem('appToken');
            if (!token) {
                console.error('Token d\'authentification manquant');
                return;
            }
            try {
                const response = await fetch(`http://localhost:5678/api/works/${projetId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    this.parentNode.remove(); // Suppression du conteneur de l'image du DOM
                    const allWorks =await getAllWorks();
                    init(allWorks)
                } else {
                    console.error(`Échec de la suppression du projet. Statut de la réponse: ${response.status}`);
                }
            } catch (erreur) {
                console.error('Erreur réseau :', erreur);
            }
        });

        modalGallery.appendChild(container);
        container.appendChild(img);
        container.appendChild(icon);
    });
}


 //voir event listener pour eng la gall modal
// console.log(initModalGallery)


// Fonction pour charger et afficher la galerie modal
async function loadAndShowModalGallery() {
    const allWorks = await getAllWorks();
    await initModalGallery(allWorks);
    showModal();
};
console.log(loadAndShowModalGallery)
// Misc 
// Fonction Effacer un projet   




document.querySelector('.supprimer-photos').addEventListener('click', async function () {
    const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer la galerie ?');
    if (isConfirmed) {
        // Appel  API pour supprimer tous les fichier de la galerie ici
        // Utiliser fetch ou autre pour envoyer la requête à l'API
    }
});


async function AjoutPhoto() {
    const formElement = document.getElementById('formPhoto');
    const formData = new FormData(formElement);

    // Récupérer les valeurs des champs du formulaire pour le titre et la catégorie
    const title = document.getElementById('nameModal').value;
    const category = document.getElementById('categorieSelect').value;

    // Ajoute les champs supplémentaires à formData
    formData.append('title', title);
    formData.append('category', category);

    // Récupere le token depuis le localStorage
    const token = window.localStorage.getItem('appToken');

    // Préparer les en-têtes de la requête, y compris le token d'autorisation
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    // Ici,  pas de 'Content-Type' à 'application/json'
    // car on envoie un formData qui nécessite 'multipart/form-data'

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (response.ok) {
            const workAdded = await response.json();
            console.log('Projet ajouté:', workAdded);
            const allWorks =await getAllWorks();
            init(allWorks);
            
            // Reinit le formulaire 
            document.getElementById('formPhoto').reset();

        } else {
            console.error('Erreur lors de l\'ajout du projet:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur de réseau:', error);
    }
}

document.getElementById('formPhoto').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de recharger la page
    AjoutPhoto();
});
