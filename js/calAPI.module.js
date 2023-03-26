import { Details } from "./details.module.js";
export class Category{
    
    constructor(){

        
        if(localStorage.length<1){
            document.querySelector('#register').classList.remove('d-none')
        }
        this.load=document.querySelector('.load')

        this.getData('mmorpg')
        
        this.links=document.querySelectorAll('nav ul a')
        this.links.forEach((link)=>{
               link.addEventListener('click',async(e)=>{
                document.querySelector('nav ul .active').classList.remove('active')
                link.classList.add('active')

                let linkName=e.target.innerText.toLowerCase();
                
           await this.getData(linkName)
           

            })
        })
       


         
    }

    async getData(cat){
        this.load.classList.remove("d-none")
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1e38e866cdmsh523c527889e3006p152688jsnbf9a812bb782',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
      let apiData=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options)
      let apiResponse=await apiData.json()
      this.load.classList.add("d-none")
            console.log(apiResponse);
            this.display(apiResponse)
            
            let details=new Details()
    }


    display(cards){
        
        let box=''
    
        for(let card of cards){
        
           
            
             
            box+=`
            <div class="col" >
                        
                    
            <div  data-id="${card.id}" class=" colmon game-card rounded-3 position-relative" >
                <div class="card-body p-3 pb-0">
                    <figure class=' position-relative'>
                    <img src="${card.thumbnail}" alt="game-img"
                    class="rounded-top-3 card-img-top object-fit-cover h-100">
                           
                    </figure>
                    <figcaption>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6>${card.title}</h6>
                            <button class="btn btn-primary text-white">Free</button>
                        </div>
                        <p class=" text-center ">${card.short_description}</p>
                    </figcaption>

                </div>
                <footer class="px-3 py-2  d-flex justify-content-between ">
                    <button>${card.genre}</button>
                    <button>${card.platform}</button>
                </footer>
                
            </div>


        </div>
            `
        }

       
        
        document.querySelector('main .row').innerHTML=box
       
    }

    

 

 }

