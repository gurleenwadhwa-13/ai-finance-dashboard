const express = require("express")
const router = express.Router()
const { auth } = require("../../middleware/auth")
const financialOverviewController = require("../../controllers/financialOverviewController")

// @route   GET api/financial-overview
// @desc    Get financial overview data
// @access  Private
router.get("/", auth, financialOverviewController.getFinancialOverview)

module.exports = router
