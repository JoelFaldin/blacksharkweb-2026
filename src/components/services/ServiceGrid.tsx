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
    disponible: boolean;
  }[];
}

const ServiceGrid = ({ servicios }: ServiceGridInterface) => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10 max-[945px]:grid-cols-1 max-[945px]:justify-items-center">
        {servicios.map((servicio, index) => (
          <div key={`service-${servicio.nombre}`} className="w-full max-[945px]:max-w-95">
            <ServiceTemplate {...servicio} index={index} />
          </div>
        ))}
        <div className="w-full max-[945px]:max-w-95">
          <AddService />
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
