import mongoose from "mongoose";

const rolloSchema = new mongoose.Schema({
  tissue: {
    type: String,
    required: true,
  },
  color: String,
  meters: String,
  peso: String,
  precio: String,
  image: {
    type: String,
    /* required: true */
  },
  /* products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }, */
});

const Rollos = mongoose.models.Rollo || mongoose.model("Rollo", rolloSchema);

export default Rollos;

/* type RolloType = {
  _id: string;
  tissue: string;
  color: string;
  meters: string;
  peso: string;
  precio: string;
  image: string;
};
 */
