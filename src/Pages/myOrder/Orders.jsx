import React, {useContext, useState} from 'react';
import OrderFilter from './OrderFilter';
import styles from './orders.module.css';

function Orders() {
    // recupera os pedidos do localStorage e analisa como um array, ou inicializa como array vazio se nao tiver nada
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
    // cria um estado para armazenar os pedidos filtrados
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleFilterChange = (term) => {
    if (term) {
         // filtra os pedidos que contêm o que estiver escrito no nome de qualquer item
        setFilteredOrders(
            orders.filter(order => 
                order.items.some(item => 
                    item.productName.toLowerCase().includes(term.toLowerCase()) ||
                    order.id.toString().includes(term.toLowerCase())
                )
            )
        );
    } else {
        // se não tiver filtro, retorna todos os pedido
        setFilteredOrders(orders);
    }
};

  
return (
  <div className={styles.orders}> 
      <h1 className={styles.title}>Pedidos Anteriores</h1>
      <OrderFilter onFilterChange={handleFilterChange} />
      {filteredOrders.length > 0 ? ( //so mostra se  tiver mais que um pedido no armazenamento local
          filteredOrders.map(order => ( //mapeia os produtos filtrados e renderiza eles
              <div key={order.id}>
                  <h2  className={styles.orderName}>Pedido #{order.id}</h2> 
                  <ul>
                    {/* mapeia os itens do pedido*/}
                      {order.items.map(({ productId, productName, productImg,  quantity }) => ( 
                          <li key={productId} className={styles.orderItem}> {/* define o id como key pro children e aplica o estilo do css*/}
                            <img src={productImg} alt={productName} className={styles.productImage} />
                            {productName} - Quantidade: {quantity}
                              
                          </li>
                      ))}
                  </ul>
              </div>
          ))
      ) : (
          <h2>Você não tem pedidos anteriores.</h2> // caso filteredOrders seja 0, aparece tal msg
      )}
  </div>
);

}

export default Orders;
