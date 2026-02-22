"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useAuthStore } from "@/lib/store/useAuthStore";

type EmailPasswordDemoProps = {
    user: User | null;
};

type Mode = "signup" | "signin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EmailPasswordDemo ({ user }: EmailPasswordDemoProps) {
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
              saveUser({
                email: data.user.email!,
                username: data.user.email?.split("@")[0],
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
            className="relative mx-auto mt-16 w-full max-w-md overflow-hidden rounded-[32px] border border-blue-900 bg-gradient-to-br from-[#000000] via-[#10243c] to-[#0186ff] p-8 text-slate-100 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
            onSubmit={handleSubmit}
            >
            <div
              className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.25),_transparent)] blur-lg"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full bg-[linear-gradient(140deg,_rgba(45,212,191,0.32),_rgba(59,130,246,0.12))] blur-xl"
              aria-hidden="true"
            />
            <div className="absolute inset-x-8 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-300/80">
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white">
                  Credenciales
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {mode === "signup" ? "Crea una cuenta" : "Bienvenido"}
                </h3>
              </div>
              <div className="flex rounded-full border border-white/10 bg-white/[0.07] p-1 text-xs font-semibold text-slate-300">
                {(["signup", "signin"] as Mode[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={mode === option}
                    onClick={() => setMode(option)}
                    className={`rounded-full px-4 py-1 transition ${mode === option
                      ? "bg-[#001b33] text-white shadow shadow-black"
                      : "text-slate-400"
                      }`}
                  >
                    {option === "signup" ? "Sign up" : "Sign in"}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-200">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#001b33] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                  placeholder="you@email.com"
                />
              </label>
              <label className="block text-sm font-medium text-slate-200">
                Contraseña
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#001b33] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                  placeholder="Al menos 6 caracteres"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2477BF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-emerald-900/40 cursor-pointer"
            >
              {mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>
        </>
    )
}