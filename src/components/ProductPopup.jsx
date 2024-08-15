import { IoMdCloseCircle } from 'react-icons/io';

const ProductPopup = ({ product, setSelectedProductId }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-75 z-10 p-10 text-white">
      <IoMdCloseCircle
        className="absolute top-20 right-20 rounded-full text-3xl text-slate-200 hover:text-slate-50 transition-all duration-500 cursor-pointer z-40"
        onClick={() => setSelectedProductId(null)}
      />

      <div className="grid grid-cols-2  justify-center items-center z-20">
        <img src={product.image} alt="image alt" className="h-[80%] object-cover rounded-sm" />

        <div className="flex flex-col gap-10 p-8 text-slate-100">
          <h2 className="text-2xl text-slate-100">{product.title}</h2>
          <p className="text-lg">{product.category}</p>
          <p className="text-md text-slate-300">{product.description}</p>
          <p className="flex gap-10 text-lg">
            <span> {product.rating.rate}</span>
            <span>{product.rating.count}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
