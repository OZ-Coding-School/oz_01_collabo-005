# import boto3
#
# from mysite import settings
#
# service_name = "s3"
# endpoint_url = settings.AWS_S3_ENDPOINT_URL
# region_name = settings.AWS_S3_REGION_NAME
# access_key = settings.AWS_ACCESS_KEY_ID
# secret_key = settings.AWS_SECRET_ACCESS_KEY
# bucket_name = settings.AWS_STORAGE_BUCKET_NAME
#
#
# def upload_image_to_object_storage(image_file):
#     storage = boto3.client(
#         service_name,
#         endpoint_url=endpoint_url,
#         aws_access_key_id=access_key,
#         aws_secret_access_key=secret_key
#     )
#     file_name = image_file.name
#     file_content = image_file.read()
#     storage.put_object(
#         Bucket=bucket_name,
#         Key=file_name,
#         Body=file_content
#     )
#     object_url = f"{endpoint_url}/{bucket_name}/{file_name}"
#     return object_url
