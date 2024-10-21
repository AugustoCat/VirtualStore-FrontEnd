import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../products';


//cria um contexto para o shop
export const ShopContext = createContext(null);

const getDefaultCart = ()=> { //funcao que limpa o carrinho apos realizar uma compra
    let cart = {}
    for(let i=1; i< PRODUCTS.length + 1; i++) {
        cart[i]=0;
    }
    
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart()); //inicia o carrinho vazio
    const [selectedCategory, setSelectedCategory] = useState(null); 

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1})) 
    }
    

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
    }

    const updateCartItemCount = (newAmount, itemId) =>{
        setCartItems((prev)=> ({...prev, [itemId]: newAmount})) // define a nova quantidade para o item
    }

    const getTotalCartAmount = () => { //contexto usado na finalizacao do pedido para mostrar o valor total
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item)) //acha o produto exato pelo ID
                totalAmount += cartItems[item] * itemInfo.price //multiplica a quantidade de produto X vezes seu preco para mostar o preco final do pedido
            }
        }
        return totalAmount
    }

    const finalizeOrder = () => {
        const order = {
            id: Date.now(), //gera um id unico com base no timestamp
            items: Object.entries(cartItems).filter(([id, quantity]) => quantity > 0).map(([id, quantity]) => {
              const product = PRODUCTS.find(p => p.id === Number(id)); ///encontra o produto pelo id novamnet
              return {
                productId: product.id,
                productName: product.productName,
                productImg: product.productImg,
                price: product.price,
                quantity,
              };
            }),
          };
        
          //armazena o novo pedido no localStorage
        const previousOrders = JSON.parse(localStorage.getItem('orders')) || [];
        previousOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(previousOrders));
        
          //volta o carrinho vazio ao finalizar a compra
        setCartItems(getDefaultCart());
      };


    // retorna a quantidade total de itens no carrinho
      const getTotalItemsInCart = () => {
        return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
    };

       // filtra produtos pela categoria selecionada
    const filterProductsByCategory = (category) => {
      setSelectedCategory(category); // atualiza a categoria selecionada
  };

  // filtra os produtos com base na categoria selecionada
  const filteredProducts = selectedCategory
  ? PRODUCTS.filter(product => product.category === selectedCategory) //filtra por categoria
  : PRODUCTS; //retorna todos os produtos se nenhuma categoria estiver selecionada

    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, finalizeOrder, getTotalItemsInCart, filterProductsByCategory, filteredProducts }

  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
