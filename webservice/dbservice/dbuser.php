<?php
include 'dbhelper.php';

if (isset($_POST['Username'])){
    $un = $_POST['Username'];
    $email = $_POST['Email'];

    $_dbhelper = new DbHelper();
    $conn = $_dbhelper->getDefaultConnection();

    $result = $_dbhelper->insertUser($conn, $un, $email);
    return $result;
}
?>