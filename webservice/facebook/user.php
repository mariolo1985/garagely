<?php

if (isset($_POST['Filter'])){
    include 'fbhelper.php';
    $_fbhelper = new FBHelper();

    $filter = $_POST['Filter'];
    switch ($filter){
        case 'USER_LOGIN':
            $loginResult = $_fbhelper->login();
            if ($loginResult == 'ERROR'){
                echo 'Login Error';
            }else{
                echo $loginResult;
            }
            break;
        case 'GET_TOKEN':
            $token = $_fbhelper->getUserAccessToken();
            echo $token == null ? 'NO TOKEN' : $token;
            break;

        case 'GET_USER_BASIC':
            $user = $_fbhelper->getUserBasicInfo();
            if ($user!=null){
                echo json_encode($user);
            }else{
                echo 'ERROR';
            }
            break;

        case 'SET_TOKEN_FROM_JS':
            $setResult = $_fbhelper->setUserAccessTokenFromJS();
            if ($setResult == 'IS_SET'){
                // GET USER
                $user = $_fbhelper->getUserBasicInfo();
                if ($user!=null){
                    echo json_encode($user);
                }else{
                    echo 'ERROR';
                }
            }            
            break;
        default:
            break;
    }
}
?>