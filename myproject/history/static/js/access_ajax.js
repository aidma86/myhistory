 $(function() {
//    $('form-control').select2();

     $('#logFilterUser1').on('change', function () {
        console.log("test");
         var optionSelected = $(this).find("option:selected");
//         var valueSelected  = optionSelected.val();
         var country_name   = optionSelected.text();

         data = {'cnt' : country_name };


         $.ajax({
             type:"GET",
             url:'/history/access/ajax',
             // data:JSON.stringify(data),
             data:data,
             success:function(result){
                console.log(result);
                $("#logFilterUser2 option").remove();
                for (var i = result.length - 1; i >= 0; i--) {
                    $("#logFilterUser2").append('<option>'+ result[i].name +'</option>');
                };
              },
        });
    });

//    $('#sandbox-container.input-daterange').datepicker({
//        format: "12/01/2019",
//        endDate: "11/01/2020",
//        startView: 1,
//        minViewMode: 1,
//        maxViewMode: 2
//    });
//
//
//     $('select#pagination').change(function () {
//         var optionSelected = $(this).find("option:selected");
//         var valueSelected  = optionSelected.val();
//         var pagination   = optionSelected.text();
//
//         data = {'pagination' : pagination };
//            console.log('hello')
//         $.ajax({
//             type:"GET",
//             url:'/pagination',
//             data:data,
//             success:function(result){
//                console.log(result);
//                $("#pagination option").remove();
//              };
//        });
//    });
});
    $(function(){
        var month = document.getElementById("mrp-selectDate").value
        $('#datepicker1').datetimepicker({
            locale: 'ja',
            format : 'YYYY年MM月DD日(dd)',
            dayViewHeaderFormat : 'YYYY年MMM',
            minDate : moment().subtract(13,'months'),
            maxDAte : moment(),
            autClose : true
        });

//        $('.access-log-table-user').DataTable({
//            language : dtJa,
//            paging : false,
//            info : false,
//            searching : false,
//            order : [[3, 'asc']],
//        });
    });
