// API : https://fakestoreapi.com/products

import { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductPopup from './components/ProductPopup';
import LoadingProduct from './components/LoadingProduct';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const selectedProduct = products.find((product) => product.id === selectedProductId);

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

  const handleDragStart = (e, productId) => {
    e.dataTransfer.setData('text/string', productId.toString());
  };

  const handleDragEnd = (e, productId) => {
    e.dataTransfer.clearData();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text/plain');

    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === +productId) {
          return { ...product };
        }

        return product;
      });
    });
  };

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-3xl font-semibold mb-4 text-zinc-700">Platzi Api Intergration</h1>

      {isloading ? (
        <LoadingProduct />
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 gap-10 relative">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                onDragStart={(e, productId) => handleDragStart(e, productId)}
                onDragEnd={(e, productId) => handleDragEnd(e, productId)}
                onDrop={handleDrop}
              >
                <Product product={product} setSelectedProductId={setSelectedProductId} />
              </div>
            );
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
