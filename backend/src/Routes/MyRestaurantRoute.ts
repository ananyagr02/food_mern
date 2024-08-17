import express from "express";
import multer from "multer";
import MyRestaurantController from "../Controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../Middlewares/validation";
import ensureAuthenticated from "../Middlewares/auth";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024,
    },
});
// api/my/restaurant

router.get("/",ensureAuthenticated, MyRestaurantController.getMyRestaurant)
router.post("/",ensureAuthenticated,validateMyRestaurantRequest,
    upload.single("imageFile"),  // upload on post request if its an image file
    MyRestaurantController.createMyRestaurant )  // sending the image in request


export default router;