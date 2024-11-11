'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastProvider, showToast } from '@/utils/toastConfig'; // Ajusta la ruta si es necesario

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  message: z.string().min(1, 'El mensaje es requerido'),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        showToast('success', 'Mensaje enviado con éxito');
        reset();
      } else {
        showToast('error', 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('error', 'Error al enviar el mensaje');
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-14">
            <h2 className="mb-6 text-3xl font-bold text-center text-black dark:text-white">
              ¿Necesitas ayuda? Contáctanos
            </h2>
            <p className="mb-12 text-base font-medium text-center text-body-color">
              Nuestro equipo se pondrá en contacto contigo lo antes posible.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-dark dark:text-white"
                  >
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Ingresa tu nombre"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-dark dark:text-white"
                  >
                    Tu Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Ingresa tu correo electrónico"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-dark dark:text-white"
                  >
                    Tu Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register('phone')}
                    placeholder="Ingresa tu teléfono"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-dark dark:text-white"
                  >
                    Tu Mensaje *
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder="Ingresa tu mensaje"
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                    rows={4}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-sm"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastProvider />
    </section>
  );
};

export default Contact;