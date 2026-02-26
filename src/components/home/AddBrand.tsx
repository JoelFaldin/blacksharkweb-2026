"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/store/useAuthStore";
import Modal from "../Modal";
import Plus from "../icons/Plus";
import ImageIcon from "../icons/ImageIcon";
import Button from "../Button";
import Upload from "../icons/Upload";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { handleAddBrand } from "@/app/actions/brands";

const AddBrand = () => {
  const user = useAuthStore(u => u.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [brandName, setBrandName] = useState("");

  if (user?.role !== 'admin') return;

  const handleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Desactivar el scroll cuando se abre el modal:
      document.body.classList.add('overflow-hidden');
    } else {
      setIsOpen(false);
      setPreview(null);
      setBrandName("");

      setIsOpen(false);
      // Reactivar el scroll cuando se cierra el modal:
      document.body.classList.remove('overflow-hidden');
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    setFilePath(`marcas/${file.name}`);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  const supabase = getSupabaseBrowserClient();

  const handleSubmit = async () => {
    if (!filePath) return;

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const loading = toast.loading("Subiendo imagen a Supabase...");
    const { data, error } =  await supabase.storage.from('images').upload(filePath, file);
    
    if (error) {
      toast.dismiss(loading);
      toast.error("Ocurrió un error al intentar subir la imagen a Supabase.");
      console.log(error);

      return;
    } else {
      toast.dismiss(loading);

      const loadingAddBrand = toast.loading("Guardando el resto de datos de la marca...");
      await handleAddBrand(data.path, brandName);
      toast.dismiss(loadingAddBrand);
      toast.success("Se han guardado con éxito los datos de la marca!");

      handleModal();
    }
  }

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={handleModal} className="w-2xl">
        <section className="relative w-full border border-(--primary)/50 bg-(--card) shadow-2xl">
          <div className="flex flex-col px-6 py-5 border-b border-(--border)">
            <p className="text-sm font-medium text-(--primary) uppercase tracking-[0.2em]">Nueva Marca</p>
            <h1 className="text-xl font-bold text-(--foreground)">Añadir una nueva marca</h1>
          </div>
          <div className="px-6 py-5 h-fit">
            <label className="text-sm text-(--muted-foreground) uppercase tracking-[0.em]">Logo de la Marca</label>
            <div className={`relative flex flex-col items-center justify-center rounded transition-colors ${
              isDragging
                ? "border-(--primary) bg-(--primary)/5"
                : "border-(--border) hover:border-(--muted-foreground)/40"
              } ${preview ? "py-4" : "py-10 border-2 border-dashed"}`}
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative flex flex-col items-center gap-3">
                  <div className="relative h-60 w-60 overflow-hidden border border-(--border)">
                    <Image
                      src={preview}
                      alt="Preview del logo de la marca"
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreview(null)}
                      className="text-xs text-(--muted-foreground) underline underline-offset-2 transition-colors hover:text-(--primary)"
                    >
                      Quitar Imagen
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-(--border) text-(--muted-foreground)">
                    <ImageIcon />
                  </div>
                  <p className="mb-1 text-sm text-(--foreground)">
                    Arrastra tu logo aquí
                  </p>
                  <p className="mb-3 text-xs text-(--muted-foreground)">
                    PNG, JPG o SVG 
                  </p>
                  <Button
                    type="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex p-2 gap-2 border-(--border) bg-transparent text-(--foreground) hover:border-(--primary) hover:text-(--primary) cursor-pointer"
                  >
                    <Upload />
                    <span>Buscar Archivos</span>
                  </Button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>
          </div>
          <div className="px-6 py-5 h-fit">
            <label htmlFor="brand-name" className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-(--muted-foreground)">
              Nombre de la Marca
            </label>
            <input
              id="brand-name"
              type="text"
              placeholder="Marca Inc. Corp."
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="w-full border border-(--border) bg-(--background) px-4 py-3 text-sm text-(--foreground) placeholder:text-(--muted-foreground)/50 transition-colors focus:border-(--primary) focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-3 px-6 py-5">
            <Button type="secondary" className="p-6 cursor-pointer" onClick={handleModal}>
              <span className="font-bold">Volver</span>
            </Button>
            <Button type="primary" className="p-6 flex flex-row gap-2 cursor-pointer" onClick={handleSubmit}>
              <Plus className="text-(--secondary)" />
              <span className="text-(--secondary) font-bold">Añadir Marca</span>
            </Button>
          </div>
        </section>
      </Modal>
    )
  } else {
    return (
      <button type="button" onClick={handleModal} className="group flex flex-col p-5 justify-center items-center gap-2 cursor-pointer hover:bg-(--border) transition-colors">
        <span className="border-2 border-(--muted-foreground) border-dashed rounded-full p-4 group-hover:border-(--primary) transition-colors">
          <Plus
            className="text-(--muted-foreground) group-hover:text-(--primary) transition-colors"
            width={80}
            height={80}
          />
        </span>
        <span className="text-2xl text-(--muted-foreground) group-hover:text-(--primary) transition-colors">Añadir Marca</span>
      </button>
    )
  }
};

export default AddBrand;