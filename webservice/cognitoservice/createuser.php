<?php
    include 'cognitohelper.php';
    include '../dbservice/dbhelper.php';    

    try{
        if ((isset($_POST['un'])) && (isset($_POST['pw'])) && (isset($_POST['email']))) {
            $username = $_POST['un'];
            $pw = $_POST['pw'];
            $email = $_POST['email'];

            // CHECK IF EMAIL EXIST            
            $_dbhelper = new DbHelper();
            $conn = $_dbhelper->getDefaultConnection();
            $result = $_dbhelper->checkEmail($conn,$email);         

            if (count($result) > 0){
                // EMAIL ALREADY EXIST 
                echo "EmailExistException";
                return;
            }            
            
            // CREATE USER IN COGNITO
            $_cognitoHelper = new CognitoHelper();
            $result = $_cognitoHelper->createUser($username,$pw,$email);
            
            if ($result == 'UsernameExistsException') {
                echo $result;

            }else if ($result == 'InvalidPasswordException'){                    
                echo $result;
            }else{
                // ADD USER TO DB                              
                if ($conn !=null){
                    $conn->next_result();
                    $insertUserResult = $_dbhelper->insertUser($conn, $username, $email);                    
                }

                echo json_encode($result['CodeDeliveryDetails']);
            }
      
            $conn->close();// CLOSE CONNECTION
        }
    }catch(Exception $e){
        return $e->getMessage();
    }   

?>