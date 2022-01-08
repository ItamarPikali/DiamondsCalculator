const express = require("express");
const { object } = require("joi");
const logic = require("../business-logic-layer/logic");
const DiamondModel = require("../model/diamond-model");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");
const Credentials = require("../model/credentials");
const userModel = require("../model/user-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const fileUpload = require("express-fileupload");
const verifyAdmin = require("../middleware/verify-admin");
router.use(fileUpload());

router.get("/images/:imageName", (request, response) => {
  try {
    // Data:
    const imageName = request.params.imageName;
    // Logic:
    let imageFile = path.join(__dirname, "..", "images", imageName);
    // Success:
    response.sendFile(imageFile);
  } catch (err) {
    response.status(500).send(err.message);
    console.log(err);
  }
});

//send price to user after calculation :

router.post("/price", verifyLoggedIn, async (request, response) => {
  const diamond = new DiamondModel(request.body);
  const errors = diamond.validate();
  if (Object.keys(errors).length > 0) {
    console.log(errors);
  } else {
    const price = getPriceByDiamond(diamond);
    response.send(JSON.stringify(price));
  }
});

//get diamonds by categoryId :

router.get("/:categoryId", async (request, response) => {
  const categoryId = request.params.categoryId;
  try {
    const diamonds = await logic.getByCategoryId(categoryId);
    if (diamonds.length >= 1) response.send(diamonds);
    else
      response
        .status(404)
        .send(`Can not find diamonds of category number ${categoryId}`);
  } catch (error) {
    response.status(500).send(error);
  }
});
//get all diamonds :
router.get("/diamonds/all", async (request, response) => {
  try {
    const diamonds = await logic.getAllDiamonds();
    if (diamonds.length >= 1) response.send(diamonds);
    else response.status(404).send(`Can not find diamonds`);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/users/all", async (request, response) => {
  try {
    const users = await logic.getAllUsers();
    if (users.length >= 1) response.send(users);
    else response.status(404).send(`Can not find users`);
  } catch (error) {
    response.status(500).send(error);
  }
});

// login :
router.post("/login", async (request, response) => {
  try {
    // Data:
    const credentials = new Credentials(request.body);
    // Validation:
    const errors = credentials.validate();
    if (errors) return response.status(400).send(errors);

    // logic:
    const loggedInUser = await logic.loginAsync(credentials);
    console.log(loggedInUser);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password.");

    // Success:
    response.json(loggedInUser);
  } catch (err) {
    console.log(err);
    response.status(500).send("Server error");
  }
});

router.post("/user", async (request, response) => {
  const user = new userModel(request.body);
  const errors = user.validate();
  if (errors) {
    response.status(400).json(errors);
  } else {
    try {
      console.log(errors);
      await logic.addSingleUserAsync(user);
      response.status(201).send("Created"); // Created
    } catch (error) {
      console.log(error);
      response.status(500).send("Server error");
    }
  }
});

router.post("/add/diamond", [verifyLoggedIn, verifyAdmin], async (request, response) => {
  try {
    const singleDiamond = new DiamondModel(request.body);
    const image = request.files?.image;
    const absolutePath = path.join(__dirname, "..", "images", image?.name);
    await image.mv(absolutePath); // mv = move
    const errors = singleDiamond.validate();
    if (Object.keys(errors).length > 0) {
      response.status(400).send("bad request");
      console.log(errors);
    } else {
      try {
     const price = getPriceByDiamond(singleDiamond);
     const categoryId = getCategoryByDiamond(singleDiamond);
        const result = await logic.addSingleDiamondAsync(singleDiamond, image?.name, price, categoryId);
        response.status(201).send("Created"); // Created
      } catch (error) {
        console.log(error);
        response.status(400).send("bad request");
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
});

function getCategoryByDiamond(singleDiamond) {
  const price = getPriceByDiamond(singleDiamond);
  let categoryId;
  if (price < 25000) categoryId = 1;
  else if (price >= 25000 && price < 50000) categoryId = 2;
  else if (price >= 50000 && price < 75000) categoryId = 3;
  else if (price > 75000) categoryId = 4;
  return categoryId;
}

function getPriceByDiamond(singleDiamond) {
  const basePrice = 1000;
  const price =
    singleDiamond.carat *
    singleDiamond.weight *
    singleDiamond.cut *
    singleDiamond.clarity *
    singleDiamond.color *
    basePrice;
  return price;
}

module.exports = router;
