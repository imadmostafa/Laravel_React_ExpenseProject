<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login',[App\Http\Controllers\api\LogicController::class,'Login']);


Route::middleware('auth:api')->get('/all',[App\Http\Controllers\api\LogicController::class,'index']);




Route::post('/register',[App\Http\Controllers\api\LogicController::class,'register']);


Route::middleware('auth:api')->get('/getExpenses_categoryByName/{user_id}',[App\Http\Controllers\ExpenseController::class,'getExpenses_WithCategoryName']);
Route::middleware('auth:api')->get('/getExpense/{id}',[App\Http\Controllers\ExpenseController::class,'getExpenseBy_Id']);

Route::middleware('auth:api')->get('/getExpenses/{user_id}',[App\Http\Controllers\ExpenseController::class,'show_allExpenses']);

Route::middleware('auth:api')->post('/addExpense',[App\Http\Controllers\ExpenseController::class,'store_expense']);

Route::middleware('auth:api')->get('/getExpense_ByCategory/{user_id}/{category_id}',[App\Http\Controllers\ExpenseController::class,'get_expense_bycategory']);

Route::middleware('auth:api')->get('/deleteExpense/{expense_id}',[App\Http\Controllers\ExpenseController::class,'destroy']);
//delete errored in frontennd , axios ;recheck

Route::middleware('auth:api')->put('/updateExpense',[App\Http\Controllers\ExpenseController::class,'update']);

Route::middleware('auth:api')->post('/addCategroy',[App\Http\Controllers\CategoryController::class,'store_category']);

Route::middleware('auth:api')->get('/getCategories',[App\Http\Controllers\CategoryController::class,'index']);

Route::middleware('auth:api')->post('/editExpense/{expense_id}',[App\Http\Controllers\ExpenseController::class,'update']);

Route::middleware('auth:api')->get('/getCategories_ByAmount',[App\Http\Controllers\CategoryController::class,'getPieChart_Data']);









