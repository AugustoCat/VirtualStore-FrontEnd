import React, {useContext} from 'react'
import styles from './cart.module.css';
import {ShopContext} from '../../context/ShopContext';

const CartItem = (props) => {
    const { id, productName, price, productImg } = props.data ;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount  } = useContext(ShopContext);
  return (
    <div className={styles.cartItem}>
      <img src={productImg} alt={productName}  />
      <div className={styles.description}>
        <p>
            <b>{productName}</b>
        </p>
        <p> R$:{price}</p>
        <div className={styles.countHandler}>
            <button onClick={()=> removeFromCart(id)}>-</button>
            <input value={cartItems[id]} onChange={(e)=>{ updateCartItemCount(Number(e.target.value), id)}} />
            <button  onClick={()=> addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
