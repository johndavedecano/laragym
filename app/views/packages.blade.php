@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">
<script type="text/javascript" src="{{ URL::to('assets/js/packages.js') }}"></script>
<div class="col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Services</h3>
        <div class="pull-right panel-controls">
            <a href="#" id="show-create-form"><i class="glyphicon glyphicon-plus-sign"></i> Create Package</a>
        </div>
      </div>
        <div style="padding:15px; display:none;" id="add-package-form">
            <form class="form-inline pull-right" role="form" method="POST" action="" ng-non-bindable>
              <div class="form-group">
                <label class="sr-only">Service</label>
                <select id="service" name="service_id" class="form-control">
                    @foreach($services as $service)
                        <option value="{{ $service->id }}">{{ $service->name }}</option>
                    @endforeach
                </select>
              </div>
              <div class="form-group">
                <label class="sr-only">Cycle</label>
                <select id="cycle" name="cycle_id" class="form-control">
                    @foreach($cycles as $cycle)
                        <option value="{{ $cycle->id }}">{{ ucwords($cycle->name) }}</option>
                    @endforeach
                </select>
              </div>
              <div class="form-group">
                <label class="sr-only">Price</label>
                <input type="text" class="form-control" id="price" name="price" placeholder="Price">
              </div>
              <button type="submit" class="btn btn-default">Add</button>
            </form>
        </div>
        <div style="clear: both;"></div>
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
                        <th>Service</th>
                        <th>Cycle</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if(!empty($packages))
                        @foreach($packages as $package)
                            <tr>
                                <td id="package-{{ $package->id }}">
                                    <span>{{ ucwords($package->service->name) }}</span>
                                    <input type="hidden" class="package-id" value="{{ $package->id }}"/>
                                    <select class="form-control package-service">
                                        @foreach($services as $service)
                                            <option value="{{ $service->id }}">{{ $service->name }}</option>
                                        @endforeach
                                    </select>
                                </td>
                                <td>
                                    <span>{{ ucwords($package->cycle->name) }}</span>
                                    <select class="form-control package-cycle">
                                        @foreach($cycles as $cycle)
                                            <option value="{{ $cycle->id }}">{{ ucwords($cycle->name) }}</option>
                                        @endforeach
                                    </select>
                                </td>
                                <td>
                                    <span>{{ Setting::value('currency') }}{{ number_format($package->price,2) }}</span>
                                    <input type="text" value="{{ number_format($package->price,2) }}" class="package-price form-control"/>
                                </td>
                                <td>
                                    <a class="btn btn-success btn-large update package-save"><i class="glyphicon glyphicon-ok"></i> Save</a>
                                    <a class="btn btn-success btn-large update package-update" data-service="{{ $package->service->id }}" data-cycle="{{ $package->cycle->id }}" data-price="{{ $package->price }}"><i class="glyphicon glyphicon-pencil"></i> Edit</a>
                                    <a class="btn btn-danger btn-large delete-package" data-id="{{ $package->id }}"><i class="glyphicon glyphicon-trash"></i> Delete</a>
                                </td>
                            </tr>
                        @endforeach
                    @endif
                </tbody>
            </table>
            <div class="pagination-centered">
                {{ $packages->links() }}
            </div>
            
      </div>
    </div>
</div>
<script type="text/javascript">
    jQuery(document).ready(function(){
        jQuery('#show-create-form').click(function(){
             jQuery('#add-package-form').toggle();
        });
        jQuery('.package-update').click(function(){
            jQuery(this).hide();
            jQuery(this).parents('tr').find('span').hide();
            jQuery(this).parents('tr').find('input[type="text"],select').show();
            jQuery(this).parents('tr').find('.package-save').show();
            // SET SELECT VALUES
            jQuery(this).parents('tr').find('.package-service').val(jQuery(this).attr('data-service'));
            jQuery(this).parents('tr').find('.package-cycle').val(jQuery(this).attr('data-cycle'));
            jQuery(this).parents('tr').find('.package-price').val(jQuery(this).attr('data-price'));
        });
        jQuery('.package-save').click(function(){
            
            var id = jQuery(this).parents('tr').find('.package-id').val();
            var service = jQuery(this).parents('tr').find('.package-service').val();
            var cycle = jQuery(this).parents('tr').find('.package-cycle').val();
            var price = jQuery(this).parents('tr').find('.package-price').val();
            
            jQuery.ajax({
                url: '/packages/update',
                type: 'POST',
                data: 'id='+id+'&service='+service+'&cycle='+cycle+'&price='+price,
                success:function(data){
                    window.location.reload(true);
                }
            });
            
            //jQuery(this).hide();
            //jQuery(this).parents('tr').find('span').show();
            //jQuery(this).parents('tr').find('input[type="text"],select').hide();
            //jQuery(this).parents('tr').find('.package-update').show();
        });
        
        jQuery('.delete-package').click(function(){
            confirm = window.confirm("Are you sure you want to delete this item?");
            if(confirm){
                var package_id = jQuery(this).attr('data-id');
                jQuery.ajax({
                   type:'POST',
                   url:'{{ URL::to('packages/delete') }}',
                   data: 'package_id='+package_id,
                   success:function(data){
                        if(data == 1){
                            window.location.reload(true);
                        }else{
                            console.log(data);
                        }
                   } 
                });
            }
        });
        
    });
</script>
</div>
@stop