"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/store/useAuthStore"
import Plus from "../icons/Plus";
import Modal from "../Modal";
import ImageIcon from "../icons/ImageIcon";
import Button from "../Button";
import Upload from "../icons/Upload";
import { handleService } from "@/app/actions/service";

const AddService = () => {
  const user = useAuthStore(u => u.user);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  if (user?.role !== 'admin') return;

  const handleModal = () => {
    if (!showModal) {
      setShowModal(true);
      // Desactivar el scroll cuando se abre el modal:
      document.body.classList.add('overflow-hidden');
    } else {
      setShowModal(false);

      setPreview(null);
      setServiceName("");
      setServiceDesc("");
      setServicePrice("");

      setShowModal(false);
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

    setFile(file);
    setFilePath(`servicios/${file.name}`);

    const render = new FileReader();
    render.onload = e => setPreview(e.target?.result as string);
    render.readAsDataURL(file);
  }

  const handleSubmit = async () => {
    if (!filePath || !file || !fileInputRef) {
      toast.error("Debes seleccionar un archivo primero.");
      return;
    }

    const loading = toast.loading("Subiendo imagen y guardando los datos del servicio...");
    const res = await handleService(file, serviceName, serviceDesc, parseInt(servicePrice));

    if (res?.error) {
      toast.dismiss(loading);
      toast.error("Ocurrió un error al intentar subir los datos del servicio. Inténtalo más tarde.");
      console.log(res.error);

      return;
    } else {
      toast.dismiss(loading);
      toast.success("¡Se han guardado con éxito los datos del servicio!")
    }
  }

  if (showModal) {
    return (
      <Modal isOpen={showModal} onClose={handleModal} className="w-2xl">
        <section className="relative w-full border border-(--primary)/50 bg-(--card) shadow-2xl">
          <div className="flex flex-col px-6 py-5 border-b border-(--border)">
            <p className="text-sm font-medium text-(--primary) uppercase tracking-[0.2em]">Nuevo Servicio</p>
            <h1 className="text-xl font-bold text-(--foreground)">Añade un Nuevo Servicio</h1>
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
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                    Arrastra la imagen del nuevo servicio aquí
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
          <div className="px-6 py-5 h-fit flex flex-col gap-2">
            <label htmlFor="service-name" className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-(--muted-foreground)">
              Nombre del Servicio
            </label>
            <input
              id="service-name"
              type="text"
              placeholder="Diseño Gráfico"
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              className="w-full border border-(--border) bg-(--background) px-4 py-3 text-sm text-(--foreground) placeholder:text-(--muted-foreground)/50 transition-colors focus:border-(--primary) focus:outline-none"
            />

            <label htmlFor="service-desc" className="mb-2 block text-xs font-medium uppercase trakcing-[0.2em] text-(--muted-foreground)">
              Descripción
            </label>
            <textarea
              id="service-desc"
              placeholder="Detalla una descripción del servicio..."
              value={serviceDesc}
              onChange={e => setServiceDesc(e.target.value)}
              className="w-full border border-(--border) bg-(--background) px-4 py-3 text-sm text-(--foreground) placeholder:text-(--muted-foreground)/50 transition-colors focus:border-(--primary) focus:outline-none"
            />

            <label htmlFor="service-price" className="mb-2 block text-xs font-medium uppercase trakcing-[0.2em] text-(--muted-foreground)">
              Precio
            </label>
            <input
              id="service-price"
              type="text"
              value={servicePrice}
              onChange={e => {
                const int = parseInt(e.target.value);
                if (isNaN(int) && e.target.value !== "") return;
                setServicePrice(e.target.value);
              }}
              className="w-full border border-(--border) bg-(--background) px-4 py-3 text-sm text-(--foreground) placeholder:text-(--muted-foreground)/50 transition-colors focus:border-(--primary) focus:outline-none"
              min={0}
            />
          </div>
          <div className="flex items-center justify-center gap-3 px-6 py-5">
            <Button type="secondary" className="p-6 cursor-pointer" onClick={handleModal}>
              <span className="font-bold">Volver</span>
            </Button>
            <Button type="primary" className="p-6 flex flex-row gap-2 cursor-pointer" onClick={handleSubmit}>
              <Plus className="text-(--secondary)" />
              <span className="text-(--secondary) font-bold">Añadir Servicio</span>
            </Button>
          </div>
        </section>
      </Modal>
    )
  } else {
    return (
      <button
        type="button"
        onClick={handleModal}
        className="group relative flex min-h-[650px] flex-col items-center justify-center border-2 border-dashed border-(--border) bg-(--background) transition-colors hover:border-(--primary)/40 hover:bg-(--card) cursor-pointer"
      >
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-(--muted-foreground)/30 text-(--muted-foreground) transition-colors group-hover:border-(--primary) group-hover:text-(--primary)">
          <Plus />
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-(--muted-foreground) transition-colors group-hover:text-(--foreground)">
          Añadir Nuevo Servicio
        </span>
      </button>
    )
  }
}

export default AddService;