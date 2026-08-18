import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ================= CREATE CHECKOUT SESSION =================
export const createCheckoutSession = async (req, res) => {
  try {
    const { planId, amount, credits } = req.body;

    // Validation
    if (!planId || !amount || !credits) {
      return res.status(400).json({
        message: "Invalid plan data",
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Interview Plan - ${planId}`,
            },
            unit_amount: Number(amount) * 100, // convert to paise
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:5173/pricing",

      metadata: {
        planId: String(planId),
        credits: String(credits),
        userId: String(req.userId),
      },
    });

    // Save Payment in DB
    await Payment.create({
      userId: req.userId,
      planId,
      amount,
      credits,
      stripeSessionId: session.id,
      status: "created",
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Create Error:", error);

    return res.status(500).json({
      message: `Failed to create checkout session: ${error.message}`,
    });
  }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({
        message: "Session ID required",
      });
    }

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check payment status
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    // Find payment record
    const payment = await Payment.findOne({
      stripeSessionId: session_id,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    // Prevent duplicate processing
    if (payment.status === "paid") {
      return res.status(200).json({
        message: "Already processed",
      });
    }

    // Update payment status
    payment.status = "paid";
    await payment.save();

    // Add credits to user
    const updatedUser = await User.findByIdAndUpdate(
      payment.userId,
      {
        $inc: { credits: payment.credits },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Payment successful & credits added",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Stripe Verify Error:", error);

    return res.status(500).json({
      message: `Payment verification failed: ${error.message}`,
    });
  }
};
