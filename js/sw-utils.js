//Para no tener toda la logica en el sw y hacer seperacion de responsabilidades

// Guardando en el cache dinamico
function actualizaCacheDinamico(dynamicCache,req,res){
    if(res.ok){
        caches.open(dynamicCache).then( cache =>{
            console.log(req);
            console.log(res);
            cache.put(req, res.clone());
            return res.clone();
        });
    }
    else{
        return res;
    }
}