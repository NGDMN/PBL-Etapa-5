import React from 'react';

const Training = () => {
  const courses = [
    'Curso de Horta Vertical',
    'Técnicas de Agricultura Familiar',
    'Acesso a Financiamentos para Produtores'
  ];

  return (
    <div className="container my-5">
      <h2>Treinamentos</h2>
      <p>Acesse conteúdos sobre práticas agrícolas sustentáveis e cultivo doméstico.</p>
      <ul className="list-group">
        {courses.map((course, index) => (
          <li key={index} className="list-group-item">
            {course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Training; 