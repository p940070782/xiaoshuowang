(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a7369486"],{"27e7":function(t,e,s){},"46db":function(t,e,s){t.exports=s.p+"img/shuqiLogo.d3dc8b64.jpg"},a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("ReturnHead",{attrs:{title:"登录",show:"true"}}),t._m(0),s("div",[s("div",{staticClass:"login-input"},[s("van-cell-group",[s("van-field",{attrs:{required:"",clearable:"",label:"用户名/手机",placeholder:"请输入用户名/手机号..."},model:{value:t.login.keys,callback:function(e){t.$set(t.login,"keys",e)},expression:"login.keys"}}),s("van-field",{attrs:{type:"password",label:"密码",placeholder:"请输入密码",required:""},model:{value:t.login.password,callback:function(e){t.$set(t.login,"password",e)},expression:"login.password"}})],1),s("div",{staticClass:"getMsg"},[s("router-link",{staticClass:"toLogin",attrs:{to:{name:"register"}}},[t._v("点击注册")])],1),s("div",{staticClass:"button-login"},[s("van-button",{attrs:{type:"primary",size:"large"},on:{click:t.todoLogin}},[t._v("登录")])],1)],1)])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo"},[a("img",{attrs:{src:s("46db"),alt:""}})])}],o=(s("2f62"),s("2241")),i={data:function(){return{login:{}}},methods:{todoLogin:function(){var t=this;this.$axios.post("/vue/login",this.login).then(function(e){e.data.type?(sessionStorage.userInfo=JSON.stringify({token:e.data.token,username:e.data.username}),t.$router.push({name:"home"})):(o["a"].alert({message:e.data.msg}),sessionStorage.userInfo=JSON.stringify({token:""}))})}}},r=i,l=(s("f60c"),s("2877")),c=Object(l["a"])(r,a,n,!1,null,"63b81a8c",null);e["default"]=c.exports},f60c:function(t,e,s){"use strict";var a=s("27e7"),n=s.n(a);n.a}}]);
//# sourceMappingURL=chunk-a7369486.f8255879.js.map