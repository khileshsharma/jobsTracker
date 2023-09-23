import{s as e,j as i,L as n,a}from"./index-08736327.js";const r="/assets/main-bfab0516.svg",s=e.main`
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
`,m=()=>i.jsxs(s,{children:[i.jsx("nav",{children:i.jsx(n,{})}),i.jsxs("div",{className:"container page",children:[i.jsxs("div",{className:"info",children:[i.jsxs("h1",{children:["job ",i.jsx("span",{children:"tracking"})," app"]}),i.jsx("p",{children:"Streamline Your Job Search: Keep tabs on all your job applications in one place. Stay organized and land your dream job effortlessly."}),i.jsx(a,{to:"/register",className:"btn register-link",children:"Register"}),i.jsx(a,{to:"/login",className:"btn",children:"Login / Demo User"})]}),i.jsx("img",{src:r,alt:"job hunt",className:"img main-img"})]})]});export{m as default};
