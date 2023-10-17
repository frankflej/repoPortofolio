let mycookie=document.cookie.split('=')[1]||''
if(mycookie){
    localStorage.removeItem('isAdmin')
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}



document.getElementById('mylogin').addEventListener('click',function(e){ 
    e.preventDefault()
    const myemail=document.getElementById('login_email').value
    const mypassword=document.getElementById('mypassword').value
    const pss_err=document.getElementById('p_error')
    const em_err=document.getElementById('em_error')
    let msg="";
    if(myemail.trim()=="" || mypassword.trim()==""){
        if(myemail.trim()==""){
            
            em_err.style.visibility='unset';
            em_err.innerText=msg
            return
        }
        if(mypassword.trim()==""){
            pss_err.style.visibility='unset';
            pss_err.innerText=msg;
            return
        }
    }else{
        const data={email:myemail,password:mypassword}
        fetch('https://my-brand-frontend.onrender.com/myapi/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
           console.log(data) 
            const token=data.token
            const id=data.data.id
            localStorage.setItem('isAdmin',data.data.isAdmin)
             localStorage.setItem('id',id)
             
             if(token){
                console.log(token)
                
                document.cookie=`token=${token}; Path=/;`
                let mylink=location.href;
                 let url=new URL(mylink);
                 let action=url.searchParams.get('action')
                 console.log(action)
                 if(action=='true'){
                    const email= data.data.email
                    localStorage.setItem('email',email)
                    const p_id=localStorage.getItem('post_id')
                    location.href=`./index.html?c_id=${id}`
                  }
                else{
                    location.href='./dashboard.html'
                }
            }
            else{
                console.log("not theere")
                document.getElementById('msg').style.color='#fa4b63'
                document.getElementById('msg').innerHTML=`    
                <p>Wrong credentials!</p>
                `
            }
        }).catch((error)=>{
            document.getElementById('msg').innerHTML=`    
                <p>${error}</p>
                `
        })
    }
})

const btn_check=()=>{
    const email=document.getElementById('login_email').dataset.err;
        const password=document.getElementById('mypassword').dataset.err;
        
        if(email=='pass'  && password=='pass'){
            document.getElementById('mylogin').style.color='white'
            document.getElementById('mylogin').style.backgroundColor='#fa4b63'
        }
        else{
            document.getElementById('mylogin').style.color='rgba(255, 255, 255, 0.321)'
            document.getElementById('mylogin').style.backgroundColor='#fa4b622e'
        }
}
setInterval(function(){
  btn_check()
},500) 

// Login local storage



