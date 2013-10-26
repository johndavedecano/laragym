PHPLaravelGymManagementSystem
=============================

A simple and easy to install gym management system which includes package management,members managements,services and activities

![My Image](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/master/screenshot.jpg)

System Requirements
=============================
1. PHP 5.3.7+
2. MYSQL 5+

Installation
=============================
1. Upload everything to your server at /home/username/.... then point your document root to /home/user/public folder instead of public_html. 
2. CHMOD the upload folders to 775 or 777.
3. Edit the database.php,app.php and mail.php
3. Run php artisan migrate 
4. Create the admin account by running this query through phpmyadmin or mysql client.
```INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `activated`, `activation_code`, `activated_at`, `last_login`, `persist_code`, `reset_password_code`, `first_name`, `last_name`, `created_at`, `updated_at`) ```
```VALUES (1, 'admin@admin.com', '$2y$10$AzJrqIO1NK3y4YGFQgYJuu3tOdpQam/ZLzSg3Y49sstBDy7qGc0rG', '{"superuser":1}', 1, NULL, NULL, '2013-10-20 16:24:54', '$2y$10$fF9X.XYeXzYs9Vz0ugYMOuV2FJCFCFZBLgRRj.p.RCKFY7DQMuNuO', NULL, 'password', NULL, '2013-10-08 12:57:01', '2013-10-22 14:57:37');```
5. The logins are admin@admin.com | password 
6. Run composer install


CRON JOBS
=============================
Before setting up your cron jobs make sure you first set the php default timezone by editing start/globa.php 
Put date_default_timezone_set("Asia/Bangkok"); on the first line and change the Asia/Bangkok" to your own timezone.

1. Go to your web hosting and create a new cron job
2. Add php artisan command:update_members
3. If you want to email members when their package expires edit the file commands/UpdateMembers.php and just add
your own mysql queries and mailing functions. Since the system is using laravel, you can use the framework's builtin
libraries. http://laravel.com/docs/mail

HELPERS
=============================
Setting::value($setting_name) - returns setting value.
Setting::value('currency'); currency e.g $
