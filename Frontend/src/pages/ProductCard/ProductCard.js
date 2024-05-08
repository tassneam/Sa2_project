import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from './ProductCard.module.css';
import api, {getProductByName} from "../../api";

export const ProductCard = ({ details, setLatestProductAddedToCart }) => {
  const [error, setError] = useState('');
  const {  description, name, stock } = details;
  const history = useHistory();

  const updateProductHandler = async () => {
    try {

      const response = await api.getProductByName(name);


      history.push(`/update-product/${response.data.id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error while updating product!');
    }
  };
  const deleteProductHandler = async () => {
    try {
      const response = await api.getProductByName(name);
      const response2 = await api.deleteProduct(response.data.id);

      console.log('Product deleted success:', response2.data.message);

      window.location.reload();



    } catch (err) {
      setError(err.message || 'An error occurred during product delete.');
      console.error('Product delete error:', err);
    }
  };

  return (
      <div className={classes.card}>
        <h1>{name}</h1>
        <p className={classes.location}><h3>Description: {description}</h3></p>
        <h3>Stock: {stock}</h3>
        <button className={classes.updateWarehouse} onClick={updateProductHandler}>Update Product</button>
        <p></p>
        <button className={classes.updateWarehouse} onClick={deleteProductHandler}>delete Product</button>

        {error && <p className={classes.errorMsg}>{error}</p>}
      </div>
  )
}
