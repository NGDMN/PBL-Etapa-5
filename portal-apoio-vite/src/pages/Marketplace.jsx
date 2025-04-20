import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Arroz',
      price: 25.90,
      stock: 50,
      image: 'https://via.placeholder.com/300x200?text=Arroz',
      description: 'Arroz branco de alta qualidade'
    },
    {
      id: 2,
      name: 'Leite',
      price: 4.50,
      stock: 100,
      image: 'https://via.placeholder.com/300x200?text=Leite',
      description: 'Leite integral fresco'
    },
    {
      id: 3,
      name: 'Café',
      price: 15.90,
      stock: 30,
      image: 'https://via.placeholder.com/300x200?text=Café',
      description: 'Café torrado e moído'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try {
      // Verificar se as imagens existem
      products.forEach(product => {
        const img = new Image();
        img.src = product.image;
        img.onerror = () => {
          console.error(`Erro ao carregar imagem: ${product.image}`);
        };
      });
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    }
  }, []);

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

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