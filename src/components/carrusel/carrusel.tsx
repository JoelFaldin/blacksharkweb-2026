import Image from "next/image"

export default function Carrusel() {
    return (
        <>
        <div className="pt-14">
            <h1 className="text-3xl font-bold text-white text-center">
                Nuestros clientes
            </h1>

            <div className="relative flex justify-center py-6">
                {/* Contenedor con ancho limitado */}
                <div
                className="w-full max-w-4xl overflow-hidden
                [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]"
                >
                <ul className="brands-wrapper animate-scroll flex">
                    {Array.from({ length: 8 }).map((_, i) => (
                    <li
                        key={`a-${i}`}
                        className="flex items-center justify-center px-6"
                    >
                        <Image
                        src="/images/bsw_logo_icon.webp"
                        alt="Logo de la empresa"
                        width={80}
                        height={80}
                        className="opacity-80 hover:opacity-100 transition"
                        />
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
        </>
    )
}