<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
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
            'pwd' => bcrypt($data['pwd']),
            'confirmPwd' => ($data['confirmPwd'])
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }catch(QueryException $qe){
        $errCode = $qe->getCode();
        if($errCode == 23000)
        return response()->json([
            'message' => 'Email already used!',
        ],409);

        return response()->json([
            'message' => 'Other error!',
        ],409);
    }

    }

    public function login(LoginRequest $request){

    }

    public function logout(){

    }
}
