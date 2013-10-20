@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">

<div class="col-lg-7">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Todays Logins</h3>
      </div>
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
                        <th></th>
                        <th>Name</th>
                        <th>Logged In</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @if(!empty($activities))
                        @foreach($activities as $a)
                    <tr>
                        <td><img src="{{ $a->member->thumbnail }}"/></td>
                        <td>{{ $a->member->last_name }},{{ $a->member->first_name }}</td>
                        <td>{{ date("F j,Y h:i:s A",strtotime($a->timestamp)) }}</td>
                        <td>
                            <a href="{{ URL::to('members/packages/'.$a->member->id) }}" class="btn btn-success btn-sm" title="View Packages">
                                <i class="glyphicon glyphicon-shopping-cart"></i> Packages
                            </a>
                            <a href="{{ URL::to('members/update/'.$a->member->id) }}" class="btn btn-primary btn-sm" title="View Profile">
                                <i class="glyphicon glyphicon-user"></i> Profile
                            </a>
                        </td>
                    </tr>
                        @endforeach
                    @endif
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
            {{ $activities->links() }}
            </div>  
      </div>
    </div>
</div>

<div class="col-lg-5">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Statistics</h3>
      </div>
      <div class="panel-body">
            <table class="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <td style="width: 50%;">Total Members</td>
                        <td>{{ $total_members }}</td>
                    </tr>
                    <tr>
                        <td style="width: 50%;">Total Packages</td>
                        <td>{{ $total_packages }}</td>
                    </tr>
                    <tr>
                        <td style="width: 50%;">Total Services</td>
                        <td>{{ $total_services }}</td>
                    </tr>
                </tbody>
            </table>
      </div>
    </div>
    
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Expires Today</h3>
      </div>
      <div class="panel-body">
            <table class="table table-bordered table-hover" style="font-size:11px;">
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Billing Cycle</th>
                        <th>Started</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($packages as $p)
                        @if(is_object($p->package))
                        <tr>
                            <td>{{ $p->member->last_name }},{{ $p->member->first_name }}</td>
                            <td>{{ ucwords($p->package->service->name) }} {{ Setting::value('currency') }}{{ number_format($p->package->price,2) }} / {{ ucwords($p->package->cycle->name) }}</td>
                            <td>{{ date("F j,Y",strtotime($p->registration)) }}</td>
                            <td>{{ date("F j,Y",strtotime($p->expiration)) }}</td>
                        </tr>
                        @endif
                   @endforeach
                </tbody>
            </table>
      </div>
    </div>
    
</div>

</div>
@stop