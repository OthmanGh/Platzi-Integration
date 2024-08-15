const Product = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-300 p-4 rounded">
      <h1 className="text-lg font-semibold text-slate-600 text-center">{product.title}</h1>
      <img src={product.image} alt="image" className="w-[350px] h-[350px] rounded-sm" />
      <p className="text-red-600 font-semibold text-xl">{product.price}$</p>
    </div>
  );
};

export default Product;
