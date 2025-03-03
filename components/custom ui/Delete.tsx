"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface DeleteProps {
  item: string; // Tipo de elemento: "product", "contact", "collection"
  id: string; // ID del elemento a eliminar
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  console.log(" item, id", item, id);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mapeo de tipos de elementos a sus rutas en la API
  const itemTypeMap = {
    product: "products",
    contact: "contacts",
    collection: "collections",
    rollos: "rollos",
  };

  // Obtiene la ruta de la API basada en el tipo de elemento
  const itemType = itemTypeMap[item as keyof typeof itemTypeMap];

  const onDelete = async () => {
    try {
      setLoading(true);
      console.log(`Deleting ${item} with ID:`, id);

      // Realiza la solicitud DELETE a la API
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }

      // Muestra un mensaje de éxito y redirige
      toast.success(`${item} deleted successfully`);
      window.location.href = `/${itemType}`;
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false); // Restablece el estado de carga
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white" disabled={loading}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-1 text-white"
            onClick={onDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;

/* "use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  console.log(" item, id:", item, id);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType =
        item === "product"
          ? "products"
          : item === "contacts"
          ? "contacts"
          : "collections";

      console.log(`Deleting ${itemType} with ID:`, id);

      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success(`${item} deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete; */

/* "use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "product" ? "products" : "collections";

      console.log("`/api/${itemType}/${id}`", `/api/${itemType}/${id}`);

      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success(`${item} deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
 */
