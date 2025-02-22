import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";

import Contact from "@/lib/models/Contact";

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
