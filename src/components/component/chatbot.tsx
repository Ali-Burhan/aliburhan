'use client'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React, { useState } from "react"
import { TypeAnimation } from "react-type-animation"

export function Chatbot() {
  const [messages,setMessages] = useState('')
  const [userMessage,setUserMessage] = useState('')
  const [model,setModel] = useState('')
  const [loading,setLoadiung] = useState(false)
  const [error,setError] = useState(false)
  const [flag,setFlag] = useState(true)
  
  //Message to Bot function
    async function messageToBot(e:any) {
    e.preventDefault()
    setFlag(false)
    setLoadiung(true)
    if(!messages){
      alert("Enter a message please")
      setLoadiung(false)
      setError(false)
    }else{
      setUserMessage('')
      setModel('')
      const res = await fetch('/api/chat',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          messages
        })
      })
      const data = await res.text()
      if(data)
      {
        setError(false)
        setModel(data.replaceAll("\"","").replaceAll("**"," ").replaceAll('\n'," ").replaceAll('\n\n'," ").replaceAll('*'," ").replaceAll('\n*'," "))
        setLoadiung(false)
        setUserMessage(messages)
        setMessages('')
      }
      else{
        setError(true)
      }
    }
  }

  return (
    <div className="flex flex-col h-[90vh] w-full border border-gray-200 rounded-lg dark:border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="40"
              src={"/ali.jpg"}
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
          </Avatar>
          <div className="space-y-1.5">
            <h3 className="text-lg font-medium leading-none">Support Bot</h3>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="cursor-not-allowed">
          Need help?
        </Button>
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="grid grid-cols-1 gap-2 flex-1">
            {
            flag &&
          <div className="place-self-center flex justify-center flex-col items-center gap-2">
              <Image src={'/chatbot.png'} height={80} width={80} alt="alt image" className="rounded-full"/>
            <h1 className="text-xl font-extrabold font-mono tracking-tight">How can I help you today?</h1>
            <h1 className="text-xl font-bold font-mono tracking-tight">Ask Me Anything</h1>
          </div>
            }
          {
            model  && userMessage &&
            <>
          <div className="flex flex-col items-start space-y-1">
            <div className="rounded-lg bg-blue-500 p-4 text-sm text-white dark:bg-blue-500">
              {userMessage &&  <TypeAnimation
                            className="text-sm"
                            sequence={[
                              // Same substring at the start will only be typed out once, initially
                              userMessage,
                              1500,
                            ]}
                            wrapper="p"
                            speed={50}
                            style={{ display: 'inline-block' }}
                            repeat={Infinity}
                             />}
                             
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="rounded-lg bg-blue-900 p-4 text-white text-sm dark:bg-blue-800">
              {model &&    <TypeAnimation
                            className="text-sm"
                            sequence={[
                              // Same substring at the start will only be typed out once, initially
                       model,
                              100,
                            ]}
                            wrapper="p"
                            speed={50}
                            style={{ display: 'inline-block' }}
                            repeat={Infinity}
                             />}
                             {error && <TypeAnimation
                            className="text-sm"
                            sequence={[
                              // Same substring at the start will only be typed out once, initially
                              'There is an error connecting to model',
                              100,
                            ]}
                            wrapper="p"
                            speed={50}
                            style={{ display: 'inline-block' }}
                            repeat={Infinity}
                             />}
            </div>
          </div>
          </>
}
        </div>
        <div className="flex items-center space-x-2">
          <Input className="flex-1 min-h-[50px]  shadow" value={messages} placeholder="Type a message..." onChange={(e)=>setMessages(e.target.value)} />
          {
            loading?
            <Button className="bg-blue-200 shadow" onClick={messageToBot}>Sending...</Button>:
            <Button className="bg-blue-700 shadow" onClick={messageToBot}>Send</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Chatbot