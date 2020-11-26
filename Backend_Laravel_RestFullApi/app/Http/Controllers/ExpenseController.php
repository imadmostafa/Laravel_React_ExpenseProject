<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;
use Illuminate\Support\Facades\DB;
class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    public function get_expense_bycategory(Request $request,Expense $expense){
        $user_id=request('user_id');
        $user_id_From_auth=auth()->user()->id;
      $category_id=request('category_id');

      $expenses=$expense->where('user_id',$user_id_From_auth)->where('category_id',$category_id)->latest()->get();
      return $expenses;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store_expense(Request $request)
    {
        //
        $user_id_From_auth=auth()->user()->id;
        $expense = new Expense([
            'user_id' => $user_id_From_auth,
            'category_id' => $request->category_id,
            'amount'=>$request->amount,
             'name'=>$request->name,
             'date'=>$request->date
        ]);

        $expense->save();
        return response()->json([
            'data' => 'Post created!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show_allExpenses(Expense $expense)
    {
        //

        $user_id=request('user_id');
        // $expenses=DB::select("select * from expenses where user_id='$user_id'");

        $expenses= $expense->where('user_id',$user_id)->latest()->get();
         return $expenses;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        //
        $id=request('expense_id');
        $expense_update = Expense::findOrFail($id);
        $expense_update->category_id = $request->category_id;
        $expense_update->amount = $request->amount;
        $expense_update->name = $request->name;
        $expense_update->date = $request->date;



        $expense_update->save();

        return response()->json([
            'data' => 'Post updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        //
        $id=request('expense_id');

        $expense_todelete = Expense::findOrFail($id);
        $expense_todelete->delete();
        return response()->json([
            'data' => 'Post deleted!'
        ]);
    }




 public function getExpenseBy_Id(){
     $id=request('id');
     $expense=Expense::find($id);
     return $expense;

 }

public Function getExpenses_WithCategoryName(){
  /*  $user_id=request('user_id');
$query=DB::select("SELECT a.name,a.amount,a.date,b.name as category_name FROM expenses as a
JOIN categories as b ON a.category_id=b.id AND  a.user_id='$user_id'");
//return $query;*/


$user_id_From_auth=auth()->user()->id;

$expensesby_category = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->where('expenses.user_id',$user_id_From_auth)

            ->select('expenses.*', 'categories.name as Category_name')
            ->latest()->get();

return $expensesby_category;



}

}
