<head>
    <!--Linked CSS for tailwind-->
    <link rel="stylesheet" href="Public/style.css">

    <!--Linked CSS for the icons-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!--A source for our web socket-->
    <script src="node_modules/socket.io/client-dist/socket.io.js"></script>
</head>

<?php
//start session
session_start();
error_reporting(E_ERROR | E_PARSE);

//redirect user to the home if the user has been log in
if ($_SESSION['username'] != null) {
    //go to home page
    include 'Public/home.php';

    //add the client side to the homepage, this is if the user is logged in
    echo "<script src='Public/client.js'></script>";
}

//redirect user to the login page if not log in yet
else { ?>
    <script>
        location.href = 'Public/frontPage.php';
    </script>
<?php }

?>

<!--Include all functionality-->
<script src="Public/function.js"></script>