@extends('layouts.page')

@section('title')
    Страница
@endsection

@section('main.css')
    @parent
@endsection

@section('main.header')
    @parent
@endsection

@section('main.main')
    @parent
    <div class="section">
        <div class="row choice">
            <div class="choice_cover cover col-md-10 col-12 mx-auto">
                <x-choice.block class="viol_cover">
                    <a href="/practise" class="fs-1 m-0 choice_inline choice_main">Основы HTML</a>
                </x-choice.block>
                <x-choice.block class="mt-4 green_cover">
                    <a class="fs-1 m-0 choice_inline choice_practise">Практика</a>
                </x-choice.block>
                <x-choice.block class="mt-4 viol_cover">
                    <a class="fs-1 m-0 choice_inline choice_resource">Ресурсы и помощь</a>
                </x-choice.block>
            </div>
        </div>
    </div>
@endsection

@section('main.footer')
    @parent
@endsection

@section('main.js')
    @parent
@endsection
