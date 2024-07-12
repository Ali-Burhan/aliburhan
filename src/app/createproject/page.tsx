'use client'
import React, { useState } from 'react'

type projectProp = {
  title:string;
  description:string;
  category:string;
  githubUrl:string;
}

function Page() {
  const pass = 'Baana@786'
    const [project,setProjects]=useState<projectProp>({title:"",description:"",category:"",githubUrl:''})
    const [pic,setPic] = useState<any>(null)
    const [passwordText,setPasswordText] = useState('')
    const [passed,setPassed] = useState(false)
    const [passError,setPassError] = useState(false)
    
    // on change function 
    function handleChange(e:any){
      setProjects({...project,[e.target.name]:e.target.value})
    }

    function handlePass(e:React.SyntheticEvent){
      e.preventDefault()
      if(passwordText == pass){
        setPassed(true)
        setPassError(false)
      }
      else{
        setPassError(true)
      }
    }

    async function sendProject() {
      const {title,description,category,githubUrl} = project;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("githubUrl", githubUrl);
      formData.append("image", pic);
      const response = await fetch("/api/project", {
        method: "POST",
        body: formData,
        });
        const data = await response.json();
        console.log("🚀 ~ sendProject ~ data:", data)
    }


  return (
    <div className='mt-16 min-h-screen'>
      {/* password div to check if I am here or not */}  
      <div className={`w-full h-[80vh] grid place-items-center ${passed?'hidden':'block'}`}>
        <form className='flex flex-col gap-2 items-center' onSubmit={handlePass}>
          <p className='text-sm font-semibold'>Please Verify Your are Ali Burhan</p>
          <p className={`text-sm font-bold leading-tight tracking-tighter text-red-500 ${passError?'block':'hidden'}`}>Invalid Password😩</p>
            <input type="password" onChange={(e)=>setPasswordText(e.target.value)} className='flex justify-center items-center border-2 rounded px-10 outline-red-500' placeholder='*******************************'/>
        </form>
      </div>



    <div className={`text-center ${passed?'block':'hidden'} flex justify-center`}>
      <div className=' flex flex-col gap-5 max-w-md'>
    <h1 className='font-semibold tracking-tighter text-lg'>Create New Project Card</h1>
    <input type="text" className='rounded py-1 px-4 outline-none border-2' placeholder='Enter Project Name' name='title' value={project.title} onChange={handleChange}/>
        <select id="category" className='rounded py-1 px-4 outline-none border-2' name='category' onChange={handleChange}>
            <option value="web">Select Category</option>
            <option value="web">Web Development</option>
            <option value="app">App Development</option>
            <option value="ai">Artificial intelligence</option>
        </select>
        <input type="file" className='rounded py-1 px-4 outline-none border-2' onChange={(e:any)=>setPic(e.target.files[0])}/>
        <input type="text" className='rounded py-1 px-4 outline-none border-2' name='githubUrl' value={project.githubUrl} onChange={handleChange} placeholder='Repository URL'/>
        <textarea rows={10} className='rounded py-1 px-4 outline-none border-2' placeholder='Enter Project Description' name='description' value={project.description} onChange={handleChange}/>
        <button className='bg-red-600 mb-3 py-2 text-white rounded' onClick={sendProject}>Submit</button>
    </div>
      </div>
    </div>
  )
}

export default Page