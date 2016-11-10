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

            if ($result == 'UsernameExistsException') {
                echo $result;
            }else if ($result == 'InvalidPasswordException'){                    
                echo $result;
            }else{
                echo json_encode($result['CodeDeliveryDetails']);
            }
      
   
        }
    }catch(Exception $e){
        return $e->getMessage();
    }   

?>