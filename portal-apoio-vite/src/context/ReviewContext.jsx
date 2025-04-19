import { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    setReviews(prev => [...prev, review]);
  };

  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === productId);
  };

  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((total, review) => total + review.rating, 0);
    return sum / productReviews.length;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      getAverageRating
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext); 