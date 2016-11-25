<?php
    include 'cognitohelper.php';
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
                // add user to db (dbhelper.php) : -FIX ME 
                include '../dbservice/dbhelper.php';
                $_dbhelper = new DbHelper();
                $conn = $_dbhelper->getDefaultConnection();

                if ($conn !=null){
                    $insertUserResult = $_dbhelper->insertUser($conn, $username, $email);                    
                }

                echo json_encode($result['CodeDeliveryDetails']);
            }
      
   
        }
    }catch(Exception $e){
        return $e->getMessage();
    }   

?>