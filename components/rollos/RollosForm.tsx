"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

/* _id: string;
tissue: string;
color: string;
meters: string;
peso: string;
precio: string;  */

const formSchema = z.object({
  tissue: z.string().min(2).max(20), // Cambiado de "tipo_de_tela" a "tissue"
  color: z.string().min(2).max(20),
  meters: z.string().min(2).max(20), // Cambiado de "metros" a "meters"
  peso: z.string().min(2).max(20), // Cambiado de "kgs" a "peso"
  precio: z.string().min(2).max(20),
  image: z.string().optional(),
});

interface RolloFormProps {
  initialData?: RolloType | null; //Must have "?" to make it optional
}

const RollosForm: React.FC<RolloFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          tissue: "", // Cambiado de "tipo_de_tela" a "tissue"
          color: "",
          meters: "", // Cambiado de "metros" a "meters"
          peso: "", // Cambiado de "kgs" a "peso"
          precio: "",
          image: "",
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
    console.log("values-Rollos", values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/rollos/${initialData._id}`
        : "/api/rollos";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Rollos ${initialData ? "updated" : "created"}`);
        window.location.href = "/rollos";
        router.push("/rollos");
      }
    } catch (err) {
      console.log("[rollos_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  /* const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submit rollo");
    try {
      setLoading(true);
      const url = initialData
        ? `/api/rollos/${initialData._id}`
        : "/api/rollos";

      console.log("url:", url);
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST", // Usar PUT para actualizar y POST para crear
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      toast.success(`Rollo ${initialData ? "updated" : "created"}`);
      router.push("/rollos");
    } catch (err) {
      console.error("[rollos_POST]", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Rollo</p>
          <Delete id={initialData._id} item="collection" />
        </div>
      ) : (
        <p className="text-heading2-bold">Ingreso de rollo</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="tissue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de tela</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tipo de tela"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Color"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    placeholder="color"
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
            name="meters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metros</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Metros"
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
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kgs</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kgs"
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
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Precio"
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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
              onClick={() => router.push("/collections")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RollosForm;
