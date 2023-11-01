


const projetBtn = document.querySelector('.projets-btn')
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const modify = document.querySelector('.btn-modify');
const barreAdmin = document.getElementById('edit-overlay-admin');


async function getAllWorks() {
    const reponse = await fetch ('http://localhost:5678/api/works');
    const data = await reponse.json();
    console.log(data)
    return data;
}


// Initialization de la gallerie

async function init(elements) {

    const gallery = document.querySelector('.gallery');
gallery.innerHTML="" ; // j'efface la galerie pour la remplir avec les element du work.json

//Attendre que la gallery se vide
await new Promise(resolve => setTimeout(resolve, 0));

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
adminConnected()
}

document.addEventListener('DOMContentLoaded', async () => {
    const allWorks = await getAllWorks();
    await init(allWorks);
});


// Filtrage et trie 
document.querySelector('.Tous_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
    updateSelectedButton(this);
});


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

// Fonction modal 



async function initModalGallery(elements) {
    const triPhoto = document.querySelector('.tri-photos');
    triPhoto.innerHTML = ""; // Effacer le contenu actuel de .tri-photos

    // Attendre que .tri-photos se vide
    await new Promise(resolve => setTimeout(resolve, 0));

    elements.forEach(element => {
        const div = document.createElement('div');
        div.style.position = "relative";
        const img = document.createElement('img');
        img.src = element.imageUrl;
        const p = document.createElement('p');
        p.innerText = "éditer";
        const i = document.createElement('i');
        i.classList.add("fa-regular");
        i.classList.add("fa-trash-can");

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(i);
        triPhoto.appendChild(div);

        i.addEventListener("click", async function () {
            console.log(i);
            await deletePhoto(element.id);
            window.location.reload();
        });
    });
}



async function toggleModal() {
    
    
    document.querySelector(".tri-photos").innerHTML = "";
    
    await initModalGallery(works);
    const works = await getAllWorks();

}
// qund cette fonction apple on affiche tout les element
 // Fonction pour activer l'interface admin
 async function adminConnected() {
    const token = window.localStorage.getItem("appToken");
    console.log("Token récupéré : ", token);
   

    if (token) {
        projetBtn.style.display ="none"
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        modify.style.display = "block";
        barreAdmin.style.display = "flex";
    } else {
        projetBtn.style.display ="flex"
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        modify.style.display = "none";
        barreAdmin.style.display = "none";
    }
}

// function isDisconnected{}
function disconnected() {
    const token = window.localStorage.getItem("appToken");

    if(token){
        window.localStorage.removeItem("appToken")
    }
}
logoutBtn.addEventListener("click",disconnected);
