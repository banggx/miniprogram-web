
    modDefine('pages/home/index', function() {
      var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ui-view",
    { staticClass: "home" },
    [
      _c(
        "ui-view",
        { staticClass: "home-video-list" },
        [
          _c(
            "ui-view",
            { staticClass: "home-video-list__body" },
            [
              _c(
                "ui-swiper",
                {
                  staticClass: "home-video-list__swiper",
                  attrs: {
                    vertical: true,
                    bindchange: { methodName: "switchVideo", params: [] },
                  },
                },
                _vm._l(_vm.videoList, function (item, index) {
                  return _c(
                    "ui-swiper-item",
                    { key: item.id },
                    [
                      _c(
                        "ui-view",
                        { staticClass: "home-video-list__video-box" },
                        [
                          _c(
                            "ui-view",
                            {
                              staticClass: "home-video-list__video-wraper",
                              attrs: {
                                bindtap: { methodName: "tapVideo", params: [] },
                                "data-id": item.id,
                                "data-status": item.status,
                              },
                            },
                            [
                              _c("ui-video", {
                                staticClass: "home-video-list__video",
                                attrs: {
                                  src: item.url,
                                  id: item.id,
                                  poster: item.poster,
                                  autoplay: false,
                                  controls: false,
                                  loop: true,
                                },
                              }),
                            ],
                            1
                          ),
                          item.status === "pause"
                            ? _c("ui-view", {
                                staticClass: "home-video-list__pause-icon",
                              })
                            : _vm._e(),
                          _c(
                            "ui-view",
                            { staticClass: "home-action" },
                            [
                              _c(
                                "ui-view",
                                {
                                  staticClass: "home-action__user-photo",
                                  attrs: {
                                    bindtap: {
                                      methodName: "openUserPage",
                                      params: [],
                                    },
                                    "data-user-id": item.detail.user_id,
                                  },
                                },
                                [
                                  _c("ui-image", {
                                    staticClass: "home-action__user-photo-img",
                                    attrs: { src: item.detail.user_photo },
                                  }),
                                  _c("ui-view", {
                                    staticClass: "home-action__sub-tag",
                                  }),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                { staticClass: "home-action__item" },
                                [
                                  !item.detail.liked
                                    ? _c("ui-view", {
                                        staticClass:
                                          "home-action__item-icon home-action__icon-like",
                                        attrs: {
                                          bindtap: {
                                            methodName: "tapLike",
                                            params: [],
                                          },
                                          "data-item": item,
                                        },
                                      })
                                    : _vm._e(),
                                  item.detail.liked
                                    ? _c("ui-view", {
                                        staticClass:
                                          "home-action__item-icon home-action__icon-like--checked",
                                        attrs: {
                                          bindtap: {
                                            methodName: "tapLike",
                                            params: [],
                                          },
                                          "data-item": item,
                                        },
                                      })
                                    : _vm._e(),
                                  _c(
                                    "ui-view",
                                    {
                                      staticClass:
                                        "home-action__item-text-wrap",
                                    },
                                    [
                                      _c(
                                        "ui-text",
                                        {
                                          staticClass: "home-action__item-text",
                                        },
                                        [_vm._v(_vm._s(item.detail.like_count))]
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                { staticClass: "home-action__item" },
                                [
                                  _c("ui-view", {
                                    staticClass:
                                      "home-action__item-icon home-action__icon-comment",
                                  }),
                                  _c(
                                    "ui-view",
                                    {
                                      staticClass:
                                        "home-action__item-text-wrap",
                                    },
                                    [
                                      _c(
                                        "ui-text",
                                        {
                                          staticClass: "home-action__item-text",
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(item.detail.comment_count)
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                { staticClass: "home-action__item" },
                                [
                                  !item.detail.marked
                                    ? _c("ui-view", {
                                        staticClass:
                                          "home-action__item-icon home-action__icon-mark",
                                        attrs: {
                                          bindtap: {
                                            methodName: "tapMark",
                                            params: [],
                                          },
                                          "data-item": item,
                                        },
                                      })
                                    : _vm._e(),
                                  item.detail.marked
                                    ? _c("ui-view", {
                                        staticClass:
                                          "home-action__item-icon home-action__icon-mark--checked",
                                        attrs: {
                                          bindtap: {
                                            methodName: "tapMark",
                                            params: [],
                                          },
                                          "data-item": item,
                                        },
                                      })
                                    : _vm._e(),
                                  _c(
                                    "ui-view",
                                    {
                                      staticClass:
                                        "home-action__item-text-wrap",
                                    },
                                    [
                                      _c(
                                        "ui-text",
                                        {
                                          staticClass: "home-action__item-text",
                                        },
                                        [_vm._v(_vm._s(item.detail.mark_count))]
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                { staticClass: "home-action__item" },
                                [
                                  _c("ui-view", {
                                    staticClass:
                                      "home-action__item-icon home-action__icon-relay",
                                  }),
                                  _c(
                                    "ui-view",
                                    {
                                      staticClass:
                                        "home-action__item-text-wrap",
                                    },
                                    [
                                      _c(
                                        "ui-text",
                                        {
                                          staticClass: "home-action__item-text",
                                        },
                                        [_vm._v(_vm._s(item.detail.relay))]
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                { staticClass: "home-action__music" },
                                [
                                  _c("ui-image", {
                                    staticClass: "home-action__music-img",
                                    attrs: { src: item.detail.music_photo },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _c(
                            "ui-view",
                            { staticClass: "home-video-description" },
                            [
                              !!item.detail.description.sub
                                ? _c(
                                    "ui-view",
                                    {
                                      staticClass:
                                        "home-video-description__subinfo",
                                      attrs: {
                                        bindtap: {
                                          methodName: "openApp",
                                          params: [],
                                        },
                                        "data-open-info":
                                          item.detail.description.sub,
                                      },
                                    },
                                    [
                                      _c(
                                        "ui-view",
                                        {
                                          staticClass:
                                            "home-video-description__subinfo--inner",
                                        },
                                        [
                                          item.detail.description.sub.type ===
                                          "shoping"
                                            ? _c("ui-view", {
                                                staticClass:
                                                  "home-video-description__subinfo-icon shoping",
                                              })
                                            : _vm._e(),
                                          item.detail.description.sub.type ===
                                          "location"
                                            ? _c("ui-view", {
                                                staticClass:
                                                  "home-video-description__subinfo-icon location",
                                              })
                                            : _vm._e(),
                                          _c(
                                            "ui-text",
                                            {
                                              staticClass:
                                                "home-video-description__subinfo-title",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  item.detail.description.sub
                                                    .first_title
                                                )
                                              ),
                                            ]
                                          ),
                                          _c("ui-view", {
                                            staticClass:
                                              "home-video-description__subinfo-line",
                                          }),
                                          _c(
                                            "ui-text",
                                            {
                                              staticClass:
                                                "home-video-description__subinfo-txt",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  item.detail.description.sub
                                                    .content
                                                )
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _c(
                                "ui-view",
                                {
                                  staticClass:
                                    "home-video-description__user-name",
                                },
                                [
                                  _c(
                                    "ui-text",
                                    {
                                      staticClass:
                                        "home-video-description__user-name-txt",
                                    },
                                    [
                                      _vm._v(
                                        "@" + _vm._s(item.detail.user_name)
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _c(
                                "ui-view",
                                {
                                  staticClass:
                                    "home-video-description__content",
                                },
                                [
                                  _c(
                                    "ui-text",
                                    {
                                      staticClass:
                                        "home-video-description__content-txt",
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(item.detail.description.body)
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  )
                }),
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _c(
        "ui-view",
        { staticClass: "home-footer" },
        [
          _c(
            "ui-view",
            { staticClass: "home-footer__content" },
            [
              _c(
                "ui-view",
                { staticClass: "home-footer__btn home-footer__btn--active" },
                [
                  _c("ui-text", { staticClass: "home-footer__btn-text" }, [
                    _vm._v("首页"),
                  ]),
                ],
                1
              ),
              _c(
                "ui-view",
                { staticClass: "home-footer__btn" },
                [
                  _c("ui-text", { staticClass: "home-footer__btn-text" }, [
                    _vm._v("朋友"),
                  ]),
                ],
                1
              ),
              _c("ui-view", {
                staticClass: "home-footer__btn home-footer__add-video",
              }),
              _c(
                "ui-view",
                { staticClass: "home-footer__btn" },
                [
                  _c("ui-text", { staticClass: "home-footer__btn-text" }, [
                    _vm._v("消息"),
                  ]),
                ],
                1
              ),
              _c(
                "ui-view",
                { staticClass: "home-footer__btn" },
                [
                  _c("ui-text", { staticClass: "home-footer__btn-text" }, [
                    _vm._v("我"),
                  ]),
                ],
                1
              ),
            ],
            1
          ),
        ],
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
        scopeId: 'data-v-WdqOT1co3E',
      });
    })
  
    modDefine('pages/detail/index', function() {
      var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ui-view",
    { staticClass: "user-profile" },
    [
      !!_vm.userData
        ? _c(
            "ui-view",
            { staticClass: "user-profile__banner" },
            [
              _c(
                "ui-view",
                { staticClass: "user-profile__user-bg" },
                [
                  _c("ui-image", {
                    staticClass: "user-profile__user-bg-photo",
                    attrs: { src: _vm.userData.bg },
                  }),
                ],
                1
              ),
              _c("ui-view", { staticClass: "user-profile__mask" }),
              _c(
                "ui-view",
                { staticClass: "user-profile__info" },
                [
                  _c(
                    "ui-view",
                    { staticClass: "user-profile__photo" },
                    [
                      _c("ui-image", {
                        staticClass: "user-profile__photo-img",
                        attrs: { src: _vm.userData.user_photo },
                      }),
                    ],
                    1
                  ),
                  _c(
                    "ui-view",
                    { staticClass: "user-profile__name-info" },
                    [
                      _c(
                        "ui-view",
                        [
                          _c("ui-text", { staticClass: "user-profile__name" }, [
                            _vm._v(_vm._s(_vm.userData.user_name)),
                          ]),
                        ],
                        1
                      ),
                      _c(
                        "ui-view",
                        { staticClass: "user-profile__number" },
                        [
                          _c(
                            "ui-text",
                            { staticClass: "user-profile__number-text" },
                            [
                              _vm._v(
                                "抖音号: " + _vm._s(_vm.userData.dy_number)
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _c("ui-view", {
                staticClass: "user-profile__return-btn",
                attrs: { bindtap: { methodName: "goBack", params: [] } },
              }),
            ],
            1
          )
        : _vm._e(),
      !!_vm.userData
        ? _c(
            "ui-view",
            { staticClass: "user-profile__body" },
            [
              _c(
                "ui-view",
                { staticClass: "user-profile__user-data" },
                [
                  _c(
                    "ui-view",
                    { staticClass: "user-profile__user-data-item" },
                    [
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-number" },
                        [_vm._v(_vm._s(_vm.userData.like))]
                      ),
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-type" },
                        [_vm._v("获赞")]
                      ),
                    ],
                    1
                  ),
                  _c(
                    "ui-view",
                    { staticClass: "user-profile__user-data-item" },
                    [
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-number" },
                        [_vm._v(_vm._s(_vm.userData.sub))]
                      ),
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-type" },
                        [_vm._v("关注")]
                      ),
                    ],
                    1
                  ),
                  _c(
                    "ui-view",
                    { staticClass: "user-profile__user-data-item" },
                    [
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-number" },
                        [_vm._v(_vm._s(_vm.userData.fans))]
                      ),
                      _c(
                        "ui-text",
                        { staticClass: "user-profile__user-data-type" },
                        [_vm._v("粉丝")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _c(
                "ui-view",
                { staticClass: "user-profile__video-list" },
                [
                  _c("ui-view", { staticClass: "user-profile__video" }),
                  _c("ui-view", { staticClass: "user-profile__video" }),
                  _c("ui-view", { staticClass: "user-profile__video" }),
                  _c("ui-view", { staticClass: "user-profile__video" }),
                  _c("ui-view", { staticClass: "user-profile__video" }),
                ],
                1
              ),
            ],
            1
          )
        : _vm._e(),
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
        scopeId: 'data-v-QeUbJFC8Z8',
      });
    })
  