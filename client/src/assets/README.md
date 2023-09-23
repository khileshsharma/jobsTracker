#### Create React APP

[VITE](https://vitejs.dev/guide/)

```sh
npm create vite@latest projectName -- --template react
```

#### Vite - Folder and File Structure

```sh
npm i
```

```sh
npm run dev
```

- APP running on http://localhost:5173/
- .jsx extension

#### Remove Boilerplate

- remove App.css
- remove all code in index.css

  App.jsx

```jsx
const App = () => {
  return <h1>Jobify App</h1>;
};
export default App;
```

#### Project Assets

- get assets folder from complete project
- copy index.css
- copy/move README.md (steps)
  - work independently
  - reference
  - troubleshoot
  - copy

#### Global Styles

- saves times on the setup
- less lines of css
- speeds up the development

- if any questions about specific styles
- Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w)
- Repo - [Default Starter Repo](https://github.com/john-smilga/default-starter)

#### Title and Favicon

- add favicon.ico in public
- change title and favicon in index.html

```html
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <title>Jobify</title>
</head>
```

- resource [Generate Favicons](https://favicon.io/)

#### Install Packages (Optional)

- yes, specific package versions
- specific commands will be provided later
- won't need to stop/start server

```sh
npm install @tanstack/react-query@4.29.5 axios@1.3.6 dayjs@1.11.7 react-icons@4.8.0 react-router-dom@6.10.0 react-toastify@9.1.2 recharts@2.5.0 styled-components@5.3.10

```

#### Router

[React Router](https://reactrouter.com/en/main)

- version 6.4 brought significant changes (loader and action)
- pages as independent entities
- less need for global state
- more pages

#### Setup Router

- all my examples will include version !!!

```sh
npm i react-router-dom@6.10.0
```

App.jsx

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>home</h1>,
  },
  {
    path: '/about',
    element: (
      <div>
        <h2>about page</h2>
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

#### Create Pages

- create src/pages directory
- setup index.js and following pages :

  AddJob.jsx
  Admin.jsx
  AllJobs.jsx
  DashboardLayout.jsx
  DeleteJob.jsx
  EditJob.jsx
  Error.jsx
  HomeLayout.jsx
  Landing.jsx
  Login.jsx
  Profile.jsx
  Register.jsx
  Stats.jsx

```jsx
const AddJob = () => {
  return <h1>AddJob</h1>;
};
export default AddJob;
```

#### Index

App.jsx

```jsx
import HomeLayout from '../ pages/HomeLayout';
```

pages/index.js

```js
export { default as DashboardLayout } from './DashboardLayout';
export { default as Landing } from './Landing';
export { default as HomeLayout } from './HomeLayout';
export { default as Register } from './Register';
export { default as Login } from './Login';
export { default as Error } from './Error';
export { default as Stats } from './Stats';
export { default as AllJobs } from './AllJobs';
export { default as AddJob } from './AddJob';
export { default as EditJob } from './EditJob';
export { default as Profile } from './Profile';
export { default as Admin } from './Admin';
```

App.jsx

```jsx
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
  },
]);
```

#### Link Component

- navigate around project
- client side routing

Register.jsx

```jsx
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link to='/login'>Login Page</Link>
    </div>
  );
};
export default Register;
```

Login.jsx

```jsx
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to='/register'>Register Page</Link>
    </div>
  );
};
export default Login;
```

#### Nested Routes

- what about Navbar?
- decide on root (parent route)
- make path relative
- for time being only home layout will be visible

App.jsx

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
    ],
  },
]);
```

HomeLayout.jsx

```jsx
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <main>
      {/* add things like Navbar */}
      {/* <h1>home layout</h1> */}
      <Outlet />
    </main>
  );
};
export default HomeLayout;
```

#### Index (Home) Page

App.jsx

```jsx
{
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
...
      ]
}
```

#### Error Page

- bubbles up

App.jsx

```jsx
{
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    ...
}
```

Error.jsx

```jsx
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Error Page !!!</h1>
      <Link to='/dashboard'>back home</Link>
    </div>
  );
};
export default Error;
```

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- [Styled Components Docs](https://styled-components.com/)
- [Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

```sh
npm install styled-components@5.3.10
```

```js
import styled from 'styled-components';

const El = styled.el`
  // styles go here
`;
```

- no name collisions, since unique class
- vscode-styled-components extension
- colors and bugs

Landing.jsx

```jsx
import styled from 'styled-components';

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <StyledButton>Click Me</StyledButton>
    </div>
  );
};

const StyledButton = styled.button`
  background-color: red;
  color: white;
`;
export default Landing;
```

#### Style Entire React Component

```js
const Wrapper = styled.el``;

const Component = () => {
  return (
    <Wrapper>
      <h1> Component</h1>
    </Wrapper>
  );
};
```

- only responsible for styling
- wrappers folder in assets

Landing.jsx

```jsx
import styled from 'styled-components';

const Landing = () => {
  return (
    <Wrapper>
      <h1>Landing</h1>
      <div className='content'>some content</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: red;
  h1 {
    color: white;
  }
  .content {
    background-color: blue;
    color: yellow;
  }
`;
export default Landing;
```

#### Landing Page

```jsx
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import styled from 'styled-components';
const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <img src={logo} alt='jobify' className='logo' />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
```

#### Assets/Wrappers

- css optional

  Landing.jsx

```jsx
import Wrapper from '../assets/wrappers/LandingPage';
```

#### Logo Component

- create src/components/Logo.jsx
- import logo and setup component
- in components setup index.js import/export (just like pages)
- replace in Landing

  Logo.jsx

```jsx
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return <img src={logo} alt='jobify' className='logo' />;
};

export default Logo;
```

#### Logo and Images

- logo built in Figma
- [Cool Images](https://undraw.co/)

#### Error Page

Error.jsx

```jsx
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
```

#### Error Page CSS (optional)

assets/wrappers/Error.js

```js
import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Wrapper;
```

#### Register Page

Register.jsx

```jsx
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='form-input'
            defaultValue='john'
            required
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
```

- required attribute

  In HTML, the "required" attribute is used to indicate that a form input field must be filled out before the form can be submitted. It is typically applied to input elements such as text fields, checkboxes, and radio buttons. When the "required" attribute is added to an input element, the browser will prevent form submission if the field is left empty, providing a validation message to prompt the user to enter the required information.

- default value

In React, the defaultValue prop is used to set the initial or default value of an input component. It is similar to the value attribute in HTML, but with a slightly different behavior.

#### FormRow Component

- create components/FormRow.jsx (export/import)

FormRow.jsx

```jsx
const FormRow = ({ type, name, labelText, defaultValue = '' }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormRow;
```

Register.jsx

```jsx
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />

        <FormRow type='password' name='password' />

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
```

#### Login Page

Login Page

```jsx
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Already a member?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
```

#### Register and Login CSS (optional)

assets/wrappers/RegisterAndLoginPage.js

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    font-size: inherit;
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
```

#### Dashboard Pages

App.jsx

```jsx
 {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          { path: 'stats', element: <Stats /> },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
```

Dashboard.jsx

```jsx
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default DashboardLayout;
```

#### Navbar, BigSidebar and SmallSidebar

- in components create :
  Navbar.jsx
  BigSidebar.jsx
  SmallSidebar.jsx

DashboardLayout.jsx

```jsx
import { Outlet } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';

const Dashboard = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* <SmallSidebar  /> */}
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
```

#### Dashboard Layout - CSS (optional)

assets/wrappers/DashboardLayout.jsx

```js
import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
```

#### Dashboard Context

```jsx
import { Outlet } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';

import { useState, createContext, useContext } from 'react';
const DashboardContext = createContext();
const Dashboard = () => {
  // temp
  const user = { name: 'john' };

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log('toggle dark theme');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user');
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          {/* <BigSidebar /> */}
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
```

#### React Icons

[React Icons](https://react-icons.github.io/react-icons/)

```sh
npm install react-icons@4.8.0
```

Navbar.jsx

```jsx

import {FaHome} from 'react-icons/fa'
const Navbar = () => {
  return (
    <div>
      <h2>navbar</h2>
      <FaHome>
    </div>
  )
}

```

#### Navbar - Initial Setup

```jsx
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';

import { useDashboardContext } from '../pages/DashboardLayout';
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>toggle/logout</div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
```

#### Navbar CSS (optional)

assets/wrappers/Navbar.js

```js
import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: none;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
```

#### Links

- create src/utils/links.jsx

```jsx
import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  { text: 'add job', path: '.', icon: <FaWpforms /> },
  { text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
```

- in a second, we will discuss why '.' in "add job"

#### SmallSidebar

SmallSidebar

```jsx
import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';

import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((link) => {
              const { text, path, icon } = link;

              return (
                <NavLink
                  to={path}
                  key={text}
                  className='nav-link'
                  onClick={toggleSidebar}
                  // will discuss in a second
                  end
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
```

- cover '.' path ,active class and 'end' prop

#### Small Sidebar CSS (optional)

assets/wrappers/SmallSidebar.js

```js
import styled from 'styled-components';

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-500);
  }

  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--primary-500);
  }
  .active .icon {
    color: var(--primary-500);
  }
`;
export default Wrapper;
```

#### NavLinks

- components/NavLinks.jsx

```jsx
import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        // admin user
        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className='nav-link'
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
```

#### Big Sidebar

```jsx
import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
```

#### BigSidebar CSS (optional)

assets/wrappers/BigSidebar.js

```js
import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
    }
    .nav-link:hover {
      padding-left: 3rem;
      color: var(--primary-500);
      transition: var(--transition);
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
      transition: var(--transition);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--primary-500);
    }
    .active .icon {
      color: var(--primary-500);
    }
    .pending {
      background: var(--background-color);
    }
  }
`;
export default Wrapper;
```

#### LogoutContainer

components/LogoutContainer.jsx

```jsx
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
```

#### LogoutContainer CSS (optional)

assets/wrappers/LogoutContainer.js

```js
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    color: var(--white);
    background: var(--primary-500);
    transition: 0s;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);

    background: var(--primary-500);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
```

#### ThemeToggle

components/ThemeToggle.jsx

```jsx
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill className='toggle-icon' />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
```

Navbar.jsx

```jsx
<div className='btn-container'>
  <ThemeToggle />
</div>
```

#### ThemeToggle CSS (optional)

assets/wrappers/ThemeToggle.js

```js
import styled from 'styled-components';

const Wrapper = styled.div`
  background: transparent;
  border-color: transparent;
  width: 3.5rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;

  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
export default Wrapper;
```

#### Dark Theme - Logic

DashboardLayout.jsx

```jsx
const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle('dark-theme', newDarkTheme);
  localStorage.setItem('darkTheme', newDarkTheme);
};
```

#### Access Theme

App.jsx

```jsx
const checkDefaultTheme = () => {
  const userPrefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const isDarkTheme =
    localStorage.getItem('darkTheme') === 'true' || userPrefersDarkMode;
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

{
path: 'dashboard',
element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
}
```

DashboardLayout.jsx

```jsx
const Dashboard = ({ isDarkThemeEnabled }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
};
```

#### Dark Theme CSS

index.css

```css
:root {
  /* DARK MODE */

  --dark-mode-bg-color: #333;
  --dark-mode-text-color: #f0f0f0;
  --dark-mode-bg-secondary-color: #3f3f3f;
  --dark-mode-text-secondary-color: var(--grey-300);

  --background-color: var(--grey-50);
  --text-color: var(--grey-900);
  --background-secondary-color: var(--white);
  --text-secondary-color: var(--grey-500);
}

.dark-theme {
  --text-color: var(--dark-mode-text-color);
  --background-color: var(--dark-mode-bg-color);
  --text-secondary-color: var(--dark-mode-text-secondary-color);
  --background-secondary-color: var(--dark-mode-bg-secondary-color);
}

body {
  background: var(--background-color);
  color: var(--text-color);
}
```

#### Folder Setup

- IMPORTANT !!!!
- remove existing .git folder (if any) from client

Mac

```sh
rm -rf .git
```

Windows

```sh
rmdir -Force -Recurse .git
```

```sh
rd /s /q .git
```

- Windows commands were shared by students and I have not personally tested them.
- git status should return :
  "fatal: Not a git repository (or any of the parent directories): .git"
- create jobify directory
- copy/paste client
- move README to root

#### Setup Server

- create package.json

```sh
npm init -y
```

- create and test server.js

```sh
node server
```

#### ES6 Modules

package.json

```json
  "type": "module",
```

Create test.js and implement named import

test.js

```js
export const value = 42;
```

server.js

```js
import { value } from './test.js';
console.log(value);
```

- don't forget about .js extension
- for named imports, names must match

#### Source Control

- create .gitignore
- copy values from client/.gitignore
- create Github Repo (optional)

#### Install Packages and Setup Install Script

```sh
npm install bcryptjs@2.4.3 concurrently@8.0.1 cookie-parser@1.4.6 dayjs@1.11.7 dotenv@16.0.3 express@4.18.2 express-async-errors@3.1.1 express-validator@7.0.1 http-status-codes@2.2.0 jsonwebtoken@9.0.0 mongoose@7.0.5 morgan@1.10.0 multer@1.4.5-lts.1 nanoid@4.0.2 nodemon@2.0.22

```

package.json

```json
"scripts": {
    "setup-project": "npm i && cd client && npm i"
  },
```

- install packages in root and client

```sh
npm run setup-project
```

#### Setup Basic Express

- install express and nodemon.
- setup a basic server which listening on PORT=5100
- create a basic home route which sends back "hello world"
- setup a script with nodemon package.

[Express Docs](https://expressjs.com/)

Express is a fast and minimalist web application framework for Node.js. It simplifies the process of building web applications by providing a robust set of features for handling HTTP requests, routing, middleware, and more. Express allows you to create server-side applications and APIs easily, with a focus on simplicity and flexibility.

[Nodemon Docs](https://nodemon.io/)

Nodemon is a development tool that improves the developer experience. It monitors your Node.js application for any changes in the code and automatically restarts the server whenever a change is detected. This eliminates the need to manually restart the server after every code modification, making the development process more efficient and productive. Nodemon is commonly used during development to save time and avoid the hassle of manual server restarts.

```sh
npm i express@4.18.2 nodemon@2.0.22
```

server.js

```js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5100, () => {
  console.log('server running....');
});
```

package.json

```json
"scripts": {
    "dev": "nodemon server.js"
  },
```

#### Thunder Client

Thunder Client is a popular Visual Studio Code extension that facilitates API testing and debugging. It provides a user-friendly interface for making HTTP requests and viewing the responses, allowing developers to easily test APIs, examine headers, and inspect JSON/XML payloads. Thunder Client offers features such as environment variables, request history, and the ability to save and organize requests for efficient development workflows.

[Thunder Client](https://www.thunderclient.com/)

- install and test home route

#### Accept JSON

Setup express middleware to accept json

server

```js
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
});
```

#### Morgan and Dotenv

[Morgan](https://www.npmjs.com/package/morgan)

HTTP request logger middleware for node.js

[Dotenv](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

```sh
npm i morgan@1.10.0 dotenv@16.0.3
```

```js
import morgan from 'morgan';

app.use(morgan('dev'));
```

- create .env file in the root
- add PORT and NODE_ENV
- add .env to .gitignore

server.js

```js
import * as dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
```

#### New Features

- fetch API
- global await
- watch mode

```js
try {
  const response = await fetch(
    'https://www.course-api.com/react-useReducer-cart-project'
  );
  const cartData = await response.json();
  console.log(cartData);
} catch (error) {
  console.log(error);
}
```

package.json

```json
 "scripts": {
    "watch": "node --watch server.js "
  },
```

#### Basic CRUD

- create jobs array where each item is an object with following properties
  id, company, position
- create routes to handle - create, read, update and delete functionalities

#### Get All Jobs

[Nanoid](https://www.npmjs.com/package/nanoid)

The nanoid package is a software library used for generating unique and compact identifiers in web applications or databases. It creates short and URL-safe IDs by combining random characters from a set of 64 characters. Nanoid is a popular choice due to its simplicity, efficiency, and collision-resistant nature.

```sh
npm i nanoid@4.0.2
```

server.js

```js
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});
```

#### Create, FindOne, Modify and Delete

```js
// CREATE JOB

app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10);
  // console.log(id);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET SINGLE JOB

app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT JOB

app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});
```

#### Not Found Middleware

```js
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
```

#### Error Middleware

```js
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});
```

#### Not Found and Error Middleware

The "not found" middleware in Express.js is used when a request is made to a route that does not exist. It catches these requests and responds with a 404 status code, indicating that the requested resource was not found.

On the other hand, the "error" middleware in Express.js is used to handle any errors that occur during the processing of a request. It is typically used to catch unexpected errors or exceptions that are not explicitly handled in the application code. It logs the error and sends a 500 status code, indicating an internal server error.

In summary, the "not found" middleware is specifically designed to handle requests for non-existent routes, while the "error" middleware is a catch-all for handling unexpected errors that occur during request processing.

- make a request to "/jobss"

```js
// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  // console.log(jobss);
  res.status(200).json({ jobs });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    throw new Error('no job with that id');
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});
```

#### Controller and Router

setup controllers and router

controllers/jobController.js

```js
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end developer' },
  { id: nanoid(), company: 'google', position: 'back-end developer' },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    // throw new Error('no job with that id');
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
};
```

routes/jobRouter.js

```js
import { Router } from 'express';
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
```

server.js

```js
import jobRouter from './routers/jobRouter.js';
app.use('/api/v1/jobs', jobRouter);
```

#### MongoDB

[MongoDb](https://www.mongodb.com/)

MongoDB is a popular NoSQL database that provides a flexible and scalable approach to storing and retrieving data. It uses a document-oriented model, where data is organized into collections of JSON-like documents. MongoDB offers high performance, horizontal scalability, and easy integration with modern development frameworks, making it suitable for handling diverse data types and handling large-scale applications.

MongoDB Atlas is a fully managed cloud database service provided by MongoDB, offering automated deployment, scaling, and monitoring of MongoDB clusters, allowing developers to focus on building their applications without worrying about infrastructure management.

#### Mongoosejs

[Mongoose](https://mongoosejs.com/)

Mongoose is an Object Data Modeling (ODM) library for Node.js that provides a straightforward and elegant way to interact with MongoDB. It allows developers to define schemas and models for their data, providing structure and validation. Mongoose also offers features like data querying, middleware, and support for data relationships, making it a powerful tool for building MongoDB-based applications.

```sh
npm i mongoose@7.0.5
```

server.js

```js
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
```

#### Job Model

models/JobModel.js

```js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
```

#### Create Job

jobController.js

```js
import Job from '../models/JobModel.js';

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};
```

#### Try / Catch

jobController.js

```js
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  try {
    const job = await Job.create('something');
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ msg: 'server error' });
  }
};
```

#### express-async-errors

The "express-async-errors" package is an Express.js middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.

[Express Async Errors](https://www.npmjs.com/package/express-async-errors)

```sh
npm i express-async-errors@3.1.1
```

- setup import at the top !!!

  server.js

```js
import 'express-async-errors';
```

jobController.js

```js
export const createJob = async (req, res) => {
  const { company, position } = req.body;

  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};
```

#### Get All Jobs

jobController.js

```js
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};
```

#### Get Single Job

```js
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};
```

#### Delete Job

jobController.js

```js
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};
```

#### Update Job

```js
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ job: updatedJob });
};
```

#### Status Codes

A library for HTTP status codes is useful because it provides a comprehensive and standardized set of codes that represent the outcome of HTTP requests. It allows developers to easily understand and handle different scenarios during web development, such as successful responses, client or server errors, redirects, and more. By using a status code library, developers can ensure consistent and reliable communication between servers and clients, leading to better error handling and improved user experience.

[Http Status Codes](https://www.npmjs.com/package/http-status-codes)

```sh
npm i http-status-codes@2.2.0

```

- refactor 200 response in all controllers

jobController.js

```js
res.status(StatusCodes.OK).json({ jobs });
```

createJob

```js
res.status(StatusCodes.CREATED).json({ job });
```

#### Custom Error Class

jobController

```js
export const getJob = async (req, res) => {
  ....
  if (!job) {
    throw new Error('no job with that id');
    // return res.status(404).json({ msg: `no job with id ${id}` });
  }
  ...
};

```

errors/customErrors.js

```js
import { StatusCodes } from 'http-status-codes';
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
```

This code defines a custom error class NotFoundError that extends the built-in Error class in JavaScript. The NotFoundError class is designed to be used when a requested resource is not found, and it includes a status code of 404 to indicate this.

Here's a breakdown of the code:

class NotFoundError extends Error: This line defines a new class NotFoundError that extends the built-in Error class. This means that NotFoundError inherits all of the properties and methods of the Error class, and can also define its own properties and methods.

constructor(message): This is the constructor method for the NotFoundError class, which is called when a new instance of the class is created. The message parameter is the error message that will be displayed when the error is thrown.

super(message): This line calls the constructor of the Error class and passes the message parameter to it. This sets the error message for the NotFoundError instance.

this.name = "NotFoundError": This line sets the name property of the NotFoundError instance to "NotFoundError". This is a built-in property of the Error class that specifies the name of the error.

this.statusCode = 404: This line sets the statusCode property of the NotFoundError instance to 404. This is a custom property that is specific to the NotFoundError class and indicates the HTTP status code that should be returned when this error occurs.

By creating a custom error class like NotFoundError, you can provide more specific error messages and properties to help with debugging and error handling in your application.

#### Custom Error

jobController.js

```js
import { NotFoundError } from '../customErrors.js';

if (!job) throw new NotFoundError(`no job with id : ${id}`);
```

middleware/errorHandlerMiddleware.js

```js
import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'Something went wrong, try again later';

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
```

server.js

```js
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

app.use(errorHandlerMiddleware);
```

#### Bad Request Error

400 BAD_REQUEST Bad Request
401 UNAUTHORIZED Unauthorized
403 FORBIDDEN Forbidden
404 NOT_FOUND Not Found

customErrors.js

```js
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
```

#### Validation Layer

[Express Validator](https://express-validator.github.io/docs/)

```sh
npm i express-validator@7.0.1
```

#### Test Route

server.js

```js
app.post('/api/v1/test', (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});
```

#### Express Validator

```js
import { body, validationResult } from 'express-validator';

app.post(
  '/api/v1/test',
  [body('name').notEmpty().withMessage('name is required')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  }
);
```

#### Validation Middleware

middleware/validationMiddleware.js

```js
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors';
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters long')
    .trim(),
]);
```

#### Remove Test Case From Server

#### Setup Constants

utils/constants.js

```js
export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
};

export const JOB_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
};

export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
};
```

models/JobModel.js

```js
import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true }
);
```

#### Validate Create Job

validationMiddleware.js

```js
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);
```

```js
import { validateJobInput } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);
```

- create job request

```json
{
  "company": "coding addict",
  "position": "backend-end",
  "jobStatus": "pending",
  "jobType": "full-time",
  "jobLocation": "florida"
}
```

#### Validate ID Parameter

validationMiddleware.js

```js
import mongoose from 'mongoose';

import { param } from 'express-validator';

export const validateIdParam = withValidationErrors([
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('invalid MongoDB id'),
]);
```

#### Clean DB

#### User Model

models/UserModel.js

```js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

export default mongoose.model('User', UserSchema);
```

#### User Controller and Router

controllers/authController.js

```js
export const register = async (req, res) => {
  res.send('register');
};
export const login = async (req, res) => {
  res.send('register');
};
```

routers/authRouter.js

```js
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

server.js

```js
import authRouter from './routers/authRouter.js';

app.use('/api/v1/auth', authRouter);
```

#### Create User - Initial Setup

authController.js

```js
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
```

- register user request

```json
{
  "name": "john",
  "email": "john@gmail.com",
  "password": "secret123",
  "lastName": "smith"
}
```

#### Admin Role

authController.js

```js
// first registered user is an admin
const isFirstAccount = (await User.countDocuments()) === 0;
req.body.role = isFirstAccount ? 'admin' : 'user';

const user = await User.create(req.body);
```

#### Validate User

validationMiddleware.js

```js
import User from '../models/UserModel.js';

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);
```

authRouter.js

```js
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

router.post('/register', validateRegisterInput, register);
```

#### Hash Passwords

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

```sh
npm i bcryptjs@2.4.3

```

authController.js

```js
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
  // a random value that is added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
};
```

const salt = await bcrypt.genSalt(10);
This line generates a random "salt" value that will be used to hash the password. A salt is a random value that is added to the password before hashing, which helps to make the resulting hash more resistant to attacks like dictionary attacks and rainbow table attacks. The genSalt() function in bcrypt generates a random salt value using a specified "cost" value. The cost value determines how much CPU time is needed to calculate the hash, and higher cost values result in stronger hashes that are more resistant to attacks.

In this example, a cost value of 10 is used to generate the salt. This is a good default value that provides a good balance between security and performance. However, you may need to adjust the cost value based on the specific needs of your application.

const hashedPassword = await bcrypt.hash(password, salt);
This line uses the generated salt value to hash the password. The hash() function in bcrypt takes two arguments: the password to be hashed, and the salt value to use for the hash. It then calculates the hash value using a one-way hash function and the specified salt value.

The resulting hash value is a string that represents the hashed password. This string can then be stored in a database or other storage mechanism to be compared against the user's password when they log in.

By using a salt value and a one-way hash function, bcrypt helps to ensure that user passwords are stored securely and are resistant to attacks like password cracking and brute-force attacks.

##### BCRYPT VS BCRYPTJS

bcrypt and bcryptjs are both popular libraries for hashing passwords in Node.js applications. However, bcryptjs is considered to be a better choice for a few reasons:

Cross-platform compatibility: bcrypt is a native Node.js module that uses C++ bindings, which can make it difficult to install and use on some platforms. bcryptjs, on the other hand, is a pure JavaScript implementation that works on any platform.

Security: While both bcrypt and bcryptjs use the same underlying algorithm for hashing passwords, bcryptjs is designed to be more resistant to certain types of attacks, such as side-channel attacks.

Ease of use: bcryptjs has a simpler and more intuitive API than bcrypt, which can make it easier to use and integrate into your application.

Maintenance: bcrypt has not had any updates since 2017, while bcryptjs is still being actively maintained and updated.

Overall, while bcrypt and bcryptjs are both good choices for hashing passwords in Node.js applications, bcryptjs is considered to be a better choice for its cross-platform compatibility, improved security, ease of use, and ongoing maintenance.

#### Setup Password Utils

utils/passwordUtils.js

```js
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
```

authController.js

```js
import { hashPassword } from '../utils/passwordUtils.js';

const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};
```

#### Login User

- login user request

```json
{
  "email": "john@gmail.com",
  "password": "secret123"
}
```

validationMiddleware.js

```js
export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);
```

authRouter.js

```js
import { validateLoginInput } from '../middleware/validationMiddleware.js';

router.post('/login', validateLoginInput, login);
```

#### Unauthenticated Error

authController.js

```js
import { UnauthenticatedError } from '../errors/customErrors.js';

const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError('invalid credentials');

  res.send('login route');
};
```

#### Compare Password

passwordUtils.js

```js
export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
```

authController.js

```js
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError('invalid credentials');

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');
  res.send('login route');
};
```

Refactor

```js
const isValidUser = user && (await comparePassword(password, user.password));
if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
```

#### JSON Web Token

A JSON Web Token (JWT) is a compact and secure way of transmitting data between parties. It is often used to authenticate and authorize users in web applications and APIs. JWTs contain information about the user and additional metadata, and can be used to securely transmit this information

[Useful Resource](https://jwt.io/introduction)

```sh
npm i jsonwebtoken@9.0.0
```

utils/tokenUtils.js

```js
import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
```

JWT_SECRET represents the secret key used to sign the JWT. When creating a JWT, the payload (data) is signed with this secret key to generate a unique token. The secret key should be kept secure and should not be disclosed to unauthorized parties.

JWT_EXPIRES_IN specifies the expiration time for the JWT. It determines how long the token remains valid before it expires. The value of JWT_EXPIRES_IN is typically provided as a duration, such as "1h" for one hour or "7d" for seven days. Once the token expires, it is no longer considered valid and can't be used for authentication or authorization purposes.

These environment variables (JWT_SECRET and JWT_EXPIRES_IN) are read from the system environment during runtime, allowing for flexibility in configuration without modifying the code.

authController.js

```js
import { createJWT } from '../utils/tokenUtils.js';

const token = createJWT({ userId: user._id, role: user.role });
console.log(token);
```

#### Test JWT (optional)

[JWT](https://jwt.io/)

#### HTTP Only Cookie

An HTTP-only cookie is a cookie that can't be accessed by JavaScript running in the browser. It is designed to help prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.

##### HTTP Only Cookie VS Local Storage

An HTTP-only cookie is a type of cookie that is designed to be inaccessible to JavaScript running in the browser. It is primarily used for authentication purposes and is a more secure way of storing sensitive information like user tokens. Local storage, on the other hand, is a browser-based storage mechanism that is accessible to JavaScript, and is used to store application data like preferences or user-generated content. While local storage is convenient, it is not a secure way of storing sensitive information as it can be accessed and modified by JavaScript running in the browser.

authControllers.js

```js
const oneDay = 1000 * 60 * 60 * 24;

res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});
```

```js
const oneDay = 1000 * 60 * 60 * 24;
```

This line defines a constant oneDay that represents the number of milliseconds in a day. This value is used later to set the expiration time for the cookie.

```js
res.cookie('token', token, {...});:
```

This line sets a cookie with the name "token" and a value of token, which is the JWT that was generated for the user. The ... represents an object containing additional options for the cookie.

httpOnly: true: This option makes the cookie inaccessible to JavaScript running in the browser. This helps to prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.

expires: new Date(Date.now() + oneDay): This option sets the expiration time for the cookie. In this case, the cookie will expire one day from the current time (as represented by Date.now() + oneDay).

secure: process.env.NODE_ENV === 'production': This option determines whether the cookie should be marked as secure or not. If the NODE_ENV environment variable is set to "production", then the cookie is marked as secure, which means it can only be transmitted over HTTPS. This helps to prevent man-in-the-middle (MITM) attacks, which can intercept and modify cookies that are transmitted over unsecured connections.

jobsController.js

```js
export const getAllJobs = async (req, res) => {
  console.log(req);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};
```

<!-- STOPPED HERE AND STARTED WORKING ON THE COCKTAILS -->
<!-- CONTINUE FROM HERE -->

#### Clean DB

#### Connect User and Job

models/User.js

```js
const JobSchema = new mongoose.Schema(
  {
    ....
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
```

#### Auth Middleware

middleware/authMiddleware.js

```js
export const authenticateUser = async (req, res, next) => {
  console.log('auth middleware');
  next();
};
```

server.js

```js
import { authenticateUser } from './middleware/authMiddleware.js';

app.use('/api/v1/jobs', authenticateUser, jobRouter);
```

##### Cookie Parser

[Cookie Parser](https://www.npmjs.com/package/cookie-parser)

```sh
npm i cookie-parser
```

server.js

```js
import cookieParser from 'cookie-parser';
```

#### Access Token

authMiddleware.js

```js
import { UnauthenticatedError } from '../customErrors.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }
  next();
};
```

#### Verify Token

utils/tokenUtils.js

```js
export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
```

authMiddleware.js

```js
import { UnauthenticatedError } from '../customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
```

jobController.js

```js
export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};
```

#### Refactor Create User

jobController.js

```js
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
```

#### Unauthorized Error

customErrors.js

```js
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
```

#### Check Permissions

jobController.js

```js
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  if (job.createdBy.toString() !== req.user.userId) {
    throw new Error('not authorized to access this job');
  }
  res.status(StatusCodes.OK).json({ job });
};
```

#### CheckPermissions Middleware

utils/checkPermissions.js

```js
import { UnauthorizedError } from '../customErrors.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError('not authorized to access this route');
};

export default checkPermissions;
```

jobController.js

```js
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  checkPermissions(req.user, job.createdBy);

  res.status(StatusCodes.OK).json({ job });
};
```

```js
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
};
```

```js
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`no job with id ${id}`);

  checkPermissions(req.user, job.createdBy);
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};
```
