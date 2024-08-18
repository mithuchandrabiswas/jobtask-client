
// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
  // eslint-disable-next-line react/prop-types
  const { product_number, product_name, product_image, description, price, category, ratings, creation_date, creation_time, brand_name } = product;

  return (
    <div className='border rounded-lg p-4'>
      <img src={product_image} alt={product_name} className='w-full h-48 object-cover mb-4' />
      <p>Serial: {product_number} </p>
      <h2 className='text-xl font-bold mb-2'>{product_name}</h2>
      <p className='text-gray-600 mb-2'>{description}</p>
      <p className='text-lg font-semibold mb-2'>${price}</p>
      <p className='text-sm text-gray-500 mb-2'>{category}</p>
      <p className='text-sm text-gray-500 mb-2'>Brand: {brand_name}</p>
      <p className='text-sm text-gray-500 mb-2'>Ratings: {ratings}</p>
      <p className='text-sm text-gray-500'>Added on: {creation_date} at {creation_time}</p>
    </div>
  );
};

export default ProductCard;
