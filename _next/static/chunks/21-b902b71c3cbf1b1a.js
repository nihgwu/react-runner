"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[21],{7595:function(n,e,t){t.d(e,{pq:function(){return y},gF:function(){return p}});var r=t(4293),o=t(7294),a=t(2062),i=t(5620),s=t(2349);function u(){return(u=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function l(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)e.indexOf(t=a[r])>=0||(o[t]=n[t]);return o}const c=["initialCode","transformCode"],p=n=>{let{initialCode:e="",transformCode:t}=n,a=l(n,c);const[i,s]=(0,o.useState)(e),{element:p,error:d}=(0,r.ud)(u({code:t?t(i):i},a));return(0,o.useEffect)((()=>{s(e)}),[e]),{element:p,error:d,code:i,onChange:s}},d={plain:{color:"#ffffff",backgroundColor:"#282c34"},styles:[{types:["comment","block-comment","prolog","doctype","cdata"],style:{color:"#b2b2b2"}},{types:["property","number","function-name","constant","symbol","deleted"],style:{color:"#b2b2b2"}},{types:["boolean"],style:{color:"#ff8b50"}},{types:["tag"],style:{color:"#fc929e"}},{types:["string"],style:{color:"#8dc891"}},{types:["punctuation"],style:{color:"#88c6Be"}},{types:["selector","char","builtin","inserted"],style:{color:"#d8dee9"}},{types:["function"],style:{color:"#79b6f2"}},{types:["operator","entity","url","variable"],style:{color:"#d7deea"}},{types:["keyword"],style:{color:"#c5a5c5"}},{types:["class-name"],style:{color:"#fac863"}},{types:["important"],style:{fontWeight:"400"}},{types:["bold"],style:{fontWeight:"700"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["entity"],style:{cursor:"help"}},{types:["namespace"],style:{opacity:.7}}]},f=["children","language","theme","padding","noWrapper","noWrap","className","style"],m=n=>{let{children:e,language:t="jsx",theme:r=d,padding:a=10,noWrapper:c,noWrap:p,className:m,style:g}=n,y=l(n,f);return o.createElement(i.ZP,{code:e||"",language:t,Prism:s.Z,theme:r},(n=>{let{className:e,style:t,tokens:r,getLineProps:i,getTokenProps:s}=n;const l=r.map(((n,e)=>o.createElement("div",i({line:n,key:e}),n.map(((n,e)=>o.createElement("span",s({token:n,key:e})))))));return c?l:o.createElement("pre",u({className:m?e+" "+m:e,style:u({},t,{margin:0,padding:a,whiteSpace:p?"pre":"pre-wrap"},g)},y),l)}))},g=["defaultValue","value","language","theme","padding","onChange"],y=n=>{let{defaultValue:e,value:t,language:r="jsx",theme:i=d,padding:s=10,onChange:c}=n,p=l(n,g);const[f,y]=(0,o.useState)(e||""),b=void 0!==t,h=(0,o.useCallback)((n=>o.createElement(m,{language:r,theme:i,noWrapper:!0},n)),[r,i]),v=(0,o.useRef)(c);v.current=c;const x=(0,o.useCallback)((n=>{b||y(n),null==v.current||v.current(n)}),[b]),w=(0,o.useMemo)((()=>u({},i.plain,p.style)),[i.plain,p.style]);return o.createElement(a.Z,u({},p,{padding:s,value:b?t:f,highlight:h,onValueChange:x,style:w}))};(0,o.createContext)({})},4293:function(n,e,t){t.d(e,{ud:function(){return d}});var r=t(7294),o=t(81);function a(){return(a=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}const i=/^export default(?=\s+)/m,s=/^render(?=\s*\([^)])/m,u=/^</,l={React:r,jsxPragma:r.createElement,jsxFragmentPragma:r.Fragment},c=n=>{const{code:e,scope:t,imports:c}=n,p=e.trim();if(!p)return null;const d=!!c&&Object.keys(c).length>0,f=((n,e)=>(0,o.vs)(n,{transforms:e?["jsx","typescript","imports"]:["jsx","typescript"],production:!0,jsxPragma:"jsxPragma",jsxFragmentPragma:"jsxFragmentPragma"}).code)((n=>i.test(n)?n.replace(i,"return"):s.test(n)?n.replace(s,"return"):(n=n.replace(/;$/,""),u.test(n)&&(n="<>"+n+"</>"),"return ("+n+")"))(p),d),m=a({},l,t);d&&(m.require=n=>{if(!c.hasOwnProperty(n))throw new Error("Module not found: '"+n+"'");return c[n]});const g=((n,e)=>{const t=Object.keys(e),r=t.map((n=>e[n]));return new Function(...t,n)(...r)})(f,m);return g?(0,r.isValidElement)(g)?g:"function"==typeof g?(0,r.createElement)(g):"string"==typeof g?(0,r.createElement)(r.Fragment,void 0,g):null:null};class p extends r.Component{constructor(){super(...arguments),this.state={element:null,error:null,prevCode:null}}static getDerivedStateFromProps(n,e){if(e.prevCode===n.code)return null;try{return{element:c(n),error:e.error&&n.code!==e.prevCode?null:e.error,prevCode:n.code}}catch(e){return{element:null,error:e.toString(),prevCode:n.code}}}static getDerivedStateFromError(n){return{error:n.toString()}}componentDidMount(){var n,e,t;null==(n=(e=this.props).onRendered)||n.call(e,null==(t=this.state.error)?void 0:t.toString())}shouldComponentUpdate(n,e){return n.code!==this.props.code||e.error!==this.state.error}componentDidUpdate(){var n,e,t;null==(n=(e=this.props).onRendered)||n.call(e,null==(t=this.state.error)?void 0:t.toString())}render(){return this.state.error?null:this.state.element}}const d=n=>{let{code:e,scope:t,imports:o,disableCache:a}=n;const i=(0,r.useRef)(!0),s=(0,r.useRef)(null),u=(0,r.useRef)(t);u.current=t;const l=(0,r.useRef)(o);l.current=o;const[c,d]=(0,r.useState)((()=>{const n=(0,r.createElement)(p,{code:e,scope:u.current,imports:l.current,onRendered:e=>{e?d({element:a?null:s.current,error:e}):s.current=n}});return{element:n,error:null}}));return(0,r.useEffect)((()=>{if(i.current)return void(i.current=!1);const n=(0,r.createElement)(p,{code:e,scope:u.current,imports:l.current,onRendered:e=>{e?d({element:a?null:s.current,error:e}):s.current=n}});d({element:n,error:null})}),[e,a]),c}},5453:function(n,e,t){t.d(e,{Nf:function(){return v},ML:function(){return x},ph:function(){return w},MB:function(){return k},jj:function(){return C},v5:function(){return j}});var r=t(5893),o=t(7294),a=t(7379),i=t(4293),s=t(7595);function u(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function l(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){u(n,e,t[e])}))}return n}function c(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}function p(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function d(){var n=p(["\n  display: flex;\n  box-shadow: 0 0 8px 0 lightsteelblue;\n  height: 300px;\n  overflow: hidden;\n\n  @media (max-width: 640px) {\n    flex-direction: column-reverse;\n    height: 480px;\n  }\n"]);return d=function(){return n},n}function f(){var n=p(["\n  flex: 0 1 720px;\n  overflow: auto;\n"]);return f=function(){return n},n}function m(){var n=p(["\n  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;\n  font-size: 14px;\n  white-space: pre;\n  caret-color: #fff;\n  min-width: 100%;\n  min-height: 100%;\n  float: left;\n\n  & > textarea,\n  & > pre {\n    outline: none;\n    white-space: pre !important;\n  }\n"]);return m=function(){return n},n}function g(){var n=p(["\n  flex: 1 1 720px;\n  position: relative;\n  display: flex;\n  background: #fff;\n  overflow: hidden;\n"]);return g=function(){return n},n}function y(){var n=p(["\n  margin: auto;\n  white-space: pre-wrap;\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto;\n"]);return y=function(){return n},n}function b(){var n=p(["\n  background: #fcc;\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: 100%;\n  margin: 0;\n  padding: 10px;\n  color: #f00;\n  white-space: pre-wrap;\n"]);return b=function(){return n},n}var h=a.default.div.withConfig({componentId:"sc-1ef20205-0"})(d()),v=a.default.div.withConfig({componentId:"sc-1ef20205-1"})(f()),x=(0,a.default)(s.pq).withConfig({componentId:"sc-1ef20205-2"})(m()),w=a.default.div.withConfig({componentId:"sc-1ef20205-3"})(g()),k=a.default.div.withConfig({componentId:"sc-1ef20205-4"})(y()),C=a.default.div.withConfig({componentId:"sc-1ef20205-5"})(b()),j=function(n){var e=n.code,t=n.transformCode,a=n.language,s=c(n,["code","transformCode","language"]),u=(0,o.useState)((e||"").trim()),p=u[0],d=u[1],f=(0,i.ud)(l({code:t?t(p):p},s)),m=f.element,g=f.error;return(0,r.jsxs)(h,{children:[(0,r.jsx)(v,{children:(0,r.jsx)(x,{value:p,language:a,onChange:d})}),(0,r.jsxs)(w,{children:[(0,r.jsx)(k,{children:m}),g&&(0,r.jsx)(C,{children:g})]})]})}},2660:function(n,e,t){t.d(e,{eI:function(){return m},o0:function(){return g},$R:function(){return y}});var r=t(7294),o=t(7379),a=t(865),i=t(9971);function s(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function u(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function l(){var n=u(['\n    <h2>React Runner</h2>\n    <ul>\n      <li>Inline element(s)</li>\n      <li>Function component</li>\n      <li>\n        Class component, <b>with class fields support</b>\n      </li>\n      <li>\n        Composing components with <b>render</b> or <b>export default</b>\n      </li>\n      <li>\n        Support <b>Typescript</b>\n      </li>\n      <li>Server Side Rendering</li>\n    </ul>\n    <div>\n      <span>Hacker News </span>\n      <a href="#hacker-news">in react-runner</a>\n      <span> vs </span>\n      <a href="examples/hacker-news">in real world</a>\n    </div>\n    ']);return l=function(){return n},n}function c(){var n=u(["\n    function Counter() {\n      const [count, setCount] = React.useState(0)\n\n      return (\n        <>\n          <div>{count}</div>\n          <button onClick={() => setCount(count => count + 1)}>+</button>\n          <button onClick={() => setCount(count => count - 1)}>-</button>\n        </>\n      )\n    }\n    "]);return c=function(){return n},n}function p(){var n=u(["\n    class Counter extends React.Component {\n      state = {\n        count: 0,\n      }\n\n      onIncrement = () => {\n        this.setState(({ count }) => ({\n          count: count + 1,\n        }))\n      }\n\n      onDecrement = () => {\n        this.setState(({ count }) => ({\n          count: count - 1,\n        }))\n      }\n\n      render() {\n        return (\n          <div>\n            <div>{this.state.count}</div>\n            <button onClick={this.onIncrement}>+</button>\n            <button onClick={this.onDecrement}>-</button>\n          </div>\n        )\n      }\n    }\n    "]);return p=function(){return n},n}function d(){var n=u(["\n    const Button = styled.button`\n      background: transparent;\n      color: steelblue;\n      border: 2px solid steelblue;\n      margin: 5px 10px;\n      padding: 5px 10px;\n      font-size: 16px;\n      border-radius: 4px;\n\n      ${props => props.primary && css`\n        background: steelblue;\n        color: white;\n      `}\n    `\n\n    export default () => (\n      <>\n        <Button>Normal Button</Button>\n        <Button primary>Primary Button</Button>\n      </>\n    )\n    "],["\n    const Button = styled.button\\`\n      background: transparent;\n      color: steelblue;\n      border: 2px solid steelblue;\n      margin: 5px 10px;\n      padding: 5px 10px;\n      font-size: 16px;\n      border-radius: 4px;\n\n      \\${props => props.primary && css\\`\n        background: steelblue;\n        color: white;\n      \\`}\n    \\`\n\n    export default () => (\n      <>\n        <Button>Normal Button</Button>\n        <Button primary>Primary Button</Button>\n      </>\n    )\n    "]);return d=function(){return n},n}function f(){var n=u(["\n    const Button = styled.button`\n      background: transparent;\n      color: steelblue;\n      border: 2px solid steelblue;\n      margin: 5px 10px;\n      padding: 5px 10px;\n      font-size: 16px;\n      border-radius: 4px;\n\n      ${props => props.primary && css`\n        background: steelblue;\n        color: white;\n      `}\n    `\n\n    render(\n      <>\n        <Button>Normal Button</Button>\n        <Button primary>Primary Button</Button>\n      </>\n    )\n    "],["\n    const Button = styled.button\\`\n      background: transparent;\n      color: steelblue;\n      border: 2px solid steelblue;\n      margin: 5px 10px;\n      padding: 5px 10px;\n      font-size: 16px;\n      border-radius: 4px;\n\n      \\${props => props.primary && css\\`\n        background: steelblue;\n        color: white;\n      \\`}\n    \\`\n\n    render(\n      <>\n        <Button>Normal Button</Button>\n        <Button primary>Primary Button</Button>\n      </>\n    )\n    "]);return f=function(){return n},n}var m=function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){s(n,e,t[e])}))}return n}({},r,{styled:o.default,css:o.css,keyframes:o.keyframes,createGlobalStyle:o.createGlobalStyle}),g={react:r,"styled-components":o},y=[{key:"inline-elements",title:"Inline elements",code:(0,a.FD)(l())},{key:"function-component",title:"Function Component",code:(0,a.FD)(c())},{key:"class-component",title:"Class Component with fields support",code:(0,a.FD)(p())},{key:"export-default",title:"export default Component",code:(0,a.FD)(d())},{key:"render",title:"render(<Component />)",code:(0,a.FD)(f())},{key:"hacker-news",title:"Hacker News (Typescript)",code:i.Z}]},9971:function(n,e){e.Z="import { useState, useEffect } from 'react'\nimport styled from 'styled-components'\n\ntype Item = {\n  id: number\n  title: string\n  points?: number | null\n  user?: string | null\n  time: number\n  time_ago: string\n  comments_count: number\n  type: string\n  url?: string\n  domain?: string\n}\n\nconst getItems = (page: number): Promise<Item[]> =>\n  fetch(`https://api.hnpwa.com/v0/news/${page}.json`)\n    .then((response) => response.json())\n    .catch()\n\nconst Link = styled.a`\n  color: steelblue;\n  text-decoration: none;\n`\n\nconst Meta = styled.span`\n  color: gray;\n  font-size: small;\n\n  & + &::before {\n    content: '|';\n    margin: 8px;\n  }\n`\n\nconst Item = ({ item }: { item: Item }) => (\n  <li>\n    <Link href={item.url} target=\"_blank\" rel=\"noopener noreferrer\">\n      {item.title}\n    </Link>\n    <div>\n      <Meta>{item.points} points</Meta>\n      <Meta>\n        by {item.user} {item.time_ago}\n      </Meta>\n      <Meta>{item.comments_count} comments</Meta>\n    </div>\n  </li>\n)\n\nconst Ul = styled.ul`\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  gap: 8px;\n`\n\nconst List = ({ page }: { page: number }) => {\n  const [items, setItems] = useState<Item[] | null>(null)\n\n  useEffect(() => {\n    getItems(page).then(setItems)\n  }, [page])\n\n  if (!items) return <Meta>loading...</Meta>\n  return (\n    <Ul>\n      {items.map((item) => (\n        <Item key={item.id} item={item} />\n      ))}\n    </Ul>\n  )\n}\n\nconst Container = styled.div`\n  padding: 16px;\n  max-width: 640px;\n  margin: auto;\n  background: white;\n`\n\nconst Header = styled.header`\n  height: 48px;\n  position: sticky;\n  top: 0;\n  background: inherit;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n`\n\nconst Button = styled.button`\n  background: none;\n  border: none;\n`\n\nexport default function App() {\n  const [page, setPage] = useState(1)\n\n  return (\n    <Container>\n      <Header>\n        <h2>Hacker News</h2>\n        <div>\n          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>\n            prev\n          </Button>\n          <Meta> {page} / 10 </Meta>\n          <Button disabled={page >= 10} onClick={() => setPage(page + 1)}>\n            next\n          </Button>\n        </div>\n      </Header>\n      <List page={page} />\n    </Container>\n  )\n}\n"}}]);