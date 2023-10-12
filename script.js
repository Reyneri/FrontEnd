


async function getAllWorks() {
    const reponse = await fetch ('works.json');
    const data = await reponse.json();
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

document.querySelector('.Objets_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 1);
    await init(filteredWorks);
});


document.querySelector('.Appartements_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 2);
    await init(filteredWorks);
});


document.querySelector('.Hotels-restaurants_btn').addEventListener('click', async function() {
    const allWorks = await getAllWorks();
    const filteredWorks = allWorks.filter(work => work.categoryId === 3);
    await init(filteredWorks);
});


