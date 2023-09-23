import{s as o,u as n,j as r,a as i}from"./index-08736327.js";const s="/assets/not-found-5116d89a.svg",t=o.main`
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
`,m=()=>{const e=n();return console.log(e),e.status===404?r.jsx(t,{children:r.jsxs("div",{children:[r.jsx("img",{src:s,alt:"not found"}),r.jsx("h3",{children:"Ohh! page not found"}),r.jsx("p",{children:"We can't seem to find the page you're looking for"}),r.jsx(i,{to:"/dashboard",children:"back home"})]})}):r.jsx(t,{children:r.jsx("div",{children:r.jsx("h3",{children:"something went wrong"})})})};export{m as default};
