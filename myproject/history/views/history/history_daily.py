import json

from django.core.paginator import Paginator
from django.shortcuts import render
from django.utils.timezone import localtime
import datetime
from .timeTest import daily_p2p_session, Duration

import time
from myproject.history.models import User, Session, P2PSession


def logDaily(request):
    now = localtime()
    account_list = User.objects.filter(type=2).select_related('accountgroup').values('name')

    # selectMonth = request.GET.get('selectMonth')
    # year = selectMonth[:4]
    # month = selectMonth[-2:]
    # table_list = P2PSession.objects.prefetch_related('session').filter(start_time__year=year, start_time_month=month)

    # page = request.Get.get('page', '1')
    #
    # table_list = (P2PSession
    #               .objects.select_related('src_session')
    #               .filter(src_session__user='user2')
    #               .order_by('finish_time'))

    # paginator = Paginator(table_list, 5)
    # page_obj = paginator.get_page(page)
    # test1 = daily_p2p_session(table_list, user)

    from_t = time.strptime("2020-08-01 00:00:00", '%Y-%m-%d %H:%M:%S')
    to_t = time.strptime("2020-09-01 00:00:00", '%Y-%m-%d %H:%M:%S')

    user = ['user2']
    table_list = P2PSession.objects.select_related('src_session') \
        .filter(src_session__user='%s' % 'user2')\
        .filter(start_time__year=2020, start_time__month=8)
    # .filter(start_time__date=datetime.date(2020, 8, 23))\
    # .filter(finish_time__date=datetime.date(2020, 8, 23))\
    # test = P2PSession.objects.select_related('src_session').filter(src_session__user='%s' % user)

    duration = Duration(from_t, to_t)
    test1 = daily_p2p_session(table_list, duration, user)
    print(test1)

    rowlist = {}
    temp = []
    count = 1
    print(test1.__len__())
    for row in test1:
        count = count + 1
        temp.append(row.get_time_list())
    rowlist['user2'] = temp
    # rowlist = str(rowlist).replace("\'", "\"")
    print('json test: ', json.dumps(rowlist))
    context = {
        "now": now,
        "table_list": table_list,
        "timelist": json.dumps(rowlist)
        # 'account_list': account_list,
        # 'table_list':  page_obj
    }

    return render(request, 'access/accessDaily.html', context)
