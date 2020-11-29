from django.shortcuts import render
from django.utils.timezone import localtime



def logDailyCsv(request):
    now = localtime()
    context = {
                'now': now,
    }

    return render(request, 'access/logDailyCsv.html', context)

