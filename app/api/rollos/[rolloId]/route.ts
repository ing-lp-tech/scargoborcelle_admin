import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Rollos from "@/lib/models/Rollos";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export const GET = async (
  req: NextRequest,
  /* { params }: { params: { collectionId: string } } */
  { params }: { params: { rolloId: string } }
) => {
  try {
    await connectToDB();

    /* const collection = await Collection.findById(params.contactId).populate({ path: "products", model: Product }); */
    const rollo = await Rollos.findById(params.rolloId).populate({
      path: "tissue",
      /* model: Product, */
    });
    if (!rollo) {
      return new NextResponse(JSON.stringify({ message: "Rollo not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(rollo, { status: 200 });
  } catch (err) {
    console.log("[rolloId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { rolloId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    console.log("params", params);
    let rollo = await Rollos.findById(params.rolloId);

    if (!rollo) {
      return new NextResponse("Rollo not found", { status: 404 });
    }

    const { tissue, color, meters, peso, precio, image } = await req.json();

    if (!tissue || !color || !meters || !peso || !precio) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    rollo = await Rollos.findByIdAndUpdate(
      params.rolloId,
      { tissue, color, meters, peso, precio, image },
      { new: true }
    );

    await rollo.save();

    return NextResponse.json(rollo, { status: 200 });
  } catch (err) {
    console.log("[rollotId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { rolloId: string } }
) => {
  try {
    console.log("🟢 DELETE request received for Rollo ID:", params?.rolloId);

    // Verificar autenticación
    const { userId } = auth();
    if (!userId) {
      console.error("❌ Unauthorized access attempt.");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("✅ Authenticated user ID:", userId);

    // Validar contactId
    if (!params?.rolloId || !mongoose.Types.ObjectId.isValid(params.rolloId)) {
      console.error("❌ Invalid Rollo ID:", params.rolloId);
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    await connectToDB();
    console.log("✅ Connected to MongoDB");

    // Convertir a ObjectId
    const objectId = new mongoose.Types.ObjectId(params.rolloId);

    // Buscar y eliminar el contacto
    const deleteRollo = await Rollos.findByIdAndDelete(objectId);
    if (!deleteRollo) {
      console.error("❌ Rollo not found:", params.rolloId);
      return new NextResponse("Rollo not found", { status: 404 });
    }
    console.log("✅ Contact deleted:", deleteRollo);

    // Si necesitas eliminar las referencias a los contactos en los productos, puedes descomentar esto
    // const updatedProducts = await Product.updateMany(
    //   { contacts: params.contactId },
    //   { $pull: { contacts: params.contactId } }
    // );
    // console.log("✅ Updated products after contact deletion:", updatedProducts);

    return new NextResponse("Rollo is deleted", { status: 200 });
  } catch (err) {
    console.error("❌ Error deleting Rollo:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
