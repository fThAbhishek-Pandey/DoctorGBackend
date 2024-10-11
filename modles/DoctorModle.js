import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    fees: {
      type: Object,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slot_booked: {
      type: Object,
      default: {},
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { minimize: false }
);
const DoctorModel =
  mongoose.models.doctor || mongoose.model("doctor", DoctorSchema);
export default DoctorModel;
