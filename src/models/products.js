import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, 
    name: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0, index: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, { inc_field: "id" });

export default mongoose.model("Product", productSchema);
