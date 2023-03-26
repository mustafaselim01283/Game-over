
export class Setting{
    constructor(){

        this.html=document.querySelector('html')



        document.querySelector('.sign').addEventListener('click',()=>{
            document.querySelector('#register').classList.remove('d-none')
            localStorage.clear()
        })
        document.querySelector('.log').addEventListener('click',()=>{
            document.querySelector('#login').classList.remove('d-none')
        })
        document.querySelector('.darc').addEventListener('click',()=>{
            this.html.removeAttribute('data-mood')
            this.html.setAttribute('data-mood','darkmood')
        })
        document.querySelector('.light').addEventListener('click',()=>{
            this.html.removeAttribute('data-mood')
            this.html.setAttribute('data-mood','lightmood')
        })
    }
}