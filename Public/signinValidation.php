<?php
session_start();

//include the connection
include 'connection.php';

$user = $_POST['user-s'];
$pass = $_POST['pass-s'];

//validating account
$sql = "SELECT * FROM scw_account WHERE username = '$user'";
$query = mysqli_query($connection, $sql);
$fetchAssoc = mysqli_fetch_array($query, MYSQLI_ASSOC);
$count = mysqli_num_rows($query);

//check if account exist in database
if ($count == 0) {
    echo "sign in success";
    $_SESSION['username'] = $user;

    //add the account to the database
    $addAccount = "INSERT INTO scw_account(username, password) VALUES('$user', '$pass')";
    mysqli_query($connection, $addAccount);

    $statusSql = "UPDATE scw_account SET status ='active' WHERE username='$user'";
    mysqli_query($connection, $statusSql);
}

//if not exist
else {
    echo "Username taken";
}
mysqli_close($connection);
