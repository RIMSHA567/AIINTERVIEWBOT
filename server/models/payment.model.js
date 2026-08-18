import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // User reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Plan info
    planId: {
      type: String,
      required: true,
    },

    // Payment amount
    amount: {
      type: Number,
      required: true,
    },

    // Credits purchased
    credits: {
      type: Number,
      required: true,
    },

    // Stripe session ID
    stripeSessionId: {
      type: String,
      required: true,
    },

    // Payment status
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  {
    timestamps: true, // auto add createdAt & updatedAt
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
