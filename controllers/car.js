const Car = require("../models/Car");
const AddCar = require("../models/Addcar");

const getALLCarDetails = async (req, res) => {
  try {
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCarDetails = async (req, res) => {
  const { img, seater, carType, name, rateperkm, available_Date, Book, fare } =
    req.body;
  try {
    const newCar = await Car.create({
      img,
      seater,
      carType,
      name,
      rateperkm,
      available_Date,
      Book,
      fare,
    });
    res.status(200).json(newCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AddCarData = async (req, res) => {
  try {
    const cardetails = await AddCar.find({}).sort({ createdAt: -1 });
    res.status(200).json(cardetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const CreateAddCar = async (req, res) => {
  const {
    carname,
    type,
    model,
    milage,
    perkm,
    availablefrom,
    availabletill,
    image,
    description,
    cardetails,
    details,
  } = req.body;

  try {
    const newAddCar = new Addcar({
      carname,
      type,
      model,
      milage,
      perkm,
      availablefrom,
      availabletill,
      image,
      description,
      cardetails,
      details,
    });
    await newAddCar.save();

    res.send(newAddCar);
  } catch (error) {
    res.json({ msg: error });
  }
};

const editAddedCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const {
      carname,
      type,
      model,
      milage,
      perkm,
      availablefrom,
      availabletill,
      image,
      description,
      cardetails,
      details,
    } = req.body;
    const car = await AddCar.findById(carId);
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }
    car.carname = carname;
    car.type = type;
    car.model = model;
    car.milage = milage;
    car.perkm = perkm;
    car.availablefrom = availablefrom;
    car.availabletill = availabletill;
    car.image = image;
    car.description = description;
    car.cardetails = cardetails;
    car.details = details;
    await car.save();
    res.send({ message: "Car updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await AddCar.findByIdAndDelete(carId);
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }
    res.send({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getALLCarDetails,
  CreateAddCar,
  editAddedCar,
  AddCarData,
  createCarDetails,
  deleteCar,
};
