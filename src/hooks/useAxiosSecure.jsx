import axios from 'axios';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';

// Create an axios instance with default options
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_API_URL,  // Base URL from environment variables
    withCredentials: true,  // Ensure cookies are sent with requests
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuthContext();  // Get logout function from auth context
    const navigate = useNavigate();  // Hook for navigation

    // Interceptor for responses
    axiosSecure.interceptors.response.use(
        (res) => {
            // Process the response normally if no error occurs
            return res;
        },
        async (err) => {
            // Handle 401 (Unauthorized) or 403 (Forbidden) errors
            if (err.response.status === 401 || err.response.status === 403) {
                await logOutUser();  // Log out the user
                navigate('/login');  // Redirect to the login page
            }
            return Promise.reject(err);  // Propagate the error
        }
    );

    return axiosSecure;  // Return the configured axios instance
};



export default useAxiosSecure;