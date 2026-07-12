import{Bn as e,Bt as t,G as n,O as r,Q as i,T as a,X as o,Y as s,Yt as c,f as l,gn as u,i as d,j as f,m as p,mn as m,u as h,w as g,yn as _}from"./index-BCTjDk6f.js";import{a as v}from"./mermaid-parser.core-NEmuqPo3-SpxtKoa_.js";import{t as y}from"./chunk-4BX2VUAB-XzHDrrtP-Cp0m9a4p.js";import{t as b}from"./ordinal-B6-f3MAq-DnhUDGYh.js";import{t as x}from"./arc-C3YlCEKt-DMb78te7.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var t=C,n=S,r=null,i=l(0),a=l(e),o=l(0);function s(s){var c,l=(s=_(s)).length,u,d,f=0,p=Array(l),m=Array(l),h=+i.apply(this,arguments),g=Math.min(e,Math.max(-e,a.apply(this,arguments)-h)),v,y=Math.min(Math.abs(g)/l,o.apply(this,arguments)),b=y*(g<0?-1:1),x;for(c=0;c<l;++c)(x=m[p[c]=c]=+t(s[c],c,s))>0&&(f+=x);for(n==null?r!=null&&p.sort(function(e,t){return r(s[e],s[t])}):p.sort(function(e,t){return n(m[e],m[t])}),c=0,d=f?(g-l*b)/f:0;c<l;++c,h=v)u=p[c],x=m[u],v=h+(x>0?x*d:0)+b,m[u]={data:s[u],index:c,value:x,startAngle:h,endAngle:v,padAngle:y};return m}return s.value=function(e){return arguments.length?(t=typeof e==`function`?e:l(+e),s):t},s.sortValues=function(e){return arguments.length?(n=e,r=null,s):n},s.sort=function(e){return arguments.length?(r=e,n=null,s):r},s.startAngle=function(e){return arguments.length?(i=typeof e==`function`?e:l(+e),s):i},s.endAngle=function(e){return arguments.length?(a=typeof e==`function`?e:l(+e),s):a},s.padAngle=function(e){return arguments.length?(o=typeof e==`function`?e:l(+e),s):o},s}var T=o.pie,E={sections:new Map,showData:!1},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:m(()=>structuredClone(k),`getConfig`),clear:m(()=>{D=new Map,O=E.showData,p()},`clear`),setDiagramTitle:g,getDiagramTitle:r,setAccTitle:h,getAccTitle:n,setAccDescription:s,getAccDescription:d,addSection:m(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:m(()=>D,`getSections`),setShowData:m(e=>{O=e},`setShowData`),getShowData:m(()=>O,`getShowData`)},j=m((e,t)=>{y(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:m(async e=>{let t=await v(`pie`,e);a.debug(t),j(t,A)},`parse`)},N=m(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=m(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return w().value(e=>e.value)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:m((e,n,r,o)=>{a.debug(`rendering pie chart
`+e);let s=o.db,l=c(),d=t(s.getConfig(),l.pie),p=u(n),m=p.append(`g`);m.attr(`transform`,`translate(225,225)`);let{themeVariables:h}=l,[g]=i(h.pieOuterStrokeWidth);g??=2;let _=d.textPosition,v=x().innerRadius(0).outerRadius(185),y=x().innerRadius(185*_).outerRadius(185*_);m.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+g/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=P(S),w=[h.pie1,h.pie2,h.pie3,h.pie4,h.pie5,h.pie6,h.pie7,h.pie8,h.pie9,h.pie10,h.pie11,h.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=b(w);m.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,v).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),m.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+y.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),m.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=m.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));p.attr(`viewBox`,`0 0 ${A} 450`),f(p,450,A,d.useMaxWidth)},`draw`)},styles:N};export{F as diagram};