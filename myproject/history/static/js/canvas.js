

$(function(){


  var base_x = 5;
  var base_y = 20;
  var width = 530;
  var height = 10;

  var recodeLen = 10;

  var a = $('#timelist').val();
  timeList = JSON.parse(a);

  var recodeLen = timeList.users.length;

  var usage_time_list = [];
  var temp1 = []
  var temp2 = []
  for (var data in timeList.users){
    var start = timeList.users[data].start.split(",")
    var end = timeList.users[data].end.split(",")
    var temp3 = []
    temp3.push([parseInt(start[0]),parseInt(start[1])],[parseInt(end[0]),parseInt(end[1])])
    temp2.push(temp3)
  }
    temp1.push(temp2)
    console.log(temp1)

//  var usage_time_list =
//    [
//        [
//            [[12,50],[13,10]],
//            [[13,50],[14,10]],
//            [[14,50],[20,10]]
//        ],
//        [
//            [[9,50],[13,10]],
//            [[13,50],[14,10]],
//            [[14,50],[23,10]]
//        ]
//    ];
//    console.log(usage_time_list)
//  var con = document.getElementById("content1");

  for (var i = 0; i < recodeLen; i++) {
    const canvas = document.getElementById("myCanvas" + (i+1) );
    var ctx = canvas.getContext("2d");
    chartDraw(ctx, base_x, base_y, width, height);

    chartBar(ctx, base_x, base_y, width, height, temp1[i]);
  }
})

//바게이지 색칠해주는 함수
 function chartBar(ctx, base_x, base_y, width, height, usage_time_list){
     ctx.beginPath();  //그리기 시작
     var bar_color = "rgba(85, 240, 187, 0.75"; //바 색상값
     ctx.fillStyle = bar_color;   //칠 색상 넣어주기
     for(var i = 0 ; i < usage_time_list.length; i++){  //유저의 날짜 시간 리스트를 돌려
         var one_session = usage_time_list[i]    //값 하나씩 넣어주기
         //usage_time_list한개의 값이 아마도 시간배열로 들어옴
         //값이 한개(시작시간)만 들어온 경우 컨티뉴
         if(one_session.length != 2) {
             continue;
         }
         //두개의 값이 들어온 경우 시작시간과 마치는 시간이 있으므로 진행
         //시작 start[0][0] 시간단위
         //시작 end[0][1]  분단위
         //마침 start[1][0] 시간단위
         //마침 end[1][1]  분단위
         //시간(15시) + 분 (예: 48분 / 60 = 0.8)
         //15.8
         //width / 24 > (530 / 24 = 22.08)
         //start_x = 348.9
         var start =  one_session[0][0] + (one_session[0][1] / 60);
         var start_x = start * (width / 24);  // 바의 길이를 차트길이의 시간단위에 맞게 재설정
         var end = one_session[1][0] + (one_session[1][1]/ 60);
         var end_x = end * (width / 24);
         //수치대로 캔버스에 그려주기

         //base_x + start_x = 시작 포인트 x  (마이너스라고 써있었는데 아마 플러스일듯?)
         //base_y = 시작포인트 y
         //end_x - start_x = 바의 길이
         //height = 바의 높이
         //353,20 지점에서 길이(end_x - start_x) 높이(height) 만큼의 바를 그려라
         ctx.fillRect(base_x + start_x, base_y, end_x - start_x, height);
     }
 };



function chartDraw(ctx, base_x, base_y, width, height){
  ctx.strokeStyle = "#bbb";
  ctx.fillStyle = "aaa";
  ctx.font = "13px 'verdana'";
  ctx.beginPath();
  ctx.moveTo(base_x, base_y + height);
  ctx.lineTo(base_x + width, base_y + height);
  ctx.closePath();
  ctx.stroke();
  for(var i = 0 ; i <= 24; i++){


      ctx.beginPath();
      if(i % 3 === 0){
          ctx.moveTo(base_x + (width/24 * i), base_y - 7);
          ctx.lineTo(base_x + (width/24 * i), base_y + height);
      }else{
          ctx.moveTo(base_x + (width / 24 * i), base_y - 3);
          ctx.lineTo(base_x + (width / 24 * i), base_y + height);
      }
      ctx.closePath();
      ctx.stroke();
      if (i % 3 === 0){
          ctx.fillStyle = "#333";
      }else{
          ctx.fillStyle = "#aaa";
      }
      var j = 3;
      if(i / 10 >= 1){
          j = 6;
      }
      if(i % 3 === 0){
          ctx.fillText(""+ i, base_x + (width / 24 * i )-j, base_y - 10);
      }
  }
}
