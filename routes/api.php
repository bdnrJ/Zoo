<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\DonationController;
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

    Route::get('/users-unauth', [UserController::class, 'userToUser']);
    Route::get('/users', [UserController::class, 'getUsers'])->middleware('isAdmin');
    Route::get('/users/{id}', [UserController::class, 'user'])->middleware('isAdmin');
    Route::put('/users/credentials', [UserController::class, 'updateCredentials']);
    Route::put('/users/email', [UserController::class, 'updateEmail']);
    Route::put('/users/password', [UserController::class, 'updatePassword']);
    Route::delete('/users/delete', [UserController::class, 'deleteAccount']);
    Route::delete('/users/destroy/{id}', [UserController::class, 'destroy'])->middleware('isAdmin');
    Route::post('/users/restore/{id}', [UserController::class, 'restore'])->middleware('isAdmin');

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions-user', [TransactionController::class, 'getUserTransactions']);
    Route::get('/transactions', [TransactionController::class, 'getTransactions'])->middleware('isAdmin');
    Route::get('/transactions/{id}', [TransactionController::class, 'getTransaction'])->middleware('isAdmin');

    Route::put('/ticket-types/{id}', [TicketTypeController::class, 'update'])->middleware('isAdmin');
    Route::post('/ticket-types', [TicketTypeController::class, 'store']);

    Route::put('/service-types/{id}', [ServiceTypesController::class, 'update'])->middleware('isAdmin');
    Route::post('/service-types', [ServiceTypesController::class, 'store'])->middleware('isAdmin');

    Route::post('/donations/auth', [DonationController::class, 'storeAuth']);
    Route::get('/donations', [DonationController::class, 'index']);
    Route::get('/donations/user', [DonationController::class, 'getUserDonations']);
    Route::get('/donations/discount', [DonationController::class, 'discount']);
});

Route::post('/donations/anon', [DonationController::class, 'store']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/link-donations', [AuthController::class, 'linkDonations']);
Route::get('/ticket-types', [TicketTypeController::class, 'index']);
Route::get('/service-types', [ServiceTypesController::class, 'index']);



