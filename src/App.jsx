// API : https://fakestoreapi.com/products

import { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductPopup from './components/ProductPopup';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  console.log(selectedProduct);

  console.log(products);

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
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-3xl font-semibold mb-4 text-zinc-700">Platzi Api Intergration</h1>

      {isloading ? (
        'Loading Products....'
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 gap-10 relative">
          {products.map((product) => {
            return <Product product={product} key={product.id} setSelectedProductId={setSelectedProductId} />;
          })}
          {selectedProductId && (
            <>
              <ProductPopup product={selectedProduct} setSelectedProductId={setSelectedProductId} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
