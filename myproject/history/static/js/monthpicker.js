var MONTHS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

$(function () {
  // 아래 조건은 서버 시간 설정으로 바꿔준다
  let today = new Date();
	let year = today.getFullYear(); // 년도
	let month = today.getMonth() + 1;  // 월

  //페이지 첫 로드시 달을 색으로 표시
  $('#mrp-selectDate').val(year + '-' + month);

  startMonth = month;
  startYear = year - 1;
  endMonth = month;
  endYear = year;
  fiscalMonth = 7;
  if(startMonth < 10)
  	startDate = parseInt("" + startYear + '0' + startMonth + "");
  else
    startDate = parseInt("" + startYear  + startMonth + "");
  if(endMonth < 10)
  	endDate = parseInt("" + endYear + '0' + endMonth + "");
  else
    endDate = parseInt("" + endYear + endMonth + "");



  content = '<div class="row mpr-calendarholder">';

  calendarCount = endYear - startYear;
  if(calendarCount == 0)
    calendarCount++;
  var d = new Date();
  for(y = 0; y < 2; y++){
      content += '<div class="col-xs-6" ><div class="mpr-calendar row" id="mpr-calendar-' + (y+1) + '">'
   						 + '<h5 class="col-xs-12"><span>' + (startYear + y).toString() + '</span></h5><div class="mpr-monthsContainer"><div class="mpr-MonthsWrapper">';

    for(m=0; m < 12; m++){
      var monthval;
      if((m+1) < 10)
        monthval = (startYear + y) + "-0" + (m+1);
      else
        monthval = (startYear + y) + "-" + (m+1);

      selectMonth = '<span data-month="' + monthval  + '" class="col-xs-4 mpr-month">' + MONTHS[m] + '</span>';
      nonSelectmonth = '<span data-month="' + monthval  + '" class="col-xs-4 mpr-month-nonselect">' + MONTHS[m] + '</span>';
      if (y == 0) {
        if ((m+1) < startMonth) {
          content += nonSelectmonth;
        }else {
          content += selectMonth;
        }
      }else {
        if (startMonth < (m+1)) {
          content += nonSelectmonth;
        }else {
          content += selectMonth;
        }
      }
    }
    content += '</div></div></div></div>';
  }
  content += '</div>';


  $(document).on('click','.mpr-month',function(e){
    e.stopPropagation();
		$month = $(this).data('month');
  	var date = $month.split('-');
    $('.mrp-monthdisplay .mrp-selectMonth').html(date[0] + '年'　+ date[1] + '月');
    $('#mrp-selectDate').val($month);
    $('.mrp-container').popover('hide');
  });



  var mprVisible = false;
  var mprpopover = $('.mrp-container').popover({
    container: "body",
    placement: "bottom",
    html: true,
    content: content
  }).on('show.bs.popover', function () {
    $('.popover').remove();
    var waiter = setInterval(function(){
      clearInterval(waiter);
      setViewToCurrentYears();
  		paintMonths();
    },50);
  }).on('shown.bs.popover', function(){
    mprVisible = true;
  }).on('hidden.bs.popover', function(){
    mprVisible = false;
  });
});

function setViewToCurrentYears(){
  	var startyear = parseInt(startDate / 100);
    var endyear = parseInt(endDate / 100);
  	$('.mpr-calendar h5 span').eq(0).html(startyear);
  	$('.mpr-calendar h5 span').eq(1).html(endyear);
}

function paintMonths(){
    $('.mpr-calendar').each(function(){
      var $cal = $(this);
      var year = $('h5 span',$cal).html();
      $('.mpr-month',$cal).each(function(i){
        if((i+1) > 9)
          cDate = parseInt("" + year + (i+1));
        else
          cDate = parseInt("" + year+ '0' + (i+1));
        $month = $(this);
        var date = $month.data('month');
        var selectDate = $('#mrp-selectDate').val();
        if (date == selectDate) {
          $(this).addClass('mpr-selected');
        }
      });
    });
  $('.mpr-calendar .mpr-month').css("background","");
  }

  function safeRound(val){
    return Math.round(((val)+ 0.00001) * 100) / 100;
  }
