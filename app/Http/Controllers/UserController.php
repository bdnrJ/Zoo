<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        $search = $request->get('search');
        $query = User::withTrashed();

        if ($search) {
            $query->where('email', 'like', '%' . $search . '%');
        }

        $users = $query->paginate(5);

        return response([
            "message" => "success",
            "paginationData" => $users
        ], 200);
    }


    public function userToUser()
    {
        $user = Auth::user();

        if ($user) {
            $userWithTransactions = $user->load('transactions');
            return response()->json($userWithTransactions);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }

    public function user($id)
    {
        $user = User::withTrashed()->with('transactions', 'donations')->findOrFail($id);
        $user->deleted_at = $user->deleted_at;

        return response()->json([
            'user' => $user,
        ]);
    }
    public function updateCredentials(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user->update([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
        ]);

        return response()->json([
            'message' => 'User information updated successfully',
            'user' => $user,
        ], 200);
    }


    public function updateEmail(Request $request)
    {
        $request->validate([
            'newEmail' => 'required|email|unique:users,email',
            'confirmPassword' => 'required|min:8',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->confirmPassword, $user->password)) {
            return response()->json([
                'message' => 'Password confirmation does not match',
            ], 422);
        }

        $user->email = $request->newEmail;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully',
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8',
            'confirmNewPassword' => 'required|same:newPassword'
        ]);

        error_log('im here');

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect password'], 400);
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ], 200);
    }
}
