import { createContext, useContext, useState, useEffect } from 'react';
import { reviews } from '../services/api';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [productReviews, setProductReviews] = useState({});

  const getProductReviews = async (productId) => {
    try {
      const response = await reviews.getByProduct(productId);
      setProductReviews(prev => ({
        ...prev,
        [productId]: response
      }));
      return response;
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      return [];
    }
  };

  const addReview = async (productId, reviewData) => {
    try {
      const response = await reviews.create(productId, reviewData);
      setProductReviews(prev => ({
        ...prev,
        [productId]: [...(prev[productId] || []), response]
      }));
      return response;
    } catch (error) {
      console.error('Erro ao adicionar avaliação:', error);
      throw error;
    }
  };

  return (
    <ReviewContext.Provider value={{
      productReviews,
      getProductReviews,
      addReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext); 