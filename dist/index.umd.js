!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t||self).canvasgrid={})}(this,function(t){function i(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}function e(t,i){return(e=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t})(t,i)}function r(t,i){void 0===i&&(i=2);var n=Math.pow(10,i);return Math.round(t*n)/n}var o=function(){function t(t,i){this.x=r(t),this.y=r(i)}var i=t.prototype;return i.add=function(i){return new t(this.x+i.x,this.y+i.y)},i.smult=function(i){return new t(this.x*i,this.y*i)},i.vscale=function(i,n){return void 0===n&&(n=new t(0,0)),new t(n.x+(this.x-n.x)*i.x,n.y+(this.y-n.y)*i.y)},i.sscale=function(i,n){return void 0===n&&(n=new t(0,0)),this.vscale(new t(i,i),n)},t}(),h=function(){function t(t,i){this.width=r(t),this.height=r(i)}return t.prototype.fitSize=function(i){var n,e;return this.ratio>i?n=(e=this.height)*i:e=(n=this.width)/i,new t(n,e)},n(t,[{key:"ratio",get:function(){return this.width/this.height}}]),t}(),s=function(){function t(t,i){this.origin=t,this.size=i}var i=t.prototype;return i.translate=function(i){return new t(this.origin.add(i),this.size)},i.fitRectangleCenter=function(i){var n=this.size.fitSize(i);return new t(new o(this.origin.x+(this.width-n.width)/2,this.origin.y+(this.height-n.height)/2),n)},n(t,[{key:"x",get:function(){return this.origin.x}},{key:"y",get:function(){return this.origin.y}},{key:"width",get:function(){return this.size.width}},{key:"height",get:function(){return this.size.height}},{key:"ratio",get:function(){return this.size.ratio}}]),t}(),u=function(t){var i,r;function o(i,n,e){var r;return(r=t.call(this,i,n)||this).index=e,r}return r=t,(i=o).prototype=Object.create(r.prototype),i.prototype.constructor=i,e(i,r),n(o,[{key:"i",get:function(){return this.index.i}},{key:"j",get:function(){return this.index.j}}]),o}(s),c=function(){function t(t,i,n,e){void 0===n&&(n=1),void 0===e&&(e={column:0,row:0}),this.rows=t,this.columns=i,this.cell_ratio=n,this.spacing=e}var i=t.prototype;return i.getCellHeightFromGridHeight=function(t){return t/this.height},i.getCellHeightFromGridWidth=function(t){return t/this.width},i.getCells=function(t,i){void 0===t&&(t=1),void 0===i&&(i=new o(0,0));for(var n=[],e=0;e<this.rows;e++)for(var r=e*(1+this.spacing.row),s=0;s<this.columns;s++){var c=new o(s*(this.cell_ratio+this.spacing.column),r).sscale(t).add(i);n.push(new u(c,new h(t*this.cell_ratio,t),{i:e,j:s}))}return n},n(t,[{key:"height",get:function(){return 1*this.rows+(this.rows-1)*this.spacing.row}},{key:"width",get:function(){return this.columns*this.cell_ratio+(this.columns-1)*this.spacing.column}},{key:"ratio",get:function(){return this.width/this.height}}]),t}();t.Cell=u,t.Rectangle=s,t.Size=h,t.UnitGrid=c});
//# sourceMappingURL=index.umd.js.map