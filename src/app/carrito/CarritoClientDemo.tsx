"use client"

import Image from "next/image";

interface CarritoItem {
    id: number;
    usuario_id: string;
    servicio: {
    id: number;
    nombre: string;
    precio: string;
    descripcion_corta: string;
    imagen: {
      url: string;
    } | null;
    }
}


export default function Carrito({ items }: { items: CarritoItem[] }) {
    
    return (
        <>
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-2xl text-center font-bold tracking-tight text-white sm:text-3xl">
                🛒 Carrito de compras
                </h2>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ITEMS */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.length === 0 ? (
                        <p className="text-center text-slate-400">
                            Tu carrito está vacío
                        </p>
                        ) : (
                        items.map((item) => (
                            <div
                            key={item.id}
                            className="flex flex-col md:flex-row gap-6 rounded-2xl
                            bg-white/5 backdrop-blur-md
                            border border-blue-500/10
                            shadow-[0_0_30px_rgba(59,130,246,0.15)]
                            p-6 transition"
                            >
                            {/* Imagen */}
                            <div className="relative w-full md:w-48 h-40 rounded-xl overflow-hidden">
                                {item.servicio.imagen?.url && (
                                <Image
                                    src={item.servicio.imagen.url}
                                    alt={item.servicio.nombre}
                                    fill
                                    className="object-cover"
                                />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                <p className="text-lg font-semibold text-white">
                                    {item.servicio.nombre}
                                </p>
                                <p className="text-sm text-slate-400 mt-1">
                                    Servicio agregado al carrito
                                </p>
                                </div>

                                <button
                                className="mt-4 w-fit text-sm flex items-center gap-2
                                text-slate-400 hover:text-red-400 transition"
                                >
                                🗑️ Quitar del carrito
                                </button>
                            </div>

                            {/* Precio */}
                            <div className="flex items-center justify-end">
                                <p className="text-2xl font-bold text-blue-400">
                                ${item.servicio.precio}
                                </p>
                            </div>
                            </div>
                        ))
                        )}
                    </div>

                    {/* RESUMEN */}
                    <div
                        className="rounded-2xl bg-white/5 backdrop-blur-md
                        border border-blue-500/10
                        shadow-[0_0_30px_rgba(59,130,246,0.15)]
                        p-6 h-fit"
                    >
                        <p className="text-xl font-semibold text-white mb-6">
                        Resumen del pedido
                        </p>

                        <div className="space-y-4 text-slate-300">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">$100.000</span>
                        </div>

                        <div className="flex justify-between border-t border-white/10 pt-4">
                            <span className="text-lg font-semibold text-white">Total</span>
                            <span className="text-lg font-bold text-blue-400">$100.000</span>
                        </div>
                        </div>

                        <button
                        className="mt-8 w-full rounded-xl
                        bg-blue-600 hover:bg-blue-500
                        py-3 font-semibold text-white
                        transition shadow-lg shadow-blue-600/30"
                        >
                        Continuar con la compra →
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}