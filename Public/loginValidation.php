<?php
session_start();

//include the connection
include 'connection.php';

$user = $_POST['user-l'];
$pass = $_POST['pass-l'];

//for avoiding SQL injection
$user = stripslashes($user);
$pass = stripslashes($pass);
$user = mysqli_real_escape_string($connection, $user);
$pass = mysqli_real_escape_string($connection, $pass);

//validating account
$sql = "SELECT * FROM scw_account WHERE username = '$user' and password='$pass'";
$query = mysqli_query($connection, $sql);
$fetchAssoc = mysqli_fetch_array($query, MYSQLI_ASSOC);
$count = mysqli_num_rows($query);

//check if account exist in database
if ($count == 1) {
    echo "Exist in Database";
    $_SESSION['username'] = $fetchAssoc['username'];
    $statusSql = "UPDATE scw_account SET status ='active' WHERE username='$user'";
    mysqli_query($connection, $statusSql);
}

//if not exist
else {
    echo "Wrong username or password";
}
mysqli_close($connection);
