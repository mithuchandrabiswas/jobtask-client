import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
  const { user } = useAuthContext();
  // console.log(user);
  const { _id,name, image, description, price, ratings, category, date, time } = product || {};
  return (

    <div className="shadow-lg border bg-white hover:scale-105 transition">
      <img className="rounded w-full h-[50vh]" src={image} alt="" />
      <div className="py-4 px-2 text-left  rounded-md space-y-1">
        <h1 className="font-bold">{category}</h1>
        <h3 className="text-[#F1C40F] text-xs lg:text-md text-left">{name}</h3>
        <p className="flex items-center gap-1 text-xs text-gray-600">  <IoTime className="text-red-600" /> <span className="text-red-600">Product Creation Date & Time:</span> {new Date(date).toLocaleDateString()} :{time}</p>
      </div>
      <div>
        <p>{description}</p>
        <p>Price: {price} Rating: {ratings}</p>
      </div>
      
      <Link to={`/product-details/${_id}`} className="btn btn-sm btn-secondary w-full">View Details</Link>
    </div>
  )
}

export default ProductCard;
