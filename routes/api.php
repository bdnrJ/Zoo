<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/isadmin', [AuthController::class, 'isadmin']);
    Route::get('/allusers', [AuthController::class, 'getUsers'])->middleware('isAdmin');
    Route::get('/user', [AuthController::class, 'user'])->middleware('isAdmin');
    // Route::get('/user', [AuthController::class, 'user']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/transactions', [TransactionController::class, 'store']);
