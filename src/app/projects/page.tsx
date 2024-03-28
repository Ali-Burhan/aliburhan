'use client'
import { useEffect, useState } from "react"
import Navbar from "../components/home/navbar"
import Cards from "../components/project/cards"
import AOS from 'aos'
import "aos/dist/aos.css"


interface Item {
  id: number;
  title: string;
  category: string;
  description: string;
  imageurl: string;
}
const Page = () => {
  const [filterProjects,setFilterProjects] = useState<Item[]>([])
  useEffect(()=>{
  AOS.init()
  },[])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setSelectedCategory("")
      setFilterProjects(() =>
        projects.filter((ele) =>
          ele.category.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      // If the search input is empty, reset filterProjects to the original projects array
      setFilterProjects(projects);
    }
  };

  const projects = [
    {
      id:1,
      title:'Travel Agency Managment',
      category:'Web Development',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique nihil doloremque inventore in quo voluptates perferendis quasi! Enim, dolor. Corrupti omnis consequatur dolor dolore minus enim unde quia assumenda.',
      imageurl:'/projecttravel.jpg'
    },
    {
      id:2,
      title:'Personal App',
      category:'App Development',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique nihil doloremque inventore in quo voluptates perferendis quasi! Enim, dolor. Corrupti omnis consequatur dolor dolore minus enim unde quia assumenda.',
      imageurl:'/ali.jpg'
    },
    {
      id:3,
      title:'Publication Managment',
      category:'Web Development',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique nihil doloremque inventore in quo voluptates perferendis quasi! Enim, dolor. Corrupti omnis consequatur dolor dolore minus enim unde quia assumenda.',
      imageurl:'/projectpublication.jpg'
    },
    {
      id:4,
      title:'Burhan Dev',
      category:'Web Development',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique nihil doloremque inventore in quo voluptates perferendis quasi! Enim, dolor. Corrupti omnis consequatur dolor dolore minus enim unde quia assumenda.',
      imageurl:'/projectdev.jpg'
    },
    {
      id:5,
      title:'Accounting Solution',
      category:'Web Development',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique nihil doloremque inventore in quo voluptates perferendis quasi! Enim, dolor. Corrupti omnis consequatur dolor dolore minus enim unde quia assumenda.',
      imageurl:'/ali.jpg'
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    if(e.target.value !== ""){
      setFilterProjects((pre)=>projects.filter((ele)=>ele.category.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    else{
      setFilterProjects(projects)
    }
  };
  return (
    <div>
        <Navbar/>
        {/* margin:auto;background:#ffffff;display:block;z-index:1;position:relative */}
        <div className="">
          {/* project main div */}
            <div className="h-[50vh] sm: pt-24 projectback lg:py-32 md:py-20 sm:py-10 py-10 md:px-40 sm:px-14 px-5">
               <h1 className="md:text-5xl sm:text-3xl text-3xl font-semibold md:text-white sm:text-black text-black" data-aos="fade-right"> Design. Develop. Website. Deploy.</h1>
               <h1 className="mt-3 md:text-4xl sm:text-2xl text-2xl md:text-white" data-aos="fade-right">Find all my projects here.</h1>
            </div>
            {/* filter project div */}
            <div className="lg:px-20 md:px-10 sm:px-10 px-10">
            <div className="flex items-center py-10">
              <div className="flex-1">
                  <p className="text-xs">Filter By:</p>
              </div>
              <div className="flex-2 gap-5 flex">
                {/* searches */}
                    <div className="hidden sm:hidden md:block">
                        <input type="text" onChange={handleSearch} className="border-gray-300 border h-[46px] outline-none px-3 lg:w-96 md:w-72 sm:w-48 w-40"  placeholder="Search" />
                    </div>
                    <div>
                    <div>
      <select
        className="border-gray-300 text-gray-500 border h-[46px] outline-none px-3 lg:w-96 md:w-72 sm:w-48 w-40"
        name="category"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="App Development">App Development</option>
        {/* Add more options as needed */}
      </select>
    </div>
                    </div>
              </div>
            </div>
            <div className="flex gap-6 justify-center py-10 flex-wrap">
              { filterProjects.length==0?  projects.map((ele,index)=>(
                <Cards imgurl={ele.imageurl} title={ele.title} tag={ele.category} desc={ele.description} key={index}/>
                )):filterProjects.map((ele,index)=>(
                  <Cards imgurl={ele.imageurl} title={ele.title} tag={ele.category} desc={ele.description} key={index}/>
                  ))
              }
            </div>
        </div>
        </div>
    </div>
  )
}

export default Page