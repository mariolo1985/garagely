<?php

if (isset($_POST['Username'])){
    include 'cognitohelper.php';
    
    $un = $_POST['Username'];
    $code = $_POST['Code'];

    $_cognitohelper = new CognitoHelper();
    $result = $_cognitohelper->confirmUser($code, $un);
    //return $result;
}
?>