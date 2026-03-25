"use client";

import { isAuthApiError } from "@supabase/supabase-js";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { EmailIcon, EyeClose, EyeOpen, PasswordIcon } from "@/components/icons";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useSupabaseStore } from "@/lib/store/useSupabaseStore";
import { loginSchema } from "@/lib/validations/auth.schema";

type Mode = "signup" | "signin";

interface CustomJwtPayload extends JwtPayload {
  app_metadata: {
    role: string;
  };
}

export default function EmailPasswordDemo() {
  const router = useRouter();
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const saveUser = useAuthStore((s) => s.setUser);
  const supabase = useSupabaseStore((s) => s.supabase);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    const loading = toast.loading(mode === "signup" ? "Creando cuenta..." : "Iniciando sesión...");

    if (mode === "signup") {
      const { data: _signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!signInError) {
        toast.dismiss(loading);
        toast.error("Este correo ya está registrado. Intenta iniciar sesión.");
        setMode("signin");
        return;
      }

      const { data: _data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      toast.dismiss(loading);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Revisa tu inbox para confirmar la nueva cuenta");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.dismiss(loading);

        if (isAuthApiError(error)) {
          switch (error.status) {
            case 400:
              toast.error("Correo o contraseña incorrectos.");
              break;
            case 422:
              toast.error("El formato del correo es inválido.");
              break;
            case 429:
              toast.error("Demasiados intentos. Por favor, inténtalo de nuevo más tarde.");
              break;
            default:
              toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
          }
        }
        console.log(error);
      } else {
        const jwt = jwtDecode<CustomJwtPayload>(data.session.access_token);

        saveUser({
          email: data.user.email || "",
          username: data.user.email?.split("@")[0],
          role: jwt.app_metadata.role || "user",
        });

        toast.dismiss(loading);
        toast.success("¡Bienvenido!");

        router.push("/");
        router.refresh();
      }
    }
  }

  return (
    <form
      className="relative mx-auto w-full bg-card max-w-xl overflow-hidden rounded-4xl border border-primary px-10 py-12 text-slate-100"
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
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground">Credenciales</p>
          <h3 className="text-2xl font-semibold text-foreground">
            {mode === "signup" ? "Crea una cuenta" : "Bienvenido"}
          </h3>
        </div>

        <div className="mb-8 flex items-center rounded-full border border-border bg-secondary p-1 justify-between">
          {(["signup", "signin"] as Mode[]).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={`rounded-full px-4 py-1.5 transition cursor-pointer  ${
                mode === option
                  ? "bg-primary text-secondary shadow-md font-semibold"
                  : "text-foreground"
              }`}
            >
              {option === "signup" ? "Registrarse" : "Iniciar sesión"}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="mt-10 space-y-6">
        <label className="block text-sm font-medium text-foreground">
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
              className="w-full rounded-xl border border-border bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={mode === "signup" ? "tu@email.com" : "Ingresa tu email"}
            />
          </div>
        </label>

        <label className="block text-sm font-medium text-foreground">
          Contraseña
          <div className="relative mt-3">
            {/* Icono izquierdo */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
              <PasswordIcon className="h-5 w-5" />
            </div>

            {/* Input */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              title="Ingresa tu contraseña"
              required
              minLength={6}
              placeholder="Al menos 6 caracteres"
              className="w-full rounded-xl border border-border bg-black pl-12 pr-12 py-3 text-sm text-white placeholder:text-white/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {/* Icono derecho (toggle) */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOpen className="h-5 w-5" /> : <EyeClose className="h-5 w-5" />}
            </button>
          </div>
        </label>
      </div>

      {mode === "signin" && (
        <div className="text-right mt-8">
          <Link
            href="/recuperar-contrasena"
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            {"¿Olvidaste tu contraseña?"}
          </Link>
        </div>
      )}

      {/* Botón */}
      <div className="mt-8">
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-xl bg-primary py-3.5 text-sm font-semibold text-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/80 hover:brightness-110 active:scale-[0.98] cursor-pointer"
        >
          <span className="relative z-10 text-background">
            {mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
          </span>
        </button>
      </div>
    </form>
  );
}
