import Image from "next/image";

const Servicios = () => {
  return (
    <>
    <div className="w-full px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        <div className="flex flex-col bg-white shadow-md w-96 rounded-xl">
          <div className="relative w-full">
            <Image
                src="/images/servicios/diseño.jpg"
                alt="Diseño Grafico"
                width={500}
                height={400}
                className="rounded-xl"
            />
          </div>
          <div className="p-4 flex flex-col gap-2 text-sm">
              <p className="text-slate-600">$ 29.00</p>
              <p className="text-slate-800 font-satoshi text-base font-medium my-1.5">Diseño Gráfico</p>
              <p className="text-slate-500">Looks amazing out of the box. I barely had to customize anything.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="bg-slate-100 text-slate-600 py-2 cursor-pointer">
                      Añadir al carrito
                  </button>
                  <button className="bg-slate-800 text-white py-2 cursor-pointer">
                      Comprar
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Servicios