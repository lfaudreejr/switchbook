webpackJsonp([3],{PV2X:function(t,e,r){var n=r("b4W0");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r("rjj0")("247ce987",n,!0)},b4W0:function(t,e,r){e=t.exports=r("FZ+f")(!0),e.push([t.i,"a[data-v-323393a3]{text-decoration:none;color:inherit}","",{version:3,sources:["/media/larry/B89880DC98809B101/WebApps/SwitchBook/client/src/components/library/BooksLibrary.vue"],names:[],mappings:"AACA,mBACE,qBAAsB,AACtB,aAAe,CAChB",file:"BooksLibrary.vue",sourcesContent:["\na[data-v-323393a3] {\n  text-decoration: none;\n  color: inherit;\n}\n"],sourceRoot:""}])},cpqH:function(t,e,r){"use strict";var n=r("Xxa5"),a=r.n(n),o=r("exGp"),s=r.n(o),i=r("gyMJ"),c=new i.a;e.a={name:"library",data:function(){return{title:"Library",books:null}},methods:{fetchBooks:function(){var t=this;return s()(a.a.mark(function e(){var r;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.getAllBooks();case 2:r=e.sent,t.books=r.data;case 4:case"end":return e.stop()}},e,t)}))()}},created:function(){function t(){return e.apply(this,arguments)}var e=s()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.fetchBooks();case 2:case"end":return t.stop()}},t,this)}));return t}()}},"oE/8":function(t,e,r){"use strict";function n(t){r("PV2X")}Object.defineProperty(e,"__esModule",{value:!0});var a=r("cpqH"),o=r("wPpv"),s=r("VU/8"),i=n,c=s(a.a,o.a,!1,i,"data-v-323393a3",null);e.default=c.exports},wPpv:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-jumbotron",{staticClass:"primary-bg mb-0",attrs:{fluid:""}},[r("h4",{staticClass:"secondary-color"},[t._v(t._s(t.title))])]),t._v(" "),r("b-container",{staticClass:"bg-light p-5",attrs:{fluid:""}},[t.books?r("b-row",t._l(t.books,function(e){return r("b-col",{key:e._id,attrs:{cols:"md-2"}},[r("b-card-group",{attrs:{deck:""}},[r("router-link",{attrs:{to:/books/+e._id}},[r("b-card",{staticClass:"mb-3 book-detail"},[r("div",[r("img",{attrs:{src:e.volumeInfo.imageLinks.thumbnail}}),t._v(" "),r("p",[t._v(t._s(e.title))]),t._v(" "),t._l(e.volumeInfo.authors,function(e){return r("p",{key:e,staticClass:"small"},[t._v(t._s(e))])})],2)])],1)],1)],1)})):t._e()],1)],1)},a=[],o={render:n,staticRenderFns:a};e.a=o}});
//# sourceMappingURL=3.841ca03991d5d877376f.js.map