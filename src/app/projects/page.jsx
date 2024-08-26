'use client'
import { useEffect, useState } from "react"
import Navbar from "../components/home/navbar"
import Cards from "../components/project/cards"
import AOS from 'aos'
import "aos/dist/aos.css"


const Page = () => {
  const [filterProjects,setFilterProjects] = useState([])
  const [fetchedProjects,setFetchedProjects] = useState([])
  useEffect(()=>{
  AOS.init()
  },[])

  const handleSearch = (e) => {
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
      description:'Tourism and Hospitality Management is a full-stack application built with Next.js, designed to streamline the management of tourism and hospitality services. This platform allows users to manage bookings, reservations, customer information, and service offerings efficiently. By leveraging modern web technologies, it provides a seamless and user-friendly experience for both service providers and customers in the tourism and hospitality industry.',
      imageurl:'/projecttravel.jpg',
      githubLink:'https://github.com/Ali-Burhan/travelagencynext'
    },
    {
      id:2,
      title:'Personal App',
      category:'App Development',
      description:'Personal React Native App is a mobile application developed for practice, allowing developers to hone their skills in building cross-platform apps. This project covers essential aspects of React Native, including component design, state management, navigation, and integration with APIs, providing hands-on experience in mobile app development for both iOS and Android platforms.',
      imageurl:'/ali.jpg',
      githubLink:'https://github.com/Ali-Burhan/'
    },
    {
      id:3,
      title:'Publication Managment',
      category:'Web Development',
      description:'Publication Management System is a comprehensive platform designed to streamline the process of managing and organizing publications. This system enables users to efficiently handle submissions, peer reviews, editing workflows, and publication distribution. Built with a focus on ease of use and automation, it helps publishers, editors, and authors collaborate seamlessly, ensuring a smooth and efficient publication process from submission to final release.',
      imageurl:'/projectpublication.jpg',
      githubLink:'https://github.com/Ali-Burhan/Publications'
    },
    {
      id:4,
      title:'Accounting Solution',
      category:'Web Development',
      description:'Accounting Solution Web App is a robust and intuitive platform designed to simplify financial management for businesses of all sizes. This web application offers a range of features, including expense tracking, invoicing, financial reporting, and budget management, all within a user-friendly interface. Built with modern web technologies, it ensures secure data handling and provides real-time insights to help businesses make informed financial decisions and stay on top of their accounting needs.',
      imageurl:'/ali.jpg',
      githubLink:'https://github.com/Ali-Burhan/accounting-Solution'
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading,setLoading] = useState(false)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    if(e.target.value !== ""){
      setFilterProjects((pre)=>projects.filter((ele)=>ele.category.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    else{
      setFilterProjects(projects)
    }
  };


  async function fetchProjects(){
    setLoading(true)
    const res = await fetch('/api/project')
    const data = await res.json()
    setFetchedProjects(data.projects)
    setLoading(false)
  }

  useEffect(()=>{
    fetchProjects()
  },[])


  return (
    <div>
        {/* margin:auto;background:#ffffff;display:block;z-index:1;position:relative */}
        <div className="mb-10">
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
                <Cards link={ele.githubLink} imgurl={ele.imageurl} title={ele.title} tag={ele.category} desc={ele.description} key={index}/>
                )):filterProjects.map((ele,index)=>(
                  <Cards link={ele.githubLink} imgurl={ele.imageurl} title={ele.title} tag={ele.category} desc={ele.description} key={index}/>
                  ))
              }
              {fetchedProjects.length > 0 &&
                fetchedProjects.map((ele,ind)=><Cards key={ind} desc={ele.description} imgurl={ele.image} tag={ele.category} title={ele.title}/>)
              }
              
            </div>
              {loading? <div className="my-10 h-40 loaderproject w-full"></div>:null}
        </div>
        </div>
    </div>
  )
}

export default Page