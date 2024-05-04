<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    public function choice()
    {
        return view('choice');
    }

    public function practise()
    {
        $answ = Answer::all();
        $result = [];
        $result_image = [];
        $result_answers = [];
        $iter = 0;
        $img = 'quest_';

        foreach ($answ as $ans) {
            $result[$iter] = $ans;
            $result[$iter]->code_exmaples = explode('//', $ans->code_exmaples);
            $result_answers[$iter] = explode('//', $ans->right_answ);
            ++$iter;
        }

        $iter = 0;
        foreach ($result as $ans) {
            for ($i = 1; $i < 5; $i++) {
                if ($ans->quest_1) {
                    $res = "$img$i";
                    $result_image[$iter][$res] = explode('//', $ans->$res);
                } else {
                    $result_image[$iter] = [];
                }
            }
            ++$iter;
        }
        return view('practise')->with(['answ' => $result, 'images' => $result_image, 'answers' => $result_answers]);
    }
}
