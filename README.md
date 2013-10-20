PHPLaravelGymManagementSystem
=============================

A simple and easy to install gym management system which includes package management,members managements,services and activities

Installation
=============================
1. Upload everything to your servers home then point your document root to public folder.
2. Make sure you have correct chmods to the cache and upload folders.
3. Edit configs/database.php with your database settings. RUN the SQL Dump 
4. Admin Logins are admin@admin.com | password
5. Edit configs/app.php and change the baseurl.
6. Edit configs/email.php for your email settings. 

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

