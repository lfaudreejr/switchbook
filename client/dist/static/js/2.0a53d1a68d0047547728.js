webpackJsonp([2],{"8ddW":function(e,t,r){t=e.exports=r("FZ+f")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"User.vue",sourceRoot:""}])},ADKN:function(e,t,r){"use strict";var s=r("Xxa5"),a=r.n(s),n=r("exGp"),c=r.n(n),o=r("gyMJ"),u=new o.a;t.a={name:"user",data:function(){return{title:"Profile",books:null,requestedTrades:null,pendingTrades:null,formText:null,selectToTrade:null,selectToRemoveTrade:null}},methods:{fetchUserBooks:function(){var e=this;return c()(a.a.mark(function t(){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.getBooksByUser();case 3:r=t.sent,e.books=r.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},fetchNumberPendingTrades:function(){var e=this;return c()(a.a.mark(function t(){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.getNumberPendingTrades();case 3:r=t.sent,e.pendingTrades=r.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},fetchNumberRequestedTrades:function(){var e=this;return c()(a.a.mark(function t(){var r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.getNumberRequestedTrades();case 3:r=t.sent,e.requestedTrades=r.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()}},created:function(){function e(){return t.apply(this,arguments)}var t=c()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchUserBooks();case 2:return e.next=4,this.fetchNumberPendingTrades();case 4:return e.next=6,this.fetchNumberRequestedTrades();case 6:case"end":return e.stop()}},e,this)}));return e}(),watch:{$route:["fetchUserBooks","fetchNumberPendingTrades","fetchNumberRequestedTrades"]}}},hCnU:function(e,t,r){var s=r("8ddW");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);r("rjj0")("446e755e",s,!0)},jidl:function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b-jumbotron",{staticClass:"primary-bg text-white mb-0",attrs:{fluid:""}},[r("h4",{staticClass:"secondary-color"},[e._v(e._s(e.title))])]),e._v(" "),r("div",[e.requestedTrades?e._e():r("b-alert",{staticClass:"mb-0",attrs:{variant:"secondary",show:""}},[r("p",[e._v("Requested Trades: 0")])]),e._v(" "),e.requestedTrades?r("b-alert",{staticClass:"mb-0",attrs:{variant:"success",show:""}},[r("div",[r("p",[e._v("Current Requested trades: "+e._s(e.requestedTrades))]),e._v(" "),r("b-btn",{staticClass:"primary-bg",on:{click:function(t){e.$router.push("/user/requests")}}},[e._v("Manage Requested Trades")])],1)]):e._e()],1),e._v(" "),r("div",[e.pendingTrades?e._e():r("b-alert",{staticClass:"mb-0",attrs:{variant:"secondary",show:""}},[r("p",[e._v("Pending Trades: 0")])]),e._v(" "),e.pendingTrades?r("b-alert",{staticClass:"mb-0",attrs:{variant:"success",show:""}},[r("p",[e._v("Current Pending trades: "+e._s(e.pendingTrades))]),e._v(" "),r("b-btn",{staticClass:"primary-bg",on:{click:function(t){e.$router.push("/user/requests")}}},[e._v("Manage Pending Trades")])],1):e._e()],1),e._v(" "),r("b-container",{staticClass:"bg-light p-5",attrs:{fluid:""}},[r("h4",{staticClass:"mb-5"},[e._v("Currently owned books:")]),e._v(" "),e.books?r("b-row",e._l(e.books,function(t){return r("b-col",{key:t._id,attrs:{cols:"md-2"}},[r("b-card-group",{attrs:{deck:""}},[r("b-card",{staticClass:"mb-3"},[r("div",[r("img",{attrs:{src:t.volumeInfo.imageLinks.thumbnail}}),e._v(" "),r("p",[e._v(e._s(t.volumeInfo.title))]),e._v(" "),e._l(t.volumeInfo.authors,function(t){return r("p",{key:t,staticClass:"small"},[e._v(e._s(t))])})],2)])],1)],1)})):e._e()],1)],1)},a=[],n={render:s,staticRenderFns:a};t.a=n},oZNm:function(e,t,r){"use strict";function s(e){r("hCnU")}Object.defineProperty(t,"__esModule",{value:!0});var a=r("ADKN"),n=r("jidl"),c=r("VU/8"),o=s,u=c(a.a,n.a,!1,o,"data-v-e52c4b6c",null);t.default=u.exports}});
//# sourceMappingURL=2.0a53d1a68d0047547728.js.map