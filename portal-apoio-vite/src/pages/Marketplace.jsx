import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const products = [
    {
      id: 1,
      name: 'Arroz',
      price: 25.90,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      description: 'Arroz branco de alta qualidade'
    },
    {
      id: 2,
      name: 'Leite',
      price: 4.50,
      stock: 100,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
      description: 'Leite integral fresco'
    },
    {
      id: 3,
      name: 'Café',
      price: 15.90,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300',
      description: 'Café torrado e moído'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container my-5 pt-4">
      <h2 className="mb-4">Marketplace</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      )}

      <CartModal />
    </div>
  );
};

export default Marketplace; 