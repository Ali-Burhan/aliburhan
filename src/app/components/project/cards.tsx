import Image from "next/image"

interface CardsProps {
  imgurl: string;
  title: string;
  desc: string;
  tag: string;
}

const Cards: React.FC<CardsProps> = ({ imgurl, title, desc, tag }) => {
  
  return (
    <div className="flex gap-3 flex-col w-[360px] my-3" data-aos="zoom-in">
        <Image src={imgurl} width={300} height={300} alt="Alt" className="w-full h-56 cursor-pointer imgset transition-all duration-200"/>
        <span className={`text-xs ${tag=="Web Development"? "bg-blue-200 text-blue-800": "bg-green-300 text-green-800"} w-fit font-semibold p-1`}>{tag}</span>
        <h1 className="text-2xl font-semibold tracking-tighter">{title}</h1>
        <p className="tracking-tight text-gray-700">{desc}</p>
        <p className="text-lg font-semibold tracking-tighter cursor-pointer flex gap-2 group hover:underline">Read More <svg width="30" height="30" className='group-hover:ml-2 transition-all' fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="m9 18 6-6-6-6"></path>
</svg> </p>
    </div>
  )
}

export default Cards