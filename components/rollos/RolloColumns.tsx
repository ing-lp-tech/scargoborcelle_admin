"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

/* type RolloType = {
  _id: string;
  tissue: string;
  color: string;
  meters: string;
  peso: string;
  precio: string;
  image: string;
}; */

export const columns: ColumnDef<RolloType>[] = [
  {
    accessorKey: "tissue",
    header: "Nombre de tela",
    cell: ({ row }) => (
      <Link href={`/rollos/${row.original._id}`} className="hover:text-red-1">
        {row.original.tissue}
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <Link href={`/rollos/${row.original._id}`} className="hover:text-red-1">
        {row.original.color}
      </Link>
    ),
  },
  {
    accessorKey: "meters",
    header: "Meters",
    cell: ({ row }) => (
      <Link href={`/rollos/${row.original._id}`} className="hover:text-red-1">
        {row.original.meters}
      </Link>
    ),
  },
  {
    accessorKey: "peso",
    header: "Peso",
    cell: ({ row }) => <p>{row.original.peso}</p>,
  },
  {
    accessorKey: "precio",
    header: "Precio",
    cell: ({ row }) => <p>{row.original.precio}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="rollos" id={row.original._id} />,
  },
];

/* "use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const colums: ColumnDef<ContactType>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => (
      <Link href={`/contacts/${row.original._id}`} className="hover:text-red-1">
        {row.original.nombre}
      </Link>
    ),
  },
  {
    accessorKey: "descripcion",
    header: "Descripcion",
    cell: ({ row }) => <p>{row.original.description}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="contacts" id={row.original._id} />,
  },
]; */
