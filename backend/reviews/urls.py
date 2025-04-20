from django.urls import path
from .views import (
    ReviewListView,
    ReviewCreateView,
    ReviewUpdateView,
    ReviewDeleteView
)

urlpatterns = [
    path('product/<int:product_id>/', ReviewListView.as_view(), name='review-list'),
    path('create/', ReviewCreateView.as_view(), name='review-create'),
    path('<int:pk>/update/', ReviewUpdateView.as_view(), name='review-update'),
    path('<int:pk>/delete/', ReviewDeleteView.as_view(), name='review-delete'),
] 