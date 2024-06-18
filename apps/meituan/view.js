
    modDefine('pages/home/index', function() {
      var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ui-view",
    { staticClass: "box" },
    [
      _c(
        "ui-view",
        {
          staticClass: "home-title",
          attrs: {
            bindtap: { methodName: "tapHandler", params: [1, "$event", true] },
          },
        },
        [
          _c("ui-text", [_vm._v(_vm._s(_vm.a.b.c[0].text))]),
          _c("ui-text", [_vm._v(_vm._s(_vm.str))]),
        ],
        1
      ),
      _c(
        "ui-view",
        { staticClass: "sub-title" },
        [
          _vm.number === 1
            ? _c("ui-text", [_vm._v("一")])
            : _vm.number === 2
            ? _c("ui-text", [_vm._v("二")])
            : _c("ui-text", [_vm._v("未知数字")]),
        ],
        1
      ),
      _c("ui-image", {
        staticClass: "user-photo-img",
        attrs: { src: "//miniapp.ai-matrix.vip/lib/user-zhu.jpg" },
      }),
      _c(
        "ui-view",
        {
          staticClass: "home-go-detail",
          attrs: { bindtap: { methodName: "goDetail", params: [] } },
        },
        [_c("ui-text", [_vm._v("打开详情页")])],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

      Page({
        path: 'pages/home/index',
        render: render,
        usingComponents: {},
        scopeId: 'data-v-guaN1NDGM3',
      });
    })
  
    modDefine('pages/detail/index', function() {
      var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ui-view",
    { staticClass: "box" },
    [
      _c(
        "ui-view",
        {
          staticClass: "button",
          attrs: { bindtap: { methodName: "exit", params: [] } },
        },
        [_vm._v(_vm._s(_vm.text))]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

      Page({
        path: 'pages/detail/index',
        render: render,
        usingComponents: {},
        scopeId: 'data-v-fbyBfwOErD',
      });
    })
  