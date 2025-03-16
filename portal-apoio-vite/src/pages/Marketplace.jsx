import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Arroz',
      price: 25.90,
      stock: 50,
      image: '/static/images/saca_de_arroz-Foto-Arquivo-EBC.webp',
      description: 'Arroz branco de alta qualidade'
    },
    {
      id: 2,
      name: 'Leite',
      price: 4.50,
      stock: 100,
      image: '/static/images/Leite.jpg',
      description: 'Leite integral fresco'
    },
    {
      id: 3,
      name: 'Café',
      price: 15.90,
      stock: 30,
      image: '/static/images/Café.jpg',
      description: 'Café torrado e moído'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2>Marketplace</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <CartModal />
    </div>
  );
};

export default Marketplace; 