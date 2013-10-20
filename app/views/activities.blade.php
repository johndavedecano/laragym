@extends('master')
@section('content')
<div style="clear: both;"></div>
<div class="row-fluid">
<div class="col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">All Activities</h3>
      </div>
      <div class="panel-body" id="latest-activities">
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
</div>
@stop