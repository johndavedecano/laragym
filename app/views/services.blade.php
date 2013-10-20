@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">
<script type="text/javascript" src="{{ URL::to('assets/js/services.js') }}"></script>
<div class="col-lg-12" ng-controller="ServicesController">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Services</h3>
      </div>
        <div style="padding:15px;">
            <div class="input-group col-lg-4 pull-right">
                <input type="text" class="form-control" ng-model="service_name" ng-enter="create()">
                <span class="input-group-btn">
                <button class="btn btn-default" type="button" ng-disabled="service_name == ''" ng-click="create()">Add</button>
                </span>
            </div>
            <div ng-show="error_messages != ''" ng-hide="service_name == ''">
                <span class="text-danger" ng-bind="error_messages"></span>
            </div>
        </div>
        <div style="clear: both;"></div>
      <div class="panel-body" id="latest-activities">
            
            @if(Session::has('success'))
                <div class="alert alert-success">{{ Session::get('success') }}</div>
            @endif
            
            @if(Session::has('error'))
                <div class="alert alert-danger">{{ Session::get('error') }}</div>
            @endif
            
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                @foreach($services as $service)
                    <tr ng-show="row_{{ $service->id }} == undefined">
                        <td ng-init="service_name_{{ snake_case(str_replace(" ","",$service->name)) }} = '{{ $service->name }}'">
                            <span ng-hide="'service_{{ $service->id }}' == true" ng-show="service_{{ $service->id }} == undefined" ng-bind="service_name_{{ snake_case(str_replace(" ","",$service->name)) }}"></span>
                            <div ng-show="service_{{ $service->id }} == true" ng-hide="service_{{ $service->id }} == undefined" class="input-group" style="width:200px;"><span class="input-group-addon" style="cursor:pointer;" ng-click="commit_update('{{ $service->id }}','service_name_{{ snake_case(str_replace(" ","",$service->name)) }}')">Save</span><input type="text" class="form-control" ng-model="service_name_{{ snake_case(str_replace(" ","",$service->name)) }}" style="width:200px;" ng-enter="commit_update('{{ $service->id }}','service_name_{{ snake_case(str_replace(" ","",$service->name)) }}')" ng-blur="hideUpdateForm('service_{{ $service->id }}')"></div>
                        </td>
                        <td>
                            <a class="btn btn-primary btn-large" ng-click="update('service_{{ $service->id }}')"><i class="glyphicon glyphicon-pencil"></i> Update</a>
                            <a class="btn btn-danger btn-large" ng-click="delete('{{ $service->id }}')"><i class="glyphicon glyphicon-trash"></i> Delete</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
      </div>
    </div>
</div>
    <div style="float: none; margin:auto; text-align:center;">
    <script type="text/javascript">
        jQuery(document).ready(function(){
            jQuery('div.pagination > ul').each(function onEachPaginator (i, item) {
                jQuery(item).addClass('pagination').parent().removeClass('pagination');
            });
        });
    </script>
    {{ $services->links()->render() }}
    </div>
</div>
@stop