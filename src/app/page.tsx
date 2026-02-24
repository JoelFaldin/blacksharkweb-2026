import Brands from "@/components/home/Brands";
import ContactForm from "@/components/home/ContactForm";
import Home from "@/components/home/Home";
import ServiceSlider from "@/components/home/ServiceSlider";

export default function App() {
  return (
    <>
      <Home />
      <ServiceSlider />
      <Brands />
      <ContactForm />
    </>
  )
}