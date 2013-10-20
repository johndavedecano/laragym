<!DOCTYPE html>
<html lang="en" ng-app="globalApp"  ng-controller="LoginController">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="token" content="" ng-init="token='{{ Session::token() }}'"/>
    <title>Gym System Login</title>
    <link href="{{ URL::to('assets') }}/css/bootstrap.css" rel="stylesheet">
    <link href="{{ URL::to('assets') }}/css/custom.css" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/angular.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/jquery.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/ui-bootstrap-tpls-0.6.0.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/app.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/login.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="{{ URL::to('assets') }}/js/html5shiv.js"></script>
      <script src="{{ URL::to('assets') }}/js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
        <div class="container">
            <div class="row-fluid">
                <!-- LOGIN FORM -->
                <div class=" col-lg-4 centered">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title"><i class="glyphicon glyphicon-lock"></i> System Login</h3>
                  </div>
                  <div class="panel-body">
                    <div class="alert alert-danger" ng-show="errorMessages != false"><span ng-bind="errorMessages"></span></div>
                    <div class="alert alert-success" ng-show="successMessage != false"><span ng-bind="successMessage"></span></div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" name="email" id="email" placeholder="Enter email" ng-model="email"  ng-change="validate_email(email)"/>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password" ng-model="password"/>
                      </div>
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="remember" ng-model="remember" ng-disabled="email == '' || password == ''"> Remember Me
                        </label>
                      </div>
                      <button type="button" class="btn btn-primary btn-lg btn-block" ng-disabled="email == '' || password == '' || validEmail == false" ng-click="login()">Login</button><br />
                  </div>
                </div>
                </div>
                <!-- END LOGIN FORM -->
            </div>
        </div>
  </body>
</html>