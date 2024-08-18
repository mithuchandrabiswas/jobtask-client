import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import useAuthContext from '../../hooks/useAuthContext';
import ProductCard from '../../components/productPage/ProductCard';

const Home = () => {
  const axiosCus = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12); // Number of products per page
  const { loading, setLoading } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosCus(`/products?search=${search}&filter=${filter}&sort=${sort}&page=${currentPage}&limit=${limit}`);
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [search, axiosCus, filter, sort, currentPage, limit, setLoading]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(searchText);
    console.log(searchText); // Log the search text directly here
    setCurrentPage(1); // Reset to first page on search
  };

  // Log the search state whenever it updates
  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleReset = () => {
    setSearchText('');
    setFilter('');
    setSort('');
    setCurrentPage(1); // Reset to first page on reset
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate pagination
  const numberOfPages = totalPages;
  const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);

  if (loading) {
    return <p>Data loading......</p>;
  }

  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between my-16'>
      <Helmet>
        <title>MyStore | Home</title>
      </Helmet>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
          <div>
            <select
              onChange={e => setFilter(e.target.value)}
              value={filter}
              name='category'
              id='category'
              className='border p-2 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent input-xs md:input-sm'
                type='text'
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Search Products'
                aria-label='Search Products'
              />
              <button
                type='submit'
                className='btn btn-sm text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none  hidden md:block'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={e => setSort(e.target.value)}
              value={sort}
              name='sort'
              id='sort'
              className='border p-2 rounded-md'
            >
              <option value=''>Sort By</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
              <option value='date-asc'>Date Added: Oldest First</option>
              <option value='date-desc'>Date Added: Newest First</option>
            </select>
          </div>
          <button
            onClick={handleReset}
            className='btn btn-sm btn-outline'>
            Reset
          </button>
        </div>

        {/* Product Display */}
        <div className='mt-4'>
          <h1 className='text-sm md:text-lg font-bold text-center my-4 text-red-400'>Here are all our products</h1>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination Section */}
          <div className='flex justify-center mt-12'>
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
            >
              <div className='flex items-center -mx-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 mx-1 rtl:-scale-x-100'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 16l-4-4m0 0l4-4m-4 4h18'
                  />
                </svg>

                <span className='mx-1'>Previous</span>
              </div>
            </button>
            {/* Page Numbers */}
            {pages.map(btnNum => (
              <button
                onClick={() => handlePageChange(btnNum)}
                key={btnNum}
                className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${currentPage === btnNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white`}
              >
                {btnNum}
              </button>
            ))}
            {/* Next Button */}
            <button
              disabled={currentPage === numberOfPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
            >
              <div className='flex items-center -mx-1'>
                <span className='mx-1'>Next</span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 mx-1 rtl:-scale-x-100'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
