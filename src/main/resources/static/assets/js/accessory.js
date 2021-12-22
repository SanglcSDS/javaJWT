$(document).ready(function(){
	$('#series_err').hide();
	$('#series_edit_err').hide();
	$("#formCreateAccessories").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"devices": {
          		required: true,
        	},
        	"name_accessory": {
          		required: true,
        	},
      	},
      	messages: {
			"devices": {
          		required: "Vui lòng chọn thiết bị.",
        	},
        	"name_accessory": {
          		required: "Vui lòng nhập tên linh kiện.",
        	},
      	}
    });
	$(document).on('submit', '#formCreateAccessories', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		let check = true;
		let series = $('#series').val();
		if	(series == ""){
			check = false;
			$("#series_err").show();
			$("#series_err").html("Vui lòng chọn dòng máy phù hợp.");
		} else {
			$('#series_err').hide();
		}
		if(check){
			$.ajax({
	            url: getContextPath() + '/accessories/save',
	            type: 'POST',
				contentType: "application/json",
	            data: JSON.stringify({
					device: $('#devices').val(),
					name: $('#name_accessory').val(),
					series: series
				}),
	            success: function(result){
	            	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createAccessory').modal('hide');
						$('#formCreateAccessories')[0].reset();
						$('[name=series]').bootstrapDualListbox('refresh', true);
						setTimeout(function() {
						   window.location.replace("/accessories");
						}, 700);
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
	            }
	        });
        }
		
		
	});
	/*getList();*/
	function getList(){
		$.ajax({
			type: "GET",
			contentType: "application/json",
			url: getContextPath() + "/accessories/list",
			success: function(result){
				let stt = 0;
				$('#tblAccessories').dataTable({
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
								let txt = data.errorDevice.name;
								return txt;
							}
						},
						{data: 'name'},
						{
							data: null,
							render: function(data){
								let txt = "";
								let series = data.errorDevice.series;
								if	(series.length > 0){
									for(var i = 0; i < series.length; i++){
										txt+= i == 0 ? series[i]['name'] : ", "+series[i]['name'];
									}
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
                url: getContextPath() + '/accessories/delete',
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
						   window.location.replace("/accessories");
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
            url: getContextPath() + '/accesories/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
            	$('#devices_edit').val(result.errorDevice.id);
				$('#name_accessory_edit').val(result.name);
				$('#id_edit').val(result.id);
				
				let series = result.series;
				let arr = [];
				if (series.length > 0){
					for(var i = 0; i < series.length; i++){
						arr[i] = series[i]['id'];
					}
				}
				$('#series_edit').val(arr);
				$('[name=series_edit]').bootstrapDualListbox('refresh', true);
				
            	$('#modal_createAccessory2').modal('show');
            }
        });

	})
	
	$("#formUpdateAccessories").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"devices_edit": {
          		required: true,
        	},
        	"name_accessory_edit": {
          		required: true,
        	},
      	},
      	messages: {
			"devices_edit": {
          		required: "Vui lòng chọn thiết bị.",
        	},
        	"name_accessory_edit": {
          		required: "Vui lòng nhập tên linh kiện.",
        	},
      	}
    });
	$(document).on('submit', '#formUpdateAccessories', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		let check = true;
		let series = $('#series_edit').val();
		if	(series == ""){
			check = false;
			$("#series_edit_err").show();
			$("#series_edit_err").html("Vui lòng chọn dòng máy phù hợp.");
		} else {
			$('#series_edit_err').hide();
		}
		if(check){
			$.ajax({
	            url: getContextPath() + '/accessories/update',
	            type: 'POST',
				contentType: "application/json",
	            data: JSON.stringify({
					id: $('#id_edit').val(),
					device: $('#devices_edit').val(),
					name: $('#name_accessory_edit').val(),
					series: series
				}),
	            success: function(result){
	            	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createAccessory2').modal('hide');
						$('#formUpdateAccessories')[0].reset();
						setTimeout(function() {
						   window.location.replace("/accessories");
						}, 700);
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
	            }
	        });
		
		}
	});
})