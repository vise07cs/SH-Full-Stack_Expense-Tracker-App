const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");


// Add Expense
router.post("/addExpense", async (req, res) => {
  try {
    const { amount, description, category,userId } = req.body;

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
router.get("/getExpenses", async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete expense
router.delete("/deleteExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

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
