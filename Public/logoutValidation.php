<?php
include 'connection.php';
session_start();
$user = $_SESSION['username'];
$statusSql = "UPDATE scw_account SET status ='inactive' WHERE username='$user'";
mysqli_query($connection, $statusSql);

//set the session to unset and destroy
session_unset();
session_destroy();
mysqli_close($connection);
