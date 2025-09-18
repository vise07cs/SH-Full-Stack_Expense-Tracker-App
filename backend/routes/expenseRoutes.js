const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");


// Add Expense , now with the logged in user ID
router.post("/addExpense",authMiddleware, async (req, res) => {
  try {
    const { amount, description, category} = req.body;
       const userId = req.user.userId; // from JWT

        if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newExpense = await Expense.create({ amount, description, category ,userId });
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all expenses
router.get("/getExpenses",authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const expenses = await Expense.findAll({where: {userId}});
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete expense now only if it belongs to the logged in user
router.delete("/deleteExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // from JWT
    const expense = await Expense.findOne({ where: { id, userId } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.json({ message: "Expense deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
