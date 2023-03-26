
export class Regester{
  
    constructor(){
      
        this.inputs=document.querySelectorAll('input')
        this.form=document.querySelector('form')

        document.getElementById('log').addEventListener('click',()=>{
          document.getElementById('register').classList.add('d-none')
          document.getElementById('login').classList.remove('d-none')
        })
    
        this.form.addEventListener('submit',(e)=>{
          e.preventDefault()
          
            
          
          if(this.validateName(this.inputs[0].value,'first','firstval')
          &&
          this.validateName(this.inputs[1].value,'last','lastval')&&
          this.validateEmail()&&
          this.validatepass()&&this.validateage()){
            
            this.userData()
            

          }else{
            return false
          }
          
        });

        this.inputs[0].addEventListener('input',()=>{
          this.validateName(this.inputs[0].value,'first','firstval')
        })
        this.inputs[1].addEventListener('input',()=>{
          this.validateName(this.inputs[1].value,'last','lastval')
        })
        this.inputs[2].addEventListener('input',()=>{
          this.validateEmail()
        })
        this.inputs[3].addEventListener('input',()=>{
          this.validatepass()
        })
        this.inputs[4].addEventListener('input',()=>{
          this.validateage()
        })


          
          
     
        
      
        }
    
  
  userData(){
    let user={
        first_name:this.inputs[0].value,
        last_name:this.inputs[1].value,
        email:this.inputs[2].value,
        password:this.inputs[3].value,
        age:this.inputs[4].value,
    }
    this.creatUser(user)
    console.log(user);
  }
 async creatUser(x){
    let api=await fetch('https://sticky-note-fe.vercel.app/signup',{
      method:'post',
      body:JSON.stringify(x),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const respons=await api.json()
    console.log(respons);

    if(respons.message==='success'){
      document.getElementById('register').classList.add('d-none')
      document.getElementById('login').classList.remove('d-none')
    }else{
      document.getElementById('message').innerText=respons.errors.email.message
      document.getElementById('email').classList.add('error')
      document.getElementById('valemail').classList.remove('d-none')
    }


  }
  validateName(x,y,z){
    const regexName=/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexName.test(x)){
      document.getElementById(`${y}`).classList.add('corect')
      document.getElementById(`${y}`).classList.remove('error')
      document.getElementById(`${z}`).classList.add('d-none')
      return true
      
    }else{
      document.getElementById(`${y}`).classList.add('error')
      document.getElementById(`${y}`).classList.remove('corect')
      document.getElementById(`${z}`).classList.remove('d-none')
      return false
    }
  }
  validateEmail(){
    const regexEmail=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regexEmail.test(this.inputs[2].value))
    {
      document.getElementById('email').classList.add('corect')
      document.getElementById('email').classList.remove('error')
      document.getElementById('valemail').classList.add('d-none')
      return true
      
    }else{
      document.getElementById('email').classList.add('error')
      document.getElementById('email').classList.remove('corect')
      document.getElementById('valemail').classList.remove('d-none')
      return false
    }
  }
  validatepass(){
    const regexPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexPassword.test(this.inputs[3].value))
    {
      document.getElementById('pass').classList.add('corect')
      document.getElementById('pass').classList.remove('error')
      document.getElementById('valpass').classList.add('d-none')
      return true
      
    }else{
      document.getElementById('pass').classList.add('error')
      document.getElementById('pass').classList.remove('corect')
      document.getElementById('valpass').classList.remove('d-none')
      return false
    }
  }

  validateage(){
    
    const regexAge=/^([1-7][0-9]|80)$/
    if(regexAge.test(this.inputs[4].value))
    {
      document.getElementById('age').classList.add('corect')
      document.getElementById('age').classList.remove('error')
      document.getElementById('valage').classList.add('d-none')
      return true
      
    }else{
      document.getElementById('age').classList.add('error')
      document.getElementById('age').classList.remove('corect')
      document.getElementById('valage').classList.remove('d-none')
      return false
    }
    
  }
}