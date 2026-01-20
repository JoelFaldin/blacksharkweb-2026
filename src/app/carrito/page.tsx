import Image from "next/image";

export default function Carrito() {
    return (
        <>
        <section className="py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Carrito de compras
                </h2>

                <div className="mt-6 md:flex md:gap-6 lg:items-start xl:gap-8">
                    <div className="mx-auto w-full lg:max-w-2xl">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                <Image
                                 src="/images/jugador1.jpg"
                                alt="Logo de la empresa"
                                width={200}
                                height={200}
                                />
                                <div className="flex-1 space-y-2">
                                <p className="text-base font-medium text-gray-900 dark:text-white">
                                    Fotografía Profesional
                                </p>

                                <div className="flex items-center gap-4">
                                    <button className="text-sm text-red-600 hover:underline">
                                    Remove
                                    </button>
                                </div>
                                </div>

                                <div className="flex items-center gap-4">

                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                    $1,499
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-6 w-full max-w-md lg:mt-0">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            Order summary
                        </p>

                        <dl className="flex justify-between">
                            <dt className="text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="font-medium text-gray-900 dark:text-white">$1,499</dd>
                        </dl>

                        <dl className="flex justify-between border-t pt-2">
                            <dt className="font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="font-bold text-gray-900 dark:text-white">$1,499</dd>
                        </dl>

                        <button className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
                            Proceed to Checkout
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}