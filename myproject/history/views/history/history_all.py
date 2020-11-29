
from django.core.paginator import Paginator
from django.db.models import Subquery
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.timezone import localtime
from django.views.decorators.http import require_GET
from django.views.generic import FormView


__all__ = ['history_all']


class HistoryAll(FormView):

    def get(self, request):

        return render(request, 'history/test2.html')


history_all = HistoryAll.as_view()


class HistorySearch(FormView):
    @require_GET
    def get(self, request):

        return redirect('/')


history_search = HistorySearch.as_view()

