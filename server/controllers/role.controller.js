import MODELS from '../config/db.config.js';
const Role = MODELS.Role;
const findbyId = async (req, res) => {
  let { Id } = req.params;

  await Role.findByPk(Id).then(async (data) => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })
}

const insert = async (req, res) => {

  let { title, permissions, property, status } = req.body;

  await Role.create({ title: title, permissions: permissions, property: property, status: status }).then(async (data) => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })

}

const patch = async (req, res) => {
  let { Id } = req.params;
  let { title, permissions, property, status } = req.body;

  try {
    let role = await Role.findByPk(Id);

    if (!role) {
      console.log('user not found');
      return res.status(404).json({ error: 'user not found' });
    }

    if (title) role.title = title;
    if (permissions) role.permissions = permissions;
    if (property) role.property = property;
    if (status) role.status = status;

    let patchedRole = await role.save();
    res.json({ status: 200, message: "Success", data: patchedRole });
  } catch (error) {
    console.log('error =>', error);
  }
}

const remove = async (req, res) => {
  let { Id } = req.params;

  await Role.update({ status: "deleted" }, { where: { id: Id } }).then(async (data) => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })

}

const filter = async (req, res) => {

  await Role.findAll().then(async data => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })

}

export default {
  findbyId,
  insert,
  patch,
  remove,
  filter,
}
