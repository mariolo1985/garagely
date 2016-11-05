<?php
include "cognitohelper.php";

if ((isset($_POST['un'])) && (isset($_POST['pw']))){
    $_cognitoHelper = new CognitoHelper();
    $un = $_POST['un'];
    $pw = $_POST['pw'];

    $result = $_cognitoHelper->authUser($un,$pw);
    echo json_encode($result['AuthenticationResult']);
}


?>