<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $data = $request->validated();

        try{
        $user = User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'confirmPwd' => ($data['confirmPwd'])
        ]);
        return response(compact('user'));
    }catch(QueryException $qe){
        $errCode = $qe->getCode();
        if($errCode == 23000)
        return response()->json([
            'message' => 'Email already used!',
        ],409);

        return response()->json([
            'message' => $qe->errorInfo,
        ],409);
    }

    }

    public function login(LoginRequest $request){

        if(!Auth::attempt($request->only('email', 'password'))){
            return response([
                'message' => "Invalid data somehow this is fucking invalid",
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt',$token,60*24);

        return response([
            'message' => "success",
            'user' => $user->only(['firstname', 'lastname', 'email']),
        ])->withCookie($cookie);
    }

    public function user(Request $request){
        return Auth::user();
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        $cookie = Cookie::forget('jwt');

        return response([
            'message' => "success"
        ])->withCookie($cookie);
    }
}