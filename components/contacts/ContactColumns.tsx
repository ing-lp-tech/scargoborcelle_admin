"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ContactType>[] = [
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
    accessorKey: "numero",
    header: "Numero",
    cell: ({ row }) => (
      <Link href={`/contacts/${row.original._id}`} className="hover:text-red-1">
        {row.original.numero}
      </Link>
    ),
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    cell: ({ row }) => (
      <Link href={`/contacts/${row.original._id}`} className="hover:text-red-1">
        {row.original.categoria}
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
