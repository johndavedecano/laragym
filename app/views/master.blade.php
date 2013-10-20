<!DOCTYPE html>
<html lang="en" ng-app="globalApp">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Manager</title>
    <link href="{{ URL::to('assets') }}/css/bootstrap.css" rel="stylesheet">
    <link href="{{ URL::to('assets') }}/css/custom.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ URL::to('assets') }}/css/datepicker/metallic.css" type="text/css">
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/angular.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/jquery.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/ui-bootstrap-tpls-0.6.0.min.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/app.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/zebra_datepicker.js"></script>
    <script type="text/javascript" src="{{ URL::to('assets') }}/js/functions.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="{{ URL::to('assets') }}/js/html5shiv.js"></script>
      <script src="{{ URL::to('assets') }}/js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
        <div class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="{{ URL::to('/') }}">Dashboard</a>
            </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li><a href="{{ URL::to('members') }}">Members</a></li>
                <li><a href="{{ URL::to('packages') }}">Packages</a></li>
                <li><a href="{{ URL::to('packages/expires') }}">Expires</a></li>
                <li><a href="{{ URL::to('services') }}">Services</a></li>
                <li><a href="{{ URL::to('activities') }}">Activities</a></li>
                <li><a href="{{ URL::to('settings') }}">Settings</a></li>
                <li><a href="{{ URL::to('logout') }}">Logout</a></li>
              </ul>
              <form class="navbar-form navbar-right" action="{{ URL::to('members/search') }}" method="POST" ng-non-bindable>
                <div class="form-group">
                  <input type="text" name="keyword" placeholder="Member ID or Name" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Search</button>
              </form>
            </div><!--/.navbar-collapse -->
          </div>
        </div>
        <div class="container" id="wrapper">
             @yield('content')
        </div>
  </body>
</html>