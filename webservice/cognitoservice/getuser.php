<?php
    include "cognitohelper.php";


    if (isset($_POST['toke'])){
        $_cognitoHelper = new CognitoHelper();
        $toke = $_POST['toke'];
        $result = $_cognitoHelper->getUser($toke);
        echo $result;
    }
?>