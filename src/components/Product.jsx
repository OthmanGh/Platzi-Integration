const Product = ({ product, setSelectedProductId }) => {
  const { id } = product;

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 bg-slate-200 p-4 rounded  cursor-pointer hover:bg-slate-300 transition-all duration-500 ease-in-out"
      onClick={() => setSelectedProductId(id)}
    >
      <h1 className="text-lg font-semibold text-slate-600 text-center ">{product.title}</h1>
      <img src={product.image} alt="image" className="w-[300px] h-[300px] rounded-sm object-cover" />
      <p className="text-red-600 font-semibold text-xl">{product.price}$</p>
    </div>
  );
};

export default Product;
