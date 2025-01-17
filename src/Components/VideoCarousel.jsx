import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
const VideoCarousel = () => {

   const videoref=useRef([]);
    const videospanref = useRef([]);
     const videoDivref= useRef([]);

     const [video,setvideo]=useState({
        isEnd:false,
        startplay:false,
        videoId:0,
        isLastvideo:false,
        isplaying: false
     })

   const [loadedData,setLoadedData]=useState([])
     const {isEnd,isLastvideo,startplay,videoId,isplaying}=video;
     useGSAP(()=>{

         gsap.to("#slider", {
           transform: `translateX(${-100 * videoId}%)`,
           duration: 2,
           ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
         });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setvideo((pre) => ({
          ...pre,
          startplay: true,
          isplaying: true,
        }));
      },
    });

    
     },[isEnd,videoId])

     const handleprocess=(type,i)=>{
    switch (type) {
      case "video-end":
        setvideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setvideo((pre) => ({ ...pre, isLastvideo: true }));
        break;

      case "video-reset":
        setvideo((pre) => ({ ...pre, isLastvideo: false, videoId: 0 }));
        break;

      case "pause":
        setvideo((pre) => ({ ...pre, isPlaying: !pre.isplaying }));
        break;

      case "play":
        setvideo((pre) => ({ ...pre, isplaying: !pre.isplaying }));
        break;

      default:
        return video;
    }
     }


     const handleLoddedMetadata=(i,e)=>{
            setLoadedData((pre)=>[...pre,e])
     }

     useEffect(()=>{
         if(loadedData.length>3){
            if(!isplaying){
                videoref.current[videoId].pause();
            }else{
                startplay && videoref.current[videoId].play();
            }
         }
     },[startplay,videoId,loadedData,isplaying])

     useEffect(()=>{
         let currentProgress=0;
         let  span=videospanref.current;
         if(span[videoId]){
            let anim=gsap.to(span[videoId],{
               onUpdate: ()=>{
                 const progress = Math.ceil(anim.progress()*100);
                  if(progress!=currentProgress){
                    currentProgress=progress;

                    gsap.to(videoDivref.current[videoId],{
                        width: window.innerWidth <760 ? '10vw'
                        : window.innerWidth < 1200 ? '10vw' : '4vw'
                    })

                    gsap.to(span[videoId],{
                        width:`${currentProgress}%`,
                        backgroundColor:'white'
                    })
                  }
               },

               onComplete : ()=>{
                if(isplaying){
                    gsap.to(videoDivref.current[videoId],{
                        width:'12px'
                    })

                    gsap.to(span[videoId], {
                       backgroundColor:'#afafaf'
                    });
                }
               }

            }) 
            
            if(videoId===0){
                anim.restart();
            }

            const animupdate = () => {
              anim.progress(
                videoref.current[videoId]?.currentTime /
                  hightlightsSlides[videoId]?.videoDuration
              );
            };

            if (isplaying) {
              gsap.ticker.add(animupdate);
            } else {
              gsap.ticker.remove(animupdate);
            }
            
        }
     },[video,startplay])

  return (
    <>
      <div className=" flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div id="slider" key={i} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div
                className="w-full h-full flex-center rounded-3xl
                    overflow-hidden bg-black"
              >
                <video
                  playsInline={true}
                  className={`${list.id===2 && 'translate-x-44'}
                  pointer-events-none`}
                  id="video"
                  preload="auto"
                  ref={(el) => (videoref.current[i] = el)}
                  onEnded={()=>
                    i!==3 ?
                    handleprocess('video-end',i) : 
                    handleprocess('video-last')
                  
                  }
                  onPlay={() => {
                    setvideo((prevVideo) => ({
                      ...prevVideo,
                      isplaying: true,
                    }));
                  }}
                  muted
                  onLoadedMetadata={(e) => handleLoddedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4"></source>
                </video>
              </div>
              <div className=" absolute top-20 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center pt-10">
        <div className=" flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoref.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivref.current[i] = el)}
              className=" mx-2 w-3 h-3 bg-gray-200 
                rounded-full relative cursor-pointer"
            >
              <span
                className=" absolute h-full w-full 
                rounded-full"
                ref={(el) => (videospanref.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            onClick={
              isLastvideo
                ? () => handleprocess("video-reset")
                : !isplaying
                ? () => handleprocess("play")
                : () => handleprocess("pause")
            }
            alt={isLastvideo ? "replay" : !isplaying ? "play" : "replay"}
            src={isLastvideo ? replayImg : !isplaying ? playImg : pauseImg}
          ></img>
        </button>
      </div>
    </>
  );
}

export default VideoCarousel