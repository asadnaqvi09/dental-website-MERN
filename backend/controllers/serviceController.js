const Service = require("../models/serviceModel");
const cloudinary = require("../utilis/cloudinary");
const fs = require("fs");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services) {
      res.status(404).json({ message: "No services found" });
    }
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createService = async (req, res) => {
  try {
    const { description, category, subCat, img_url, price } = req.body;
    if (!description || !category || !price) {
      return res.status(400).json({ message: "Please provide all relevant details" });
    }

    const isExist = await Service.findOne({category});
    if(isExist){
      return res.status(400).json({ message: "Category already exists" });
    }
    let uploadResult = null;
    let imageURL = "";

    if (req.file) {
      console.log("🟢 Uploading from local file...");
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "denture_services",
      });
      fs.unlinkSync(req.file.path);
      imageURL = uploadResult.secure_url;
    }
    else if (img_url && img_url.trim() !== "") {
      console.log("🟢 Uploading from image URL...");
      uploadResult = await cloudinary.uploader.upload(img_url, {
        folder: "denture_services",
      });
      imageURL = uploadResult.secure_url;
    }
    else {
      console.log("🔴 No image provided!");
      return res.status(400).json({ message: "Please upload an image or provide URL" });
    }

    if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
      console.error("❌ Cloudinary upload failed:", uploadResult);
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
    
    const newService = await Service.create({
      category,
      description,
      subCat,
      img_url: imageURL,
      imagePublicId: uploadResult.public_id,
      price,
    });

    res.status(201).json({
      success: true,
      message: `${category} created successfully`,
      data: newService,
    });
  } catch (error) {
    console.error("🔥 Error in createService:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateServiceByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, category, subCat, price, img_url } = req.body;
    if (!description || !category || !price) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    let updateData = {
      category: category || service.category,
      description: description || service.description,
      subCat: subCat || service.subCat,
      price: price || service.price,
    };

    let uploadResult = null;
    if (req.file) {
      console.log("🟢 Image update from local file...");
      if (service.imagePublicId) {
        await cloudinary.uploader.destroy(service.imagePublicId);
      }
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "denture_services",
      });
      fs.unlinkSync(req.file.path);

      updateData.img_url = uploadResult.secure_url;
      updateData.imagePublicId = uploadResult.public_id;
    }
    else if (img_url) {
      console.log("🟢 Image update from URL...");
      if (service.imagePublicId) {
        await cloudinary.uploader.destroy(service.imagePublicId);
      }
      uploadResult = await cloudinary.uploader.upload(img_url, {
        folder: "denture_services",
      });
      updateData.img_url = uploadResult.secure_url;
      updateData.imagePublicId = uploadResult.public_id;
    }
    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: `${updatedService.category} updated successfully`,
      data: updatedService,
    });

  } catch (error) {
    console.error("❌ Error in updateServiceByID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteServiceByID = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    if (service.imagePublicId) {
      console.log("🟢 Deleting image from Cloudinary...");
      await cloudinary.uploader.destroy(service.imagePublicId);
    }
    await service.deleteOne();
    res.status(200).json({
      success: true,
      message: `${service.category} deleted successfully`,
    });

  } catch (error) {
    console.error("❌ Error in deleteServiceByID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateServiceByID,
  deleteServiceByID,
};