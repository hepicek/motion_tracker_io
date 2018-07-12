<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{  asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css"> -->

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
       @media only screen and (max-width: 576px) {
            .navUserName {
                display: none;
            }
        }
        
    </style>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white px-0 py-0">
            <div class="container">
                @guest
                    <a class="navbar-brand d-flex" href="{{ url('/') }}">
                        <div class="logoLetter logoLetter-nav letter-1 d-flex justify-content-center align-items-center bg-dark mx-1">M</div>
                        <div class="logoLetter logoLetter-nav letter-2 d-flex justify-content-center align-items-center bg-dark mx-1">T</div>
                        <div class="logoLetter logoLetter-nav letter-3 d-flex justify-content-center align-items-center bg-dark mx-1">I</div>
                        <div class="logoLetter logoLetter-nav letter-4 d-flex justify-content-center align-items-center bg-dark mx-1">O</div> 
                    </a>
                @else
                    <a class="navbar-brand d-flex" href="{{ url('/dashboard') }}">
                        <div class="logoLetter logoLetter-nav letter-1 d-flex justify-content-center align-items-center bg-dark mx-1">M</div>
                        <div class="logoLetter logoLetter-nav letter-2 d-flex justify-content-center align-items-center bg-dark mx-1">T</div>
                        <div class="logoLetter logoLetter-nav letter-3 d-flex justify-content-center align-items-center bg-dark mx-1">I</div>
                        <div class="logoLetter logoLetter-nav letter-4 d-flex justify-content-center align-items-center bg-dark mx-1">O</div>
                    </a>
                @endguest

                <div class="" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto d-flex flex-row">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item pr-2">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            <li class="nav-item pr-2">
                                <a class="btn btn-warning" href="{{ route('register') }}">{{ __('Sign-up') }}</a>
                            </li>
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle d-flex justify-content-between align-items-center justify-content-sm-center" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <div
                                    style="
                                        height: 40px;
                                        width: 40px;
                                        border-radius: 50%;
                                        background-image: url('{{ env('AWS_STORAGE') }}{{Auth::user()->img_url}}');
                                        background-size: cover;
                                        background-postion: center;
                                    "
                                    class="mx-1"
                                    ></div>
                                    <p class="navUserName m-0">{{ Auth::user()->first_name . ' ' . Auth::user()->last_name}}</p> <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right position-absolute">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>
                                    <a class="dropdown-item" href="/userprofile">
                                        {{ __('My Profile') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>


            @yield('content')

    </div>
</body>
</html>
