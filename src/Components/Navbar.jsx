import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, House } from 'phosphor-react'
import style from "./navbar.module.css"
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getTotalItemsInCart  } = useContext(ShopContext); 
  const totalItems = getTotalItemsInCart(); //utilizado para mostrar a quantidade de itens no carrinho

  return (
    <div className={style.navbar}>
      <div className={style.shopTitle}>
        <h1 className={style.shopTitle}>
          <Link to="/" style={{textDecoration: "none", color: " white"}}> 
            <House size={32} weight="bold" />
            Loja do Bau </Link> {/* texto clicavel, para caso o usuario queira */}
          </h1>

      </div>
      <div className={style.links}>
        <Link to="/cart" className={style.cartLink}>
            <ShoppingCart className={style.shoppingCart} size={32} />
              {totalItems > 0 && (
                <span className={style.itemCount}>{totalItems}</span> //quuantia de itens no carrinho
              )}

        </Link>
        <Link to="/orders" className={style.border}> Meus pedidos</Link>
      </div>
    </div>
  )
}

export default Navbar
