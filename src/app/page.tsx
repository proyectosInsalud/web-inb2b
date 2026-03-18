import { HeroOverlay } from "@/components/pages/home/HeroOverlay";
import { AboutSection } from "@/components/pages/home/AboutSection";
import { ScheduleServices } from "@/components/pages/home/ScheduleServices";
import { ClubBenefits } from "@/components/pages/home/ClubBenefits";
import { OurClients } from "@/components/pages/home/OurClients";
import { AcademicAlliances } from "@/components/pages/home/AcademicAlliances";
import { Community } from "@/components/pages/home/Community";
import { ContactHomeTab } from "@/components/pages/home/ContactHomeTab";
//import { PopUp } from "@/components/ui/PopUp";
  
export default function Home() {
  return (
    <>
      <header>
        <HeroOverlay />
      </header>

      <main>
        <AboutSection />
        <ScheduleServices />
        <ClubBenefits />
        <OurClients />
        <AcademicAlliances />
        <div 
            className=" bg-in-blue-main bg-gradient-to-b from-transparent via-[#00BEB4]/30 to-[#00BEB4]/30 pb-44 md:pb-56"
        >
          <div data-aos="fade-up" data-aos-duration="1000" className="flex justify-center flex-col items-center">
            <p className="font-in-poppins md:py-16 text-center md:text-left pb-12 md:pb-6 px-4 md:px-0 text-white text-lg">Formarse con visión global es clave para transformar la salud local.</p>
            <div className="hidden md:block w-0.5 h-16 md:h-28 bg-in-cyan relative">
                <div className="w-2 h-2 bg-in-cyan rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        <Community />
        <ContactHomeTab />
      </main>
      {/* <PopUp /> */}
    </>
  );
}
