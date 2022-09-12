
const fetchFunction = async(url) => {
    try{
        let result = await fetch(url);
        if(result.ok){
            
            let response = await result.json();
            return response;
        }else{
            throw new Error("Probleme de connexion")
        }
    }catch(err){
        console.log("Erreur",err)
    }
};

            

