// 全局渲染更新
// 应用场景：
// 1.点赞/取消点赞：主页卡片外部、主页卡片内部、消息通知页跳转卡片内部、我的发布页跳转卡片内部
// 2.评论/删除评论：             主页卡片内部、消息通知页跳转卡片内部、我的发布页跳转卡片内部
// 3.新增卡片/删除卡片：快速发布组件新增卡片、发布页面新增卡片、主页卡片内部删除卡片、消息通知页跳转卡片内部删除卡片、我的发布页跳转卡片内部删除卡片、

function setAllList(allList, type) {
  // 获取小程序页面栈
  let pages = getCurrentPages();
  // 校园圈首页
  let morePage;
  // 找到校园圈首页
  pages.forEach(item => {
    if (item.route == "pages/more/more") {
      morePage = item;
    }
  })

  const setStarAndComment = (allList) => {
    // 如果是从“我的发布页面”跳转过来的
    if (pages[pages.length - 2]) {
      if (pages[pages.length - 2].route == "pages/more/pages/UserContent/UserContent") {
        pages[pages.length - 2].onLoad();
      }
    }
    // 校园圈首页更新
    let e = {
      detail: allList
    }
    morePage.setAllList(e, "点赞和评论");
  };
  const setCardQuick = (allList) => {
    // 校园圈首页更新
    let e = {
      detail: allList
    }
    morePage.setAllList(e);
    morePage.onLoad();
  };
  const setCardPublish = (allList) => {
    // 校园圈首页更新
    let e = {
      detail: allList
    }
    morePage.setAllList(e);
    morePage.onLoad();
    // 返回校园圈首页
    wx.switchTab({
      url: '../more',
    })
  };
  const delCard = (allList) => {
    // 如果是从“我的发布页面”||“新消息通知页面”跳转过来的
    if (pages[pages.length - 2]) {
      if (pages[pages.length - 2].route == "pages/more/pages/UserContent/UserContent" || pages[pages.length - 2].route == "pages/more/pages/NewInfo/NewInfo") {
        pages[pages.length - 2].onLoad();
      }
    }
    // 校园圈首页更新
    let e = {
      detail: allList
    }
    morePage.setAllList(e);
    morePage.onLoad();
    wx.navigateBack({
      delta: 1,
    })
  };
  switch (type) {
    case "点赞":
      setStarAndComment(allList);
      break;
    case "评论":
      setStarAndComment(allList);
      break;
    case "快速发布卡片":
      setCardQuick(allList);
      break;
    case "普通发布卡片":
      setCardPublish(allList);
      break;
    case "删除卡片":
      delCard(allList);
      break;
  }


}


module.exports = {
  setAllList

}