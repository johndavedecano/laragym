@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-6 centered">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ ucwords($member->first_name.' '.$member->last_name) }} Account</h3>
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
      
        <form role="form" enctype="multipart/form-data" method="POST" ng-non-bindable>
        <div class="row-fluid">
            <div class="form-group">
                <label></label>
                <select class="form-control" name="package_id">
                    @foreach($packages as $package)
                        @if(Memberpackage::still_has($member->id,$package->id) ==  false)
                        <option value="{{ $package->id }}">{{ $package->service->name }}({{ number_format($package->price,2) }}/{{ $package->cycle->name }})</option>
                        @endif
                    @endforeach
                </select>
            </div>
        </div>
        <div style="clear: both;"></div>
          <div class="form-actions row-fluid">
            <button type="button" class="btn btn-danger btn-lg pull-left"  onclick="window.location = '{{ URL::to('members/packages/'.$member->id) }}'">Back</button>
            <button type="submit" class="btn btn-primary btn-lg pull-right">Attach Package</button>
            <div style="clear: both;"></div>
          </div>  
        </form>
      </div>
    </div>
</div>

</div>
@stop