import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

/* export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );
    
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic"; */

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    console.log(
      "🟢 DELETE request received for collection ID:",
      params?.collectionId
    );

    // Verificar autenticación
    const { userId } = auth();
    if (!userId) {
      console.error("❌ Unauthorized access attempt.");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("✅ Authenticated user ID:", userId);

    // Validar collectionId
    if (
      !params?.collectionId ||
      !mongoose.Types.ObjectId.isValid(params.collectionId)
    ) {
      console.error("❌ Invalid collection ID:", params.collectionId);
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    await connectToDB();
    console.log("✅ Connected to MongoDB");

    // Convertir a ObjectId
    const objectId = new mongoose.Types.ObjectId(params.collectionId);

    // Buscar y eliminar colección
    const deletedCollection = await Collection.findByIdAndDelete(objectId);
    if (!deletedCollection) {
      console.error("❌ Collection not found:", params.collectionId);
      return new NextResponse("Collection not found", { status: 404 });
    }
    console.log("✅ Collection deleted:", deletedCollection);

    // Eliminar referencias en productos
    const updatedProducts = await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );
    console.log("✅ Updated products after deletion:", updatedProducts);

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.error("❌ Error deleting collection:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
