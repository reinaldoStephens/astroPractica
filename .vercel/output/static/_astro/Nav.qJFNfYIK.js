import{j as e}from"./jsx-runtime.GZM-AlAv.js";import{r as c}from"./index.120yQdpc.js";const m=({children:s,href:n,initialIsSelected:l})=>e.jsx(e.Fragment,{children:e.jsx("a",{role:"menuitem",href:n,"aria-selected":`${l}`,"aria-label":`${s} Link`,children:s})}),r=[{url:"/",label:"Inicio",selected:!1},{url:"/products",label:"Productos",selected:!1},{url:"/contact",label:"Contacto",selected:!1}],h=({pathname:s})=>{const[n,l]=c.useState(!0),t=()=>{l(!n)},i=n?"menu":"menu menu-opened",d=n?"open-menu":"open-menu open",o=n?"Open menu button":"Close menu button",u=n?"false":"true";return r.map(a=>{a.url===s?a.selected=!0:a.selected=!1}),e.jsx(e.Fragment,{children:e.jsxs("nav",{className:"navbar",role:"navigation",children:[e.jsxs("div",{className:"navbar-brand-container",children:[e.jsx("a",{className:"navbar-brand",href:"index.html",tabIndex:"0","aria-label":"Awa Boots Logo link",children:e.jsxs("h1",{children:["Awa",e.jsx("span",{className:"text-gradient",children:"Boots"})]})}),e.jsxs("div",{id:"menu-button",className:d,role:"button","aria-label":o,onClick:t,"aria-controls":"menu-items",children:[e.jsx("span",{"aria-hidden":"true"}),e.jsx("span",{"aria-hidden":"true"}),e.jsx("span",{"aria-hidden":"true"})]})]}),e.jsxs("ul",{id:"menu-items",className:i,"aria-hidden":"true",tabIndex:"-1",role:"menu","aria-labelledby":"menubutton","aria-expanded":u,children:[e.jsx("small",{id:"menubutton","aria-hidden":"true",hidden:!0,children:"Awa Menu Links"}),r&&r.map(a=>e.jsx("li",{children:e.jsx(m,{href:a.url,initialIsSelected:a.selected,children:a.label})},a.label))]})]})})};export{h as default};
