//imports
importScripts('/js/sw-utils.js');

const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inumatable-v1';

//archivos necesarios para que la app funcione
//incluyendo el / css,js y otro recursos que creamos y manipulamos.
const APP_SHELL = [
    //'/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

//Aqui almacenamos todo aquello que no va a cambiar en el camino de la app
//o cosas que no cambiamos nosotros
//estas son referencias a las fuentas que luego se utilizan en el codigo interno de jquery
const APP_SHELL_INMUTABLE =[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];


self.addEventListener('install', e=>{
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});


self.addEventListener('activate', e=>{
    ///Borra los archivos de cache anteriores
    const respuesta  = caches.keys().then( keys =>{
        keys.forEach( key => {
            if(key!== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });


    e.waitUntil(respuesta);
});


//para manejar las url reales de las fuentes se utiliza el cache dinamico ache network fallback
 self.addEventListener('fetch', e =>{
    
    // const respuesta = caches.match(e.resquest).then( res =>  {

    //     if(res){
    //         return res;
    //     }else{
    //         return fetch(e.resquest).then( newRes => {
    //             return actualizaCacheDinamico(DYNAMIC_CACHE,e.resquest,newRes);
    //         })
    //     }

    // });
    // //no esta funcionado el cache dinamico
    //  e.respondWith(respuesta);
 });
