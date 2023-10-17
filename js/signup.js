
document.getElementById('signUp').addEventListener('submit',(e)=>{
    e.preventDefault();
    const userName=document.getElementById('signup_name').value;
    const userEmail=document.getElementById('signup_email').value;
    const userPassword=document.getElementById('signup_password').value;
    const userConfPassword=document.getElementById('signup_cpassword').value;
    if(userName.trim()=="" || userEmail.trim()=="" || userPassword.trim()=="" || userConfPassword.trim()==""){
        if(userName.trim()==""){
            
            document.getElementById('name_error').style.visibility='unset';
            document.getElementById('name_error').innerText=msg
            return
        }
        if(userEmail.trim()==""){
            document.getElementById('s_em_error').style.visibility='unset';
            document.getElementById('s_em_error').innerText=msg;
            return
        }
        if(userPassword.trim()==""){
            document.getElementById('s_p_error').style.visibility='unset';
            document.getElementById('s_p_error').innerText=msg;
            return
        }
        if(userConfPassword.trim()==""){
            document.getElementById('s_pc_error').style.visibility='unset';
            document.getElementById('s_pc_error').innerText=msg;
            return
        }
    }else{
        if(userConfPassword == userPassword){
           
            const data={username:userName,email:userEmail,password:userPassword,cpassword:userConfPassword};
            // Sending data in our backend
            fetch('https://my-brand-frontend.onrender.com/myapi/signup',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                alert(data.message)
                location.href='./login.html'
            }).catch((error)=>{
                console.log(error)
            })
        }
           else{
            document.getElementById('s_p_error').style.visibility='unset';
            document.getElementById('s_pc_error').style.visibility='unset';
            document.getElementById('s_p_error').innerText="Password don't match!";
            document.getElementById('s_pc_error').innerText="Password don't match!";
            return
           }
    }
      
})
