$(document).ready(function(){
	$("#formCreateError").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"name": {
          		required: true,
        	},
        	"device": {
          		required: true,
        	},
      	},
      	messages: {
			"name": {
          		required: "Vui lòng nhập lỗi.",
        	},
        	"device": {
          		required: "Vui lòng chọn thiết bị.",
        	},
      	}
    });
	$(document).on('submit', '#formCreateError', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		
		$.ajax({
            url: getContextPath() + '/commonErrors/save',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				name: $('#name').val(),
				device: $('#device').val(),
			}),
            success: function(result){
            	let data = jQuery.parseJSON(result);
				if(data.status === 'success'){
					
					toastr.success(data.messages);
					$('#modal_creatError').modal('hide');
					$('#formCreateError')[0].reset();
					setTimeout(function() {
					   window.location.replace("/commonErrors");
					}, 700);
				}
				if(data.status === 'error'){
					toastr.error(data.messages);
				}
            }
	        });
		
		
	});
	/*getList();*/
	function getList(){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: getContextPath() + "/commonErrors/list",
			success: function(result){
				let stt = 0;
				$('#tblError').dataTable({
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
						{
							data: null,
							render: function(data){
								let txt = data.device.name;
								return txt;
							}
						},
						{data: 'name'},
//						{
//							data: null,
//							render: function(data){
//								let txt = "";
//								let series = data.device.series;
//								if	(series.length > 0){
//									for(var i = 0; i < series.length; i++){
//										txt+= i == 0 ? series[i]['name'] : ", "+series[i]['name'];
//									}
//								}
//								return txt;
//							}
//						},
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
                url: getContextPath() + '/commonErrors/delete',
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
						   window.location.replace("/commonErrors");
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
            url: getContextPath() + '/commonErrors/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
            console.log(result)
            	$('#device_edit').val(result.device.id);
				$('#name_edit').val(result.name);
				$('#id_edit').val(result.id);
            	$('#modal_creatError2').modal('show');
            }
        });

	})
	
	$("#formUpdateError").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"name_edit": {
          		required: true,
        	},
        	"device_edit": {
          		required: true,
        	},
      	},
      	messages: {
			"name_edit": {
          		required: "Vui lòng nhập lỗi.",
        	},
        	"device_edit": {
          		required: "Vui lòng chọn thiết bị.",
        	},
      	}
    });
	$(document).on('submit', '#formUpdateError', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		
		$.ajax({
            url: getContextPath() + '/commonErrors/update',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: $('#id_edit').val(),
				name: $('#name_edit').val(),
				device: $('#device_edit').val(),
			}),
            success: function(result){
            	let data = jQuery.parseJSON(result);
				if(data.status === 'success'){
					toastr.success(data.messages);
					$('#modal_creatError2').modal('hide');
					$('#formUpdateError')[0].reset();
					setTimeout(function() {
					   window.location.replace("/commonErrors");
					}, 700);
				}
				if(data.status === 'error'){
					toastr.error(data.messages);
				}
            }
	        });
		
		
	});
})