## LaraGym - Gym and Fitness Center Management System

<p align="center">
    <img src="https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/master/logo.png" />
</p>

A simple and yet easy to install gym management system built with Laravel 5.5 and ReactJS

![My Image](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/master/screenshot.png)

## Features

1. packages - create custom packages.
2. members - user management system.
3. services and billing cycles - annually, weekly, daily, fixed etc.
4. attendance - tracks who is currently on the gym.
5. activities or system logs.
6. settings - system settings.
7. chats - ability send message to members.
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
