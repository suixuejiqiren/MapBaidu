var isValidCode = false; // 验证码开启变量 true开启 false关闭
var loginHelper = {
	/*
	 * 键盘或点击输入，提交登录前判断
	 */
	summitByEnterOrClick : function(event) {
		if (event.type !== 'click' && event.which !== 13) { // 回车或点击时提交登录
			return;
		}

		var uname = $.trim($("#username").val());
		var passwd = $.trim($("#password").val());
		if (uname == "" || uname == null || uname == "账户") {

			alert("用户名不能为空,请输入用户名!");
			document.getElementById("username").focus();
			return false;
		}
		if (passwd == "" || passwd == null || passwd == "密码") {
			alert("密码不能为空,请输入密码!");
			$("#password").focus();
			return false;
		}

		$("#loginForm").submit();
	},

	/*
	 * 清空登录对话框的输入
	 */
	clearForm : function() {
		$('#loginForm').form('clear');
	}
}

$(document).ready(function() {
	$('#username').keydown(function(event) {
		loginHelper.summitByEnterOrClick(event);
	});
	$('#password').keydown(function(event) {
		loginHelper.summitByEnterOrClick(event);
	});
	$('#imgLogin').click(function(event) {
		loginHelper.summitByEnterOrClick(event);
	});
	if ($("#errorMsg").val() != '') {
		alert($("#errorMsg").val());
	}
	$("#username").focus();
});
