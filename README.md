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
1. Upload everything to your server at /home/username/....
2. Point your document root to /home/username/public folder instead of public_html. 
2. Make upload and cache folder writable.
3. Edit the database.php,app.php and mail.php
3. Just dump the dump.sql file to your database
4. Create the admin account by running this query through phpmyadmin or mysql client.
```INSERT INTO `users` (`id`, `email`, `password`, `permissions`, `activated`, `activation_code`, `activated_at`, `last_login`, `persist_code`, `reset_password_code`, `first_name`, `last_name`, `created_at`, `updated_at`) ```
```VALUES (1, 'admin@admin.com', '$2y$10$AzJrqIO1NK3y4YGFQgYJuu3tOdpQam/ZLzSg3Y49sstBDy7qGc0rG', '{"superuser":1}', 1, NULL, NULL, '2013-10-20 16:24:54', '$2y$10$fF9X.XYeXzYs9Vz0ugYMOuV2FJCFCFZBLgRRj.p.RCKFY7DQMuNuO', NULL, 'password', NULL, '2013-10-08 12:57:01', '2013-10-22 14:57:37');```
5. The logins are admin@admin.com | password 
6. Run composer install
7. visit the website and it should redirect you to login page.


CRON JOBS
=============================
Before setting up your cron jobs make sure you first set the php default timezone by editing start/globa.php 
Put date_default_timezone_set("Asia/Bangkok"); on the first line and change the Asia/Bangkok" to your own timezone.

Alternatively, you can also set your default timezone from the configs/app.php

```
	/*
	|--------------------------------------------------------------------------
	| Application Timezone
	|--------------------------------------------------------------------------
	|
	| Here you may specify the default timezone for your application, which
	| will be used by the PHP date and date-time functions. We have gone
	| ahead and set this to a sensible default for you out of the box.
	|
	*/

	'timezone' => 'UTC',
```

1. Go to your web hosting and create a new cron job
2. Add path/to/php artisan command:update_members
3. If you want to email members when their package expires edit the file commands/UpdateMembers.php and just add
your own mysql queries and mailing functions. Since the system is using laravel, you can use the framework's builtin
libraries. http://laravel.com/docs/mail

HELPERS
=============================
Setting::value($setting_name) - returns setting value.
Setting::value('currency'); currency e.g $
