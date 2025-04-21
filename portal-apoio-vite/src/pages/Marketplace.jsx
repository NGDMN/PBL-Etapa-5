import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';

// Dados estáticos para o marketplace
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Tomate Orgânico',
    description: 'Tomates frescos, cultivados sem agrotóxicos.',
    price: 8.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1546750670-43e5e33386db?w=500',
    average_rating: 4.5
  },
  {
    id: 2,
    name: 'Alface Crespa',
    description: 'Alface crespa fresca, colhida no dia.',
    price: 3.5,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=500',
    average_rating: 4.0
  },
  {
    id: 3,
    name: 'Cenoura',
    description: 'Cenouras frescas cultivadas em solo orgânico.',
    price: 4.75,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=500',
    average_rating: 4.2
  },
  {
    id: 4,
    name: 'Batata Doce',
    description: 'Batata doce fresca, ideal para dietas saudáveis.',
    price: 5.25,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1596097634673-97375104538a?w=500',
    average_rating: 3.9
  },
  {
    id: 5,
    name: 'Banana Prata',
    description: 'Banana prata madura, vendida em dúzias.',
    price: 6.99,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500',
    average_rating: 4.7
  },
  {
    id: 6,
    name: 'Mel Puro',
    description: 'Mel puro de abelhas, produzido por pequenos apicultores.',
    price: 25.0,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1582637142339-72ac8fdb5dc3?w=500',
    average_rating: 4.9
  }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Usar dados mockados em vez de fazer chamada à API
  const [products] = useState(MOCK_PRODUCTS);

  // Filtra os produtos com base no termo de busca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5 pt-4">
      <h2 className="mb-4">Marketplace</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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

      <CartModal />
    </div>
  );
};

export default Marketplace; 