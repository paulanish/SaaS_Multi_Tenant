import MODELS from '../config/db.config.js';

const Tenant = MODELS.Tenant;

const findbyId = async (req, res) => {
  let { Id } = req.params;

  await Tenant.findByPk(Id).then(async (data) => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })
}

const insert = async (req, res, next) => {

  let { title, register } = req.body;

  await Tenant.create({ title: title }).then(async (data) => {

    if (register) {
      req.body.tenantid = data.id;
      console.log('Comment =>', req.body.tenantid, data.id);
      next();
    } else {
      res.json({ status: 200, message: "Success", data: data });
    }

  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })

}

const patch = async (req, res) => {
  let { Id } = req.params;
  let { title, property, status } = req.body;

  try {
    let tenant = await Tenant.findByPk(Id);

    if (!tenant) {
      console.log('tenant not found');
      return res.status(404).json({ error: 'tenant not found' });
    }

    if (title) tenant.title = title;
    if (property) tenant.property = property;
    if (status) tenant.status = status;


    let patchedTenant = await tenant.save();
    res.json({ status: 200, message: "Success", data: patchedTenant });
  } catch (error) {
    console.log('error =>', error);
  }
}

const remove = async (req, res) => {
  let { Id } = req.params;

  await Tenant.update({ status: "deleted" }, { where: { id: Id } }).then(async (data) => {
    res.json({ status: 200, message: "Success", data: data });
  }).catch(async (error) => {
    res.json({ 'status': 400, 'message': error.message });
  })

}

const filter = async (req, res) => {

  await Tenant.findAll().then(async data => {
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
