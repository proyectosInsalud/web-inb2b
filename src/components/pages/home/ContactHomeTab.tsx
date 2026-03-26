// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormContactHome } from "./FormContactHome"

export const ContactHomeTab = () => {
  return (
    <div className="bg-in-blue-main -mt-24 relative z-20">
        <section 
          data-aos="fade-up" 
          data-aos-duration="800" 
          className="max-w-7xl mx-auto px-4 container pb-12 md:py-24"
          suppressHydrationWarning
        >
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-16">
                <div className="space-y-4 md:col-span-5">
                    <h2 className="font-in-poppins text-white">Contacto</h2>
                    <p className="text-white text-2xl md:text-4xl font-in-avantgarde font-bold tracking-wide">¿Tienes un proyecto en salud o quieres escalar tu clínica?</p>
                    <p className="text-white font-in-poppins">Déjanos tus datos y un miembro de nuestro equipo se pondrá en contacto contigo para conocer tu proyecto y brindarte una asesoría personalizada. </p>
                </div>
                <div 
                    // style={{
                    // background: "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                    // borderRadius: "20px",
                    // backdropFilter: "blur(14.371501922607422px)",
                    // boxShadow: "box-shadow: 0px 2.874px 17.246px -0.719px rgba(0, 0, 0, 0.20)",
                    // }}
                    className="rounded-[20px] md:col-start-6 lg:col-start-7 md:col-end-13 bg-gradient-to-tr from-white/40 via-white/25 to-white/10 shadow-[0px_2.87px_17.25px_-0.72px_rgba(0,0,0,0.20)] backdrop-blur-[14.37px] p-8"
                >
                    <FormContactHome />
                    {/* <Tabs defaultValue="contact">
                        <TabsList className="w-full bg-in-blue-main p-2 h-auto font-in-poppins">
                            <TabsTrigger className="data-[state=active]:bg-white/40 data-[state=active]:text-white py-2 text-white cursor-pointer" value="contact">Contacto</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:bg-white/40  py-2 text-white data-[state=active]:text-white cursor-pointer" value="reunion">Reunión</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contact">
                            <FormContactHome />
                        </TabsContent>
                        <TabsContent value="reunion">LOL</TabsContent>
                    </Tabs> */}
                </div>
            </div>
        </section>
    </div>
  )
}
