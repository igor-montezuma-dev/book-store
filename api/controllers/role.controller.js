import Role from "../models/role.js";

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      res.status(201).send("Role created successfully");
    } else {
      res.status(400).send("An error occurred while creating the role");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });
    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).send("Role updated!");
    } else {
      return res.status(404).send("Role not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });
    if (role) {
      await Role.findByIdAndDelete(req.params.id);
      return res.status(200).send("Role deleted!");
    } else {
      return res.status(404).send("Role not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
