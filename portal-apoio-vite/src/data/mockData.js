// Dados mockados para desenvolvimento e testes

export const MOCK_USERS = [
  {
    id: 1,
    username: 'teste',
    email: 'teste@exemplo.com',
    first_name: 'Usuário',
    last_name: 'Teste',
    password: 'teste123'
  },
  {
    id: 2,
    username: 'mariajose',
    email: 'maria@exemplo.com',
    first_name: 'Maria',
    last_name: 'José',
    password: 'senha123'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Tomate Orgânico',
    description: 'Tomates orgânicos frescos cultivados sem agrotóxicos.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1546104112-0b8c92a3a9c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Vegetais',
    stock: 30,
    farmer: 'Sítio Esperança',
    average_rating: 4.5,
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Alface Crespa',
    description: 'Alface crespa fresca e verde, cultivada em sistema hidropônico.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Vegetais',
    stock: 25,
    farmer: 'Horta Familiar',
    average_rating: 4.2,
    unit: 'unidade'
  },
  {
    id: 3,
    name: 'Cenoura Orgânica',
    description: 'Cenouras orgânicas cultivadas com técnicas sustentáveis.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Vegetais',
    stock: 40,
    farmer: 'Cooperativa Rural',
    average_rating: 4.7,
    unit: 'kg'
  },
  {
    id: 4,
    name: 'Banana Prata',
    description: 'Banana prata madura e saborosa, ideal para consumo in natura.',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Frutas',
    stock: 50,
    farmer: 'Sítio Boa Safra',
    average_rating: 4.3,
    unit: 'kg'
  },
  {
    id: 5,
    name: 'Batata Doce',
    description: 'Batata doce fresca, rica em nutrientes e sabor.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1596124579928-5846e64f3b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Raízes',
    stock: 35,
    farmer: 'Horta da Serra',
    average_rating: 4.4,
    unit: 'kg'
  },
  {
    id: 6,
    name: 'Mel Puro',
    description: 'Mel puro de abelhas, coletado de forma sustentável.',
    price: 25.90,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Produtos Naturais',
    stock: 15,
    farmer: 'Apiário Flor do Campo',
    average_rating: 4.9,
    unit: '500g'
  },
  {
    id: 7,
    name: 'Ovos Caipira',
    description: 'Ovos caipiras de galinhas criadas ao ar livre, com alimentação natural.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1569127959161-2e16a96d5290?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Produtos Animais',
    stock: 20,
    farmer: 'Granja Feliz',
    average_rating: 4.8,
    unit: 'dúzia'
  },
  {
    id: 8,
    name: 'Abóbora Japonesa',
    description: 'Abóbora japonesa madura e saborosa, ideal para sopas e cremes.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Vegetais',
    stock: 18,
    farmer: 'Fazenda Renascer',
    average_rating: 4.6,
    unit: 'kg'
  },
  {
    id: 9,
    name: 'Manjericão Fresco',
    description: 'Manjericão fresco cultivado sem agrotóxicos, ideal para temperos e molhos.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Ervas',
    stock: 30,
    farmer: 'Horta das Ervas',
    average_rating: 4.7,
    unit: 'maço'
  },
  {
    id: 10,
    name: 'Queijo Minas Artesanal',
    description: 'Queijo minas artesanal produzido com leite fresco de vacas criadas em pasto.',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Laticínios',
    stock: 10,
    farmer: 'Queijaria Serra Azul',
    average_rating: 4.9,
    unit: '500g'
  }
];

// Mock das categorias de produtos
export const MOCK_CATEGORIES = [
  { id: 1, name: 'Vegetais' },
  { id: 2, name: 'Frutas' },
  { id: 3, name: 'Raízes' },
  { id: 4, name: 'Produtos Naturais' },
  { id: 5, name: 'Produtos Animais' },
  { id: 6, name: 'Ervas' },
  { id: 7, name: 'Laticínios' }
]; 