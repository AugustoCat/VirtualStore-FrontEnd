import React, {useContext} from 'react'
import styles from "./cart.module.css"
import { PRODUCTS } from '../../products'
import {ShopContext} from '../../context/ShopContext';
import CartItem from './CartItem';
import {useNavigate} from "react-router-dom"

function Cart() {
  const { cartItems, getTotalCartAmount, finalizeOrder  } = useContext(ShopContext); //puxa as funcoes do context
  const totalAmount = getTotalCartAmount(); //define um valor para os produtos
  const navigate = useNavigate()  //usa para navegar para o /orders

  const handleFinalizeOrder = () => {
    if (window.confirm("Tem certeza que deseja finalizar o pedido?")) {
        finalizeOrder(navigate("/orders")); 
    }
};


  return (
    
    <div className={styles.cart}>
      <div>
          <h1>Seu carrinho</h1>
        </div>
        <div className={styles.cartItems}>
          {PRODUCTS.map((product) => {
            if( cartItems[product.id] > 0){
              return <CartItem key={product.id} data={product}/>
            }
          })}
        </div>
          {totalAmount > 0 ? (
            <div className={styles.checkout}>
              <p> <b>Total:</b> R$ {totalAmount.toFixed(2)} </p> 
              <button onClick={() => navigate("/")}> Continuar</button> {/* volta para a pag inical */}
              <button onClick={handleFinalizeOrder}> Finalizar pedido </button> 
            </div>
          ) : (
            <h1 style={{marginTop: 50, color: "#aaa"}}>Seu carrinho está vazio!</h1> /* caso o usuario nao tenha produtos, nao permite fazer um pedido, 
              uma vez que o botao responsavel nao aparece */
          )
}
    </div>
  )
}

export default Cart
