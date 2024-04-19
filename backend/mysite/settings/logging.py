import os

from .base import *

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "handlers": {
#         "console": {
#             "level": "DEBUG",
#             "class": "logging.StreamHandler",
#         },
#     },
#     "loggers": {
#         "django.db.backends": {
#             "handlers": ["console"],
#             "level": "DEBUG",
#         },
#     },
# }

log_file_path = os.path.join(BASE_DIR, "logs", "django.log")
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse",
        },
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
    },
    "formatters": {
        "django.server": {
            "()": "django.utils.log.ServerFormatter",
            "format": "[{server_time}] {message}",
            "style": "{",
        },
        "standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
        },
        "django.server": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "django.server",
        },
        # "file": {
        #     "level": "DEBUG",
        #     "class": "logging.FileHandler",
        #     "filename": log_file_path,
        # },
        "file": {
            "level": "INFO",
            # 'filters': ['require_debug_false'],
            "class": "logging.handlers.RotatingFileHandler",
            "filename": log_file_path,
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 5,
            "formatter": "standard",
        },
    },
    "loggers": {
        "django.db.backends": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
        },
        "django.server": {
            "handlers": ["django.server"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}

# DEFAULT_LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "filters": {
#         "require_debug_false": {
#             "()": "django.utils.log.RequireDebugFalse",
#         },
#         "require_debug_true": {
#             "()": "django.utils.log.RequireDebugTrue",
#         },
#     },
#     "formatters": {
#         "django.server": {
#             "()": "django.utils.log.ServerFormatter",
#             "format": "[{server_time}] {message}",
#             "style": "{",
#         }
#     },
#     "handlers": {
#         "console": {
#             "level": "INFO",
#             "filters": ["require_debug_true"],
#             "class": "logging.StreamHandler",
#         },
#         "django.server": {
#             "level": "INFO",
#             "class": "logging.StreamHandler",
#             "formatter": "django.server",
#         },
#         "mail_admins": {
#             "level": "ERROR",
#             "filters": ["require_debug_false"],
#             "class": "django.utils.log.AdminEmailHandler",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console", "mail_admins"],
#             "level": "INFO",
#         },
#         "django.server": {
#             "handlers": ["django.server"],
#             "level": "INFO",
#             "propagate": False,
#         },
#     },
# }
