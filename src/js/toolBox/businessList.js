
(function(window, $, undefined) {
	var BUSINESSLIST = function(options) {
			this.defaults = {
				'businessList': [],
				aDset: [],
				root: "-1"
			}, this.options = $.extend({}, this.defaults, options);
		}
	BUSINESSLIST.prototype = {
		num: 1,
		//mobile版本的数字号
		basePk: -1,
		init: function() {
			var aDset = this.options.aDset;
			if (!aDset) return;
			var businessList = this.options.businessList;
			if (aDset.joinUpType == "0" || !aDset.joinUpType) {} else if (aDset.joinUpType == "1") { // 指定坐席
				// TODO 指定坐席接入对话
			} else if (aDset.joinUpType == "2") { // 方案指定业务类型
			}
			this.reset("-1");
		},
		reset:function(pk){
			var blist = this;
			var businessList = this.options.businessList;
			var hasonline = false;
			for (var i = 0; i < businessList.length; i++) {
				if(businessList[i].parentPk == pk){
					var next = blist.getList(businessList[i].pk);
					if(next.length==0){
						if(businessList[i].operators.length > 0){
							hasonline = true;
						}
					}else{
						var nexthasOnline = blist.reset(businessList[i].pk);
						if(nexthasOnline==false){
							businessList[i].operators = [];
						}else if(nexthasOnline==true){
							hasonline = true;
						}
					}
				}
			}
			return hasonline;
		},
		hasList: function(pk) {
			var btns = []; //标签组
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].parentPk == pk) {
					if (businessList[i].operators.length > 0) {
						btns.push({
							item: businessList[i],
							type: "online"
						});
					} else {
						btns.push({
							item: businessList[i],
							type: "offline"
						});
					}
				}
			}
			return btns;
		},
		getList: function(pk) {
			var num = this.num
			var btns = []; //标签组
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].parentPk == pk) {
					if (businessList[i].operators.length > 0) {
						btns.push({
							num: this.num,
							item: businessList[i],
							type: "online"
						});
						this.num++;
					} else {
						btns.push({
							num: this.num,
							item: businessList[i],
							type: "offline"
						});
						this.num++;
					}
				}
			}
			return btns;
		},
		getAllLength: function() {
			var bList = this
			var businessList = this.options.businessList;
			return {
				listLength: businessList.length,
				operatorLength: businessList.length > 0 ? businessList[0].operators.length : 0,
				firstItem: businessList.length > 0 ? businessList[0] : null
			}
		},
		getParentPk: function(pk) {
			var businessList = this.options.businessList;
			for (var i = 0; i < businessList.length; i++) {
				if (businessList[i].pk == pk) {
					return businessList[i].parentPk;
				}
			}
			return null;
		},
		setSelect: function(pk, name) {
			this.select = {
				pk: pk,
				name: name
			}
		},
		getSelect: function() {
			return this.select
		},
		generate: function(pk) {
			//当前节点只有一个子节点
			var list = this.getList(pk);
			var parentPk = this.getParentPk(pk);
			var root = false;
			if (pk == -1 && list.length == 0) {
				return {
					access: true,
					online: false
				};
			} else if (pk == this.basePk && list.length == 1) {
				this.basePk = list[0].item.pk;
				if (this.getList(list[0].item.pk).length > 0) {
					return this.generate(list[0].item.pk);
				} else if (list[0].item.operators.length > 0) {
					return {
						access: true,
						online: true,
						pk: list[0].item.pk,
						name: list[0].item.name
					}
				} else {
					return {
						access: true,
						online: false,
						pk: list[0].item.pk,
						name: list[0].item.name
					}
				}
			} else {
				if (this.basePk == pk) {
					root = true;
				}
				return {
					access: false,
					list: list,
					root: root
				}
			}
		},getItemOnline:function(pk){
			var blist = this;
			var businessList = this.options.businessList;
			var hasonline = false;
			for (var i = 0; i < businessList.length; i++) {
				if(businessList[i].pk == pk){
					if(businessList[i].operators.length>0){
						hasonline = true;
					}
				}
			}
			return hasonline;
		}
	}
	$.businessList = function(options) {
		var businessList = new BUSINESSLIST(options);
		businessList.init();
		return businessList;
	}
})(window, jQuery);