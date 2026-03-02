import AddService from "./AddService";
import ServiceTemplate from "./ServiceTemplate";

interface ServiceGridInterface {
  servicios: {
    id: number;
    precio: string;
    descripcion_corta: string;
    imagen: {
      url: string;
    } | null;
    nombre: string;
  }[]
}

const ServiceGrid = ({ servicios }: ServiceGridInterface) => {
  return (
    <section className="bg-(--background) py-20 md:py-28">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10">
        {servicios.map((servicio, index) => (
          <ServiceTemplate key={`service-${servicio.nombre}`} {...servicio} index={index} />
        ))}

        <AddService />
      </div>
    </section>
  )
}

export default ServiceGrid