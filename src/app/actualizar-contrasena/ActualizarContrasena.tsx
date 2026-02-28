"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { updatePasswordSchema } from "@/lib/validations/auth.schema";
import PasswordIcon from "@/components/icons/Password";

export default function ActualizarContrasena () {
    const supabase = getSupabaseBrowserClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const checkSession = async () => {
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
            toast.error("Enlace inválido o expirado");
            router.push("/email-password");
        } else {
            setLoading(false);
        }
        };

        checkSession();
    }, []);

    if (loading) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const validation = updatePasswordSchema.safeParse({
            password,
            confirmPassword,
        });

        if (!validation.success) {
            toast.error(validation.error.issues[0].message);
            return;
        }

        const loadingToast = toast.loading("Actualizando contraseña...");

        const { error } = await supabase.auth.updateUser({
            password,
        });

        toast.dismiss(loadingToast);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Contraseña actualizada correctamente");

            await supabase.auth.signOut();
            router.push("/email-password");
        }
    }

    return(
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto w-full bg-(--card) max-w-xl overflow-hidden rounded-[32px] border border-(--primary) px-10 py-12 text-slate-100"
    >
      <div className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full blur-lg" />
      <div className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full blur-xl" />

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-(--foreground)">
          Seguridad
        </p>
        <h3 className="text-2xl font-semibold text-(--foreground)">
          Actualizar contraseña
        </h3>
        <p className="text-sm text-(--foreground)/70">
          Ingresa tu nueva contraseña para continuar.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-10 space-y-6">
        {/* Nueva contraseña */}
        <label className="block text-sm font-medium text-(--foreground)">
          Nueva contraseña
          <div className="relative mt-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
              <PasswordIcon className="h-5 w-5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-(--border) bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
        </label>

        {/* Confirmar contraseña */}
        <label className="block text-sm font-medium text-(--foreground)">
          Confirmar contraseña
          <div className="relative mt-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
              <PasswordIcon className="h-5 w-5" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-(--border) bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Repite tu contraseña"
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
          <span className="relative z-10 text-(--background)">
            Actualizar contraseña
          </span>
        </button>
      </div>
    </form>
    );
};