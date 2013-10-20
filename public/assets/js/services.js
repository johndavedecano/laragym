var ServicesController = function($http,$scope,$compile){
    
    $scope.service_name = '';
    
    $scope.error_messages = '';
    
    $scope.create_service = '';
    
    $scope.create = function(){
        
        if($scope.service_name != false){
            $http({method:"POST",url:"/services",data:{'service_name':$scope.service_name}}).success(function(data){
                if(data.response == "ok"){
                    window.location.reload(true);
                }else{
                    $scope.error_messages = data.errors.service_name.join("\n'");
                }
            });
        }
    }
    
    $scope.update = function($service_id){

        $scope[$service_id] = true;
        console.log($service_id+' = '+$scope[$service_id]);
        
    }
    
    $scope.commit_update = function($service_id,$service_name){
        
        var service_id = $service_id;
        var service_name = $scope[$service_name];
        
        if(service_name != '' || service_name != undefined ){
            $http({method:"POST",url:"/services/update",data:{'service_id':service_id,'service_name':service_name}}).success(function(data){
                if(data.response == "ok"){
                    $scope['service_'+$service_id] = undefined;
                     $scope[$service_name] = data.service;
                }else{
                    alert(data.errors.service_name.join("\n'"));
                }
            });
        }
        
    }
    
    $scope.hideUpdateForm = function($service_id){
        $scope[$service_id] = undefined;
    }
    
    $scope.delete = function(id){
        conf = window.confirm("Are you sure you want to delete this item?");
        if(conf){
            $http({method:"POST",url:"/services/delete",data:{'service_id':id}}).success(function(data){
                if(data.response == "ok"){
                    //alert(data.content);
                    $scope['row_'+id] = true;
                }else{
                    alert(data.content);
                }
            });
        }else{
            return false;
        }
    }
    
    
}