import Hero from "../components/home/Hero";
import QuickActions from "../components/home/QuickActions";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Departments from "../components/home/Departments";
import Doctors from "../components/home/Doctors";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Facilities from "../components/home/Facilities";
import PatientInfo from "../components/home/PatientInfo";
import AppointmentCTA from "../components/home/AppointmentCTA";
import News from "../components/home/News";
import Contact from "../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <About />
      <Services />
      <Departments />
      <Doctors />
      <WhyChooseUs />
      <Facilities />
      <PatientInfo />
      <AppointmentCTA />
      <News />
      <Contact />
    </>
  );
}
