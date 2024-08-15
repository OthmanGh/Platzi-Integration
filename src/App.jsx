// API : https://fakestoreapi.com/products

import { useEffect, useState } from 'react';
import Product from './components/Product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        return products;
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 p-4">
      <h1 className="text-3xl font-semibold mb-4 text-zinc-700">Platzi Api Intergration</h1>
      {isloading ? (
        'Loading Products....'
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 gap-20">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
