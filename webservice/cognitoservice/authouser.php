<?php
include "cognitohelper.php";

if ((isset($_POST['un'])) && (isset($_POST['pw']))){
    $_cognitoHelper = new CognitoHelper();
    $un = $_POST['un'];
    $pw = $_POST['pw'];

    $result = $_cognitoHelper->authUser($un,$pw);

    switch ($result){
        case 'NotAuthorizedException':
            echo 'NOT_AUTHO';
            break;

        case 'UserNotConfirmedException':
            echo 'UNCONFIRMED';
            break;

        default:
            echo json_encode($result['AuthenticationResult']);
            break;
    }

    
    
 
}


?>