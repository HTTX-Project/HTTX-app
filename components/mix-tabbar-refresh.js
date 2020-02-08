/**
 * 仅需关注_config配置即可, 其他实现有兴趣的可以参考一下
 * 
 * 调用页需配置onHide onPageScroll onTabItemTap3个生命周期函数
 * onPageScroll: 页面上滑后修改tabItem
 * onHide: 切换页面后还原tabItem
 * onTabItemTap: 小程序和h5的tabbar监听
 */
const _config = {
	tabSize: 2, //tabbar 数量
	index: 0,  // tabbar 的哪一项，从左边算起
	scrollTop: 700, // 页面上滑该距离后修改tabItem开启监听
	text: '首页', // tab 按钮文字
	selectedIconPath: "static/tab-home-current.png", //tab 图标路径
	newText: '刷新', // 修改后的文字
	newSelectedIconPath: "static/refresh.png", // 修改后的 图标路径
}



let _listenState = false; //监听状态, 页面滚动到一定距离开始监听


const _setTabBarItem = type =>{
	let text = _config.text;
	let selectedIconPath = _config.selectedIconPath;
	
	_listenState = type;
	
	if(type === true){
		text = _config.newText;
		selectedIconPath = _config.newSelectedIconPath;
	}

	uni.setTabBarItem({
		index: _config.index,
		text,
		selectedIconPath,
	})
}


//监听事件的回调函数
const event = ()=>{
	console.log(666);
	if(!_listenState){
		return;
	}
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 0
	});
	uni.startPullDownRefresh(); //下拉刷新
	_setTabBarItem(false); //还原tabItem
}

export default{
	//监听页面滚动修改tabItem
	pageScroll(scrollTop){
		if(scrollTop > _config.scrollTop && _listenState === false){
			_setTabBarItem(true);
		}else if(scrollTop < _config.scrollTop && _listenState === true){
			_setTabBarItem(false);
		}
	},
	//页面隐藏时还原tabItem
	pageHide(){
		_setTabBarItem(false);
	},
	event
}