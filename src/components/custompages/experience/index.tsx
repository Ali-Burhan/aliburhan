'use client'
import React from 'react';
import { useEffect } from "react"
import AOS from 'aos'
import "aos/dist/aos.css"
const ExperienceCustomPage = () => {
 useEffect(()=>{
  AOS.init()
  },[])
  return (
    <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] py-16 px-8 lg:px-28 md:px-14 sm:px-8">
    {/* Header Section */}
    <div data-aos="fade-up" className="text-center mb-16">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Professional Experience
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Discover the journey and accomplishments of Ali Burhan as a Full-Stack Developer and AI Engineer.
      </p>
    </div>
  
    {/* Experience Section */}
    <div data-aos="fade-up" className="mb-16">
      <h2 className="text-4xl font-bold text-[#1a202c] mb-4">Hashlogics</h2>
      <h3 className="text-xl font-medium text-[#4a5568] mb-6">
        MERN Stack Developer | October 2024 - Present
      </h3>
      <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-lg shadow-xl border-l-4 border-blue-500">
        <ul className="space-y-6 text-gray-700">
          <li>
            <strong className="font-semibold">Project Lumaya:</strong> Developed responsive and feature-rich frontend
            applications using Next.js, with a focus on performance and accessibility.
          </li>
          <li>
            <strong className="font-semibold">Backend Development:</strong> Designed and implemented a robust backend
            using FastAPI, enabling efficient data handling and secure API integrations.
          </li>
          <li>
            <strong className="font-semibold">Full-Stack Development:</strong> Delivered a complete and scalable
            solution as a single-handed developer, showcasing expertise in both frontend and backend technologies.
          </li>
          <li>
            <strong className="font-semibold">Version Control:</strong> Managed the project lifecycle using Git and
            GitLab for version control and collaboration.
          </li>
        </ul>
      </div>
    </div>
  
    {/* Additional Experience */}
    <div data-aos="fade-up" className="mb-16">
      <h2 className="text-4xl font-bold text-[#1a202c] mb-4">Techling</h2>
      <h3 className="text-xl font-medium text-[#4a5568] mb-6">
        Junior Web Developer | May 2024 - October 2024
      </h3>
      <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-lg shadow-xl border-l-4 border-green-500">
        <ul className="space-y-6 text-gray-700">
          <li>
            <strong className="font-semibold">Project CazVid:</strong> Developed frontend applications focusing on creating responsive and high-performance web experiences using Next.js, with an emphasis on user experience and interface design.
          </li>
          <li>
            <strong className="font-semibold">Full-Stack Development:</strong> Engaged in full-stack development projects, applying both frontend and backend skills to create comprehensive and scalable solutions.
          </li>
          <li>
            <strong className="font-semibold">Version Control and Collaboration:</strong> Utilized Git for version control and collaborated with the team through GitHub and GitLab, ensuring smooth code management and team synchronization.
          </li>
        </ul>
      </div>
    </div>
  
    {/* Education Section */}
    <div data-aos="fade-up" className="mb-16">
      <h2 className="text-4xl font-bold text-[#1a202c] mb-6">Education</h2>
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-indigo-500">
          <h3 className="text-xl text-[#4a5568] mb-2">
            Bachelor’s in Computer Science, NFC Institute of Engineering & Fertilizer Research
          </h3>
          <p className="text-gray-700">CGPA: 3.0/4.0 (September 2020 - November 2024)</p>
          <p className="text-gray-700">Sheikhupura, Pakistan</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-purple-500">
          <h3 className="text-xl text-[#4a5568] mb-2">FSc in Pre-Engineering, Aspire Group of Colleges</h3>
          <p className="text-gray-700">Sheikhupura, Pakistan (July 2018 - February 2020)</p>
        </div>
      </div>
    </div>
  
    {/* Skills Section */}
    <div data-aos="fade-up" className="mb-16">
      <h2 className="text-4xl font-bold text-[#1a202c] mb-6">Skills Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-400">
          <h3 className="text-xl font-semibold text-[#2d3748] mb-4">Languages</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Typescript</li>
            <li>Javascript</li>
            <li>Python</li>
            <li>SQL</li>
            <li>Git</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-400">
          <h3 className="text-xl font-semibold text-[#2d3748] mb-4">Frameworks (Web)</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>React.js</li>
            <li>Next.js</li>
            <li>Flask</li>
            <li>FastAPI</li>
            <li>Tailwind CSS</li>
            <li>Material UI</li>
            <li>Antd</li>
            <li>Express.js</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-400">
          <h3 className="text-xl font-semibold text-[#2d3748] mb-4">Frameworks (AI)</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>SKLearn</li>
            <li>Pytorch</li>
            <li>LangChain</li>
            <li>LangGraph</li>
            <li>Phi Data</li>
            <li>Crew AI</li>
            <li>Hugging Face</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-400">
          <h3 className="text-xl font-semibold text-[#2d3748] mb-4">Tools</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Git, GitHub, GitLab</li>
            <li>VS Code, Cursor, LazyGit</li>
            <li>Postman, AWS</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-400">
          <h3 className="text-xl font-semibold text-[#2d3748] mb-4">Platforms</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>SQL Server, PostgreSQL, MongoDB Compass</li>
            <li>MS Office</li>
          </ul>
        </div>
      </div>
    </div>
  
    {/* Projects Section */}
    <div data-aos="fade-up" className="mb-16">
      <h2 className="text-4xl font-bold text-[#1a202c] mb-6">Projects</h2>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-pink-500">
          <h3 className="text-2xl font-semibold text-[#2d3748] mb-4">CazVid</h3>
          <p className="text-gray-700">
            Worked as a Junior Web Developer at Techling, focusing on building responsive and high-performance web
            applications using Next.js. Contributed to both frontend and full-stack development.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-blue-600">
          <h3 className="text-2xl font-semibold text-[#2d3748] mb-4">TAHMS (Tourism & Hospitality Management System)</h3>
          <p className="text-gray-700">
            Developed and contributed to a complete solution for the Tourism and Hospitality Management System,
            showcasing expertise in web development and systems integration.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-purple-600">
          <h3 className="text-2xl font-semibold text-[#2d3748] mb-4">Lumaya</h3>
          <p className="text-gray-700">
            Built the frontend and backend for Lumaya, a project that demonstrates full-stack development,
            performance optimization, and secure API integrations.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-green-600">
          <h3 className="text-2xl font-semibold text-[#2d3748] mb-4">FileCrawl</h3>
          <p className="text-gray-700">
            Created an AI-driven file processing tool, leveraging technologies like LangChain and Hugging Face for
            seamless AI workflows.
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ExperienceCustomPage;
