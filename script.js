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


document.querySelector('.Hotels_btn').addEventListener('click',async function() {
    const  allWorks = await getAllWorks() ;
    await init(allWorks);
});