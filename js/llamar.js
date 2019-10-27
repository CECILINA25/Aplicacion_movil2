window.onload= function(){
   
        const privatekey='ade517a7d80717850283617fc928c21430dab899',
        publickey ='62ac4d8ae25bf08f5653ccb6e1da7044',
        ed=document.getElementById('emaildestinatario'),
    
       identicador=localStorage.getItem("compartir");
       console.log(identicador);
        const ts= Date.now(),
        ide=encodeURIComponent(identicador),
            hash= MD5(ts+ privatekey+ publickey),
            URL='http://gateway.marvel.com/v1/public/characters?id='+ide+'&ts='+ts+'&apikey='+publickey+'&hash='+hash;
            console.log(URL);
            fetch(URL).then(response=>response.json())     
            .then(response=>{
            heroecomp=response.data.results[0];
            console.log(heroecomp);
            image=`${heroecomp.thumbnail.path}/portrait_medium.${heroecomp.thumbnail.extension}`
            document.getElementById('fimagen').src=image;
            localStorage.setItem("compartir", JSON.stringify(heroecomp));
            document.querySelector('#fnombre').value=heroecomp.name;
            document.querySelector('#fdescripcion').value=heroecomp.description;
  
       ;                   
            });
         
                  
     
       
    
   
}
document.querySelector('#btncompartir').addEventListener('click',registrar);
function registrar(){
          
    cd=document.querySelector('#fcorreodest').value;
    localStorage.setItem('cdestinatario',cd);
    m=localStorage.getItem('cdestinatario');
    console.log(m);
    paso='mailto:'+m;
    console.log(paso);
    document.getElementById('btncompartir').href=paso;


    
 }