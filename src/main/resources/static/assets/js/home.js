$(document).ready(function(){
	function convertDate(time){
		let date = '';
		if(time != null){
			let day = time[2] < 10 ? '0'+time[2] : time[2];
			let month = time[1] < 10 ? '0'+time[1] : time[1];
			date = time[3] +':'+time[4] +' | '+day + '/' + month + '/' + time[0];
		}
		return date;
	}
	$(document).on('click', '.btn_show_detail', function(){
		let serial = $(this).attr('data-serial-number');
		let url = getContextPath() + "/search?serial=" + serial;
		
		window.open(url, "_blank");
	})
})