import express from "express";
import { getLoggedInUser, getOtherUsers, login, logout, signup, updatePresence } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/presence").post(isAuthenticated, updatePresence);
router.route("/").get(isAuthenticated, getOtherUsers);
router.route("/me").get(isAuthenticated, getLoggedInUser);

export default router;