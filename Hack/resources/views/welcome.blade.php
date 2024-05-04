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
        <div class="row reg col-md-10 col-12 mx-auto">
            <div class="reg_cover cover">
                <div class="reg_form-bloыck mx-auto col-lg-7 col-md-10 col-sm-12">
                    <form action="" class="reg_form ps-5 pe-5 pt-1 pb-2">
                        <p class="reg_form-text mb-0 fs-2">E-mail адрес</p>
                        <input class="reg_form-input fs-4" name='mail' type="text">

                        <p class="reg_form-text mt-2 mb-0 fs-2">Пароль</p>
                        <input class="reg_form-input fs-4" name='password' type="text">

                        <p class="mt-2 fs-2 text-center">Пройти регистрацию?</p>
                    </form>
                </div>

                <div class="reg_button-block col-lg-7 col-md-10 mt-4 mx-auto">
                    <button class="reg_button w-100 fs-1 p-2 d-block mx-auto">
                        Начать учиться
                    </button>
                </div>
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
