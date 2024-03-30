<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<?php
$username = $_SESSION['username'];

?>

<!--This input is use for the socket, this will always hide-->
<input type="text" value="<?php echo $username; ?>" id="client" hidden>

<body class="bg-[#91C8E4]">
    <!--Navigation bar-->
    <div class="bg-[#F6F4EB] h-[5rem] w-full border-solid border-0 flex items-center">

        <!--Username welcome-->
        <div class="absolute flex justify-center w-full h-fit p-2 m-0">
            <p class="font-[courier] text-[#4682A9] font-bold text-lg">Good day <?php echo $username; ?></p>
        </div>

        <!--Log out button-->
        <div class="absolute flex justify-end w-full h-fit p-2 m-0">
            <button class="border-solid border-0 text-[#4682A9] text-[2rem] cursor-pointer flex justify-end"><i class="fa fa-sign-out" onclick="socketOut()"></i></button>
        </div>
    </div>

    <!--Display Message-->
    <div class="mt-10 flex justify-center">
        <div class="py-5 bg-[#F6F4EB] h-[25rem] w-[15rem] border-solid border-0 rounded-2xl">

            <!--Title of the panel-->
            <p class="font-[courier] text-[#4682A9] font-bold text-lg text-center m-4">Display Message</p>

            <!--Message holder, this div is a parent of a incoming message-->
            <div class="w-auto h-[20rem] rounded-2xl overflow-y-auto" id="active-parent">

                <!--Global chat div-->
                <div class="border-solid border-0 bg-white w-full h-fit p-4 my-5 cursor-pointer hover:bg-[#DCDCDC]" onclick="openCloseDiv('globalMsg', 'block', 'global')">
                    <p class="font-[courier] text-[#4682A9] font-bold text-lg text-center">Global Chat</p>

                    <!--this will display current message-->
                    <div class="flex justify-between items-center">

                        <!--Current message holder-->
                        <p class="font-[courier] text-[#4682A9] text-sm" id="globalCurrMsg"></p>

                        <!--Notificaltion number, hide if no new message or the message already open-->
                        <div class="w-8 h-8 border-solid border-0 bg-[#749BC2] rounded-full flex items-center p-2" id="bubbleNotifGlobal" style="display: none;">

                            <!--This will increment base on how many message arrive-->
                            <p class="font-[courier] text-[10px] text-white text-center" id="text-bubbleGlobal">99+</p>
                        </div>
                    </div>
                </div>

                <!--Message recieve or tab here...-->
            </div>
        </div>

        <!--Message panel of the global chat-->
        <div class="hidden absolute" id="globalMsg">
            <div class="flex justify-center">
                <div class="py-3 bg-[#F6F4EB] h-[30rem] w-[15rem] border-solid border-0 rounded-2xl md:w-[20rem] md:h-[25rem] md:py-1">

                    <!--Title of the panel-->
                    <div class="flex justify-center md:justify-around">
                        <p class="font-[courier] text-[#4682A9] font-bold text-lg text-center m-4">Global Message</p>

                        <!--Close button-->
                        <button class="font-[courier] font-bold text-[#4682A9]" onclick="openCloseDiv('globalMsg', 'none')">&#10006;</button>
                    </div>

                    <div class="flex justify-center">

                        <!--Holder of all the conversation-->
                        <div class="bg-white border-solid border-0 rounded-2xl p-3 w-[13rem] h-[18rem] overflow-y-auto md:w-[18rem] md:h-[15rem]" id="globalMsg-holder">

                            <!--Connection div-->

                            <!--Recieve Message-->

                            <!--Send Message-->

                        </div>
                    </div>

                    <!--Input message-->
                    <div class="mt-5 flex justify-center md:justify-around">
                        <textarea cols="15" rows="2" placeholder="Message..." class="p-3 border-solid border-2 border-[#4682A9] rounded-2xl font-[courier] text-center text-sm text-[#4682A9]" id="globalMsgInput"></textarea>

                        <!--Send button-->
                        <button class="text-[#4682A9] m-2" onclick="sendMessageGlobal()"><i class="material-icons">send</i></button>
                    </div>
                </div>
            </div>
        </div>

        <!--Message panel of the private chat-->
        <div class="hidden absolute" id="privateMsg">
            <div class="flex justify-center">
                <div class="py-3 bg-[#F6F4EB] h-[30rem] w-[15rem] border-solid border-0 rounded-2xl md:w-[20rem] md:h-[25rem] md:py-1">

                    <!--Title of the panel-->
                    <div class="flex justify-center md:justify-around">
                        <p class="font-[courier] text-[#4682A9] font-bold text-lg text-center m-4" id="user-id">{User}</p>

                        <!--Close button-->
                        <button class="font-[courier] font-bold text-[#4682A9]" onclick="openCloseDiv('privateMsg', 'none', 'private', this)">&#10006;</button>
                    </div>

                    <div class="flex justify-center" id="privateParentMsg">

                        <!--Holder of all the conversation-->
                        <div class="bg-white border-solid border-0 rounded-2xl p-3 w-[13rem] h-[18rem] overflow-y-auto md:w-[18rem] md:h-[15rem]">
                        </div>
                    </div>

                    <!--Input message-->
                    <div class="mt-5 flex justify-center md:justify-around">
                        <textarea cols="15" rows="2" placeholder="Message..." class="p-3 border-solid border-2 border-[#4682A9] rounded-2xl font-[courier] text-center text-sm text-[#4682A9]" id="privateMsgInput"></textarea>

                        <!--Send button-->
                        <button class="text-[#4682A9] m-2" onclick="sendMessagePrivate()"><i class="material-icons">send</i></button>
                    </div>
                </div>
            </div>
        </div>

        <!--This is the holder of the panels use for private chatting-->
        <div class="absolute" id='private-panel-holder'></div>
    </div>
</body>

</html>