async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok) {const works = await response.json();
return works;} else {
    return null;
}        
};

async function loginUser(userData) {
    //  Creer une requete POST ver le point APIT
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });  
    
    // Analyse la reponse  JSON
        const data = await response.json();
    //Vefieie si la requete est réussi
    if (response.ok) {
      
        // extrait les donné de la réponse 
        const token = data.token;
        // test dans le log
        console.log(token);
        //Stock la réponse dans le stockage local
        window.localStorage.setItem("appToken", token);
        return true;
    } else {
        return false ;
    }
}







// function qui permet de supprimer la photo

async function deletePhoto(id) {
    let storedToken = window.localStorage.getItem("appToken");
    let bearer = "Bearer " + storedToken;
    let httpOptions = "";

    if (storedToken !== null) {
        const headersContent = {
            "Accept": "*/*",
            "Authorization": bearer,
        };
        const headers = new Headers(headersContent);
        httpOptions = {
            method: "DELETE",
            headers: headers,
            body: id
        };
    }

    const response = await fetch("http://localhost:5678/api/works/" + id, httpOptions);
    console.log(response.status);

    if (response.status === 204) {
        alert('image correctement retirée');
        document.querySelector(".gallery").innerHTML = "";
        return response;
    }
}


async function addPhoto(FormData) {
    let storedToken = window.localStorage.getItem("appToken");
    let bearer = "Bearer " + storedToken;
    let httpOptions = "";

    if (storedToken !== null) {
        const headersContent = {
            "Accept": "*/*",
            "Authorization": bearer,
        };
        const headers = new Headers(headersContent);
        httpOptions = {
            method: "POST",
            headers: headers,
            body: FormData
        };
    }

    const response = await fetch("http://localhost:5678/api/works", httpOptions);
    console.log(response.status);
    return response;
}