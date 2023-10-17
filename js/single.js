// window.addEventListener('load',function(){
function display(){
    let mylink=this.window.location.href;
    let url=new URL(mylink);
    let myid=url.searchParams.get('p_id')
    console.log(myid)
    let info=[]
    fetch(`https://my-brand-frontend.onrender.com/myapi/blog/${myid}`)
    .then((response)=>{
        return response.json()
    })
    .then(async (data)=>{
        info=await data.data
        console.log(info)
        this.document.getElementById('single_blog').innerHTML=`
            <div class="single_img myflex_center pt_20 pb_10">
                        <div class="pt_10">
                            <img src="${info.image}" alt="">
                        </div>
                    </div>

                    <div class="blog_news">
                        <div class="sub_title">
                            <p>${info.title}</p>
                        </div>
                        <div>
                            <p>
                            ${info.content}
                            </p>
                        </div>
                        <div class="like_section myflex pt_20">

                            <div>
                                <p>By: Admin</p>
                            </div>

                            <div class="myflex mylikes">
                                
                               <div class="like_btn_section myflex">
                               <div id='liking_${info._id}'>
                                   <svg  data-like='' id='like_icon_${info._id}' onclick='liking(event)' data-pid=${info._id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="black" class="w-6 h-6 ">
                                    <path  stroke-linecap="round" id='likes_${info._id}'  data-pid=${info._id}  stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                   </div>
                                   </div>
                                   <div>
                                    <p id='like_num_${info._id}'>${info.likes.name.length}</p>
                                   </div>
                               </div>
                               <div class="cmnt_btn myflex">
                                <div class="cmnt_img">
                                    <img src="images/cmnt.png" alt="">
                                </div>
                                <div>
                                    <p>${info.comment.length}</p>
                                </div>
                            </div>
                              
                            </div>

                            
                            
                        </div>
                        <div class='single_blog_commenting '>
                            <div>
                            <textarea name="" class='' cols="45" rows="1" placeholder="Leave a comment" id=${info._id}></textarea>
                            </div>
                            <div class="cmnt_btns mywhite" onclick='btn(event)'>
                            <p data-pid=${info._id}>Send</p>
                            </div>
                        </div>
                        <div class='all_comments pt_10 pb_20' >
                        <div class='pt_20'>Comment section</div>
                        <ul id='comment_list' >
                        
                        </ul>
                        </div>

                    </div>
        `
    })
}
 display()   
// })

function btn(e){
    const post_id=e.target.dataset.pid
    localStorage.setItem('post_id',post_id)
    const cookie=document.cookie.split('=')[1];
    
   if(!cookie){
    alert("First log in")
    location.href='./login.html?action=true'
   }else{
       const id=localStorage.getItem('id')
       const p_id=localStorage.getItem('post_id')
       const message=document.getElementById(`${p_id}`).value
       const data={message}
       document.getElementById(`${p_id}`).value=''
       console.log(data)
    console.log(p_id)
    fetch(`https://my-brand-frontend.onrender.com/myapi/blog/${p_id}/comments`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'credentials':`${cookie}`
        },
        body:JSON.stringify(data)
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        location.reload()
    }).catch((error)=>{
        console.log(error)
    })
   }
}
function mycomment(){
    let mylink=this.window.location.href;
    let url=new URL(mylink);
    let myid=url.searchParams.get('p_id')
    fetch(`https://my-brand-frontend.onrender.com/myapi/blog/${myid}`)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        const cmnt=data.data.comment
        document.getElementById('comment_list').innerHTML=''
        cmnt.forEach((n) => {
            document.getElementById('comment_list').innerHTML+=`
           <li>
           <div class='cmnt_name'>
           <p><b>${n.name}</b></p>
           </div>
           <div class='cmnt_message'>
           <p>${n.message}</p>
           </div>
           </li>
            `
        });
    })
}
function liking(e){
    let cookies=document.cookie.split('=')[1]
        const pid=e.target.dataset.pid
        const clicked=e.target.id
        let upd={}
        // console.log(clicked)
        console.log(pid)
    if(cookies==undefined){
    alert('First log in')
    location.href='./login.html?action=true'
    
    }
    else{
        const all_blogs=JSON.parse(localStorage.getItem('all_blogs'))
        
        const logged_in=localStorage.getItem('email')
        all_blogs.forEach((blog)=>{
            // Unliking
            if(blog._id==pid){
                if(blog.likes.name.includes(logged_in)){
                    const total_likes=(blog.likes.name.length)-1
                    
                    const likeremove=blog.likes.name.indexOf(logged_in)
                    blog.likes.name.splice(likeremove,1)
                    
                    document.getElementById(`like_num_${pid}`).innerText=total_likes
                    document.getElementById(`like_icon_${pid}`).setAttribute('fill','none')
            
                }
                // Liking
                else{
                    const total_likes=(blog.likes.name.length)+1
                    blog.likes.name.push(logged_in)
                    document.getElementById(`like_num_${pid}`).innerText=total_likes
                    document.getElementById(`like_icon_${pid}`).setAttribute('fill','red')
                }
            upd=blog.likes
            }
        })
        localStorage.setItem('all_blogs',JSON.stringify(all_blogs))
        fetch(`https://my-brand-frontend.onrender.com/myapi/blog/${pid}/like`,{
            method:'PATCH',
headers:{
'Content-Type':'application/json',
'credentials':`${cookies}`
},
body:JSON.stringify(upd)
}).then((response)=>{
return response.json()
}).then((data)=>{
console.log(data)

}).catch((error)=>{
    console.log(error)
})
    }
}
function shading_like(){
    let mylink=this.window.location.href;
    let url=new URL(mylink);
    let myid=url.searchParams.get('p_id')
    fetch(`https://my-brand-frontend.onrender.com/myapi/blog/${myid}`)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        if(localStorage.getItem('email')){
            document.getElementById(`like_icon_${myid}`).setAttribute('fill','none')
        }
        else{
            const blogs= data.data
            if(blogs.likes.name.includes(localStorage.getItem('email'))){
                console.log("hereeeee")
                document.getElementById(`like_icon_${myid}`).setAttribute('fill','red')
            }
            else{
                document.getElementById(`like_icon_${myid}`).setAttribute('fill','none')
                console.log('not here')
            }
        }
       
    })
}
shading_like()
mycomment()