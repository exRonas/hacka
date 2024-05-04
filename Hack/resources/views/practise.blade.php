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
        <div class="row practise slider">
            @foreach ($answ as $ans)
                @if ($loop->iteration == 1)
                    <div class="practise_cover practice_{{ $loop->iteration }} mx-auto">
                    @else
                        <div class="practise_cover practice_{{ $loop->iteration }} d-none mx-auto">
                @endif
                <div class="practise_up row">
                    <div class="practise_green practise_text col-lg-9 md-12 mt-5 mx-auto">
                        {!! $ans->info !!}
                        @foreach ($ans->code_exmaples as $code)
                            <div id="{{ $code }}" class="code_img-block d-none">
                                <div class="code_img">
                                    <div class="code_close"></div>
                                    <img src="{{ asset('img/' . $code) }}" alt="">
                                </div>
                            </div>
                        @endforeach
                    </div>
                    @if ($images[$loop->iteration - 1])
                        <div
                            class="practise_green practise_prac practise_prac_{{ $loop->iteration }} col-lg-9 col-md-12 mt-5 mx-auto">
                        @else
                            <div
                                class="practise_green practise_prac practise_prac_{{ $loop->iteration }} col-lg-9 col-md-12 mt-5 mx-auto d-none">
                    @endif
                    {!! $ans->question !!}
                    <button onclick="checkFunc(event)"
                        class="answer_check d-block col-lg-2 col-md-4 p-2 mx-auto">Проверить</button>
                </div>
        </div>
        @if ($images[$loop->iteration - 1])
            <div class="practise_down mt-5 mx-auto">
            @else
                <div class="practise_down mt-5 mx-auto d-none">
        @endif
        <div practise = '{{ $loop->iteration }}' class="practise_choice practise_grey row">
            @foreach ($images[$loop->iteration - 1] as $img)
                @if ($img == null)
                @else
                    @if ($loop->iteration == 1)
                        <div class="image_block row">
                        @else
                            <div class="image_block row d-none">
                    @endif
                    @foreach ($img as $img_single)
                        <div id ='image_{{ $loop->iteration + $loop->parent->count * ($loop->parent->iteration - 1) }}'
                            class="drag_image image_{{$loop->iteration}} text-center col-3 d-block mx-auto" draggable="true">
                            {{ $img_single }}
                        </div>
                    @endforeach
        </div>
        @endif
        @endforeach
    </div>
    </div>
    </div>
    @endforeach
    <div class="button_row row col-lg-8 mt-4 col-md-10 col-12 gap-1 mx-auto">
        <button class='check_button back p-3 col-lg-3 col-md-5 col-6 mx-auto'>Предыдущий</button>
        <button class='check_button check p-3 mt-2 col-lg-3 col-md-5 col-6 mx-auto'>Следующий</button>
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

@section('absolute')
    @parent
    <div class="done p-3">
        <p class="h2 text-center">Молодец!</p>
    </div>
    <div class="done_text p-3">
        <p class="h2 text-center">Идем дальше!</p>
    </div>
    <div class="ops p-3">
        <p class="h2 text-center">Попробуй ещё раз</p>
    </div>
@endsection
