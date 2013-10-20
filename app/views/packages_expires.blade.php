@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-12">
    
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Expired Memberships</h3>
      </div>
      <div class="panel-body">
 <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Member Name</th>
                        <th>Service</th>
                        <th>Billing Cycle</th>
                        <th>Package Price</th>
                        <th>Started</th>
                        <th>Expiration</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($packages as $p)
                        @if(is_object($p->package))
                        <tr>
                            <td>{{ $p->member->last_name }},{{ $p->member->first_name }}</td>
                            <td>{{ ucwords($p->package->service->name) }}</td>
                            <td>{{ ucwords($p->package->cycle->name) }}</td>
                            <td>{{ Setting::value('currency') }}{{ number_format($p->package->price,2) }}</td>
                            <td>{{ date("F j,Y",strtotime($p->registration)) }}</td>
                            <td>{{ date("F j,Y",strtotime($p->expiration)) }}</td>
                            <td>
                                @if($p->status == 1)
                                    <span class="label label-success">Active</span>
                                @else
                                    <span class="label label-danger">Inactive</span>
                                @endif
                            </td>
                            <td>
                                @if($p->status == 1)
                                    <a class="btn btn-primary suspend" title="Suspend" data-id="{{ $p->id }}" data-member-id="{{ $p->member->id }}"><i class="glyphicon glyphicon-pause"></i></a>
                                @else
                                    <a class="btn btn-primary suspend" title="Suspend" data-id="{{ $p->id }}" data-member-id="{{ $p->member->id }}"><i class="glyphicon glyphicon-play"></i></a>
                                @endif
                                <a class="btn btn-success extend" title="Extend" data-id="{{ $p->id }}" data-member-id="{{ $p->member->id }}"><i class="glyphicon glyphicon-time"></i></a>
                                <a class="btn btn-danger delete" title="Delete" data-id="{{ $p->id }}" data-member-id="{{ $p->member->id }}"><i class="glyphicon glyphicon-trash"></i></a>
                            </td>
                        </tr>
                        @endif
                   @endforeach
                </tbody>
            </table>
            <div style="float: none; margin:auto; text-align:center;">
            <script type="text/javascript">
                jQuery(document).ready(function(){
                    jQuery('div.pagination > ul').each(function onEachPaginator (i, item) {
                        jQuery(item).addClass('pagination').parent().removeClass('pagination');
                    });
                });
            </script>
            {{ $packages->links() }}
            </div>       
      </div>
    </div>
    
</div>
<script type="text/javascript">
    jQuery(document).ready(function(){
        jQuery('.delete').click(function(){
            var confirm = window.confirm("Are you sure you want to delete this item?");
            if(confirm){
                var package_id = jQuery(this).attr('data-id');
                var member_id = jQuery(this).attr('data-member-id');
                jQuery.ajax({
                   type:'POST',
                   data: 'package_id='+package_id,
                   url: '{{ URL::to('members/packages') }}/'+ member_id + '/delete',
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
        jQuery('.suspend').click(function(){
            var package_id = jQuery(this).attr('data-id');
            var member_id = jQuery(this).attr('data-member-id');
            jQuery.ajax({
               type:'POST',
               data: 'package_id='+package_id,
               url: '{{ URL::to('members/packages') }}/'+ member_id + '/suspend',
               success:function(data){
                    if(data == 1){
                        window.location.reload(true);
                    }else{
                        console.log(data);
                    }
               }
            });
        });
        jQuery('.extend').click(function(){
            var confirm = window.confirm("Are you sure you want to extend this package?");
            if(confirm){
                var package_id = jQuery(this).attr('data-id');
                var member_id = jQuery(this).attr('data-member-id');
                jQuery.ajax({
                   type:'POST',
                   data: 'package_id='+package_id,
                   url: '{{ URL::to('members/packages') }}/'+ member_id + '/extend',
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