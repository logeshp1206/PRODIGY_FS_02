import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected and admin-only
router.use(protect, adminOnly);

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
