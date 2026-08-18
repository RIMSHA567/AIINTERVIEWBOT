import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createCheckoutSession);

export default paymentRouter;
