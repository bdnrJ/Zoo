<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Donation;
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

            $previous_donations = Donation::where('donor_email', $data['email'])->get();

            $donations_exist = false;
            if (count($previous_donations) > 0) {
                $donations_exist = true;
            }

            return response()->json(['user' => $user, 'previous_donations_exist' => $donations_exist]);
        } catch(QueryException $qe){
            $errCode = $qe->getCode();
            if($errCode == 23000)
                return response()->json([
                    'message' => 'Email already used!',
                ], 409);

            return response()->json([
                'message' => $qe->errorInfo,
            ], 409);
        }
    }

    public function linkDonations(Request $request) {
        $data = $request->validate([
            'user_id' => 'required|integer',
            'email' => 'required|string',
        ]);

        if ($data['email']) {
            $previous_donations = Donation::where('donor_email', $data['email'])->get();

            if (count($previous_donations) > 0) {
                foreach ($previous_donations as $donation) {
                    $donation->user_id = $data['user_id'];
                    $donation->donor_email = null;
                    $donation->save();
                }
            }
        }

        return response()->json(['message' => 'Donations updated successfully']);
    }

    public function login(LoginRequest $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response([
                'message' => "Wrong username or password",
            ], 401);
        }

        $user = $request->user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt',$token, 60*24 *7);

        return response([
            'message' => "success",
            'user' => $user->only(['firstname', 'lastname', 'email', 'role']),
        ])->withCookie($cookie);
    }

    public function isadmin(){
        $user = Auth::user();

        error_log($user->firstname);

        if(!$user->role){
            return response([
                'message' =>  "You do not have permission to access this"
            ], 401);
        }else{
            return response([
                'message' => "Success",
                'data' => $user->role
            ], 200);
        }
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        $cookie = Cookie::forget('jwt');

        return response([
            'message' => "success"
        ])->withCookie($cookie);
    }
}
