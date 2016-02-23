define(function() {
	(function(win, doc) {
		var innerStyle = ".tips-hp{position:fixed;left:0;right:0;top:0;bottom:0;z-index:9999;background-color:#fff;display:none}.flexBox-hp{display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;height:100%;font-size:0}.word-hp{display:inline-block;height:60px;line-height:60px;font-size:26px;color:#000;padding-right:80px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACZCAYAAAA8XJi6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzFFQTg1MkY1MDZDMTFFNUFGOUZBNjk2MjIyOEI2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzFFQTg1MzA1MDZDMTFFNUFGOUZBNjk2MjIyOEI2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MUVBODUyRDUwNkMxMUU1QUY5RkE2OTYyMjI4QjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MUVBODUyRTUwNkMxMUU1QUY5RkE2OTYyMjI4QjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl6Ngg0AAAlYSURBVHja7J17jBXV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) no-repeat right center;background-size:auto 100%}";
		var newStyle = doc.createElement("style");
		newStyle.innerHTML = innerStyle;
		doc.head.appendChild(newStyle);
		if (doc.body) {
			var newEle = doc.createElement("div");
			newEle.className = "tips-hp";
			newEle.id = "tips-hp";
			newEle.innerHTML = '<div class="flexBox-hp"><p class="word-hp">横屏乱糟糟，竖起来看吧</p></div>';
			newEle.addEventListener("touchmove", function(event) {
				event.preventDefault();
			});
			doc.body.appendChild(newEle);
		} else {
			var html_hp = '<div class="tips-hp" id="tips-hp" ontouchmove="return !1"><div class="flexBox-hp"><p class="word-hp">横屏乱糟糟，竖起来看吧</p></div></div>';
			doc.write(html_hp);
		}

		setTimeout(function(){
			var tipsHP = doc.getElementById("tips-hp");

			function sure_orientation() {
				if (window.orientation == 90 || window.orientation == -90) {
					tipsHP.style.display = 'block';
				} else {
					tipsHP.style.display = 'none';
				}
			}
			sure_orientation();
			win.addEventListener("orientationchange", sure_orientation);
		}, 2000);
	})(window, document);
})