from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user_field(user, "nickname", data.get("nickname"))
        user_field(user, "nationality", data.get("nationality"))
        user_field(user, "first_name", data.get("first_name"))
        user_field(user, "last_name", data.get("last_name"))
        user_field(user, "phone", data.get("phone"))
        # user_field(user, "date_of_birth", data.get("date_of_birth"))
        user_field(user, "profession", data.get("profession"))

        # user.nickname = data.get("nickname")
        # user.nationality = data.get("nickname")
        # user.first_name = data.get("first_name")
        # user.last_name = data.get("last_name")
        # user.phone = data.get("phone")
        # user.date_of_birth = data.get("date_of_birth")
        # user.profession = data.get("profession")
        user.save()
        return user
