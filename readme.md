## LaraGym - Gym and Fitness Center Management System

Finally a gym management system build with laravel and reactjs. Comes with powerful features that will allow you to scale and easily manage your gym or fitness centers.

![My Image](https://raw.github.com/johndavedecano/PHPLaravelGymManagementSystem/master/screenshot.png)

## Features

1. packages - create custom packages.
2. members - user management system.
3. services and billing cycles - annually, weekly, daily, fixed etc.
4. attendance - tracks who is currently on the gym.
5. activities or system logs
6. subscription management

For professional support please email me at johndavedecano@gmail.com

## Installation

1. API Setup

```bash
$ git clone git@github.com:johndavedecano/laragym.git project
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
$ cp .env.example .env # edit this file accordingly
$ yarn
$ yarn start
$ yarn build # for production
```

## Tests

If you want to contribute to this project, feel free to do it and open a PR. However, make sure you have tests for what you implement.

In order to run tests:

- create a `homestead_test` database on your machine;
- run `./vendor/bin/phpunit`;

If you want to specify a different name for the test database, don't forget to change the value in the `phpunix.xml` file.

## Routes

| Method | URI                               | Name                  | Action                                                         | Protected | Version(s) |
| ------ | --------------------------------- | --------------------- | -------------------------------------------------------------- | --------- | ---------- |
| POST   | /api/auth/signup                  |                       | App\Api\V1\Controllers\SignUpController@signUp                 | No        | v1         |
| POST   | /api/auth/login                   |                       | App\Api\V1\Controllers\LoginController@login                   | No        | v1         |
| POST   | /api/auth/recovery                |                       | App\Api\V1\Controllers\ForgotPasswordController@sendResetEmail | No        | v1         |
| POST   | /api/auth/reset                   |                       | App\Api\V1\Controllers\ResetPasswordController@resetPassword   | No        | v1         |
| POST   | /api/auth/logout                  |                       | App\Api\V1\Controllers\LogoutController@logout                 | No        | v1         |
| POST   | /api/auth/refresh                 |                       | App\Api\V1\Controllers\RefreshController@refresh               | No        | v1         |
| GET    | /api/me                           |                       | App\Api\V1\Controllers\UserController@me                       | No        | v1         |
| GET    | /api/cycles                       | cycles.index          | App\Api\V1\Controllers\CycleController@index                   | No        | v1         |
| POST   | /api/cycles                       | cycles.store          | App\Api\V1\Controllers\CycleController@store                   | No        | v1         |
| GET    | /api/cycles/{cycle}               | cycles.show           | App\Api\V1\Controllers\CycleController@show                    | No        | v1         |
| PUT    | /api/cycles/{cycle}               | cycles.update         | App\Api\V1\Controllers\CycleController@update                  | No        | v1         |
| DELETE | /api/cycles/{cycle}               | cycles.destroy        | App\Api\V1\Controllers\CycleController@destroy                 | No        | v1         |
| GET    | /api/services                     | services.index        | App\Api\V1\Controllers\ServiceController@index                 | No        | v1         |
| POST   | /api/services                     | services.store        | App\Api\V1\Controllers\ServiceController@store                 | No        | v1         |
| GET    | /api/services/{service}           | services.show         | App\Api\V1\Controllers\ServiceController@show                  | No        | v1         |
| PUT    | /api/services/{service}           | services.update       | App\Api\V1\Controllers\ServiceController@update                | No        | v1         |
| DELETE | /api/services/{service}           | services.destroy      | App\Api\V1\Controllers\ServiceController@destroy               | No        | v1         |
| GET    | /api/packages                     | packages.index        | App\Api\V1\Controllers\PackageController@index                 | No        | v1         |
| POST   | /api/packages                     | packages.store        | App\Api\V1\Controllers\PackageController@store                 | No        | v1         |
| GET    | /api/packages/{package}           | packages.show         | App\Api\V1\Controllers\PackageController@show                  | No        | v1         |
| PUT    | /api/packages/{package}           | packages.update       | App\Api\V1\Controllers\PackageController@update                | No        | v1         |
| DELETE | /api/packages/{package}           | packages.destroy      | App\Api\V1\Controllers\PackageController@destroy               | No        | v1         |
| GET    | /api/users                        | users.index           | App\Api\V1\Controllers\UserController@index                    | No        | v1         |
| POST   | /api/users                        | users.store           | App\Api\V1\Controllers\UserController@store                    | No        | v1         |
| GET    | /api/users/{user}                 | users.show            | App\Api\V1\Controllers\UserController@show                     | No        | v1         |
| PUT    | /api/users/{user}                 | users.update          | App\Api\V1\Controllers\UserController@update                   | No        | v1         |
| DELETE | /api/users/{user}                 | users.destroy         | App\Api\V1\Controllers\UserController@destroy                  | No        | v1         |
| GET    | /api/activities                   | activities.index      | App\Api\V1\Controllers\ActivityController@index                | No        | v1         |
| POST   | /api/activities                   | activities.store      | App\Api\V1\Controllers\ActivityController@store                | No        | v1         |
| GET    | /api/activities/{activity}        | activities.show       | App\Api\V1\Controllers\ActivityController@show                 | No        | v1         |
| PUT    | /api/activities/{activity}        | activities.update     | App\Api\V1\Controllers\ActivityController@update               | No        | v1         |
| DELETE | /api/activities/{activity}        | activities.destroy    | App\Api\V1\Controllers\ActivityController@destroy              | No        | v1         |
| GET    | /api/subscriptions                | subscriptions.index   | App\Api\V1\Controllers\SubscriptionController@index            | No        | v1         |
| POST   | /api/subscriptions                | subscriptions.store   | App\Api\V1\Controllers\SubscriptionController@store            | No        | v1         |
| GET    | /api/subscriptions/{subscription} | subscriptions.show    | App\Api\V1\Controllers\SubscriptionController@show             | No        | v1         |
| PUT    | /api/subscriptions/{subscription} | subscriptions.update  | App\Api\V1\Controllers\SubscriptionController@update           | No        | v1         |
| DELETE | /api/subscriptions/{subscription} | subscriptions.destroy | App\Api\V1\Controllers\SubscriptionController@destroy          | No        | v1         |
| POST   | /api/upload                       |                       | App\Api\V1\Controllers\ImageController@store                   | No        | v1         |
| GET    | /api/refresh                      |                       | Closure                                                        | No        | v1         |

## Feedback

I currently made this project for personal purposes. I decided to share it here to help anyone with the same needs. If you have any feedback to improve it, feel free to make a suggestion, or open a PR!

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
