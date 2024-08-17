import { Helmet } from "react-helmet";
import { CiMail } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const ProductDetails = () => {
    const productsData = useLoaderData();
    const { user } = useAuthContext();
    const { id } = useParams();
    console.log(productsData);

    // find Method Use for achive singleCraft
    const productData = productsData.find(item => item._id == id);
    const {  name,image, description, category, date, time } = productData;
    // console.log(productData);
    return (
        <div className="py-4 px-3 flex flex-col-reverse lg:flex-row justify-center items-center bg-[#10101034] rounded mt-20 border">
            <Helmet>
                <title>MyStore | Details Page</title>
            </Helmet>

            <div className="px-1 w-full md:px-4 space-y-2 lg:w-1/2">
                <h3 className="text-[#111] font-bold text-xs lg:text-lg text-left">{category}</h3>
                <h1 className="text-sm md:text-lg font-bold text-[#5a7f81]">{name}</h1>
                <h3 className="text-xs lg:text-base font-bold">{description}</h3>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex items-center">
                        <IoTime className="text-red-600 mr-2" />
                        <p className="flex items-center gap-1 text-xs text-gray-600"> {new Date(date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                        <FaLocationDot className="text-[#E74C3C]" />
                        {/* <p className="flex items-center gap-1 text-xs text-gray-600"> {location}</p> */}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ProductDetails;