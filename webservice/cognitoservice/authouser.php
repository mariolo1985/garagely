<?php
include "cognitohelper.php";

if ((isset($_POST['un'])) && (isset($_POST['pw']))){
    $_cognitoHelper = new CognitoHelper();
    $un = $_POST['un'];
    $pw = $_POST['pw'];


    $userResults = $_cognitoHelper->getUser($un);    
    switch ($userResults){
        case 'UserNotFoundException':
                // USER IS NOT CONFIRMED 
                echo 'UNCONFIRMED';
            break;
        case 'EXCEPTION':
            break;
        
        default:
        // NO ERROR?
            $result = $_cognitoHelper->authUser($un,$pw);

            switch ($result){
                case 'NotAuthorizedException':
                    echo 'NOT_AUTHO';
                    break;

                default:
                    echo json_encode($result['AuthenticationResult']);
                    break;
            }
            break;
    }
    
 
}


?>