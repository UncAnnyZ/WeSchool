function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] || {};
}

function onPageScroll(event) {
  const {
    weimobPageScroller = []
  } = getCurrentPage();
  weimobPageScroller.forEach(scroller => {
    if (typeof scroller === "function" && event) {
      // @ts-ignore
      scroller(event);
    }
  });
}

const pageScrollMixin = scroller => Behavior({
  attached() {
    const page = getCurrentPage();

    if (Array.isArray(page.weimobPageScroller)) {
      page.weimobPageScroller.push(scroller.bind(this));
    } else {
      page.weimobPageScroller = typeof page.onPageScroll === "function" ? [page.onPageScroll.bind(page), scroller.bind(this)] : [scroller.bind(this)];
    }

    page.onPageScroll = onPageScroll;
  },

  detached() {
    const page = getCurrentPage();
    page.weimobPageScroller = (page.weimobPageScroller || []).filter(item => item !== scroller);
  }

});

export default pageScrollMixin;