import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Filtra apenas produtos com dados válidos e cujo nome inclui o termo de busca
  const filteredProducts = products
    .filter(product => 
      product && 
      product.name && 
      typeof product.name === 'string' && 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        
        // Verifica se data é um array antes de definir os produtos
        if (Array.isArray(data)) {
          // Garante que todos os produtos tenham os campos necessários
          const validProducts = data.map(product => ({
            id: product.id || Math.random().toString(36).substr(2, 9),
            name: product.name || 'Produto sem nome',
            description: product.description || 'Sem descrição',
            price: Number(product.price) || 0,
            stock: Number(product.stock) || 0,
            image: product.image || null,
            average_rating: Number(product.average_rating) || 0
          }));
          
          setProducts(validProducts);
          console.log('Produtos processados:', validProducts);
        } else {
          console.error('Dados de produtos inválidos:', data);
          setError('Formato de dados inválido');
        }
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Erro no marketplace:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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