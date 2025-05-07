"use client";

import React from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactSchema } from "./schema";
import { contactAction } from "./actions";

function ContactForm() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const handleSubmitContact = async (data: ContactSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("content", data.content);

    const response = await contactAction(formData);

    if (response.error) {
      form.setError("root", { message: response.error });
      return;
    }

    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg py-12 px-8 w-full max-w-md min-w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Contactez-nous</h2>
        <form onSubmit={form.handleSubmit(handleSubmitContact)} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Nom</label>
            <div className="flex items-center border-b-2 border-gray-300">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                {...form.register("name")}
                className="w-full py-2 outline-none"
                placeholder="Nom"
              />
            </div>
            <p className="text-sm text-red-500">{form.formState.errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border-b-2 border-gray-300">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                {...form.register("email")}
                className="w-full py-2 outline-none"
                placeholder="Email"
              />
            </div>
            <p className="text-sm text-red-500">{form.formState.errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <div className="flex items-start border-b-2 border-gray-300">
              <FaCommentDots className="text-gray-400 mt-2 mr-2" />
              <textarea
                {...form.register("content")}
                className="w-full py-2 outline-none resize-none h-24"
                placeholder="Message"
              />
            </div>
            <p className="text-sm text-red-500">{form.formState.errors.content?.message}</p>
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-red-500 text-center">{form.formState.errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex items-center justify-center gap-2 w-full bg-[#79c2d0] hover:bg-[#5cb0c3] text-white py-2 rounded transition cursor-pointer"
          >
            <FaPaperPlane /> Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
