var ajax = require('../util/ajax.js')
var ucc = require('../util/uccData.js')
var baseUrl = ucc.baseUrl
/*robot.js 机器人*/
;(function(window, $, undefined) {
	var ROBOT = function(options) {
			this.defaults = {
				visitorName: "",
				visitorId:"",
				ecselfList: null,
				langPk: "",
				dialogue: null,
				robotSetting: 2,
				companyPk: "",
				chatId: "",
				ywList: "ff80808150db355d0150e12f11a90388",
				confidence: 60,
				changeToNormal: function(argument) {}
			};
			this.options = $.extend({}, this.defaults, options);
		}
	ROBOT.prototype = {
		isUse: true,
		choose: false,
		ncRobotTime: 0,
		nc: {
			number: 2,
			answer: "我正在学习中",
			questions: "投诉".split(";")
		},
		recored: [],
		click: false,
		check: function(text) {
			var robot = this;
			var dialogue = robot.options.dialogue;
			if (robot.options.robotSetting == 2) {
				//跳出
				robot.isUse = false;
				return false;
			}

			if ( text) {
				dialogue.showMsg({
					date: new Date().getTime(),
					content: text,
					from: "visitor",
					status: 0
				});
				robot.recored.push({
					date: new Date().getTime(),
					content: text,
					from: "visitor",
					status: 0
				})
			}
			var ecselfList = (robot.options.ecselfList);
			//		try{
			//			ecselfList = JSON.parse(ecselfList);
			//		}catch(e){}
			if ( ecselfList) {
				for (var i in ecselfList) {
					var item = ecselfList[i];
					if ( !! item.eclangPk && item.eclangPk == robot.options.langPk) {
						robot.nc = {
							number: item.number || robot.nc.number,
							answer: item.answer || robot.nc.answer,
							questions: item.questions ? item.questions.split(";") : ""
						}
					}
				}
			}
			if (robot.options.robotSetting == 3) {
				//小i
				robot.iRobot(text);
			} else if ((robot.options.robotSetting == 1 || robot.options.robotSetting == 4) && robot.options.ywList.indexOf(robot.options.companyPk) > -1) {
				//云问
				robot.ywRobot(text);
			} else if (robot.options.robotSetting == 4 && ecselfList) {
				//久科
				//robot.ncRobot(text);
				robot.umpRobot(text);
			} else if (robot.options.robotSetting == 1) {
				//旧版久科
				robot.oldNcRobot(text);
			}
			return true;
		},
		umpRobot: function(text) {
			if (!text) return;
			var robot = this;
			var dialogue = robot.options.dialogue;
			ajax.getAnswer(robot.options.visitorId, text)
      .done(function(e) {
				robot.click = false;
        if(e == "jumpToNormal"){
          robot.options.changeToNormal();
          robot.choose = false;
          robot.recored.push({
            date: new Date().getTime(),
            content: robot.nc.answer,
            from: "robot"
          })
          return 
        }
				if(e.response){
					if(e.response.length==1){
						var content = e.response[0].content
						if(e.suggestions&&e.suggestions.length>=1){
							for(var i=0,len=e.suggestions.length;i<len;i++){
								content+="<b/><div class='robotSuggsetion'>"+e.suggestions[i]+"</div>"
							}
						}
						dialogue.showMsg({
							date: new Date().getTime(),
							content: content,
							from: "robot"
						});
						robot.recored.push({
							date: new Date().getTime(),
							content: content,
							from: "robot"
						})
					}
				}else{
					robot.answerFail(text);
				}
			}).fail(function(){
				if(!robot.isUse){
					return;
				}
				robot.click = false;
				robot.answerFail(text);
			})
		},
		answerFail: function(text) {
			robot.ncRobotTime++;
			if (robot.ncRobotTime >= robot.nc.number) {
				if (robot.choose) return;
				robot.choose == true;
				if(!robot.cf){
					robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
					if (robot.cf == true) {
						robot.options.changeToNormal();
						robot.choose = false;
					} else {
						robot.cf = null;
						dialogue.showMsg({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						});
						robot.recored.push({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						})
						robot.choose = false;
						robot.ncRobotTime = 0; //取消重置
					}
				}
			} else {
				var p = 0;
				for (var i in robot.nc.questions) {
					var item = robot.nc.questions[i];
					if (item == text) {
						p = 1;
						if (robot.choose) return;
						robot.choose == true;
						if(!robot.cf){
							robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
							if (robot.cf == true) {
								robot.choose = false;
								robot.options.changeToNormal();
							} else {
								robot.cf = null;
								p = 0;
								robot.choose = false;
								robot.ncRobotTime = 0; //取消重置
							}
						}
					}
				}
				if (p == 0) {
					dialogue.showMsg({
						date: new Date().getTime(),
						content: robot.nc.answer,
						from: "robot"
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: robot.nc.answer,
						from: "robot"
					})
				}
			}
		},
		iRobot: function(text) {
			if (!text) return;
			var robot = this;
			$.ajax({
				url: "http://vdev.icontek.com:28080/queryj/x/ROOT->ucctest/" + robot.options.companyPk + new Date().getTime() + "/" + text
			}).done(function(e) {
				var result = "";
				if (e.confidence >= robot.confidence && !! e.answer) {
					result += e.answer.replace(/\+/g, " ") + "<br />";
					robot.options.dialogue.showMsg({
						date: new Date().getTime(),
						content: result,
						from: "robot"
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: result,
						from: "robot"
					})
				}
				var cf = confirm("不能查找到答案，是否需要转人工服务?");
				if (cf == true) {
					robot.options.changeToNormal();
				}
			})
		},
		cf:null,
		ncRobot: function(text) {
			if (!text) return;
			var robot = this;
			var dialogue = robot.options.dialogue;
			$.ajax({
				type: "POST",
				url: baseUrl + "/echatManager.do?method=automaticResponse",
				data: {
					"companyPk": robot.options.companyPk,
					"question": text,
					"chatId": robot.options.chatId,
					"visitorName": robot.options.visitorName,
					"langPk": robot.options.langPk,
					"true": robot.click
				},
				dataType: "json"
			}).done(function(data) {
				if(!robot.isUse){
					return;
				}
				robot.click = false;
				if (data.reply == true) {
					robot.ncRobotTime = 0; //连续错才会计算
					dialogue.showMsg({
						date: new Date().getTime(),
						content: data.answer,
						from: "robot"
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: data.answer,
						from: "robot"
					})
				} else {
					robot.ncRobotTime++;
					if (robot.ncRobotTime >= robot.nc.number) {
						if (robot.choose) return;
						robot.choose == true;
						if(!robot.cf){
							robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
							if (robot.cf == true) {
								robot.options.changeToNormal();
								robot.choose = false;
							} else {
								robot.cf = null;
								dialogue.showMsg({
									date: new Date().getTime(),
									content: robot.nc.answer,
									from: "robot"
								});
								robot.recored.push({
									date: new Date().getTime(),
									content: robot.nc.answer,
									from: "robot"
								})
								robot.choose = false;
								robot.ncRobotTime = 0; //取消重置
							}
						}
					} else {
						var p = 0;
						for (var i in robot.nc.questions) {
							var item = robot.nc.questions[i];
							if (item == text) {
								p = 1;
								if (robot.choose) return;
								robot.choose == true;
								if(!robot.cf){
									robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
									if (robot.cf == true) {
										robot.choose = false;
										robot.options.changeToNormal();
									} else {
										robot.cf = null;
										p = 0;
										robot.choose = false;
										robot.ncRobotTime = 0; //取消重置
									}
								}
							}

						}
						if (p == 0) {
							dialogue.showMsg({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							});
							robot.recored.push({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							})
						}
					}
				}
			}).fail(function() {
				if(!robot.isUse){
					return;
				}
				robot.click = false;
				robot.ncRobotTime++;
				if (robot.ncRobotTime >= robot.nc.number) {
					if (robot.choose) return;
					robot.choose == true;
					if(!robot.cf){
						robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
						if (robot.cf == true) {
							robot.choose = false;
							robot.options.changeToNormal();
						} else {
							robot.cf = null;
							dialogue.showMsg({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							});
							robot.recored.push({
								date: new Date().getTime(),
								content: robot.nc.answer,
								from: "robot"
							})
							robot.choose = false;
							robot.ncRobotTime = 0; //取消重置
						}
					}
				} else {
					var p = 0;
					for (var i in robot.nc.questions) {
						var item = robot.nc.questions[i];
						if (item == text) {
							p = 1;
							if (robot.choose) return;
							robot.choose == true;
							if(!robot.cf){
								robot.cf = confirm("不能查找到答案，是否需要转人工服务?");
								if (robot.cf == true) {
									robot.choose = false;
									robot.options.changeToNormal();
								} else {
									robot.cf = null;
									p = 0;
									robot.choose = false;
									robot.ncRobotTime = 0; //取消重置
								}
							}
						}

					}
					if (p == 0) {
						dialogue.showMsg({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						});
						robot.recored.push({
							date: new Date().getTime(),
							content: robot.nc.answer,
							from: "robot"
						})
					}
				}
			})
		},
		ywRobot: function(text) {
			if (!text) return;
			var robot = this;
			var dialogue = robot.options.dialogue;
			$.ajax({
				type: "POST",
				url: baseUrl + "/echatManager.do?method=loadSelfService2",
				data: {
					"chatId": robot.options.chatId,
					"companyPk": robot.options.companyPk,
					"content": encodeURIComponent(text)
				},
				dataType: "json"
			}).done(function(data) {
				var result = "";
				if (data && data.answer != 'Artificial customer service' && data.answer != null && data.answer != "" && data.answer != undefined) {
					result = data.answer.replace(/\+/g, " ") + "<br />";
					dialogue.showMsg({
						date: new Date().getTime(),
						content: result + "<br />单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。",
						from: "robot",
						status: 0
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: result + "<br />单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。",
						from: "robot"
					})
				} else {
					dialogue.showMsg({
						date: new Date().getTime(),
						content: "<div id='conId'>您好，我正在成长过程中，您的这个问题可能已经超出了我目前的知识范围。单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。</div>",
						from: "robot",
						status: 0
					});
					robot.recored.push({
						date: new Date().getTime(),
						content: "<div id='conId'>您好，我正在成长过程中，您的这个问题可能已经超出了我目前的知识范围。单击<a href='javascript:' class='robo'><span style='color: red;'>转人工</span></a>进行提问。</div>",
						from: "robot"
					})
				}
				$(".robo").click(function() {
					robot.options.changeToNormal();
				})
			})
		},
		oldNcRobot: function(text) {
			if (!text) return;
			var robot = this;
			var dialogue = robot.options.dialogue;
			var result = "";
			$.ajax({
				type: "POST",
				url: baseUrl + "/echatManager.do?method=loadSelfService",
				data: {
					"chatId": robot.options.chatId,
					"companyPk": robot.options.companyPk,
					"content": encodeURIComponent(text)
				},
				dataType: "json"
			}).done(function(rs) {
				if (rs && rs.length > 1) {
					$.each(rs, function(i) {
						result += rs[i].text.replace(/\+/g, " ") + "<br />";
					});
					dialogue.showMsg({
						msgid: "",
						date: new Date().getTime(),
						content: result,
						from: "client",
						status: 0
					});
				} else if (rs && rs.length == 1) {
					result += "<div>" + rs[0].text.replace(/\+/g, " ") + "</div>";
					dialogue.showMsg({
						msgid: "",
						date: new Date().getTime(),
						content: result,
						from: "client",
						status: 0
					});
				} else {
					var cf = confirm("不能查找到答案，是否需要转人工服务?");
					if (cf == true) {
						robot.options.changeToNormal();
					} else {
						robot.ncRobotTime = 0; //取消重置
					}
				}
			})
		}
	}
	$.robot = function(options) {
		var robot = new ROBOT(options);
		robot.recored = [];
		return robot;
	}
})(window, jQuery);