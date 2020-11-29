from django.shortcuts import render
from django.utils.timezone import localtime


def logCsv(request):
    now = localtime()

    context = {
                'now': now,
    }

    return render(request, 'access/logCsv.html', context)

