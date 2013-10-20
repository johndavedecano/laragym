var LoginController = function($http,$scope){
    
    $scope.email = '';
    
    $scope.password = '';
    
    $scope.token = '';
    
    $scope.remember = false;
    
    $scope.validEmail = false;
    
    $scope.errorMessages = false;
    
    $scope.successMessage = false;

    $scope.validate_email = function(email){
        
        var regx = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if(regx.test(email)){
            $scope.validEmail =  true;
        }else{
           $scope.validEmail =  false; 
        }
    }
    
    $scope.login = function(){
        
        $scope.errorMessages = false;
        
        var info = {
                'email':$scope.email,
                'password':$scope.password,
                'remember':$scope.remember,
        };
        
        $http({
                method:"POST",
                url:'/login',
                data:info,
                headers:{'X-CSRF-Token':$scope.token}})
                   
        .success(function(data){
            
            if(data.status == 'success'){ 
                
                $scope.successMessage = data.message;
                 
                 setTimeout(function () {
                       window.location.href = "./"; 
                 }, 3000); 
            }
            
            if(data.status == 'error'){
                $scope.errorMessages = data.message;
            }
        });
    }
}