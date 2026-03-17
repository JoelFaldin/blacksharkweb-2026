"use client";

import { useState } from "react";
import { toast } from "sonner";

import sendContactForm from "@/app/actions/contact";
import Button from "../Button";
import { ArrowRight, EmailIcon, Message, Send, User } from "../icons";
import Modal from "../Modal";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Desactivar el scroll:
      document.body.classList.add("overflow-hidden");
    } else {
      setIsOpen(false);
      // Reactivar el scroll:
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleSubmitForm = async () => {
    const loading = toast.loading("Enviando mensaje...");

    try {
      await sendContactForm(name, email, subject, message);

      toast.dismiss(loading);
      toast.success("Mensaje enviado correctamente.");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Error al enviar el mensaje.");
      console.log(error);
    }

    handleModal();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleModal}
        className="flex flex-row items-center justify-center gap-x-2 bg-primary hover:bg-primary/80 p-6 rounded-lg border border-white/30 cursor-pointer"
      >
        <span className="text-secondary text-2xl font-bold">Contáctanos</span>
        <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
      </Button>
      <Modal isOpen={isOpen} onClose={handleModal} className="w-2xl">
        <form className="border border-border bg-background">
          <span className="px-6 py-5 flex flex-col gap-y-1 border-b border-border">
            <h4 className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
              Contáctanos
            </h4>
            <p className="text-2xl text-foreground mt-2">Ponte en Contacto</p>
          </span>
          <span className="px-6 pb-5 flex flex-col gap-1">
            <p className="text-muted-foreground my-2">
              Completa tus datos y nos podremos en contacto contigo lo más pronto posible.
            </p>

            <div className="flex flex-col gap-2">
              <span>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Tu nombre
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    title="Ejemplo: usuario@correo.com"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50">
                    <EmailIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    title="Ejemplo: usuario@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-black pl-12 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="usuario@correo.com"
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="subject"
                  className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Asunto
                </label>
                <div className="relative mt-1">
                  <input
                    id="subject"
                    type="text"
                    title="Ejemplo: Consulta sobre servicios"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-black pl-4 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Asunto del mensaje"
                  />
                </div>
              </span>

              <span>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Mensaje
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4">
                    <Message className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Háblanos sobre tu proyecto..."
                    rows={4}
                    className="w-full rounded-xl resize-none border border-border bg-black py-3 pl-10 pr-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none"
                  />
                </div>
              </span>
            </div>
          </span>

          <span className="flex flex-row justify-center gap-8 mb-4">
            <Button type="secondary" onClick={handleModal} className="p-6 cursor-pointer">
              <span className="font-bold text-foreground">Volver</span>
            </Button>
            <Button
              type="primary"
              onClick={handleSubmitForm}
              className="p-6 flex flex-row gap-2 cursor-pointer"
            >
              <Send className="text-secondary" />
              <span className="font-bold text-secondary">Enviar mensaje</span>
            </Button>
          </span>
        </form>
      </Modal>
    </>
  );
};

export default ContactForm;
