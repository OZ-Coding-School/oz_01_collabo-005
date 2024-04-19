import datetime
from typing import Any

from django.db.models import QuerySet

from app.activity.models import JoinedClub
from app.club.models import Club
from app.user.models import AgeGroup, User


def is_user_already_joined(club: Club, user: User) -> Any:
    return JoinedClub.objects.filter(club=club, user=user).exists()


def check_age_condition(age_groups: QuerySet[AgeGroup], user_birthdate: datetime.date) -> bool:
    if not age_groups:
        return True
    today = datetime.date.today()
    # 만나이 계산: 생일 안지남 -> -1, 생일 지남 -> -0
    user_age = (
        today.year - user_birthdate.year - ((today.month, today.day) < (user_birthdate.month, user_birthdate.day))
    )
    for group in age_groups:
        if group.min_age <= user_age <= group.max_age:
            return True
    return False
