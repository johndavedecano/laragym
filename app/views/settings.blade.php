@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-12">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Admin Login Information</h3>
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
       
        <form role="form"  action="settings/admin" method="POST" ng-non-bindable>
        <!--- CONTENT STARTS HERE-->
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="{{ $admin->email }}" class="form-control">
           </div>
            <div class="form-group">
                <label>New Password</label>
                <input type="password" name="password" value="" class="form-control">
           </div>
            <div class="form-group">
                <label>Password Confirmation</label>
                <input type="password" name="password_confirmation" value="" class="form-control">
           </div>
        <!--- CONTENT ENDS HERE-->
        </div>
        <div style="clear: both;"></div>
          <div class="form-actions row-fluid">
            <button type="submit" class="btn btn-primary btn-lg pull-right">Update Settings</button>
            <div style="clear: both;"></div>
          </div>  
        </form>
      </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">General Settings</h3>
      </div>
      <div class="panel-body" id="latest-activities">
       
        <form role="form" enctype="multipart/form-data" method="POST" ng-non-bindable>
        <!--- CONTENT STARTS HERE-->
        
        @foreach($settings as $setting)
            @if($setting->type == 'text')
               <div class="form-group">
                <label>{{ ucwords($setting->label) }}</label>
                {{ Form::text($setting->name, $setting->value,array('class' => 'form-control')) }}
                </div>
            @elseif($setting->type == 'textarea')
               <div class="form-group">
                <label>{{ ucwords($setting->label) }}</label>
                {{ Form::textarea($setting->name, $setting->value,array('class' => 'form-control')) }}
                </div>
            @elseif($setting->type == 'pass')
               <div class="form-group">
                <label>{{ ucwords($setting->label) }}</label>
                <input type="password" class="form-control" value="{{ $setting->value }}" name="{{ $setting->name }}"/>
                </div>
            @elseif($setting->type == 'option')
               <div class="form-group">
                <label>{{ ucwords($setting->label) }}</label>
                <select name="{{ $setting->name }}" class="form-control">
                    <?php $values = explode(',',$setting->options);?>
                    <?php foreach($values as $v):?>
                        <?php if($v == $setting->value):?>
                        <option value="{{ $v }}" selected>{{ $v }}</option>
                        <?php else:?>
                        <option value="{{ $v }}">{{ $v }}</option>
                        <?php endif;?>
                    <?php endforeach;?>
                </select>
                </div>
            @endif 
        @endforeach
  
        <!--- CONTENT ENDS HERE-->
        </div>
        <div style="clear: both;"></div>
          <div class="form-actions row-fluid">
            <button type="submit" class="btn btn-primary btn-lg pull-right">Update Settings</button>
            <div style="clear: both;"></div>
          </div>  
        </form>
      </div>
      
    </div>
</div>

</div>
@stop