"use client"

import { useState } from "react"

import { WhatsApp } from "./icons/Whatsapp"

export default function WhatsappButton() {
    const [message, setMessage] = useState("Hola! Quiero más información!")

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 flex items-center justify-center"
        >
            <WhatsApp />
        </a>
    )
}