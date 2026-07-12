import{Bt as e,G as t,O as n,T as r,X as i,Y as a,gn as o,i as s,j as c,m as l,mn as u,u as d,w as f,x as p}from"./index-Ds5IxBoD.js";import{a as m}from"./mermaid-parser.core-NEmuqPo3-B6awyIfn.js";import{t as h}from"./chunk-4BX2VUAB-XzHDrrtP-CPsztuJ5.js";var g=i.packet,_,v=(_=class{constructor(){this.packet=[],this.setAccTitle=d,this.getAccTitle=t,this.setDiagramTitle=f,this.getDiagramTitle=n,this.getAccDescription=s,this.setAccDescription=a}getConfig(){let t=e({...g,...p().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(e){e.length>0&&this.packet.push(e)}clear(){l(),this.packet=[]}},u(_,`PacketDB`),_),y=1e4,b=u((e,t)=>{h(e,t);let n=-1,i=[],a=1,{bitsPerRow:o}=t.getConfig();for(let{start:s,end:c,bits:l,label:u}of e.blocks){if(s!==void 0&&c!==void 0&&c<s)throw Error(`Packet block ${s} - ${c} is invalid. End must be greater than start.`);if(s??=n+1,s!==n+1)throw Error(`Packet block ${s} - ${c??s} is not contiguous. It should start from ${n+1}.`);if(l===0)throw Error(`Packet block ${s} is invalid. Cannot have a zero bit field.`);for(c??=s+(l??1)-1,l??=c-s+1,n=c,r.debug(`Packet block ${s} - ${n} with label ${u}`);i.length<=o+1&&t.getPacket().length<y;){let[e,n]=x({start:s,end:c,bits:l,label:u},a,o);if(i.push(e),e.end+1===a*o&&(t.pushWord(i),i=[],a++),!n)break;({start:s,end:c,bits:l,label:u}=n)}}t.pushWord(i)},`populate`),x=u((e,t,n)=>{if(e.start===void 0)throw Error(`start should have been set during first phase`);if(e.end===void 0)throw Error(`end should have been set during first phase`);if(e.start>e.end)throw Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*n)return[e,void 0];let r=t*n-1,i=t*n;return[{start:e.start,end:r,label:e.label,bits:r-e.start},{start:i,end:e.end,label:e.label,bits:e.end-i}]},`getNextFittingBlock`),S={parser:{yy:void 0},parse:u(async e=>{let t=await m(`packet`,e),n=S.parser?.yy;if(!(n instanceof v))throw Error(`parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.`);r.debug(t),b(t,n)},`parse`)},C=u((e,t,n,r)=>{let i=r.db,a=i.getConfig(),{rowHeight:s,paddingY:l,bitWidth:u,bitsPerRow:d}=a,f=i.getPacket(),p=i.getDiagramTitle(),m=s+l,h=m*(f.length+1)-(p?0:s),g=u*d+2,_=o(t);_.attr(`viewbox`,`0 0 ${g} ${h}`),c(_,h,g,a.useMaxWidth);for(let[e,t]of f.entries())w(_,t,e,a);_.append(`text`).text(p).attr(`x`,g/2).attr(`y`,h-m/2).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).attr(`class`,`packetTitle`)},`draw`),w=u((e,t,n,{rowHeight:r,paddingX:i,paddingY:a,bitWidth:o,bitsPerRow:s,showBits:c})=>{let l=e.append(`g`),u=n*(r+a)+a;for(let e of t){let t=e.start%s*o+1,n=(e.end-e.start+1)*o-i;if(l.append(`rect`).attr(`x`,t).attr(`y`,u).attr(`width`,n).attr(`height`,r).attr(`class`,`packetBlock`),l.append(`text`).attr(`x`,t+n/2).attr(`y`,u+r/2).attr(`class`,`packetLabel`).attr(`dominant-baseline`,`middle`).attr(`text-anchor`,`middle`).text(e.label),!c)continue;let a=e.end===e.start,d=u-2;l.append(`text`).attr(`x`,t+(a?n/2:0)).attr(`y`,d).attr(`class`,`packetByte start`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,a?`middle`:`start`).text(e.start),a||l.append(`text`).attr(`x`,t+n).attr(`y`,d).attr(`class`,`packetByte end`).attr(`dominant-baseline`,`auto`).attr(`text-anchor`,`end`).text(e.end)}},`drawWord`),T={draw:C},E={byteFontSize:`10px`,startByteColor:`black`,endByteColor:`black`,labelColor:`black`,labelFontSize:`12px`,titleColor:`black`,titleFontSize:`14px`,blockStrokeColor:`black`,blockStrokeWidth:`1`,blockFillColor:`#efefef`},D={parser:S,get db(){return new v},renderer:T,styles:u(({packet:t}={})=>{let n=e(E,t);return`
	.packetByte {
		font-size: ${n.byteFontSize};
	}
	.packetByte.start {
		fill: ${n.startByteColor};
	}
	.packetByte.end {
		fill: ${n.endByteColor};
	}
	.packetLabel {
		fill: ${n.labelColor};
		font-size: ${n.labelFontSize};
	}
	.packetTitle {
		fill: ${n.titleColor};
		font-size: ${n.titleFontSize};
	}
	.packetBlock {
		stroke: ${n.blockStrokeColor};
		stroke-width: ${n.blockStrokeWidth};
		fill: ${n.blockFillColor};
	}
	`},`styles`)};export{D as diagram};