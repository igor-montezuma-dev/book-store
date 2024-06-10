import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/role.controller.js";

const router = express.Router();

router.get("/get-all", getAllRoles);
router.post("/create-role", createRole);
router.put("/update-role/:id", updateRole);
router.delete("/delete-role/:id", deleteRole);

export default router;
