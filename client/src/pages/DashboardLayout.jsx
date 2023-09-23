import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar, Loading } from '../components';

import { useState, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const Dashboard = ({ prefersDarkMode }) => {
  const { user } = useLoaderData();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        logoutUser();
        return;
      }
      return Promise.reject(error);
    }
  );

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        isDarkTheme,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
