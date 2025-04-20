import { useState, useEffect } from 'react';
import { Product } from '../types';
import { products } from '../services/api';
import ProductCard from './ProductCard';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await products.getAll();
        setProductsList(response);
      } catch (error) {
        toast.error('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <div className="marketplace">
      <h1>Produtos</h1>
      <div className="products-grid">
        {productsList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home; 