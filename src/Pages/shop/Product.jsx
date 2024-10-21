import React, { useContext } from 'react'
import styles from "./product.module.css"
import {ShopContext} from '../../context/ShopContext';

function Product(props) {
    const {id, productName, price, productImg} = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id]
  return (
    <div className={styles.product}>        
        <img src={productImg} alt={productName} />
        <div className={styles.description}>
            <p>
                <b>{productName.slice(0, 50)}{productName.length > 50 && '...'}</b> {/* define que, se um produto tiver 50+ caracter mostra so os primeiros 50 e ... depois */}     
            </p>
            <p>Preço: R$ {price}</p>
        </div>
        <button className={styles.addToCartBttn} onClick={()=>addToCart(id)}>
            Adicionar ao carrinho  {cartItemAmount > 0 && <>({cartItemAmount}) </>}
        </button>
    </div>
  )
}

export default Product
