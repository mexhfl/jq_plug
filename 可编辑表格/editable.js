jQuery.creditable=function(json){
			
			/*
			json.tableDom,json.tableData,json.editBtnClassName,json.delBtnClassName,json.noEditFields,json.idField
			
			json.tableDom：表格节点
			（不能为空）
			
			json.tableData：表格数据
			（不能为空）
			
			json.editBtnClassName：编辑按钮类名
			（默认值：'json.editBtnClassNamebtn'）
			
			json.delBtnClassName：删除按钮类名
			（默认值：'json.delBtnClassNamebtn'）
			
			json.noEditFields：不能编辑的列的类名
			（默认值：['id', 'operate']）
			
			json.idField：ID列的类名
			（默认值：'id'）
			
			*/
			
			console.log(json.tableData)
			
			//赋默认值
			
			if(!json.editBtnClassName){
				json.editBtnClassName='editBtnClassNamebtn';
			}
			if(!json.delBtnClassName){
				json.delBtnClassName='delBtnClassNamebtn';
			}
			if(!json.noEditFields){
				json.noEditFields=['id', 'operate'];
			}
			if(!json.idField){
				json.idField='id';
			}
			
			
			var editedArr = [];                 //点击保存时生成的数组
			var isEdited;
			
			var $operatestr = '<td class="operate"><a class="'+json.editBtnClassName+'">编辑</a>|<a class="'+json.delBtnClassName+'">删除</a></td>';	//*操作节点
			
			
			for (var i = 0; i < json.tableData.length; i++) {
                $trarr = "";
                
                $.each(json.tableData[i], function (key, value) {
                    $tdarr = "<td class='" + key + "'>" + value + "</td>";
                    $trarr += $tdarr;
                });
                $trarr += $operatestr;
                $trarr = $("<tr>" + $trarr + "</tr>");
                console.log($trarr.prop("outerHTML"));
                $('.'+json.tableDom).eq(0).children('tbody').append($trarr);
            }
            //----------【编辑】按钮事件
            $("."+json.editBtnClassName).click(function (ev) {
                //创建保存按钮节点
                $savebtn = $('<div class="savebtn">保存</div>');
                //将保存按钮压入当前节点
                $(this).parent().append($savebtn);
				
                //----------【保存】按钮事件
                $savebtn.click(function (ev) {
                    //阻止冒泡
                    ev.stopPropagation();
                    //使编辑后的数组为空
                    editedArr = [];
                    //获取当前行节点
                    $thistrnode=$(this).parent().parent()
                    //获取当前行的输入框
                    $inputgroup = $thistrnode.find('input');
                    //获取当前行的ID
                    $rowid = parseInt($thistrnode.find('.'+json.idField).eq(0).html());
                    //将当前行ID压入编辑数组
                    editedArr.push($rowid);
                    //遍历当前行的输入框
                    $.each($inputgroup, function (n) {
                        //将当前输入框的值赋值给父节点td
                        $inputgroup.eq(n).parent().html($inputgroup.eq(n).val());
                        //将当前输入框的值压入数组
                        editedArr.push($inputgroup.eq(n).val());
                        //将当前输入框移除掉
                        $inputgroup.eq(n).remove();
                    });
                    //输出编辑数组中的值
                    console.log(editedArr);
                    //将编辑按钮移除掉
                    $(this).remove();
                });
                //获取当前行节点
                $trnode = $(this).parent().parent();
                $trnode.children('td').each(function (a) {
                $claName = $(this).prop("className");
                isEdited = true;
                $.each(json.noEditFields, function (n) {
                    if ($claName == json.noEditFields[n]) {
                        isEdited = false;
                    }
                });
                //如果此单元格为可编辑
                if (isEdited) {
                    $oldval = $(this).html();
                    $tdinput = $('<input type="text"/>');
                    $(this).append($tdinput);
                    $tdinput.val($oldval);
                    $tdinput.css('background-color', '#fff');
                }
                });
            });

            //----------【删除】按钮事件
            $("."+json.delBtnClassName).click(function () {
                $(this).parent().parent().css('border', '3px solid red');
                $isrealjson.delBtnClassName = confirm('真的要删除吗');
                if ($isrealjson.delBtnClassName == true) {
                    $(this).parent().parent().remove();
                } else {
                    $(this).parent().parent().css('border', '1px solid #ccc');
                }
            });
		}