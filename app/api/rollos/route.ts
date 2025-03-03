import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Rollos from "@/lib/models/Rollos";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 403,
      });
    }

    await connectToDB();

    const { tissue, color, meters, peso, precio, image } = await req.json();

    // Validar campos obligatorios
    if (!tissue || !color || !meters || !peso || !precio) {
      return new NextResponse(
        JSON.stringify({
          message: "Tissue, color, meters, peso, and precio are required",
        }),
        { status: 400 }
      );
    }

    // Crear el nuevo rollo sin verificar si ya existe uno con el mismo tissue
    const newRollo = await Rollos.create({
      tissue,
      color,
      meters,
      peso,
      precio,
      image,
    });

    await newRollo.save();

    return new NextResponse(JSON.stringify(newRollo), { status: 200 });
  } catch (err) {
    console.error("[rollos_POST]", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const rollos = await Rollos.find().sort({ createdAt: "desc" });

    return new NextResponse(JSON.stringify(rollos), { status: 200 });
  } catch (err) {
    console.error("[rollos_GET]", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
/* import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Rollos from "@/lib/models/Rollos";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { tissue, color, meters, peso, precio, image } = await req.json();

    if (!tissue || !color || !meters || !peso || !precio) {
      return new NextResponse(
        "Tissue, color, meters, peso, and precio are required",
        {
          status: 400,
        }
      );
    }

    const existingRollo = await Rollos.findOne({ tissue });

    if (existingRollo) {
      return new NextResponse("Rollo already exists", { status: 400 });
    }

    const newRollo = await Rollos.create({
      tissue,
      color,
      meters,
      peso,
      precio,
      image,
    });

    await newRollo.save();

    return NextResponse.json(newRollo, { status: 200 });
  } catch (err) {
    console.log("[rollos_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const rollos = await Rollos.find().sort({ createdAt: "desc" });

    return NextResponse.json(rollos, { status: 200 });
  } catch (err) {
    console.log("[rollos_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic"; */

/* import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";

import Rollos from "@/lib/models/Rollos";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { nombre, numero, categoria, description } = await req.json();

    const existingContact = await Contact.findOne({ nombre });

    if (existingContact) {
      return new NextResponse("Contact already exists", { status: 400 });
    }

    if (!nombre || !numero || !categoria || !description) {
      return new NextResponse("Nombre and description are required", {
        status: 400,
      });
    }

    const newContact = await Contact.create({
      nombre,
      numero,
      categoria,
      description,
    });

    await newContact.save();

    return NextResponse.json(newContact, { status: 200 });
  } catch (err) {
    console.log("[contacts_POST]", err);
    return new NextResponse("Internal Server Error contact", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const contacts = await Contact.find().sort({ createdAt: "desc" });

    return NextResponse.json(contacts, { status: 200 });
  } catch (err) {
    console.log("[contacts_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
 */
