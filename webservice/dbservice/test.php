<?php
include "dbhelper.php";        

$_dbhelper = new DbHelper();
$conn = $_dbhelper->getDefaultConnection();

echo file_exists('../cognitoservice/cognitohelper.php')? "File exist": "FIle does not exist";
/*
if ($conn != null){
    
    //$result = $_dbhelper->insertUser($conn,"newtest1","loserpunkx182@gmail.com");
    $result = $_dbhelper->updateUserLoc($conn, "newtest1","321 Street", "line 2", "city", "State", "zip", "latlng there");

    if ($result){
        echo 'Insert success';
    }
}
*/
?>