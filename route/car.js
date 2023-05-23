const express = require("express");
const router = express.Router();
const {
  getALLCarDetails,
  CreateAddCar,
  editAddedCar,
  createCarDetails,
  AddCarData,
  deleteCar,
} = require("../controllers/car");
const {
  getbookdetail,
  bookdetailcontrol,
  updatebooking,
} = require("../controllers/destination");

router.get("/carDetails", getALLCarDetails);
router.post("/createCar", createCarDetails);

router.get("/adminpageCars", AddCarData);

router.put("/editcar/:id", editAddedCar);
router.post("/addcar", CreateAddCar);
router.delete("/deleteCar/:id", deleteCar);

router.get("/getbookingdetails", getbookdetail);
router.post("/bookingdetails", bookdetailcontrol);

router.put("/updatebooking/:id", updatebooking);

module.exports = router;
