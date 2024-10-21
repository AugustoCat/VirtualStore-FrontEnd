import React, { useState } from 'react';
import styles from './orders.module.css';

const OrderFilter = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState(''); // cria um novo estado para armazenar o termo de busca

    const handleChange = (e) => {
        const term = e.target.value; //valor do input
        setSearchTerm(term); //atualiza o estado com o novo valor
        onFilterChange(term); 
    };

    return (
        <div>
            <label htmlFor="search">Filtrar por Produto ou ID: </label>
            <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleChange} //chama a funcao quando o value do input mudar
                placeholder="Digite o nome do produto ou ID"
                className={styles.orderFilter}
            />
        </div>
    );
};

export default OrderFilter;
