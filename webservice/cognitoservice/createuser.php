<?php
    require 'cognitohelper.php';
    $result = null;

    try{
        if ((isset($_POST['un'])) && (isset($_POST['pw'])) && (isset($_POST['email']))) {
            $username = $_POST['un'];
            $pw = $_POST['pw'];
            $email = $_POST['email'];
            $cognitoHelper = new CognitoHelper();
            $result = $cognitoHelper->createUser($username,$pw,$email);

            // return as json
            echo json_encode($result['CodeDeliveryDetails']);
        }
    }catch(Exception $e){
        return $e->getMessage();
    }   

?>