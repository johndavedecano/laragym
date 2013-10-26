<?php
class AuthController extends BaseController {
        
    public function login(){
        
        if (Sentry::check())
        {
            // User is not logged in, or is not activated
            return Redirect::to('/');
        }
        return View::make('login',$this->data);
    }
    
    public function login_post(){
       
       if(!Request::ajax()){
            
            App::abort('401');
        }
        
        $data = array(
            'status'    =>    'success',
            'message'   =>     ''
        );
        
        try
        {
            // Set login credentials
            $credentials = array(
                'email'    => Input::get('email'),
                'password' => Input::get('password'),
            );
            
            $remember = (Input::get('remember'))?Input::get('remember'):false;
        
            // Try to authenticate the user
            $user = Sentry::authenticate($credentials, $remember);
            $data['status'] = 'success';
            $data['message'] = 'Login Success. Redirecting';
            
        }
        catch (Cartalyst\Sentry\Users\LoginRequiredException $e)
        {
            $data['status'] = 'error';
            $data['message'] = 'Login field is required.';
        }
        catch (Cartalyst\Sentry\Users\PasswordRequiredException $e)
        {
            $data['status'] = 'error';
            $data['message'] = 'Password field is required.';
        }
        catch (Cartalyst\Sentry\Users\WrongPasswordException $e)
        {
            $data['status'] = 'error';
            $data['message'] = 'Wrong password, try again.';
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            $data['status'] = 'error';
            $data['message'] = 'User was not found.';
        }
        catch (Cartalyst\Sentry\Users\UserNotActivatedException $e)
        {
            $data['status'] = 'error';
            $data['message'] = 'User is not activated.';
        }
        
        $response = Response::make(json_encode($data),200);
        $response->header('Content-Type', 'text/json');
        return $response;
    }
    
    public function logout()
    {
        Sentry::logout();
        
        return Redirect::to('auth/login')->with('success','Successfully logged out.');
    }
}