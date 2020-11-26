<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class LogicController extends Controller
{
public function Login(Request $request){
$login=$request->validate([
'email'=>'required',
'password'=>'required'
]);
if(!Auth::attempt($login)){
return response(['message'=>'invalide login credentials']);

}
$user_id=Auth::user()->id;
$user=User::find($user_id);

$accessToken=$user->createToken('authToken')->accessToken;
return response(['user'=>$user,'access_token'=>$accessToken]);
}


public function index(){
return User::all();
}



//Register and generate token ;
public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;

        return response()->json(['token' => $token], 200);
    }
}
