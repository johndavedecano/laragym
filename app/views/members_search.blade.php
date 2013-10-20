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
      <div class="panel-body">
            
            @if(Session::has('success'))
                <div class="alert alert-success">{{ Session::get('success') }}</div>
            @endif
            
            @if(Session::has('error'))
                <div class="alert alert-danger">{{ Session::get('error') }}</div>
            @endif
            
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Member Number</th>
                        <th>Total Packages</th>
                        <th>Member Since</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if(!empty($members))
                        @foreach($members as $member)
                    <tr>
                        <td><img src="{{ $member->thumbnail }}"/></td>
                        <td>{{ $member->last_name }},{{ $member->first_name }}</td>
                        <td>{{ $member->number }}</td>
                        <td>
                            {{ $member->memberpackages->count() }}
                        </td>
                        <td>{{ date("F j,Y",strtotime($member->created_at)) }}</td>
                        <td>
                            <a href="{{ URL::to('members/login/'.$member->id) }}" class="btn btn-danger" title="Login">
                                <i class="glyphicon glyphicon-time"></i>
                            </a>
                            <a href="{{ URL::to('members/packages/'.$member->id) }}" class="btn btn-success" title="View Packages">
                                <i class="glyphicon glyphicon-shopping-cart"></i>
                            </a>
                            <a href="{{ URL::to('members/update/'.$member->id) }}" class="btn btn-primary" title="View Profile">
                                <i class="glyphicon glyphicon-user"></i>
                            </a>
                        </td>
                    </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
      </div>
    </div>
</div>

</div>
@stop