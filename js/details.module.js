
export class Details{
    
    constructor(){

        this.load=document.querySelector('.load')
        this.section=document.querySelector('.maindet')
       
      
       
        this.cards=document.querySelectorAll('.colmon')
      this.cards.forEach((card)=>{
        card.addEventListener('click',async()=>{
            
            
            this.load.classList.remove('d-none')
            this.cardid=card.getAttribute('data-id')
            await  this.getDetails(this.cardid)
            document.querySelector('.main').classList.add('d-none')
            this.section.classList.remove('d-none')
            
            
            this.show()
         


           
        })
      })

      
     

       
}

async getDetails(id){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1e38e866cdmsh523c527889e3006p152688jsnbf9a812bb782',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
   let api=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
   let apiResponse=await api.json()
   this.load.classList.add('d-none')
   
   console.log(apiResponse);
   this.creatDetails(apiResponse)
   
}

creatDetails(d){
    let videopath=d.thumbnail.replace('thumbnail.jpg','videoplayback.webm')
    let system=d.minimum_system_requirements
 this.section.style.cssText=`background-image: url(${d.thumbnail});`
    let data2=``
    let data=`
    <div class=" bg-secondary bg-opacity-50 position-absolute top-0 bottom-0 end-0 start-0">
    <div class="container w-100  rounded-5 p-5  cont-detals position-sticky ">
    <div class="d-flex justify-content-between">
        <h3 class="mb-4">Details Game</h3>
        <button id="close" class="btn-close btn-close-white"></button>
    </div>
    <div class="row d-flex">
        <div class="col-xl-4 ">
            <figure class="position-relative">
                <img src="${d.thumbnail}" alt="game-img" class="w-100">
                <video src="${videopath}" preload='none' muted loop class="position-absolute w-100 h-100 d-none top-0 start-0 z-3"></video>
            </figure>
            <figcaption>
            <span class="btn btn-outline-info mb-2"><a href="${d.freetogame_profile_url}" class=' cli'>Show Game</a></span>
       </figcaption>
        </div>
        
        <div class=" col-xl-4 game-det mb-3 ">
            <h2 class="mb-3"><span>${d.title}</span> </h2>
            <h6>Category: <span>${d.genre}</span></h6>
            <h6>Platform: <span>${d.platform}</span></h6>
            <h6>Status: <span>${d.status}</span></h6>
            <h6>publisher: <span>${d.publisher}</span></h6>
        </div>  
        <div class="col-xl-4 game-det2 mb-2">
       
        </div>
           
           
        
         <p class="des-p">${d.description}</p>
         
    </div>
</div>
    </div>
    `
    
    document.querySelector('.detals').innerHTML=data
    document.querySelector('#close').addEventListener('click',()=>{
        document.querySelector('.main').classList.remove('d-none')
        this.section.classList.add('d-none')
        this.stop()
     })

     if(system !== undefined){
        data2=`

     <h3 class="mb-3">system requirements :</h3>
     <table>
     <tr>
         <td><h6>graphics: </h6></td>
         <td><span>${system.graphics}</span></td>
     </tr>
     <tr>
         <td><h6>memory: </h6></td>
         <td><span>${system.memory}</span></td>
     </tr>
     <tr>
         <td><h6>os:</h6> </td>
         <td><span>${system.os}</span></td>
     </tr>
     <tr>
         <td><h6>processor: </h6></td>
         <td><span>${system.processor}</span></td>

     </tr>
     <tr>
         <td><h6>storage: </h6></td>
         <td><span>${system.storage}</span></td>
     </tr>
 </table>
`
document.querySelector('.game-det2').innerHTML=data2
     }


}

show(){
    
     const video=document.querySelector('video')
    video.classList.remove('d-none')
    setTimeout(()=>{
        video.play()
    },600)
    video.removeAttribute('muted')
    console.log(video);
    
}
stop(){
    const video=document.querySelector('video')
    video.classList.add('d-none')
    
    video.pause()
}

}