<!DOCTYPE html>
<html lang="en">

<head>
    <title>@yield('title')</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    @section('main.css')
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('css/index.css') }}">
        <link src="{{ asset('js/jquery_ui/jquery-ui.min.css') }}">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    @show
</head>

<body>
    <div class="bg_img bg_img-block">
        {{-- <img class="bg_img" src="{{ asset('img/back.png') }}" alt=""> --}}
    </div>
    <div class="container root">
        <div class="row mx-auto">
            <header class="header">
                @section('main.header')
                @show
            </header>
            <main class='main'>
                @section('main.main')
                @show
            </main>
            <footer class='footer'>
                @section('main.footer')
                @show
            </footer>
        </div>
    </div>
    @section('main.js')
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js"></script>
        <script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ asset('js/index.js') }}"></script>
    @show
    @section('absolute')
    @show
</body>

</html>
