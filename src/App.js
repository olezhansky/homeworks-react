import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.scss";
import Button from "./components/UI/Button/Button";
import Modal from "./components/ModalComponents/Modal/Modal";
import Products from "./pages/Products/Products";
import Header from "./containers/Header/Header";
import Favorite from "./pages/Favorite/Favorite";
import Cart from "./pages/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { 
  addProductToCartAction, 
  fetchProducts, deleteProductFromCartAction, 
  closeModalForAddToCartAction,
  closeModalForDeleteProductFromCartAction
} from "./store/actions";

const App = () => {
  // Hook useDispatch
  const dispatch = useDispatch();

  // Loading products from db
  const isLoadingProducts = useSelector((state) => state.isLoadingProducts);

  // Open modal window for add product to cart
  const isOpenModalForAddToCart = useSelector(state => state.isOpenModalForAddToCart);

  // Data for modal window that add product to cart
  const dataForModalAddProductToCart = useSelector((state) => state.dataForModalAddProductToCart);

  // Is open modal window for delete product with cart
  const isOpenModalForDeleteProductWithCart = useSelector(
    (state) => state.isOpenModalForDeleteProductWithCart
  );

  // Data for delete product with cart
  const productForModalDeleteWithCart = useSelector(
    (state) => state.productForModalDeleteWithCart
  );

  // Set and render products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  // Close modal window for add to cart
  const handleCloseModal = () => {
    dispatch(closeModalForAddToCartAction());
  };

  // Close modal window for delete product with cart
  const handleCloseModalForDeleteWithCart = () => {
    dispatch(closeModalForDeleteProductFromCartAction());
  };

  // Add product to cart  
  const handleAddProductToCart = () => {
    dispatch(addProductToCartAction(dataForModalAddProductToCart[0]));
    handleCloseModal();
  };

  // Delete product with cart
  const handleDeleteProductWithCart = (id) => {
    dispatch(deleteProductFromCartAction(productForModalDeleteWithCart[0]))
  };

  return (
    <div className={styles.App}>
      <Header/>
      {isOpenModalForAddToCart && (
        <Modal
          onClick={handleCloseModal}
          header="Confirm adding to cart this product"
          closeButton={handleCloseModal}
          dataForModalCard={dataForModalAddProductToCart[0]}
          actions={
            <>
              <Button
                products={dataForModalAddProductToCart[0]}
                text="Add to cart"
                onClick={handleAddProductToCart}
              />
            </>
          }
        />
      )}
      {isOpenModalForDeleteProductWithCart && (
        <Modal
          onClick={handleCloseModalForDeleteWithCart}
          header="Confirm delete"
          closeButton={handleCloseModalForDeleteWithCart}
          dataForModalCard={productForModalDeleteWithCart[0]}
          actions={
            <>
              <Button
                products={productForModalDeleteWithCart[0]}
                text="Delete product"
                onClick={handleDeleteProductWithCart}
              />
            </>
          }
        />
      )}
      <Switch>
        <Route path="/products">
          {!isLoadingProducts && (
            <Products />
          )}
        </Route>
        <Route path="/favorite">
          <Favorite
          />
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        <Redirect to="/products" />
      </Switch>
    </div>
  );
};

export default App;
