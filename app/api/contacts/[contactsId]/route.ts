import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Contact from "@/lib/models/Contact";
import Product from "@/lib/models/Product";

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

    let collection = await Collection.findById(params.contactId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { nombre, description } = await req.json();

    if (!nombre || !description) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Contact.findByIdAndUpdate(
      params.contactId,
      { nombre, description },
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
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Contact.findByIdAndDelete(params.contactId);

    /* await Product.updateMany(
      { collections: params.contactId },
      { $pull: { collections: params.contactId } }
    ); */

    return new NextResponse("Contact is deleted", { status: 200 });
  } catch (err) {
    console.log("[contactId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
