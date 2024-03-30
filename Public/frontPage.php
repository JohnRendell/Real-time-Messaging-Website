<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messaging Website</title>

    <!--Linked CSS for tailwind-->
    <link rel="stylesheet" href="style.css">

    <!--Linked CSS for the icons-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body class="bg-[#91C8E4]">

    <!--Navigation bar-->
    <div class="bg-[#F6F4EB] h-[5rem] w-full border-solid border-0 flex items-center justify-center">
        <p class="font-[courier] text-[#4682A9] font-bold text-lg">Simple Website Chatting</p>
    </div>

    <!--Panels-->
    <div class="flex justify-center my-10">

        <!--Log in div-->
        <div class="border-solid border-0 rounded-2xl bg-[#F6F4EB] w-[16rem] h-fit p-5" id="loginDiv">
            <p class="font-[courier] font-bold text-lg text-[#4682A9] text-center">Log in</p>

            <!--Username-->
            <div class="mt-10 flex justify-center">
                <div class="w-fit h-fit">
                    <label for="user-input-login" class="font-[courier] font-bold text-sm text-[#4682A9] flex justify-center">Username</label>
                    <input type="text" placeholder="Username..." class="p-2 border-solid border-2 border-[#4682A9] placeholder-[#4682A9] rounded-2xl text-sm text-[#4682A9] text-center md:py-1 md:px-2" id="user-input-login" maxlength="10" name="user-l">
                </div>
            </div>

            <!--Password-->
            <div class="mt-10 flex justify-center">
                <div class="w-fit h-fit">
                    <label for="pass-input-login" class="font-[courier] font-bold text-sm text-[#4682A9] flex justify-center">Password</label>
                    <input type="password" placeholder="Password..." class="p-2 border-solid border-2 border-[#4682A9] placeholder-[#4682A9] rounded-2xl text-sm text-[#4682A9] text-center md:py-1 md:px-2" id="pass-input-login" maxlength="10" name="pass-l">
                </div>
            </div>

            <!--Show password-->
            <div class="mt-5 flex justify-center items-center">
                <input type="checkbox" class="border-solid border-[#4682A9] rounded bg-white h-4 w-4 m-2" id="pass-checkbox-l" onclick="togglePass('pass-input-login', 'pass-input-login')">
                <label for="pass-checkbox-l" class="font-[courier] font-bold text-sm text-[#4682A9] m-2">Show Password</label>
            </div>

            <!--Warning text-->
            <p class="hidden mt-5 font-[courier] font-bold text-[10px] text-center text-red-600" id="warningtxt-l">Warning Text</p>

            <!--buttons-->
            <div class="mt-10 flex justify-around">
                <button class="py-1 px-2 border-solid border-0 rounded-2xl bg-[#91C8E4] font-[courier] font-bold text-center text-[#4682A9] text-sm hover:text-white hover:bg-[#749BC2]" onclick="login()">Log in</button>
                <button class="py-1 px-2 border-solid border-0 rounded-2xl bg-[#91C8E4] font-[courier] font-bold text-center text-[#4682A9] text-sm hover:text-white hover:bg-[#749BC2]" onclick="goDiv('signinDiv', 'loginDiv')">Sign in</button>
            </div>
        </div>

        <!--Sign in div-->
        <div class="hidden border-solid border-0 rounded-2xl bg-[#F6F4EB] w-[16rem] h-fit p-5" id="signinDiv">
            <p class="font-[courier] font-bold text-lg text-[#4682A9] text-center">Sign in</p>

            <!--Username-->
            <div class="mt-10 flex justify-center">
                <div class="w-fit h-fit">
                    <label for="user-input-signin" class="font-[courier] font-bold text-sm text-[#4682A9] flex justify-center">Username</label>
                    <input type="text" placeholder="Username..." class="p-2 border-solid border-2 border-[#4682A9] placeholder-[#4682A9] rounded-2xl text-sm text-[#4682A9] text-center md:py-1 md:px-2" id="user-input-signin" maxlength="10" name="user-s">
                </div>
            </div>

            <!--Password-->
            <div class="mt-10 flex justify-center">
                <div class="w-fit h-fit">
                    <label for="pass-input-signin" class="font-[courier] font-bold text-sm text-[#4682A9] flex justify-center">Password</label>
                    <input type="password" placeholder="Password..." class="p-2 border-solid border-2 border-[#4682A9] placeholder-[#4682A9] rounded-2xl text-sm text-[#4682A9] text-center md:py-1 md:px-2" id="pass-input-signin" maxlength="10" name="pass-s">
                </div>
            </div>

            <!--Confirm Password-->
            <div class="mt-10 flex justify-center">
                <div class="w-fit h-fit">
                    <label for="repass-input-signin" class="font-[courier] font-bold text-sm text-[#4682A9] flex justify-center">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password..." class="p-2 border-solid border-2 border-[#4682A9] placeholder-[#4682A9] rounded-2xl text-sm text-[#4682A9] text-center md:py-1 md:px-2" id="repass-input-signin" maxlength="10">
                </div>
            </div>

            <!--Show password-->
            <div class="mt-5 flex justify-center items-center">
                <input type="checkbox" class="border-solid border-[#4682A9] rounded bg-white h-4 w-4 m-2" id="pass-checkbox-s" onclick="togglePass('pass-input-signin', 'repass-input-signin')">
                <label for="pass-checkbox-s" class="font-[courier] font-bold text-sm text-[#4682A9] m-2">Show Password</label>
            </div>

            <!--Warning text-->
            <p class="hidden mt-5 font-[courier] font-bold text-[10px] flex-wrap text-center text-red-600" id="warningtxt-s">Warning Text</p>

            <!--buttons-->
            <div class="mt-10 flex justify-around">
                <button class="py-1 px-2 border-solid border-0 rounded-2xl bg-[#91C8E4] font-[courier] font-bold text-center text-[#4682A9] text-sm hover:text-white hover:bg-[#749BC2]" onclick="signin()">Proceed</button>
                <button class="py-1 px-2 border-solid border-0 rounded-2xl bg-[#91C8E4] font-[courier] font-bold text-center text-[#4682A9] text-sm hover:text-white hover:bg-[#749BC2]" onclick="goDiv('loginDiv', 'signinDiv')">Log in</button>
            </div>
        </div>
    </div>
</body>

</html>

<!--Include all functionality-->
<script src="function.js"></script>