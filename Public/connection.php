<?php
//Connection for database
$server = 'localhost';
$adminUser = 'admin';
$adminPass = 'admin';
$database = 'scw_management';

$connection = new mysqli($server, $adminUser, $adminPass, $database);

if (mysqli_errno($connection)) {
    echo "Database error.";
}
