<?php
    require 'cognitohelper.php';
    $result = null;

    header('Content-type: application/jsonp');

    try{
        if ((isset($_GET['username'])) && (isset($_GET['pw']))) {
            $username = $_GET['username'];
            $pw = $_GET['pw'];
            $cognitoHelper = new CognitoHelper();
            $result = $cognitoHelper->authUser($username,$pw);

            // return as json
            $result = json_encode($result['AuthenticationResult']);

        }
    }catch(Exception $e){
        return $e->getMessage();
    }

    return $result;

?>