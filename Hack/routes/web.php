<?php

use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('choice');
    // return view('welcome');
});

// Route::get('/choice', [MainController::class, 'choice'])->name('choice');
Route::get('/practise', [MainController::class, 'practise'])->name('practise');
