<?php
    include "cognitohelper.php";


    if (isset($_POST['toke'])){
        $_cognitoHelper = new CognitoHelper();
        $toke = $_POST['toke'];
        $result = $_cognitoHelper->getUserByToke($toke);

        echo json_encode($result['UserAttributes']);             
        //echo $result;
    }
?>