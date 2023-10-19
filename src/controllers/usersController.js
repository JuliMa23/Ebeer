const userServices = require('../services/userServices');
const bcrypt = require('bcryptjs');

const usersController = {
  loginForm: (req, res) => {
    const data = req.session.userData;
    return res.render('login');
  },
  login: (req, res) => {
    const data = req.body;
    req.session.userData = data;
    console.log(data);
    res.redirect('/home');
  },
  registerForm: (req, res) => {
    res.render('register');
  },
  deleteForm: (req, res) => {
    const id = req.params.id;
    const user = userServices.getUser(id);
    res.render('users-delete-form', { user });
  },
  register: (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      accessType: req.body.accessType,
      contactNumber: Number(req.body.contactNumber),
      birthDate: req.body.birthDate,
      address: req.body.address,
      image: req.file ? req.file.filename : userPicture,
    };
    userServices.createUser(user);
    res.redirect('register');
  },
  myProfile: (req, res) => {
    const id = req.params.id;
    const user = userServices.getUser(id);

    return res.render('profile', { user });
  },
  crud: (req, res) => {
    const users = userServices.getAllUsers();
    res.render('users-crud', { users });
  },
  myProfileEdit: (req, res) => {
    const id = req.params.id;
    const user = userServices.getUser(id);
    res.render('profile-edit', { user });
  },
  // myProfileEdit: (req, res) => {
  //   const id = req.params.id;
  //   const user = userServices.getUser(id);
  //   res.render('prueba', { user });
  // }, futuro editor admin
  update: (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : userServices.getUser(id).image;
    user.image = image;
    userServices.updateUser(id, user);
    res.redirect('/home');
  },
  destroy: (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : userServices.getUser(id).image;
    user.image = image;
    userServices.deleteUser(id);
    res.redirect('/users/crud');
  },
};

module.exports = usersController;
