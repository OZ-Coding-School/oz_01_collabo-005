import os
from typing import Any
from uuid import uuid4


def club_image_upload_path(instance: Any, filename: str) -> str:
    upload_to = "images/clubs/"
    extension = filename.split(".")[-1]

    uuid = uuid4().hex
    filename = "{}.{}".format(uuid, extension)
    return os.path.join(upload_to, filename)
