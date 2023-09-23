// import {
//   Landing,
//   Error,
//   DashboardLayout,
//   Stats,
//   AllJobs,
//   AddJob,
//   Profile,
//   Login,
//   HomeLayout,
//   EditJob,
//   Admin,
//   Register,
// } from './pages';
// something
import loadable from "@loadable/component";
const Landing = loadable(() => import("./pages/Landing"));
const Error = loadable(() => import("./pages/Error"));
const DashboardLayout = loadable(() => import("./pages/DashboardLayout"));
const Stats = loadable(() => import("./pages/Stats"));
const AllJobs = loadable(() => import("./pages/AllJobs"));
const AddJob = loadable(() => import("./pages/AddJob"));
const Profile = loadable(() => import("./pages/Profile"));
const Login = loadable(() => import("./pages/Login"));
const HomeLayout = loadable(() => import("./pages/HomeLayout"));
const EditJob = loadable(() => import("./pages/EditJob"));
const Admin = loadable(() => import("./pages/Admin"));
const Register = loadable(() => import("./pages/Register"));

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { action as addJobAction } from "./pages/AddJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import {
  loader as editJobLoader,
  action as editJobAction,
} from "./pages/EditJob";
import { loader as statsLoader } from "./pages/Stats";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";

  const isDarkTheme = storedDarkMode || prefersDarkMode;
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const prefersDarkScheme = getInitialDarkMode();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        action: registerAction,
        element: <Register />,
      },
      {
        path: "login",
        action: loginAction,
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout prefersDarkMode={prefersDarkScheme} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-jobs",
            loader: allJobsLoader,
            element: <AllJobs />,
          },

          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
