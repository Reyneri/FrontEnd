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
