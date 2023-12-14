/* Require's */
const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

/* Middlewares */
const upload = require('../middlewares/multer-users');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Login validations
const loginValidations = require('../validations/usersLogin');
const loginValidateForm = require('../middlewares/validate-users-login');

// Register validations
const registerValidations = require('../validations/usersRegister');
const registerValidateForm = require('../middlewares/validate-users-register');
const registerValidateEmail = require('../middlewares/validate-users-register-email');

// Admin create validations
const createValidations = require('../validations/usersCreate');
const createValidateForm = require('../middlewares/validate-users-create');
const createValidateEmail = require('../middlewares/validate-users-create-email');

// Edit Validations
const editValidations = require('../validations/usersEdit');
const editValidateForm = require('../middlewares/validate-users-edit');
const editValidateEmail = require('../middlewares/validate-users-edit-email');
const passValidateForm = require('../middlewares/validate-users-pass');
const curdValidateForm = require('../middlewares/validate-users-crud');

/*Routes */

// Login
usersRouter.get('/login', guestMiddleware, usersController.loginForm);
usersRouter.post(
  '/login',
  loginValidations,
  loginValidateForm,
  usersController.login
);

//Register
usersRouter.get('/register', guestMiddleware, usersController.registerForm);
usersRouter.post(
  '/register',
  upload.single('profile_picture'),
  registerValidations,
  registerValidateForm,
  registerValidateEmail,
  usersController.register
);

//Create new user
usersRouter.get(
  '/create-user',
  adminMiddleware,
  usersController.createNewUserForm
);
usersRouter.post(
  '/create-user',
  createValidations,
  createValidateForm,
  createValidateEmail,
  usersController.createNewUser
);

//Users CRUD
usersRouter.get('/crud', authMiddleware, adminMiddleware, usersController.crud);

//Delete User
usersRouter.get(
  '/:id/delete',
  authMiddleware,
  adminMiddleware,
  usersController.deleteForm
);
usersRouter.delete('/:id/delete', authMiddleware, usersController.destroy);

//Edit profile
usersRouter.get(
  '/myProfile/edit',
  authMiddleware,
  usersController.myProfileEdit
);
// usersRouter.get('/:id/prueba', usersController.myProfileEdit); futuro editor admin
// usersRouter.put('/:id', upload.single('image'), usersController.update); futuro editor admin
usersRouter.put(
  '/myProfile/edit',
  upload.single('profile_picture'),
  authMiddleware,
  editValidations,
  editValidateForm,
  editValidateEmail,
  usersController.myProfileUpdate
);

//Edit password
usersRouter.get(
  '/myPassword/edit',
  authMiddleware,
  usersController.myPasswordEdit
);
usersRouter.put(
  '/myPassword/edit',
  upload.single('image'),
  authMiddleware,
  editValidations,
  passValidateForm,
  usersController.updatePassword
);

//Edit profile CRUD
usersRouter.get(
  '/:id/edit',
  authMiddleware,
  adminMiddleware,
  usersController.editProfileCrud
);
usersRouter.put(
  '/:id/edit',
  upload.single('profile_picture'),
  authMiddleware,
  adminMiddleware,
  registerValidations,
  curdValidateForm,
  registerValidateEmail,
  usersController.update
);

// usersRouter.get('/:id/prueba', usersController.myProfileEdit); futuro editor admin
// usersRouter.put('/:id', upload.single('image'), usersController.update); futuro editor admin

//MyProfile
usersRouter.get('/myprofile', authMiddleware, usersController.myProfile);

//Edit profile
usersRouter.get('/logout', usersController.logout);

module.exports = usersRouter;