"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { EmailIcon } from "@/components/icons";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RecuperarContrasenaLogic() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    const supabase = await getSupabaseBrowserClient();
    e.preventDefault();

    const loading = toast.loading("Enviando enlace...");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-contrasena`,
    });

    toast.dismiss(loading);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Revisa tu correo para recuperar tu contraseña");
    }
  }

  return (
    <form
      className="relative mx-auto w-full bg-(--card) max-w-xl overflow-hidden rounded-4xl border border-(--primary) px-10 py-12 text-slate-100"
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
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-(--foreground)">Recuperación</p>
        <h3 className="text-2xl font-semibold text-(--foreground)">Recuperar contraseña</h3>
        <p className="text-sm text-white/60 leading-relaxed max-w-md">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      {/* Input */}
      <div className="mt-10 space-y-6">
        <label className="block text-sm font-medium text-(--foreground)">
          Email
          <div className="relative mt-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
              <EmailIcon className="h-5 w-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              title="Ejemplo: usuario@correo.com"
              required
              className="w-full rounded-xl border border-(--border) bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="you@email.com"
            />
          </div>
        </label>
      </div>

      {/* Botón */}
      <div className="mt-10">
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-xl bg-(--primary) py-3.5 text-sm font-semibold text-(--foreground) shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-(--primary)/80 hover:brightness-110 active:scale-[0.98] cursor-pointer"
        >
          <span className="relative z-10 text-(--background)">Enviar enlace</span>
        </button>
      </div>

      {/* Volver */}
      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-sm text-(--primary) hover:text-(--primary)/80 transition-colors"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </form>
  );
}
