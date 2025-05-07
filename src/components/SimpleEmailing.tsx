"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { SimpleEmailingSchema, simpleEmailSchema } from "@/components/schema";
import { simpleEmailAction } from "./actions";

function SimpleEmailing() {
  const form = useForm<SimpleEmailingSchema>({
    resolver: zodResolver(simpleEmailSchema),
  });

  const handleSendEmail = async (data: SimpleEmailingSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);
    const response = await simpleEmailAction(formData);
    if (response.error) {
      form.setError("email", { message: response.error });
      return;
    }

    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg py-12 px-8 w-full max-w-md min-w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Envoyer email
        </h2>
        <form onSubmit={form.handleSubmit(handleSendEmail)} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border-b-2 border-gray-300">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                {...form.register("email")}
                className="w-full py-2 outline-none placeholder-gray-400"
                placeholder="ex: example@example.com"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

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

export default SimpleEmailing;