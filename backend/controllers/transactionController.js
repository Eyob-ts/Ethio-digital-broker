import Transaction from "../models/Transaction.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const userId = req.user.id; // Assuming the logged-in user is associated with the transaction

    const newTransaction = new Transaction({ user: userId, amount, type, description });
    await newTransaction.save();

    res.status(201).json({ message: "Transaction created successfully", data: newTransaction });
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction", details: err.message });
  }
};

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the logged-in user is the one whose transactions are being fetched
    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ data: transactions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions", details: err.message });
  }
};