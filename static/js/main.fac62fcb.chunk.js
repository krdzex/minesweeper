(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{10:function(e,a,r){},12:function(e,a,r){"use strict";r.r(a);var l=r(1),n=r(4),t=(r(9),r(10),r(2)),u=r(0),o=function(e){var a=e.info.revealed?0!==e.info.value?"X"===e.info.value?"\ud83d\udca3":e.info.value:"":e.info.flagged?"\ud83d\udea9":"";return Object(u.jsx)("div",{className:e.info.revealed?"cellRevealed":"cell",onClick:function(a){return e.showValue(a,e.info.x,e.info.y)},onContextMenu:function(a){return e.putFlag(a,e.info.x,e.info.y)},children:a})},c=function(e){var a=e.row,r=e.col,n=Object(l.useState)([]),c=Object(t.a)(n,2),s=c[0],v=c[1],i=Object(l.useState)(10),f=Object(t.a)(i,2),d=f[0],j=f[1],p=Object(l.useState)("Game in proggress"),b=Object(t.a)(p,2),g=b[0],h=b[1],O=Object(l.useState)(!1),m=Object(t.a)(O,2),x=m[0],X=m[1],y=Object(l.useCallback)((function(){for(var e=[],l=0;l<a;l++){for(var n=[],t=0;t<r;t++)n.push({value:0,revealed:!1,x:l,y:t,flagged:!1});e.push(n)}for(var u=0;u<10;){var o=Math.floor(Math.random()*(a-1-0+1)+0),c=Math.floor(Math.random()*(r-1-0+1)+0);0===e[o][c].value&&(e[o][c].value="X",u++)}for(var s=0;s<a;s++)for(var v=0;v<r;v++)"X"!==e[s][v].value&&(s>0&&"X"===e[s-1][v].value&&e[s][v].value++,v>0&&"X"===e[s][v-1].value&&e[s][v].value++,v<r-1&&"X"===e[s][v+1].value&&e[s][v].value++,s<a-1&&"X"===e[s+1][v].value&&e[s][v].value++,s>0&&v>0&&"X"===e[s-1][v-1].value&&e[s][v].value++,s>0&&v<a-1&&"X"===e[s-1][v+1].value&&e[s][v].value++,s<a-1&&v>0&&"X"===e[s+1][v-1].value&&e[s][v].value++,s<a-1&&v<a-1&&"X"===e[s+1][v+1].value&&e[s][v].value++);return e}),[r,a]);Object(l.useEffect)((function(){var e=y();v(e),X(!0)}),[y]);var N=function(e,a,r){e.preventDefault();var l=s.slice();!1===l[a][r].flagged&&!1===l[a][r].revealed?(j(d-1),l[a][r].flagged=!0):(l[a][r].revealed||j(d+1),l[a][r].flagged=!1),v(l)},w=function(e,l,n){var t=s.slice(),u=0;if(!1===t[l][n].flagged){e.target.className="cellRevealed",t[l][n].revealed=!0,0===t[l][n].value&&(t=k(l,n,t));for(var o=0;o<a;o++)for(var c=0;c<r;c++)!0===t[o][c].revealed&&u++;if(54===u){h("You Won!");for(var i=0;i<a;i++)for(var f=0;f<r;f++)t[i][f].flagged&&"X"===t[i][f].value||(t[i][f].revealed=!0)}if("X"===t[l][n].value){h("You Lost!");for(var d=0;d<a;d++)for(var j=0;j<r;j++)t[d][j].flagged&&"X"===t[d][j].value||(t[d][j].revealed=!0)}v(t)}},k=function e(a,r,l){return M(a,r,l).forEach((function(a){a.flagged||a.revealed||0!==a.value&&"X"===a.value||(l[a.x][a.y].revealed=!0,0===a.value&&e(a.x,a.y,l))})),l},M=function(e,l,n){var t=[];return e>0&&t.push(n[e-1][l]),e<r-1&&t.push(n[e+1][l]),l>0&&t.push(n[e][l-1]),l<a-1&&t.push(n[e][l+1]),e>0&&l>0&&t.push(n[e-1][l-1]),e>0&&l<a-1&&t.push(n[e-1][l+1]),e<r-1&&l>0&&t.push(n[e+1][l-1]),e<r-1&&l<a-1&&t.push(n[e+1][l+1]),t};return Object(u.jsxs)("div",{className:"boardWrapper",children:[x&&Object(u.jsx)("div",{className:"popupPlayGame",children:Object(u.jsx)("div",{className:"buttonPlayGame",onClick:function(){X(!1)},children:"Play game"})}),Object(u.jsxs)("div",{className:"statusBar",children:[Object(u.jsx)("p",{style:"You Won!"===g?{color:"darkgreen"}:"You Lost!"===g?{color:"red"}:{color:"lemonchiffon"},children:g}),Object(u.jsxs)("p",{children:["Mines remaining: ",d]})]}),Object(u.jsx)("div",{className:"board",children:s.map((function(e){return e.map((function(e,a){return Object(u.jsx)(o,{info:e,da:a,putFlag:N,showValue:w},a)}))}))}),"Game in proggress"!==g&&Object(u.jsx)("div",{className:"popup",children:Object(u.jsx)("div",{className:"button",onClick:function(){var e=y();v(e),h("Game in proggress"),j(10)},children:"You Lost!"===g?"Try again? ":"Play again?"})})]})},s=function(){return Object(u.jsx)("div",{children:Object(u.jsx)(c,{row:8,col:8})})};var v=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(s,{})})};Object(n.render)(Object(u.jsx)(v,{}),document.getElementById("root"))},9:function(e,a,r){}},[[12,1,2]]]);
//# sourceMappingURL=main.fac62fcb.chunk.js.map