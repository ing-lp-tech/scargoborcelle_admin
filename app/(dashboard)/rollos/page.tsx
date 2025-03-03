"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

/* import { columns } from "@/components/collections/CollectionColumns"; */
import { columns } from "@/components/rollos/RolloColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "@/components/custom ui/Loader";

const Rollos = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [rollos, setRollos] = useState([]);

  const getContacts = async () => {
    try {
      const res = await fetch("/api/rollos", {
        method: "GET",
      });

      const data = await res.json();
      setRollos(data);
      setLoading(false);
      console.log("rollos:", data);
    } catch (err) {
      console.log("[rollos_GET]", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Rollos</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/rollos/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar rollo
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de deuda" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Deudas de clientes">Deudas de clientes</SelectItem>
          <SelectItem value="Deudas a proveedores">
            Deudas a proveedores
          </SelectItem>
        </SelectContent>
      </Select> */}

      <DataTable columns={columns} data={rollos} searchKey="tissue" />
    </div>
  );
};

export default Rollos;

/* type RolloType = {
  _id: string;
  tissue: string;
  color: string;
  meters: string;
  peso: string;
  precio: string;
  image: string;
}; */
