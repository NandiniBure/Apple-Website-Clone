import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo,smallHeroVideo } from "../utils"
import { useState } from "react"
import { useEffect } from "react"
const Hero = () => {

  const [videoScr,setvideoSrc]=useState(window.innerWidth <760 ? smallHeroVideo : heroVideo);


  const handleVideo=()=>{
    if(window.innerWidth<760){
      setvideoSrc(smallHeroVideo)
    }else{
      setvideoSrc(heroVideo)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize',handleVideo);

    return()=>{
      window.removeEventListener('resize',
        handleVideo
      )
    }
  },[])

  useGSAP(()=>{
   gsap.to('#hero',{
    opacity:1,
    delay:1.5
   })

    gsap.to("#cta", {
      y:-50,
      opacity:1,
      delay:2,
    });
  },[])

  return (
    <section
      className=" w-full nav-height bg-black
    relative"
    >
      <div
        className=" h-5/6 w-full flex-center 
      flex-col "
      >
        <p id="hero" className=" hero-title">
          iPhone 15 pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoScr}
          >
            <source type="video/mp4" src={videoScr} />
          </video>
        </div>
      </div>
      <div 
      id="cta"
      className="flex flex-col items-center
       opacity-0 translate-y-20">
        <a href="#highlights" className=" btn">
          Buy
        </a>
        <p className=" font-normal text-xl">From $199 month or $999</p>
       </div>
    </section>
  );
}

export default Hero