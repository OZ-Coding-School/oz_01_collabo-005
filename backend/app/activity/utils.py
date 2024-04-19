import datetime


def check_age_condition(age_groups, user_birthdate) -> bool:
    if not age_groups:
        return True
    today = datetime.date.today()
    # 만나이 계산: 생일 안지남 -> -1, 생일 지남 -> -0
    user_age = today.year - user_birthdate.year - (
            (today.month, today.day) < (user_birthdate.month, user_birthdate.day))
    for group in age_groups:
        if group.min_age <= user_age <= group.max_age:
            return True
    return False
