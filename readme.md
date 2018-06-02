## LaraGym - Gym and Fitness Center Management System

Finally a gym management system build with laravel and reactjs. Comes with powerful features that will allow you to scale and easily manage your gym or fitness centers.

![My Image](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/master/screenshot.png)

## Features

1. packages - create custom packages.
2. members - user management system.
3. services and billing cycles - annually, weekly, daily, fixed etc.
4. attendance(pending) - tracks who is currently on the gym.
5. activities or system logs(pending)
6. settings(pending) - system settings.
7. chats(pending) - ability send message to members.
8. invoice(pending) - generate invoice and notify user through email.

For professional support please email me at johndavedecano@gmail.com

## Installation

1. API Setup

```bash
$ git clone git@github.com:johndavedecano/PHPLaravelGymManagementSystem.git project
$ cd project
$ composer install
$ cp .env.example .env # THEN EDIT YOUR ENV FILE ACCORDING TO YOUR OWN SETTINGS.
$ php artisan migrate
$ php artisan db:seed
$ php artisan serve
```

2. Frontend Setup

```base
$ cd project/resources/apps/frontend
$ npm install
$ npm run start
```

## Tests

If you want to contribute to this project, feel free to do it and open a PR. However, make sure you have tests for what you implement.

In order to run tests:

* create a `homestead_test` database on your machine;
* run `phpunit`;

If you want to specify a different name for the test database, don't forget to change the value in the `phpunix.xml` file.

## Feedback

I currently made this project for personal purposes. I decided to share it here to help anyone with the same needs. If you have any feedback to improve it, feel free to make a suggestion, or open a PR!
