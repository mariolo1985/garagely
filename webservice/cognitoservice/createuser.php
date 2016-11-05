<?php
    require 'cognitohelper.php';
    $result = null;

    header('Content-type: application/jsonp');

    try{
        if ((isset($_POST['username'])) && (isset($_POST['pw'])) && (isset($_POST['email']))) {
            $username = $_POST['username'];
            $pw = $_POST['pw'];
            $email = $_POST['email'];
            $cognitoHelper = new CognitoHelper();
            $result = $cognitoHelper->createUser($username,$pw,$email);

            // return as json
            $result = json_encode($result['AuthenticationResult']);

        }
    }catch(Exception $e){
        return $e->getMessage();
    }

    return $result;

?>