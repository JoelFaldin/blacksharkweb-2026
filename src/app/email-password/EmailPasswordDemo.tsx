"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/useAuthStore";

type Mode = "signup" | "signin";

interface CustomJwtPayload extends JwtPayload {
  app_metadata: {
    role: string,
  }
}

export default function EmailPasswordDemo () {
    const router = useRouter();
    const [mode, setMode] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const supabase = getSupabaseBrowserClient();

    const saveUser = useAuthStore((s) => s.setUser)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const loading = toast.loading(mode === "signup" ? "Creando cuenta..." : "Iniciando sesión...");

        if(mode == "signup") {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if(error){
              toast.dismiss(loading);
              toast.error(error.message);
            } else {
              toast.dismiss(loading);
              toast.success("Revisa tu inbox para confirmar la nueva cuenta");
            }
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
              toast.dismiss(loading);
              toast.error(error.message);
            } else {
              const jwt = jwtDecode<CustomJwtPayload>(data.session.access_token);

              saveUser({
                email: data.user.email!,
                username: data.user.email?.split("@")[0],
                role: jwt.app_metadata.role || "user"
              })

              toast.dismiss(loading);
              toast.success("¡Bienvenido!");

              router.push("/");
              router.refresh();
            }
        }
    }


    return (
        <>
          <form
            className="relative mx-auto w-full bg-(--card) max-w-lg overflow-hidden rounded-[32px] border border-(--primary) px-10 py-12 text-slate-100"
            onSubmit={handleSubmit}
          >
            <div
              className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full blur-lg"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full blur-xl"
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--foreground)">
                  Credenciales
                </p>
                <h3 className="text-2xl font-semibold text-(--foreground)">
                  {mode === "signup" ? "Crea una cuenta" : "Bienvenido"}
                </h3>
              </div>

              <div className="mb-8 flex w-fit items-center rounded-full border border-(--border) bg-(--secondary) p-1">
                {(["signup", "signin"] as Mode[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={mode === option}
                    onClick={() => setMode(option)}
                    className={`rounded-full px-4 py-1.5 transition ${
                      mode === option
                        ? "bg-(--primary) text-(--secondary) shadow-md font-semibold"
                        : "text-(--foreground)"
                    }`}
                  >
                    {option === "signup" ? "Sign up" : "Sign in"}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="mt-10 space-y-6">
              <label className="block text-sm font-medium text-(--foreground)">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-3 w-full rounded-xl border border-(--border) bg-black px-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="you@email.com"
                />
              </label>

              <label className="block text-sm font-medium text-(--foreground)">
                Contraseña
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-3 w-full rounded-xl border border-(--border) bg-black px-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Al menos 6 caracteres"
                />
              </label>
            </div>

            {/* Botón */}
            <div className="mt-10">
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-(--primary) py-3.5 text-sm font-semibold text-(--foreground) shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-(--primary)/80 hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 text-(--background)">
                  {mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
                </span>
              </button>
            </div>
          </form>
        </>
    )
}