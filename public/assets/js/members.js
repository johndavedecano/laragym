var MembersController = function($http,$scope){
    
    $scope.members = [];
    
    $scope.show_page = 1;
    
    $scope.next = false;
    
    $scope.prev = true;
    
    $scope.prevPage = function(){
        
        if($scope.page != 0 || $scope.page != 1){
            
            $scope.show_page -= 1;
            $scope.loadMembers($scope.show_page);   
                     
        }
        
    }
    
    $scope.nextPage = function(){
        
        if($scope.page != $scope.total_pages){
            $scope.show_page += 1;
            $scope.loadMembers($scope.show_page);
        }
    }
    
    $scope.loadMembers = function(page){ 
        
        page = page || 1;
        request_uri = '/members/request?page=' + page;
        $http({method:'GET',url:request_uri}).success(function(data){
            
            if($scope.show_page == data.total_pages){
                $scope.next = true;
            }else{
                $scope.next = false;
            }
            
            if(data.page == 0 || data.page == 1){
                $scope.prev = true;
            }else{
                $scope.prev = false;
            }
            
            $scope.members = data.members;
            $scope.total_items = data.total_items;
            $scope.total_pages = data.total_pages;
            $scope.page = (data.page == 0)?1:data.page;
            
            
        });
        
    }
    
    $scope.loadMembers();
    
    
    
}