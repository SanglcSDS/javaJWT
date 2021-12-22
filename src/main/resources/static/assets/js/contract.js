$(document).ready(function(){
	
	
	
	
	$('#listItemErr').hide();
	$('#listItemErr_edit').hide();
	$("#formCreateContract").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"name": {
          		required: true,
        	},
        	"type": {
          		required: true,
        	},
        	"bank": {
          		required: true,
        	},
        	"maintenance_cycle": {
          		required: true,
        	},
      	},
      	messages: {
			"name": {
          		required: "Vui lòng nhập số hợp đồng.",
        	},
        	"type": {
          		required: "Vui lòng chọn loại hợp đồng.",
        	},
        	"bank": {
          		required: "Vui lòng chọn ngân hàng.",
        	},
        	"maintenance_cycle": {
          		required: "Vui lòng nhập chu kỳ.",
        	},
      	}
    });
	$(document).on('submit', '#formCreateContract', function(e){
		e.preventDefault();
		console.log($('#type').val());
		var form = $(this);
      	form.valid();
		let check = true;
		$('#listItemErr').show();
		if($('#listItem').val() == ""){
			$('#listItemErr').show();
			$('#listItemErr').html("Vui lòng chọn danh sách ATM.");
			check = false;
		}
		if(check){
			$.ajax({
	            url: getContextPath() + '/contracts/save',
	            type: 'POST',
				contentType: "application/json",
	            data: JSON.stringify({
					name: $('#name').val(),
					type: $('#type').val(),
					bank: $('#bank').val(),
					maintenance_cycle: $('#maintenance_cycle').val(),
					startTime: $('#startTime').val(),
					endTime: $('#endTime').val(),
					listItem: $('#listItem').val()
				}),
	            success: function(result){
	            	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createContract').modal('hide');
						$('#formCreateContract')[0].reset();
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
					window.setTimeout(function(){location.reload()},1000)
	            }
	        });
		}
	});

//	$(document).on('click', '#btn_search', function(){
//		getList();
//	})
	
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
                url: getContextPath() + '/contracts/delete',
                type: 'POST',
				contentType: "application/json",
                data: JSON.stringify({
					id: id
				}),
                success: function(result){
                	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						window.setTimeout(function(){location.reload()},1000)
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
            url: getContextPath() + '/contracts/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
				$('#id_edit').val(result.id);
            	$('#name_edit').val(result.name);
				$('#type_edit').val(result.type);
				$('#bank_edit').val(result.bank.id);
				$('#maintenance_cycle_edit').val(result.maintenanceCycle);
				if (result.startTime != null) {
					let startTime = convertDate(result.startTime);
					$('#startTime_edit').val(startTime);
				}
				if (result.endTime != null) {
					let endTime = convertDate(result.endTime);
					$('#endTime_edit').val(endTime);
				}
				let atms = result.atms;
				let arr = [];
				if (atms.length > 0){
					for(var i = 0; i < atms.length; i++){
						arr[i] = atms[i]['serialNumber'];
					}
				}
				$('#listItem_edit').val(arr);
				$('[name=listItem_edit]').bootstrapDualListbox('refresh', true);
				
            	$('#modal_createContract2').modal('show');
            }
        });

	})
	function convertDate(date){
		let year = date[0];
		let month = date[1]<10 ? "0" + date[1] : date[1];
		let day = date[2]<10 ? "0" + date[2] : date[2];
		let convert_date = year+"-"+month+"-"+day;
		return convert_date;
	}
	function convertDateTbl(date){
		let year = date[0];
		let month = date[1]<10 ? "0" + date[1] : date[1];
		let day = date[2]<10 ? "0" + date[2] : date[2];
		let convert_date = day+"/"+month+"/"+year;
		return convert_date;
	}
	
	$("#formUpdateContract").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"name_edit": {
          		required: true,
        	},
        	"type_edit": {
          		required: true,
        	},
        	"bank_edit": {
          		required: true,
        	},
        	"maintenance_cycle_edit": {
          		required: true,
        	},
      	},
      	messages: {
			"name_edit": {
          		required: "Vui lòng nhập số hợp đồng.",
        	},
        	"type_edit": {
          		required: "Vui lòng chọn loại hợp đồng.",
        	},
        	"bank_edit": {
          		required: "Vui lòng chọn ngân hàng.",
        	},
        	"maintenance_cycle_edit": {
          		required: "Vui lòng nhập chu kỳ.",
        	},
      	}
    });
	$(document).on('submit', '#formUpdateContract', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		let check = true;
		$('#listItemErr_edit').show();
		if($('#listItem_edit').val() == ""){
			$('#listItemErr_edit').show();
			$('#listItemErr_edit').html("Vui lòng chọn danh sách ATM.");
			check = false;
		}
		if(check){
			$.ajax({
	            url: getContextPath() + '/contracts/update',
	            type: 'POST',
				contentType: "application/json",
	            data: JSON.stringify({
					id: $('#id_edit').val(),
					name: $('#name_edit').val(),
					type: $("#type_edit").children("option:selected").val(),
					bank: $('#bank_edit').val(),
					maintenance_cycle: $('#maintenance_cycle_edit').val(),
					startTime: $('#startTime_edit').val(),
					endTime: $('#endTime_edit').val(),
					listItem: $('#listItem_edit').val()
				}),
	            success: function(result){
	            	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createContract2').modal('hide');
						$('#formUpdateContract')[0].reset();
						window.setTimeout(function(){location.reload()},1000)
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
	            },
	            error: function(err, result) {
					console.log(err);
					console.log("====>" + result);
				}
	        });
		}
	});
		var  contract_ids='';
	
	function getListATM(contract_id){
		
		contract_ids=contract_id;
		localStorage.clear();
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: getContextPath() + "/contracts/list-atm",
            data: JSON.stringify({
				contract_id: contract_id,
			}),
			success: function(result){
				console.log(contract_id);
				let atms = result.contractAtmDtos;
				let listOrderNumber = [];
				localStorage.setItem("listOrderNumber", listOrderNumber);
					
				$('#tblATM').dataTable({
					"lengthChange": true,
					"searching": true,
					"destroy": true,
					"data": atms,
			      	"autoWidth": true,
			      	"pageLength": 10,
			      	"order": [[ 0, "asc" ]],
					"columns":[
						{
							data: null,
							render: function(data){
								let orderNumber = data.orderNumber === null ? "" : data.orderNumber;
								return orderNumber;
							},
							class: 'text-center'
						},
						{
							data: null,
							render: function(data){
								let txt = data.atmDto.serialNumber;
								return txt;
							}
						},
						{
							data: null,
							render: function(data){
								let txt = data.atmDto.address;
								
								return txt;
							}
						},
						{
							data: null,
							render: function(data){
								let txt = '';
								txt += '<a class="btn btn-success btn-edit-order" data-id="'+data.id+'" title="Sửa thứ tự ATM"><em class="fas fa-edit"></em></a>';
							
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
	
	
		$('#btn-export').on('click', function() {
		Swal.fire({
			title: "Bạn có chắc không?",
			text: "danh sách ATM sẽ được lưu về máy của bạn dưới dạng file excel!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Đồng ý",
			cancelButtonText: "Không"
		}).then((result) => {
			if (result.isConfirmed) {
				$.ajax({
					url: getContextPath() + "/contracts/searchExcle",
					method: "POST",
					contentType: "application/json",
					xhrFields: {
						responseType: 'blob'
					},
					data: JSON.stringify({
					contract_id: contract_ids,
					}),
					success: function(result) {
					if(result.size>3800){
						console.log(result.size);
						
						var blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
						var URL = window.URL || window.webkitURL;
						var downloadUrl = URL.createObjectURL(blob);
						
						var fileLink = document.createElement('a');
						fileLink.href = downloadUrl;
						
						//Thành thêm export excel theo tên file
						var d = new Date();

						var month = d.getMonth()+1;
						var day = d.getDate();
						var year = d.getFullYear().toString().substr(-2);
						
						var time = (day<10 ? '0' : '') + day + (month<10 ? '0' : '') + month + year;
					
						fileLink.download = 'ThongkeATMTheoHopDong_' + time;
						
						fileLink.click();
						//document.location = downloadUrl;

						toastr.success("Xuất báo cáo thành công!");
						
						
					}
					else{
						toastr.error("Không có dữ liệu ATM");
					}
						
					}
				});
			}
		})
	})
	
	
	
	$(document).on('click', '.btn-view', function(){
		let contract_id = $(this).attr('data-id');
		getListATM(contract_id);
		$('#modal_atms').modal('show');
	})
		$(document).on('click', '.btn-import', function(){
		let contract_id = $(this).attr('data-id');
		getimportFile(contract_id);
		$('#import-atm').modal('show');
	})
	
	$(document).on('click', '.btn-view-email', function() {
		let contract_id = $(this).attr('data-id');
		getListEmail(contract_id);
		$('#modal-contract-id').val(contract_id);
		$('#modal_emails').modal('show');
	})

	
	function getListEmail(contract_id) {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: getContextPath() + "/contracts/list-email",
            data: JSON.stringify({
				contract_id: contract_id,
			}),
			success: function(result){
				let stt = 0;
				$('#tblEmail').dataTable({
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
								let txt = data.email;
								return txt;
							}
						},
						{
							data: null,
							render: function(data){
								let txt = data.type;
								
								return txt;
							},
							class: 'text-center'
						},
						{
							data: null,
							render: function(data){
								let txt = '';
								/*txt += '<a class="btn btn-success btn-change-status" data-id="'+data.id+'" title="Đổi loại email"><em class="fas fa-sync-alt"></em></a>'*/
								txt += '<a class="btn btn-danger btn-delete-email" data-id="'+data.id+'" title="Xóa email"><em class="fas fa-trash-alt"></em></a>'
								return txt;
							},
							class: 'text-center'
						},
					]
				})
			},
			error: function(err, result) {
				toastr.error(result);
			}
		});
	}
	
	$(document).on('click', '.btn-delete-email', function() {
		let email_id = $(this).attr('data-id');
		Swal.fire({
			title: "Bạn có chắc không?",
            text: "Bản ghi sẽ được xóa khỏi kho dữ liệu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Không"
		}).then((data) => {
		  if (data.isConfirmed) {
				$.ajax({
					type: "POST",
					contentType: "application/json",
					url: getContextPath() + "/contracts/delete-email",
		            data: JSON.stringify({
						email_id: email_id,
					}),
					success: function(result){
						toastr.success("Xóa email thành công");
						getListEmail($('#modal-contract-id').val());
					},
					error: function(err, result) {
						if (err.status == 405 || err.status == 403) {
							toastr.error('Bạn không có quyền xóa email khách hàng');
						}else {
							toastr.error(result);
						}
					}
				})
			}
		})
	})
	
	/*$(document).on('click', '.btn-change-status', function() {
		let email_id = $(this).attr('data-id');
		Swal.fire({
			title: "Bạn có chắc không?",
            text: "Bản ghi sẽ đổi trạng thái gửi mail báo cáo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Không"
		}).then((data) => {
		  if (data.isConfirmed) {
				$.ajax({
					type: "POST",
					contentType: "application/json",
					url: getContextPath() + "/contracts/change-email-status",
		            data: JSON.stringify({
						email_id: email_id,
					}),
					success: function(result){
						toastr.success("Đổi trạng thái thành công");
						getListEmail($('#modal-contract-id').val());
					},
					error: function(err, result) {
						toastr.error(result);
					}
				})
			}
		})
	})*/
	
	$(document).on('click', '#add-email', function() {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: getContextPath() + "/contracts/add-email",
            data: JSON.stringify({
				email: $('#email-input').val(),
				contract_id: $('#modal-contract-id').val()
			}),
			success: function(result){
				$('#email-input').val('');
				toastr.success("Thêm email thành công");
				getListEmail($('#modal-contract-id').val());
			},
			error: function(err, result) {
				toastr.error(result);
			}
		})
	})
	
	$(document).on('click', '.btn-copy', function(){
		let id = $(this).attr('data-id');
		$.ajax({
            url: getContextPath() + '/contracts/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
            	$('#name_clone').val(result.name);
				$('#type_clone').val(result.type);
				$('#bank_clone').val(result.bank.id);
				$('#maintenance_cycle_clone').val(result.maintenanceCycle);
				if (result.startTime != null) {
					let startTime = convertDate(result.startTime);
					$('#startTime_clone').val(startTime);
				}
				if (result.endTime != null) {
					let endTime = convertDate(result.endTime);
					$('#endTime_clone').val(endTime);
				}
				let atms = result.atms;
				let arr = [];
				if (atms.length > 0){
					for(var i = 0; i < atms.length; i++){
						arr[i] = atms[i]['serialNumber'];
					}
				}
				$('#listItem_clone').val(arr);
				$('[name=listItem_clone]').bootstrapDualListbox('refresh', true);
				
            	$('#modal_createContract3').modal('show');
            }
        });

	})
	$("#formCloneContract").validate({
      	onfocusout: false,
      	onkeyup: false,
      	onclick: false,
      	errorElement: 'span',
      	rules: {
			"name_clone": {
          		required: true,
        	},
        	"type_clone": {
          		required: true,
        	},
        	"bank_clone": {
          		required: true,
        	},
        	"maintenance_cycle_clone": {
          		required: true,
        	},
      	},
      	messages: {
			"name_clone": {
          		required: "Vui lòng nhập số hợp đồng.",
        	},
        	"type_clone": {
          		required: "Vui lòng chọn loại hợp đồng.",
        	},
        	"bank_clone": {
          		required: "Vui lòng chọn ngân hàng.",
        	},
        	"maintenance_cycle_clone": {
          		required: "Vui lòng nhập chu kỳ.",
        	},
      	}
    });
	$(document).on('submit', '#formCloneContract', function(e){
		e.preventDefault();
		var form = $(this);
      	form.valid();
		let check = true;
		$('#listItemErr_clone').show();
		if($('#listItem_clone').val() == ""){
			$('#listItemErr_clone').show();
			$('#listItemErr_clone').html("Vui lòng chọn danh sách ATM.");
			check = false;
		} else {
			$('#listItemErr_clone').hide();
		}
		if(check){
			$.ajax({
	            url: getContextPath() + '/contracts/save',
	            type: 'POST',
				contentType: "application/json",
	            data: JSON.stringify({
					name: $('#name_clone').val(),
					type: $("#type_clone").children("option:selected").val(),
					bank: $('#bank_clone').val(),
					maintenance_cycle: $('#maintenance_cycle_clone').val(),
					startTime: $('#startTime_clone').val(),
					endTime: $('#endTime_clone').val(),
					listItem: $('#listItem_clone').val()
				}),
	            success: function(result){
	            	let data = jQuery.parseJSON(result);
					if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_createContract3').modal('hide');
						$('#formCloneContract')[0].reset();
						window.setTimeout(function(){location.reload()},1000)
					}
					if(data.status === 'error'){
						toastr.error(data.messages);
					}
	            },
	            error: function(err, result) {
					console.log(err);
					console.log("====>" + result);
				}
	        });
		}
	});
	
	
	//edit order number
	$(document).on('click', '.btn-edit-order', function(){
		let id = $(this).attr('data-id');
		$.ajax({
            url: getContextPath() + '/contractAtms/edit',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: id
			}),
            success: function(result){
				console.log(result);
            	$('#serial_edit_order').text(result.atmDto.serialNumber);
            	$('#address_edit_order').text(result.atmDto.address);
            	$('#id_edit_order').val(result.id);
            	$('#contractId_edit_order').val(result.contractId);
				if (result.orderNumber != null) {
					$('#orderNumber_edit_order').val(result.orderNumber);
				}
				
            	$('#modal_edit_order').modal('show');
            	$('#modal_atms').modal('hide');
            }
        });

	})
	
	$(document).on('submit', '#modal_edit_order', function(e){
		e.preventDefault();
      	
		$.ajax({
            url: getContextPath() + '/contractAtms/save',
            type: 'POST',
			contentType: "application/json",
            data: JSON.stringify({
				id: $('#id_edit_order').val(),
				orderNumber: $('#orderNumber_edit_order').val(),
			}),
            success: function(result){
            	let data = jQuery.parseJSON(result);
	            	if(data.status === 'success'){
						toastr.success(data.messages);
						$('#modal_edit_order').modal('hide');
						getListATM($('#contractId_edit_order').val());
						$('#modal_atms').modal('show');
						$('#formUpdateOrder')[0].reset();
					}else {
						toastr.error(data.messages);
					}
					
            },
            error: function(err, result) {
				console.log(err);
				console.log("====>" + result);
			}
        });
	});
		function getimportFile(contract_id) {
						
	$('#contractParam').append('<input type="hidden" id="contract_id_Param" value="'+contract_id+'" >')
				
	}

		$(document).on('click', '#btnImport', function(){ 
		var regex = /^[a-zA-Z0-9\s_\\.\-:)(]+$/;  
			 
		 if (regex.test($("#inputFile").val().toLowerCase())) {    
			 if ($("#inputFile").val().toLowerCase().indexOf(".xlsx") >0||$("#inputFile").val().toLowerCase().indexOf(".xls") >0) {  
             var form_data = new FormData();
		var file_data = $('#inputFile').prop('files')[0];
		form_data.append('inputFile', file_data);
		form_data.append('id', $('#contract_id_Param').val());
		
		$.ajax({
      		type: 'POST',
        	url: getContextPath() + '/import-atm-contract',
        	contentType: false,
	 		processData: false,
	    	data: form_data,
 			success: function(response) {
		$('#import-atm').modal('hide');
				
				toastr.success(response);
				//$('#btnImport')[0].reset();
				$("#inputFile").val('');
				
				window.setTimeout(function(){location.reload()},1000)
            },
            error: function(response) {
			$('#import-atm').modal('hide');
				toastr.error("Lỗi format excle!");
				$("#inputFile").val('');
			}
        });
         } else{
		toastr.error("không đúng định dạng file .xlsx,.xls");
	//window.setTimeout(function(){location.reload()},2000)
          }
			
			
		}else{
			toastr.error("Chọn file import ");
			//window.setTimeout(function(){location.reload()},2000)
		}
      
        
        
		
	})
})