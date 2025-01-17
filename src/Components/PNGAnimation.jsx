import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const PNGAnimation = () => {
 const canvasRef = useRef(null); 


    const images=[];
    let imagesLoaded=0;
    const frames={
       currentIndex:0,
       maxIndex:382 
    }

   
    function preloadImage(){
       
        for(var i=1;i<=frames.maxIndex;i++){
            const imageUrl=`./Images/frame_${i.toString().padStart(4,"0")}.jpeg`
            const img=new Image();
            img.src=imageUrl;
            console.log(img);
                imagesLoaded++;
                if(imagesLoaded===frames.maxIndex){
                    loadImage(frames.currentIndex)
                    startAnimation();
                }
             images.push(img);
        }
    }


    function loadImage(index){
      if(index>=0 && index<=frames.maxIndex ){
        const canvas = canvasRef.current;
        const context=canvas.getContext("2d")
         const img=images[index];
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        
        const scaleX=canvas.width/img.width;
        const scaleY=canvas.height/img.height;
        const scale=Math.max(scaleX,scaleY);
        
        const newWidth=img.width*scale;
        const newHeight=img.height*scale;
    

        const offsetX=(canvas.width-newWidth)/2;
        const offsetY=(canvas.height-newHeight)/2;


        context.clearRect(0,0,canvas.width,canvas.height);
        context.imageSmoothingEnabled=true;
        context.imageSmoothingQuality="high";
        context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
        frames.currentIndex=index;   
    }
    }

    function startAnimation(){
        var tl=gsap.timeline({
         scrollTrigger:{
            trigger:".parent ",
            start:"top top",
            scrub:2,
         }
        })
        tl.to(frames,{
            currentIndex:frames.maxIndex,
            onUpdate:function(){
                loadImage(Math.floor(frames.currentIndex))
            }
        })
    }

    useEffect(()=>{
      preloadImage();
    },[])

  return (
    <div className='parent relative top-0 left-0 w-full h-[700vh]'>
          <div className=' w-full sticky top-0 left-0 h-screen'>
           <canvas className='w-full h-screen'  ref={canvasRef}   />
          </div> 
    </div>
  )
}

export default PNGAnimation