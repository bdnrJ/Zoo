<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\ServiceTypesController;
use App\Http\Controllers\TicketTypeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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
    Route::get('/isadmin', [AuthController::class, 'isadmin']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/users_unauth', [UserController::class, 'userToUser']);
    Route::get('/users', [UserController::class, 'getUsers'])->middleware('isAdmin');
    Route::get('/users/{id}', [UserController::class, 'user'])->middleware('isAdmin');
    Route::put('/user/update', [UserController::class, 'update']);
    Route::put('/user/update/email', [UserController::class, 'updateEmail']);
    Route::put('/user/update/password', [UserController::class, 'updatePassword']);
    Route::delete('/user/delete', [UserController::class, 'deleteAccount']);

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions', [TransactionController::class, 'getTransactions'])->middleware('isAdmin');
    Route::get('/transactions/{id}', [TransactionController::class, 'getTransaction'])->middleware('isAdmin');

    Route::put('/ticket_types/{id}', [TicketTypeController::class, 'update'])->middleware('isAdmin');
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/ticket_types', [TicketTypeController::class, 'index']);
Route::get('/service_types', [ServiceTypesController::class, 'index']);



