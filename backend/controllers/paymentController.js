import axios from "axios";

const CHAPA_API_KEY = "CHASECK_TEST-VyteVxASNRmvvMBM9VdSWCKTHa5pBgCK"; // Replace with your Chapa API key
const CHAPA_API_URL = "https://api.chapa.co/v1/transaction/initialize";

// Initialize a payment
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique transaction reference


export const initializePayment = async (req, res) => {
  try {
    const { amount, email, currency = "ETB", callback_url } = req.body;

    const tx_ref = `tx-${uuidv4()}`; // Generate a unique transaction reference

    console.log("Initializing Payment with:", { amount, email, currency, tx_ref, callback_url });
 
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      { amount, currency, email, tx_ref, callback_url },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ); 

    // Simplify the response
    res.status(200).json({
      checkout_url: response.data.data.checkout_url, // Directly return the checkout URL
      tx_ref, // Return the transaction reference
    });
  } catch (err) {
    console.error("Chapa Error Response:", err.response?.data || err.message);
    res.status(500).json({
      error: "Failed to initialize payment",
      details: err.response?.data || err.message,
    });
  }
};

  
// Handle payment callback
// Handle payment callback
export const handlePaymentCallback = async (req, res) => {
    try {
        const { tx_ref } = req.query; // Get transaction reference from URL

        if (!tx_ref) {
            return res.status(400).json({ error: "Transaction reference is missing" });
        }

        // Verify the payment using Chapa API
        const verificationResponse = await axios.get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            headers: {
                Authorization: `Bearer ${CHAPA_API_KEY}`,
            }, 
        });

        if (verificationResponse.data.status === "success") {
            // ✅ Payment was successful, update your database here
            return res.status(200).json({ message: "Payment successful", data: verificationResponse.data });
        } else {
            return res.status(400).json({ error: "Payment verification failed", data: verificationResponse.data });
        }
    } catch (err) {
        console.error("Payment Verification Error:", err.response?.data || err.message);
        return res.status(500).json({ error: "Failed to verify payment", details: err.message });
    }
};
 

export const verifyPayment = async (req, res) => {
    try {
      const { tx_ref } = req.body; // Get the transaction reference from the request
  
      // Make a request to Chapa's verify endpoint
      const response = await axios.get(`${CHAPA_VERIFY_URL}${tx_ref}`, {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
        },
      });
  
      // Check if the payment was successful
      if (response.data.status === "success") {
        // Update your database to mark the payment as successful
        res.status(200).json({ message: "Payment verified successfully", data: response.data });
      } else {
        res.status(400).json({ error: "Payment verification failed", data: response.data });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to verify payment", details: err.message });
    }
  }; 