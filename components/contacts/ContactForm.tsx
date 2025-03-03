"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
  nombre: z.string().min(10).max(20),
  numero: z.string().min(8).max(20),
  categoria: z.enum(["Cliente", "Proveedor", "Otros"]), // Valida que solo se permitan estos valores
  description: z.string().min(5).max(200).trim(),
  /* image: z.string(), */
});

interface ContactFormProps {
  initialData?: ContactType | null; //Must have "?" to make it optional
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          nombre: "",
          numero: "",
          categoria: "Cliente", // Valor por defecto válido
          description: "",
          /* image: "", */
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("values on submit-prueba", values);
      setLoading(true);
      const url = initialData
        ? `/api/contacts/${initialData._id}`
        : "/api/contacts";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        console.log("values on submit", values);
        setLoading(false);
        toast.success(`Contact ${initialData ? "updated" : "created"}`);
        window.location.href = "/contacts";
        router.push("/contacts");
      }
    } catch (err) {
      console.log("[contacts_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Contact</p>
          <Delete id={initialData._id} item="contact" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Contacto</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />

      <div className="p-10 overflow-visible">
        {" "}
        {/* Asegúrate de que el contenedor no corte el menú */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre completo"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de telefono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Numero de telefono"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px] mb-6">
                        {" "}
                        {/* Añade margen inferior */}
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent
                        className="z-[1000] bg-white border border-gray-200 rounded-md shadow-lg" // Fondo blanco y estilos personalizados
                        position="popper" // Usa posición "popper" para evitar superposiciones
                        style={{
                          position: "fixed", // Fija la posición para evitar problemas de flujo
                          top: "auto", // Ajusta la posición vertical
                          left: "auto", // Ajusta la posición horizontal
                          marginTop: "8px", // Añade un margen superior
                        }}
                      >
                        <SelectItem
                          value="Cliente"
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          Cliente
                        </SelectItem>
                        <SelectItem
                          value="Proveedor"
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          Proveedor
                        </SelectItem>
                        <SelectItem
                          value="Otros"
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          Otros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-10">
              <Button type="submit" className="bg-blue-1 text-white">
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/contacts")}
                className="bg-blue-1 text-white"
              >
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
