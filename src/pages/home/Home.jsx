import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import useAuthContext from '../../hooks/useAuthContext';
import ProductCard from '../../components/productPage/ProductCard';

const Home = () => {
  const axiosCus = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axiosCus(`/products?search=${searchText}&filter=${filter}&sort=${sort}`);
        setProducts(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
    };
    fetchData();
  }, [searchText, axiosCus, filter, setLoading, sort]);

  if (loading) {
    return <p>Data loading......</p>
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axiosCus(`/products?search=${searchText}`);
    products(data);
  };

  const handleReset = () => {
    setSearchText('');
    setFilter('');
    setSort('');
  };



  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between my-16'>
      <Helmet>
        <title>MyStore | Home</title>
      </Helmet>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5'>

          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-2 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Social service">Social service</option>
              <option value="Animal welfare">Animal welfare</option>
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
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
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
              onChange={e => {
                setSort(e.target.value)
              }}
              value={sort}
              name='sort'
              id='sort'
              className='border p-2 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button
            onClick={handleReset}
            className='btn btn-sm btn-outline'>
            Reset
          </button>
        </div>

        {/* // Table and Card View */}
        <div className='mt-4'>
          <h1 className='text-sm md:text-lg font-bold text-center my-4 text-red-400'>Here is our all volunteer post</h1>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;

