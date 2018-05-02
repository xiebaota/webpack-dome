// alert提示
function msgTip(content, url) {
	var html =
		'<div class="xiaoxi none" id="msg" style="z-index:9999;left: 5%;width: 90%;position: fixed;background:none;top:40%;font-size: .4rem;"> <p class="msg" style="background: none repeat scroll 0 0 #000; border-radius: 5px;color: #fff; margin: 0 auto;padding: .6em;text-align: center;width: 70%;opacity: 0.8;"></p></div>';
	if ($("body").children("#msg").css('display')) {
		$(".msg").html(content);
		$("#msg").show();
	} else {
		$(document.body).append(html);
		$("#msg").show();
		$(".msg").html(content);
	}
	var timeout = setTimeout('$("#msg").fadeOut()', 500);
}
// 手机号码校验,true手机号码错误
function chcekPhone(select) {
	return !/^1[3|5|7|8]\d{9}$/.test($(select).val())
}