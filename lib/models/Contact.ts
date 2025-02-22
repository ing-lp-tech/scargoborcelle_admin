import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  numero: {
    type: String,
    required: false,
    /* unique: true, */
  },
  categoria: {
    type: String,
    required: false,
    /* unique: true, */
  },
  description: String,

  /*  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ], */
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
