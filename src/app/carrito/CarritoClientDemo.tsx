"use client";

import Image from "next/image";
import { toast } from "sonner";

import { useCartStore } from "@/lib/store/useCartStore";
import priceFormat from "@/lib/utils/priceFormat";

type CartItem = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
};

export default function Carrito() {
  const items: CartItem[] = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeItem);

  const computedPrice: number = items.reduce((acc: number, item: CartItem) => {
    return acc + item.precio * item.cantidad;
  }, 0);

  const handleRemoveFromCart = async (carritoId: number) => {
    const confirm = window.confirm("¿Estás seguro que quieres eliminar este servicio del carrito?");

    if (confirm) {
      const loading = toast.loading("Eliminando servicio...");

      remove(carritoId);
      toast.dismiss(loading);
      toast.success("Se ha quitado el servicio del carrito!");
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-2xl text-center font-bold tracking-tight text-white sm:text-3xl">
          🛒 Carrito de compras
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {items.length === 0 ? (
              <p className="text-center text-slate-500">Tu carrito está vacío</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-6 rounded-2xl
                            bg-white/5 backdrop-blur-md
                            p-6 transition"
                >
                  {/* Imagen */}
                  <div className="relative w-full md:w-48 h-40 rounded-xl overflow-hidden">
                    {item.img_url && (
                      <Image src={item.img_url} alt={item.nombre} fill className="object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.nombre}</p>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                      <p className="text-2xl font-bold text-[#c09028] pt-4">
                        {priceFormat(item.precio)}
                      </p>
                      <p className="text-md pt-2">Cantidad: {item.cantidad}</p>
                    </div>

                    <button
                      type="button"
                      className="mt-4 w-fit text-sm gap-2 cursor-pointer
																text-slate-400 hover:text-red-400 transition flex items-center justify-end underline"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RESUMEN */}
          <div
            className="rounded-2xl bg-white/5 backdrop-blur-md
                        p-6 h-fit"
          >
            <p className="text-xl font-semibold text-white mb-6">Resumen del pedido</p>

            <div className="space-y-4 text-slate-300">
              {items.map((item) => (
                <section key={`item-cart-${item.id}`} className="flex flex-row justify-between">
                  <span className="flex flex-col gap-2">
                    <p>{item.nombre}</p>
                    <p>Cantidad</p>
                  </span>
                  <span>
                    <p>{priceFormat(item.precio)}</p>
                    <p className="text-end">{item.cantidad}</p>
                  </span>
                </section>
              ))}
              <div></div>

              <div className="flex justify-between border-t border-white/10 pt-4">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-lg font-bold text-blue-400">
                  {priceFormat(computedPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-xl
                            bg-[#c09028] hover:bg-yellow-600
                            py-3 font-semibold text-white
                            transition cursor-pointer"
            >
              Continuar con la compra →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
