// import validater from "validater";
import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import DoctorModel from "../../modles/DoctorModle.js";
console.log("hi");
//  API for adding doctor
const addDoctor = async (req, res) => {
  console.log("i am in add doctor controller");
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      fees,
      experience,
      about,
      available,
      address,
    } = req.body;
    const imagefile = req.file;
    console.log(
      name,
      email,
      password,
      speciality,
      degree,
      fees,
      experience,
      about,
      address,
      available,
      imagefile
    );
    // checking for all data for docotor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !fees ||
      !experience ||
      !about ||
      !address
    )
      return res.json({ success: false, msg: `fill all required field` });
    //  validating email formate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //  validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter valid password",
      });
    }
    //  hasing doctor password
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);
    console.log("hashpassword", hashPassword);
    //  upload image to cloudnary

    const imageUpload = await cloudinary.uploader.upload(imagefile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;
    //  save in our database

    const docotorData = {
      name,
      email,
      image: imageURL,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      available,
      date: Date.now(),
    };
    console.log(docotorData)
    const newDoctor = new DoctorModel(docotorData);
    await newDoctor.save();
    res.json({ success: true, meg: "love u Abhishek" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, msg: error.message });
  }
};


export default addDoctor;
