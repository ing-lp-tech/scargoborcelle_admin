import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Contact from "@/lib/models/Contact";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export const GET = async (
  req: NextRequest,
  /* { params }: { params: { collectionId: string } } */
  { params }: { params: { contactId: string } }
) => {
  try {
    await connectToDB();

    /* const collection = await Collection.findById(params.contactId).populate({ path: "products", model: Product }); */
    const contact = await Contact.findById(params.contactId).populate({
      path: "nombre",
      /* model: Product, */
    });
    if (!contact) {
      return new NextResponse(
        JSON.stringify({ message: "Contact not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(contact, { status: 200 });
  } catch (err) {
    console.log("[contactId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { contactId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    console.log("params", params);
    let collection = await Collection.findById(params.contactId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { nombre, numero, categoria, description } = await req.json();

    if (!nombre || !numero || !categoria || !description) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Contact.findByIdAndUpdate(
      params.contactId,
      { nombre, numero, categoria, description },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[contactId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { contactId: string } }
) => {
  try {
    console.log(
      "🟢 DELETE request received for contact ID:",
      params?.contactId
    );

    // Verificar autenticación
    const { userId } = auth();
    if (!userId) {
      console.error("❌ Unauthorized access attempt.");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("✅ Authenticated user ID:", userId);

    // Validar contactId
    if (
      !params?.contactId ||
      !mongoose.Types.ObjectId.isValid(params.contactId)
    ) {
      console.error("❌ Invalid contact ID:", params.contactId);
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    await connectToDB();
    console.log("✅ Connected to MongoDB");

    // Convertir a ObjectId
    const objectId = new mongoose.Types.ObjectId(params.contactId);

    // Buscar y eliminar el contacto
    const deletedContact = await Contact.findByIdAndDelete(objectId);
    if (!deletedContact) {
      console.error("❌ Contact not found:", params.contactId);
      return new NextResponse("Contact not found", { status: 404 });
    }
    console.log("✅ Contact deleted:", deletedContact);

    // Si necesitas eliminar las referencias a los contactos en los productos, puedes descomentar esto
    // const updatedProducts = await Product.updateMany(
    //   { contacts: params.contactId },
    //   { $pull: { contacts: params.contactId } }
    // );
    // console.log("✅ Updated products after contact deletion:", updatedProducts);

    return new NextResponse("Contact is deleted", { status: 200 });
  } catch (err) {
    console.error("❌ Error deleting contact:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
