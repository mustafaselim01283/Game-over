
export class Login{
    constructor(){
      
        this.inputs=document.querySelectorAll('input')
        this.form2=document.getElementById('form2')

        document.getElementById('log2').addEventListener('click',()=>{
          document.getElementById('register').classList.remove('d-none')
          document.getElementById('login').classList.add('d-none')
        })
    
        this.form2.addEventListener('submit',(e)=>{
          e.preventDefault()
          
          if(this.validateEmail()&&this.validatepass()){
            
            this.userData()
          }else{
            return false
          }
          
        });

        this.inputs[5].addEventListener('input',()=>{
          this.validateEmail()
        })
        this.inputs[6].addEventListener('input',()=>{
          this.validatepass()
        })

        }
    
  
  userData(){
    let user={
      
        email:this.inputs[5].value,
        password:this.inputs[6].value,
        
    }
    this.creatUser(user)
    console.log(user);
  }
 async creatUser(x){
    let api=await fetch('https://sticky-note-fe.vercel.app/signin',{
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
      document.getElementById('login').classList.add('d-none')
      localStorage.setItem('usertoken',respons.token)
      
    }else{
      document.getElementById('message2').innerText=respons.message
      document.getElementById('email2').classList.add('error')
      document.getElementById('valemail2').classList.remove('d-none')
      document.getElementById('valpass2').classList.remove('d-none')
    }


  }
 
  validateEmail(){
    const regexEmail=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regexEmail.test(this.inputs[5].value))
    {
      document.getElementById('email2').classList.add('corect')
      document.getElementById('email2').classList.remove('error')
      document.getElementById('valemail2').classList.add('d-none')
      return true
      
    }else{
      document.getElementById('email2').classList.add('error')
      document.getElementById('email2').classList.remove('corect')
      document.getElementById('valemail2').classList.remove('d-none')
      return false
    }
  }
  validatepass(){
    const regexPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexPassword.test(this.inputs[6].value))
    {
      document.getElementById('pass2').classList.add('corect')
      document.getElementById('pass2').classList.remove('error')
      document.getElementById('valpass2').classList.add('d-none')
      return true
      
    }else{
      document.getElementById('pass2').classList.add('error')
      document.getElementById('pass2').classList.remove('corect')
      document.getElementById('valpass2').classList.remove('d-none')
      return false
    }
  }

 
 
}