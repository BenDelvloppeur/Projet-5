let canapData = [];

const fetchCanap = async ()=> {
    await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise)=> {
        canapData = promise
        console.log(canapData);
    });
};

const canapDisplay = async () => {
    await fetchCanap();

    // document.getElementById("items").innerHTML = `<div><img class="image-items"
    //  src="${canapData[0].imageUrl}" alt="Image d'un canapé" </div>
    
    // `;
};

canapDisplay();