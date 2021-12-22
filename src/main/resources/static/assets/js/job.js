$(document).ready(function(){
	$('#accessory').select2();
})

function showModal(jobId) {
	//Get data
	$.ajax({
		url: getContextPath() + "/getJob",
		method: 'GET',
		data: {
			jobId: jobId
		},
		success: function(result) {
			// set thông tin services
			var modal_user_val = '';
			if (result.username !== null) {
				modal_user_val = modal_user_val.concat(result.username);
			}
			if (result.phoneNumber !== null) {
				modal_user_val = modal_user_val.concat(' / Sđt: ').concat(result.phoneNumber);
			}
			$('#modal-user').text(modal_user_val);
			$('#modal-serial').text(result.serialNumber);
			$('#modal-address').text(result.address);
			$('#modal-startTime').text(result.checkInTime);
			$('#modal-endTime').text(result.checkOutTime);
			
			if (result.note !== null) {
				document.getElementById("td-note").style.backgroundColor = "lightsalmon";
				$('#modal-note').text(result.note);
			}else {
				document.getElementById("td-note").style.backgroundColor = "none";
			}
			
			
			$('#modal-workDetail').text(result.workDetail);
			
			$.each(result.kpscs, function(index, item) {
				$('#tr-kpsc').after('<tr class="kpsc-item"><td>'+ (result.kpscs.length - index) +'</td><td colspan="1">'+ item.device +'</td><td colspan="4">'+ item.errorDesc +'</td><td colspan="4">' + item.jobPerform + '</td></tr>');
			});
			
			$.each(result.accessories, function(index, item) {
				$('#tr-accessories').after('<tr class="accessory-item"><td>'+ (result.accessories.length - index) +'</td><td colspan="1">'+ item.device +'</td><td colspan="4">'+ item.desc +'</td><td colspan="4"></td></tr>');
			});
			
			$('#modal-lg').modal({
			    backdrop: 'static',
			    keyboard: false
			})
			$('#modal-lg').modal('show');
		}
	});
	
}

	function reverseDate(date){
		var dateSplit = date.split('/').reverse();
		return dateSplit[0] + '-' + dateSplit[1] + '-' + dateSplit[2];
	}

function closeModal() {
	$('#modal-user').text('');
	$('#modal-serial').text('');
	$('#modal-address').text('');
	$('#modal-startTime').text('');
	$('#modal-endTime').text('');
	$('#modal-note').text('');
	
	$('.kpsc-item').remove();
	$('.accessory-item').remove();
	
	$('#modal-lg').modal('hide');
}

function deleteJob(id) {
	Swal.fire({
		title: "Bạn có chắc không?",
        text: "Bản ghi sẽ được xóa khỏi kho dữ liệu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không"
	}).then((result) => {
	  if (result.isConfirmed) {
		location.href = getContextPath() + '/job/delete?id=' + id;
	  }
	})
}

function deleteAllJob() {
	Swal.fire({
		title: "Bạn có chắc không?",
        text: "Tất cả bản ghi sẽ được xóa khỏi kho dữ liệu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không"
	}).then((result) => {
	  if (result.isConfirmed) {
		var path = getContextPath() + '/job/deleteAll?';
		if ($('#username').val() !== '') {
			path = path.concat('username=').concat($('#username').val()).concat('&');
		}
		if ($('#startTime').val() !== '') {
			path = path.concat('startTime=').concat($('#startTime').val()).concat('&');
		}
		if ($('#endTime').val() !== '') {
			path = path.concat('endTime=').concat($('#endTime').val()).concat('&');
		}
		if ($('#status').val() !== '') {
			path = path.concat('status=').concat($('#status').val());
		}
	 	location.href = path;
	  }
	})
}


function deleteJobOnSearchView(id) {
	Swal.fire({
		title: "Bạn có chắc không?",
        text: "Bản ghi sẽ được xóa khỏi kho dữ liệu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không"
	}).then((result) => {
	  if (result.isConfirmed) {
		location.href = getContextPath() + '/search/delete?id=' + id;
	  }
	})
}

function deleteAllJobOnSearchView() {
	Swal.fire({
		title: "Bạn có chắc không?",
        text: "Tất cả bản ghi sẽ được xóa khỏi kho dữ liệu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không"
	}).then((result) => {
	  if (result.isConfirmed) {
		var path = getContextPath() + '/search/deleteAll?';
		if ($('#serial').val() !== '' && $('#serial').val() !== undefined) {
			path = path.concat('serial=').concat($('#serial').val()).concat('&');
		}
		if ($('#address').val() !== '' && $('#address').val() !== undefined) {
			path = path.concat('address=').concat($('#address').val()).concat('&');
		}
		if ($('#startTime').val() !== '' && $('#startTime').val() !== undefined) {
			path = path.concat('startTime=').concat($('#startTime').val()).concat('&');
		}
		if ($('#endTime').val() !== '' && $('#endTime').val() !== undefined) {
			path = path.concat('endTime=').concat($('#endTime').val().concat('&'));
		}
		if ($('#status').val() !== '') {
			path = path.concat('status=').concat($('#status').val());
		}
	 	location.href = path;
	  }
	})
}