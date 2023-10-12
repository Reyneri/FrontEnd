document.querySelector('.Tous_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
});

document.querySelector('.Objets_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
});


document.querySelector('.Appartements_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
});


document.querySelector('.Hotels-restaurants_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
});



async function getAllWorks() {
    const reponse = await fetch ('works.json');
    const data = await reponse.json();
    return data;
}

// Initialization de la gallerie

async function init(elements) {

    const gallery = document.querySelector('.gallery');
gallery.innerHTML="" ; // j'efface la galerie pour la remplir avec les element du work.json

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
