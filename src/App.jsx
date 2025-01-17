import Features from "./Components/Features";
import Hero from "./Components/Hero"
import Highlights from "./Components/Highlights"
import HowItWorks from "./Components/HowItWorks";
import  {Model}  from "./Components/Model"
import Navbar from "./Components/Navbar"
import * as Sentry from "@sentry/react";
import PNGAnimation from "./Components/PNGAnimation";
import Footer from "./Components/Footer";

function App() {
  
  return (
   <main className="bg-black  ">
  <Navbar></Navbar>
  <Hero></Hero>
  <Highlights></Highlights>
  <Features></Features>
  <HowItWorks></HowItWorks>
  {/* <PNGAnimation></PNGAnimation> */}
  <Footer></Footer>
   </main>
  )
}

export default App;
