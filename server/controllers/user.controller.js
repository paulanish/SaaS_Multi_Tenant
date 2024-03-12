// import bcrypt from 'bcryptjs';
// import UserModel from '../models/user.model.js';

// export const createUser = async (req, res) => {
//   const { name, email, password, tenantid, mobile_number, property } = req.body;

//   try {
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       tenantid,
//       mobile_number,
//       property,
//     };

//     const user = await UserModel.create(newUser);

//     res.status(201).json({ status: 200, message: 'Success', data: user });
//   } catch (error) {
//     console.log('createUser Error =>', error);
//     res.status(500).json({ status: 500, message: 'Internal server error.' });
//   }
// };

// export const findAllUsers = async (req, res) => {
//   try {
//     const users = await UserModel.findAll();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Some error occurred while retrieving users.",
//     });
//   }
// };

// export const findUserById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await UserModel.findByPk(id);
//     if (user) {
//       res.send(user);
//     } else {
//       res.status(404).send({ message: `Cannot find User with id=${id}.` });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Error retrieving User with id=" + id });
//   }
// };
// export const updateUserById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const userToUpdate = await UserModel.findByPk(id);

//     if (!userToUpdate) {
//       return res.status(404).send({
//         message: `User with id=${id} not found.`,
//       });
//     }

//     // Update only the provided fields in req.body
//     const updatedUser = await userToUpdate.update(req.body);

//     res.send({
//       message: "User was updated successfully.",
//       updatedUser
//     });
//   } catch (error) {
//     console.log('updateUserById Error =>', error);
//     res.status(500).send({
//       message: "Error updating user with id=" + id
//     });
//   }
// };


// export const updateUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const userToUpdate = await UserModel.findByPk(id);

//     if (!userToUpdate) {
//       return res.status(404).send({
//         message: `User with id=${id} not found.`,
//       });
//     }

//     const updatedUser = await userToUpdate.update(req.body);

//     res.send({
//       message: "User was updated successfully.",
//       updatedUser
//     });
//   } catch (error) {
//     console.log('updateUser Error =>', error);
//     res.status(500).send({
//       message: "Error updating user with id=" + id
//     });
//   }
// };

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const num = await UserModel.destroy({ where: { id } });
//     if (num == 1) {
//       res.send({ message: "User was deleted successfully!" });
//     } else {
//       res.send({ message: `Cannot delete User with id=${id}. Maybe User was not found!` });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Could not delete User with id=" + id });
//   }
// };

// export const deleteAllUsers = async (req, res) => {
//   try {
//     const nums = await UserModel.destroy({ where: {}, truncate: false });
//     res.send({ message: `${nums} Users were deleted successfully!` });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Some error occurred while removing all users.",
//     });
//   }
// };

// export const findAllActiveUsers = async (req, res) => {
//   try {
//     const users = await UserModel.findAll({ where: { status: 'active' } });
//     res.send(users);
//   } catch (error) {
//     res.status(500).send({
//       message: error.message || "Some error occurred while retrieving active users.",
//     });
//   }
// };

// export default {
//   createUser,
//   findAllUsers,
//   findUserById,
//   updateUserById,
//   updateUser,
//   deleteUser,
//   deleteAllUsers,
//   findAllActiveUsers
// }


import bcrypt from "bcrypt";
import MODELS from "../config/db.config.js";
 
const User = MODELS.User;
const Role = MODELS.Role;
const Tenant = MODELS.Tenant;
 
const findbyId = async (req, res) => {
  let { Id } = req.params;
 
  await User.findByPk(Id, {
    include: [{ model: Role, as: "role" }, { model: Tenant, as: "tenant" }],
  })
    .then(async (data) => {
      res.json({ status: 200, message: "Success", data: data });
    })
    .catch(async (error) => {
      res.json({ status: 400, message: error.message });
    });
};
 
const insert = async (req, res) => {
  let {
    tenantid,
    roleid,
    password,
    name,
    emailid,
    mobileno,
    property,
    status,
  } = req.body;
 
  let hashedPassword = bcrypt.hashSync(password, 10);
 
  await User.create({
    tenantId: tenantid,
    roleId: roleid,
    password: hashedPassword,
    name: name,
    emailid: emailid,
    mobileno: mobileno,
    property: property,
    status: status,
  })
    .then(async (data) => {
      res.json({ status: 200, message: "Success", data: data });
    })
    .catch(async (error) => {
      res.json({ status: 400, message: error.message });
    });
};
 
const patch = async (req, res) => {
  let { Id } = req.params;
  let { roleid, password, name, emailid, mobileno, property, status } =
    req.body;
 
  try {
    let user = await User.findByPk(Id);
 
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "user not found" });
    }
 
    if (roleid) user.roleId = roleid;
    if (password) user.password = password;
    if (name) user.name = name;
    if (emailid) user.emailid = emailid;
    if (mobileno) user.mobileno = mobileno;
    if (property) user.property = property;
    if (status) user.status = status;
 
    let patchedUser = await user.save();
    res.json({ status: 200, message: "Success", data: patchedUser });
  } catch (error) {
    console.log("error =>", error);
  }
};
 
const remove = async (req, res) => {
  let { Id } = req.params;
 
  await User.update({ status: "deleted" }, { where: { id: Id } })
    .then(async (data) => {
      res.json({ status: 200, message: "Success", data: data });
    })
    .catch(async (error) => {
      res.json({ status: 400, message: error.message });
    });
};
 
const filter = async (req, res) => {
  await User.findAll()
    .then(async (data) => {
      res.json({ status: 200, message: "Success", data: data });
    })
    .catch(async (error) => {
      res.json({ status: 400, message: error.message });
    });
};
 
export default {
  findbyId,
  insert,
  patch,
  remove,
  filter,
};
