import { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductPopup from './components/ProductPopup';
import LoadingProduct from './components/LoadingProduct';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    e.dataTransfer.setData('text/plain', productId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetProductId) => {
    e.preventDefault();
    const draggedProductId = e.dataTransfer.getData('text/plain');

    setProducts((prevProducts) => {
      const draggedIndex = prevProducts.findIndex((p) => p.id === +draggedProductId);
      const targetIndex = prevProducts.findIndex((p) => p.id === targetProductId);

      if (draggedIndex === -1 || targetIndex === -1) return prevProducts;

      const updatedProducts = [...prevProducts];
      [updatedProducts[draggedIndex], updatedProducts[targetIndex]] = [updatedProducts[targetIndex], updatedProducts[draggedIndex]];

      return updatedProducts;
    });
  };

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-3xl font-semibold mb-4 text-zinc-700">Drag and Drop Product List</h1>

      {isLoading ? (
        <LoadingProduct />
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 gap-10 relative">
          {products.map((product) => (
            <div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, product.id)}
            >
              <Product product={product} setSelectedProductId={setSelectedProductId} />
            </div>
          ))}

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
