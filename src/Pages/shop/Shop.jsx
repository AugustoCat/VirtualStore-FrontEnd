import React, { useContext, useState } from 'react';
import styles from "./shop.module.css";
import { ShopContext } from '../../context/ShopContext';
import Product from './Product';
import { Link } from 'react-router-dom';

function Shop() {
  const { filteredProducts, filterProductsByCategory } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);

  //produtos por pagina
  const productsPerPage = 6;

  //lidar com o filtro de categoria
  const handleCategoryChange = (category) => {
    filterProductsByCategory(category);
    setCurrentPage(1); //mudar a pagina para 1 ao aplicar o filtro
  };

  const indexOfLastProduct = currentPage * productsPerPage; //calcula o index do ultimo produto a ser exibido
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //calcula o index do primeiro para mostrar
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); //produtos que irao mostrar
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); //calcula o numero total de páginas, arrendado para cima para evitar erros

  return (
    <div>
      <div className={styles.categoryTab}>
        <button onClick={() => handleCategoryChange("Eletronicos")}>Eletronicos</button>
        <button onClick={() => handleCategoryChange("Moda")}>Moda</button>
        <button onClick={() => handleCategoryChange("Calçados")}>Calçados</button>
        <button onClick={() => handleCategoryChange("Materiais")}>Materiais</button>
        <button onClick={() => handleCategoryChange("Acessórios")}>Periféricos</button>
        <button onClick={() => handleCategoryChange(null)}>Todos</button>
      </div>
      <div className={styles.shop}>
        <div className={styles.products}>
          {currentProducts.map((product) => //faz o .map nos produtos ja filtadros e renderiza eles
            <Product key={product.id} data={product} />
          )}
        </div>
      </div>
      {filteredProducts.length > 6 && ( //mostra a paginacao somente se tiver mais que 6 produtos, ou seja, mais que uma pagina
        <div className={styles.pageSelector} >
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>  
            {currentPage} / {totalPages}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&gt;</button>
      </div> //volta uma pagina mas define o minimo de 1 pagina, e avanca uma pagina definindo o maximo como a quantia maxima de paginas
      ) }
    </div>
  );
}

export default Shop;
