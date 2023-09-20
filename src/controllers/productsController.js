const productServices = require('../services/productServices');

const productsController = {
  // Product list
  products: (req, res) => {
    const products = productServices.getAllProducts();
    res.render('products', { products });
  },
  // Product detail
  productDetail: (req, res) => {
    res.render('product-detail');
  },
  // addForm - product add form view
  addForm: (req, res) => {
    res.render('product-add-form');
  },
  create: (req, res) => {
    const product = req.body;
    console.log(product);
    res.redirect('products');
  },
  //   const allProducts = productsServices.getProducts(); // invoca el array de objetos dentro del json de productos (listado completo de productos)
  //   const editId = allProducts[id]; // trae de todos los productos, el producto segun su ubicacion en el array
  //   res.render('product-edit-form', { editId: editId }); // trae la vista con el producto solicitado por el usuario mediante el id en la url
  // },
  editProduct: (req, res) => {
    const id = req.params.id;
    const product = productServices.getProduct(id);
    res.render('product-edit-form', { product });
  },
  productEditPut: (req, res) => {
    const id = req.params.id; // id que escribe el usuario por url para obtener la vista del formulario de edicion del producto con ese id
    const editedProduct = productServices.getProduct(id);

    // const beer = req.body;
    if (editedProduct) {
      // Si se encontró un producto con el ID dado, lo enviamos en la respuesta.
      console.log(editedProduct);
      res.send(editedProduct);
    } else {
      // Si no se encontró un producto con el ID dado, puedes enviar una respuesta de error.
      res.status(404).send('Producto no encontrado');
    }
    // console.log(editedProduct);
    // res.send(editedProduct);
  },
  productEditDelete: (req, res) => {
    let productDelete = req.params.productDelete;
    res.send(productDelete);
  },
  productCrud: (req, res) => {
    res.render('product-crud');
  },
  productCart: (req, res) => {
    res.render('product-cart');
  },
  productCartFilled: (req, res) => {
    res.render('product-cart-filled');
  },
  productForm: (req, res) => {
    res.render('product-form');
  },
};

module.exports = productsController;
