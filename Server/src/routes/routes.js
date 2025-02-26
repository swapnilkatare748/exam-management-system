const express = require("express");
const authRoutes = require("./authRoutes"); // ✅ Correct Import
const examRoutes = require("./examRoutes");
const quations = require('./questionRoutes');

const router = express.Router();

// ✅ Use authentication routes
// http://localhost:8049/apis/

router.use("/auth", authRoutes);

router.use("/exam",examRoutes);

router.use("/quetion",quations);

module.exports = router;
