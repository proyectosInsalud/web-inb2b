export const AboutSection = () => {
  return (
    <div id="nosotros"  className="bg-in-blue-main text-white py-12 md:py-24">
        <section className="max-w-7xl mx-auto px-4 container space-y-16">
            <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-in-avantgarde font-bold text-center">Sobre nosotros</h2>
                <p className="text-base md:text-lg font-in-poppins max-w-6xl mx-auto text-center leading-[22px]">Somos una agencia consultora especializada en el desarrollo integral de proyectos en el sector salud. Ofrecemos soluciones innovadoras y estratégicas para la implementación, optimización y gestión de servicios de salud, adaptadas a las necesidades específicas de cada cliente.  Nuestro enfoque abarca desde la planificación hasta la ejecución, con el objetivo de mejorar la calidad, eficiencia y sostenibilidad de los proyectos en salud.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <article
                  style={{
                    background: "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                  }}
                  className="flex items-center py-4 rounded-xl box-shadow-lg lg:pl-8 justify-center lg:justify-start"
                >
                    <p className="text-3xl font-bold text-in-cyan font-in-lato text-center lg:text-left">+100  <span className="block text-base font-normal text-white font-in-poppins">Clientes</span></p>
                </article>
                <article    
                  style={{
                    background: "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                  }}
                  className="flex items-center py-4 rounded-xl box-shadow-lg lg:pl-8 justify-center lg:justify-start"
                >   
                    <p className="text-3xl font-bold text-in-cyan font-in-lato text-center lg:text-left">+6 <span className="block text-base font-normal text-white font-in-poppins">Años de experiencia</span></p>
                </article>
                <article 
                  style={{
                    background: "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                  }}
                  className="flex items-center py-4 rounded-xl box-shadow-lg lg:pl-8 justify-center lg:justify-start"
                >
                    <p className="text-3xl font-bold text-in-cyan font-in-lato text-center lg:text-left">+130 <span className="block text-base font-normal text-white font-in-poppins">Proyectos realizados
                    </span></p>
                </article>
                <article 
                  style={{
                    background: "linear-gradient(127deg, rgba(255, 255, 255, 0.40) 12.11%, rgba(255, 255, 255, 0.10) 73.08%)",
                  }}
                  className="flex items-center py-4 rounded-xl box-shadow-lg lg:pl-8 justify-center lg:justify-start"
                >
                    <p className="text-3xl font-bold text-in-cyan font-in-lato text-center lg:text-left">+23 <span className="block text-base font-normal text-white font-in-poppins">Regiones</span></p>
                </article>
            </div>
        </section>
    </div>
  )
}
