import Image from "next/image"
import Link from "next/link"

const Login = () => {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-[#10243c]/10 bg-[#ffffff] p-8 shadow-sm">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/bsw_logo_icon.webp"
            alt="Logo de la empresa"
            width={100}
            height={100}
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-medium text-[#10243c]">
          Bienvenido
        </h1>
        <p className="mt-1 text-center text-sm text-[#8f8f8f]">
          Ingrese sus credenciales para acceder a su cuenta
        </p>

        {/* Inputs */}
        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-[#10243c]/20 bg-[#ffffff]
                      px-4 py-3 text-sm text-[#10243c]
                      outline-none transition
                      placeholder:text-[#8f8f8f]
                      focus:border-[#0186ff] focus:ring-1 focus:ring-[#0186ff]/40"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-xl border border-[#10243c]/20 bg-[#ffffff]
                      px-4 py-3 text-sm text-[#10243c]
                      outline-none transition
                      placeholder:text-[#8f8f8f]
                      focus:border-[#0186ff] focus:ring-1 focus:ring-[#0186ff]/40"
          />
        </div>

        {/* Forgot */}
        <div className="mt-3 text-right">
          <button className="text-sm text-[#0186ff] hover:underline">
            ¿Has olvidado tu contraseña?
          </button>
        </div>

        {/* Button */}
        <button
          className="mt-6 w-full rounded-xl bg-[#0186ff] py-3 text-sm font-medium 
                    text-white transition
                    hover:bg-[#0186ff]/90 active:scale-[0.98]"
        >
          Iniciar sesión
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[#8f8f8f]">
          No tienes cuenta?{" "}
          <span className="text-[#0186ff] hover:underline cursor-pointer">
            <Link href="/registro">Regístrate</Link>
            
          </span>
        </p>

      </div>
    </div>
    </>
  )
}

export default Login