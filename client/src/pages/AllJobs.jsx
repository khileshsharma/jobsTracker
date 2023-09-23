import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
const AllJobsContext = createContext();
export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const jobStatus = url.searchParams.get('jobStatus');
    const jobType = url.searchParams.get('jobType');
    const sort = url.searchParams.get('sort');
    const page = url.searchParams.get('page');

    const params = { jobStatus, jobType, sort, page };
    if (search) {
      params.search = search;
    }

    const { data } = await customFetch.get('/jobs', {
      params,
    });
    return {
      data,
      searchValues: { search, jobStatus, jobType, sort },
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;

export const useAllJobsContext = () => useContext(AllJobsContext);
