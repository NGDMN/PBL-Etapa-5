import React from 'react';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <section className="container text-center my-5">
      <h1>Bem-vindo ao Portal de Apoio à Agricultura Familiar</h1>
      <p>Contribuímos para a segurança alimentar e desenvolvimento sustentável.</p>
      <div className="row justify-content-center">
        <div className="col-12 col-md-4 mb-3">
          <a href="https://youtu.be/3I-Z9wGSXOA" className="btn btn-primary btn-block">
            Acessar PV da etapa 3
          </a>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <a href="https://youtu.be/Q2l7wkeTX2o" className="btn btn-primary btn-block">
            Acessar PV da etapa 4
          </a>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <a href="https://www.youtube.com/watch?v=g1ToXmWVX5Y" className="btn btn-primary btn-block">
            Acessar PV da etapa 5
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home; 