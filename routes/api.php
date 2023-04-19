<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\ServiceTypesController;
use App\Http\Controllers\TicketTypeController;
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
    Route::get('/all_users', [AuthController::class, 'getUsers'])->middleware('isAdmin');
    Route::get('/user/{id}', [AuthController::class, 'user'])->middleware('isAdmin');
    Route::get('/user_to_user', [AuthController::class, 'userToUser']);

    Route::post('/add_transactions', [TransactionController::class, 'store']);
    Route::get('/all_transactions', [TransactionController::class, 'getTransactions'])->middleware('isAdmin');
    Route::get('/transaction/{id}', [TransactionController::class, 'getTransaction'])->middleware('isAdmin');
    Route::put('/ticket_types/{id}', [TicketTypeController::class, 'update'])->middleware('isAdmin');

});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/ticket_types', [TicketTypeController::class, 'index']);
Route::get('/service_types', [ServiceTypesController::class, 'index']);



