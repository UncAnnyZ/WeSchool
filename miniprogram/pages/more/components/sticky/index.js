import pageScrollMixin from "./page-scroll";
const ROOT_ELEMENT = ".weimob-sticky";

Component({
  options: {
		multipleSlots: true
	},
  properties: {
    zIndex: {
      type: Number,
      value: 99
    },
    offsetTop: {
      type: Number,
      value: 0,
      observer: "onScroll"
    },
    disabled: {
      type: Boolean,
      observer: "onScroll"
    },
    container: {
      type: null,
      observer: "onScroll"
    },
    scrollTop: {
      type: null,
      observer(val) {
        this.onScroll({
          scrollTop: val
        });
      }

    }
  },
  data: {
    height: 0,
    fixed: false,
    transform: 0
  },
  behaviors: [pageScrollMixin(function pageScrollMixinCallback(event) {
    // 非null时会禁用页面滚动事件的监听
    if (this.data.scrollTop != null) {
      return;
    }

    this.onScroll(event);
  })],
  lifetimes: {
    attached() {
      this.onScroll();
    }

  },
  methods: {
    onScroll({
      scrollTop
    } = {}) {
      const {
        container,
        offsetTop,
        disabled
      } = this.data;

      if (disabled) {
        this.setDataAfterDiff({
          fixed: false,
          transform: 0
        });
        return;
      }

      this.scrollTop = scrollTop || this.scrollTop;

      if (typeof container === "function") {
        // 情况一：指定容器下时，吸顶距离+吸顶元素高度>容器高度+容器距顶部距离,随页面滚动；
        // 情况二：指定容器下时，吸顶距离>吸顶元素高度,元素固定；
        // 情况三：元素初始化。
        

        // this.getRect获取节点ROOT_ELEMENT相对于显示区域的top,height等信息，通过root获取
        // this.getContainerRect获取父容器相对于显示区域的top,height等信息，通过container获取

        Promise.all([this.getRect(ROOT_ELEMENT), this.getContainerRect()]).then( 
        ([root, container]) => {
          if (offsetTop + root.height > container.height + container.top) {
            this.setDataAfterDiff({
              fixed: false,
              transform: container.height - root.height
            });
          } else if (offsetTop >= root.top) {
            this.setDataAfterDiff({
              fixed: true,
              height: root.height,
              transform: 0
            });
          } else {
            this.setDataAfterDiff({
              fixed: false,
              transform: 0
            });
          }
        });
        return;
      }else{
        this.getRect(ROOT_ELEMENT).then(root => {
          // 吸顶时与顶部的距离小于可视区域的top距离时，随着滚动条滚动，否则吸顶
          if (offsetTop >= root.top) {
            this.setDataAfterDiff({
              fixed: true,
              height: root.height
            });
            this.transform = 0;
          } else {
            this.setDataAfterDiff({
              fixed: false
            });
          }
  
          return Promise.resolve();
        });
      }
    },

    setDataAfterDiff(data) {
      // 比较数据是否与上次相同，不同则触发父组件scroll事件更新isFixed，scrollTop。
      wx.nextTick(() => {
        const diff = Object.keys(data).reduce((prev, key) => {
          const prevCopy = prev;

          if (data[key] !== this.data[key]) {
            prevCopy[key] = data[key];
          }

          return prevCopy;
        }, {});
        this.setData(diff);
        this.triggerEvent("scroll", {
          scrollTop: this.scrollTop,
          isFixed: data.fixed || this.data.fixed
        });
      });
    },

    getContainerRect() {
      const nodesRef = this.data.container();
      return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
    },

    getRect(selector) {
      return new Promise(resolve => {
        wx.createSelectorQuery().in(this).select(selector).boundingClientRect(rect => {
          resolve(rect);
        }).exec();
      });
    }

  }
});
