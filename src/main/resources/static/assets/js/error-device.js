$(document).ready(function(){
	/*$('#series_err').hide();
	$('#series_edit_err').hide();*/
	$("#formCreateDevice").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
        	"name": {
          		required: true,
        	},
      	},
      	messages: {
        	"name": {
          		required: "Vui lòng nhập tên thiết bị.",
        	},
      	}
    });
	$(document).on('submit', '#formCreateDevice', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
      	/*let check = true;
		let series = $('#series').val();
		
		if	(series == ""){
			check = false;
			$("#series_err").show();
			$("#series_err").html("Vui lòng chọn dòng máy phù hợp.");
		} else {
			$('#series_err').hide();
		}
		if(check){*/
			
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: getContextPath() + "/error-device/save",
				data: JSON.stringify({
					name: $('#name').val(),
					/*series: series*/
				}),
				cache: false,
				success: function(result) {
					let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createDevices').modal('hide');
						$('#formCreateDevice')[0].reset();
						
						$('[name=series]').bootstrapDualListbox('refresh', true);
						setTimeout(function() {
						   window.location.replace("/error-devices");
						}, 700);
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
				},
				error: function(err, result) {
					toastr.error(result);
				}
			});
		/*}*/
	});
	/*getList();*/
	function getList(){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: getContextPath() + "/error-device/list",
			success: function(result){
				let stt = 0;
				$('#tblDevice').dataTable({
					"lengthChange": true,
					"searching": true,
					"destroy": true,
					"data": result,
			      	"autoWidth": true,
			      	"pageLength": 10,
					"columns":[
						{
							data: null,
							render: function(data){
								stt = stt + 1
								return stt;
							},
							class: 'text-center'
						},
						{data: 'name'},
						{
							data: null,
							render: function(data){
								let txt = "";
								let series = data.series;
								for(var i = 0; i < series.length; i++){
									txt += i == 0 ? series[i]["name"] : ", "+series[i]["name"];
								}
								return txt;
							}
						},
						{
							data: null,
							render: function(data){
								let txt = '';
								txt += '<a class="btn btn-success btn-edit" data-id="'+data.id+'"><em class="fas fa-edit"></em></a>';
								txt += '<a class="btn btn-danger btn-delete" data-id="'+data.id+'"><em class="fas fa-trash-alt"></em></a>'
								return txt;
							},
							class:'text-center'
						},
					]
				})
			},
			error: function(err, result) {
				toastr.error(result);
			}
		});
	}
	
	$(document).on('click', '.btn-delete', function(){
		let id = $(this).attr('data-id');
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
			 $.ajax({
                url: getContextPath() + '/error-device/delete',
                type: 'POST',
				contentType: "application/json",
                data: JSON.stringify({
					id: id
				}),
                success: function(result){
                	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						setTimeout(function() {
						   window.location.replace("/error-devices");
						}, 700);
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
                }
            });
		  }
		})

	})
	
	$(document).on('click', '.btn-edit', function(){
		let id = $(this).attr('data-id');
		$.ajax({
            url: getContextPath() + '/error-device/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
            	$('#name_edit').val(result.name);
            	$('#id_edit').val(result.id);
            	/*let series = result.series;
				let arr = [];
				if (series.length > 0){
					for(var i = 0; i < series.length; i++){
						arr[i] = series[i]['id'];
					}
				}
				$('#series_edit').val(arr);
				$('[name=series_edit]').bootstrapDualListbox('refresh', true);*/
            	$('#modal_createDevices2').modal('show');
            }
        });

	})
	
	$("#formUpdateDevice").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
        	"name_edit": {
          		required: true,
        	},
      	},
      	messages: {
        	"name_edit": {
          		required: "Vui lòng nhập tên thiết bị.",
        	},
      	}
    });

	$(document).on('submit', '#formUpdateDevice', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
      	/*let series = $('#series_edit').val();
		let check = true;
		if	(series == ""){
			check = false;
			$("#series_edit_err").show();
			$("#series_edit_err").html("Vui lòng chọn dòng máy phù hợp.");
		} else {
			$('#series_edit_err').hide();
		}
		if(check){*/
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: getContextPath() + "/error-device/update",
				data: JSON.stringify({
					name: $('#name_edit').val(),
					id: $('#id_edit').val(),
					/*series: series*/
				}),
				cache: false,
				success: function(result) {
					let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createDevices2').modal('hide');
						setTimeout(function() {
						   window.location.replace("/error-devices");
						}, 700);
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
				},
				error: function(err, result) {
					toastr.error(result);
				}
			});
			
		/*}*/
	});
})