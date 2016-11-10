<?php

class DbHelper{
    
    function getDefaultConnection(){
        include ('../.creds/getcreds.php');
        $_credHelper = new CredHelper();
        $cred = $_credHelper->getDbCred();


        $_mysqli = @new mysqli("devgaragely.cjh3odacflwh.us-west-2.rds.amazonaws.com:3306",$cred['un'],$cred['pw'],"devgaragely_db");
        if ($_mysqli->connect_error){
            echo 'Connection Error: ' . $_mysqli->connect_error;
        }

        return $_mysqli;
    }
}
?>