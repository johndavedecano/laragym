@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Members</h3>
        <div class="pull-right panel-controls">
            <a href="{{ URL::to('members/create') }}"><i class="glyphicon glyphicon-plus-sign"></i> Create Member</a>
        </div>
      </div>
      <script type="text/javascript" src="{{ URL::to('assets/js/members.js') }}"></script>
      <div class="panel-body" id="latest-activities" ng-controller="MembersController">
            
            @if(Session::has('success'))
                <div class="alert alert-success">{{ Session::get('success') }}</div>
            @endif
            
            @if(Session::has('error'))
                <div class="alert alert-danger">{{ Session::get('error') }}</div>
            @endif
            
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Member</th>
                        <th>Member Since</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody ng-repeat="member in members">
                    <tr>
                        <td><% member.id %></td>
                        <td><img ng-src="<% member.thumbnail %>"/></td>
                        <td><% member.last_name + ',' + member.first_name %></td>
                        <td><% member.created_at %></td>
                        <td>
                            <a class="btn btn-primary btn-md" href="{{ URL::to('members/update') }}/<% member.id %>" tooltip="Update"><i class="glyphicon glyphicon-user"></i> Update</a>
                            <a class="btn btn-success btn-md" href="{{ URL::to('members/packages') }}/<% member.id %>"><i class="glyphicon glyphicon-shopping-cart" tooltip="Packages"></i> Packages</a>
                            <button type="button" class="btn btn-danger btn-md"><i class="glyphicon glyphicon-trash" tooltip="Delete"></i> Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pull-left"><strong>Total Items: </strong><% total_items %>&nbsp; <strong>Page:</strong> <% page %></div>
            <div class="btn-toolbar pull-right">
                <div class="btn-group">
                      <button type="button" class="btn btn-default" ng-disabled="prev" ng-click="prevPage()"><i class="glyphicon glyphicon-chevron-left"></i></button>
                      <button type="button" class="btn btn-default" ng-disabled="next" ng-click="nextPage()"><i class="glyphicon glyphicon-chevron-right"></i></button>
                </div>
            </div>
      </div>
    </div>
</div>

</div>
@stop