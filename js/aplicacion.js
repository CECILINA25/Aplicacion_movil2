
const privatekey='ade517a7d80717850283617fc928c21430dab899',
publickey ='62ac4d8ae25bf08f5653ccb6e1da7044',
cont = document.getElementById('cont'),
cont1 = document.getElementById('cont1'),
busq = document.getElementById('busqueda');






const getConnection=()=> {
    const ts= Date.now(),
    hash= MD5(ts+ privatekey+ publickey),
    URL='http://gateway.marvel.com/v1/public/characters?ts='+ts+'&apikey='+publickey+'&hash='+hash;
    
    fetch(URL).then(response=>response.json()) /* fetch(hace peticion) trae la data y la procesa en tipo jason*/
    .then(response=>{
       response.data.results.forEach(e=> { /*ecordando que es un array recorremos uno a uno */
    marvel(e)
                
        });
    });
           /*Hacemos la peticion(ajax) fetch a URL,no se neceita mas pero 
           necesitamos procesar la informacion,nos deuelve un objeto tipo response y quiero ver el objeto, 
           entonces .then */
              
 };

 
 const marvel= e => {
     
     
    const image = `${e.thumbnail.path}/portrait_medium.${e.thumbnail.extension}`
    const hero = `

     <div class="col-4">
     <div id="titulo">
     <h3>${e.name}<h3>
     </div>
     <div>
     <image class="imap" src=${image}>
     </div>
 <div >
     <a href="#" class="open" id="button" onclick="mostrarDescripcion('${e.description}')">Descripcion</a>
 </div>
 <div>
 <a href="#" id="button1" class="fcomp" onclick="compartirAmigo(${e.id})">Compartir</a>
  </div>
</div>
    

`;

cont.insertAdjacentHTML('beforeend',hero)
      
    
}
function mostrarDescripcion(des){
    document.getElementById('parrafo').innerHTML=des;
    $('.open').on('click', function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
}
function compartirAmigo(identificador){
    localStorage.setItem("compartir",identificador);
    window.location.href="compartir.html";
   
}





 

     const busquedaHeroe = name =>{
        band= true;
        const ts= Date.now(),
       
        hash= MD5(ts+ privatekey+ publickey),
        nombre= encodeURIComponent(name),
        URL='http://gateway.marvel.com/v1/public/characters?name='+nombre+'&ts='+ts+'&apikey='+publickey+'&hash='+hash;
       console.log(URL);
        fetch(URL).then(response=>response.json()) /* trae la data y la procesa en tipo jason*/
        .then(response=>{
            console.log(response);
        response.data.results.forEach(e=> { /*ecordando que es un array recorremos uno a uno */
        marvel(e);
        vectorSerie(e);
       
                                            
            });
        });
        
     };



busq.addEventListener('keyup', e =>{
     if (e.keyCode === 13 ){
        cont.innerHTML='';
        busquedaHeroe(e.target.value.trim());
     
        
    }
    
 });      
  const vectorSerie= e =>{
      i=0;
      
       if (band) {
          e.series.items.forEach(e=>{
           i++
            
            const tabserie = `
          
            <div>
                  ${i+".-"+e.name} 
                          
            </div>
            
            `;
           
            cont1.insertAdjacentHTML('beforeend',tabserie); 
           
          })
         
         
      };
      
  };

  function guardarValor() {
    var nomHeroe = document.getElementById("busqueda").value;
    localStorage.setItem('nombreHeroe',nomHeroe);
  }  


  busq.addEventListener('keyup',guardarValor);

  
  






 
getConnection();

