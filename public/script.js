const form =document.getElementById('form');
const data =document.getElementById('data');
const getdata=document.getElementById('get-btn');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const formData =new FormData(form);
    const formObj= Object.fromEntries(formData);
    try{
        const res = await axios.post("http://localhost:3000/login",formObj);
        localStorage.setItem('token',res.data.token);
        console.log("user sign up");
    }
    catch(e){
        localStorage.removeItem('token');
    }
})

getdata.addEventListener('click', async(e)=>{
    const token=localStorage.getItem('token');
    try{
        const res=await axios.get('http://localhost:3000/dashboard',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        data.innerHTML=`<h1>Hello ${res.data.msg}</h1>`;

    }catch(e){
        data.innerHTML=`<h1> ${e.response.data.msg}</h1>`
    }
})