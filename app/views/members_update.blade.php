@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-6 centered">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Create Member</h3>
      </div>
      <div class="panel-body">
      
        @if(Session::has('error'))
            <div class="alert alert-danger">{{ Session::get('error') }}</div>
        @endif
        @if(Session::has('success'))
            <div class="alert alert-success">{{ Session::get('success') }}</div>
        @endif
        
       @if($errors->count() > 0)
            <div class="alert alert-danger">
              <button data-dismiss="alert" class="close" type="button">&times;</button>
              <h4>Warning!</h4>
              @foreach($errors->all() as $message)
                {{ $message }}<br>
              @endforeach
            </div><!--alert-->
       @endif
      
        <form action="{{ URL::to('/members/update') }}/{{ $member->id }}" role="form" enctype="multipart/form-data" method="POST" ng-non-bindable>
        <div class="row-fluid">
           <div class="form-group col-lg-6">
            <label>First Name</label>
            {{ Form::text('first_name',$member->first_name,array('class' => 'form-control')) }}
          </div>
          <div class="form-group col-lg-6">
            <label>Last Name</label>
            {{ Form::text('last_name',$member->last_name,array('class' => 'form-control')) }}
          </div>
        </div>
        <div class="row-fluid">
          <div class="form-group col-lg-6">
            <label>Phone</label>
            {{ Form::text('phone', $member->phone,array('class' => 'form-control')) }}
          </div>
          <div class="form-group col-lg-6">
            <label>Email</label>
            {{ Form::email('email',$member->email,array('class' => 'form-control')) }}
          </div>
        </div>
        <div style="clear: both;"></div>
        <div class="row-fluid">
          <div class="form-group col-lg-12">
            <label>Address</label>
            {{ Form::text('address',$member->address,array('class' => 'form-control')) }}
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="row-fluid">
          <div class="form-group col-lg-6">
            <label>Date Of Birth</label>
            {{ Form::text('dob',$member->dob,array('class' => 'form-control datepicker')) }}
          </div>
          <div class="form-group col-lg-6">
            <label for="exampleInputFile">Photo</label>
            <div style="clear: both;"></div>
                {{ Form::file('photo',array('class' => 'uploader')) }}<span class="uploader_text"></span>
          </div>
        </div>
        <div style="clear: both;"></div>
          <div class="form-actions row-fluid">
            <button type="submit" class="btn btn-primary btn-lg pull-right">Update Account</button>
            <div style="clear: both;"></div>
          </div>  
        </form>
      </div>
    </div>
</div>

</div>
@stop