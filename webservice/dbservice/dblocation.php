<?php

include 'dbhelper.php';

if (isset($_POST['Filter'])){
    $filter = $_POST['Filter'];
    $un = $_POST['Username'];
    $addressline1 = $_POST['Addressline1'];
    $addressline2 = $_POST['Addressline2'];
    $city = $_POST['City'];
    $state = $_POST['State'];
    $zip = $_POST['Zip'];
    $latlng = $_POST['Latlng'];

    $_dbhelper = new DbHelper();
    $conn = $_dbhelper.getDefaultConnection();

    switch($filter){
        case 'INSERT_USER':
            $result = $_dbhelper->insertUserLoc($conn, $un, $addressline1, $addressline2,$city,$state,$zip,$latlng);
        break;

        case 'UPDATE_USER':
            $result = $_dbhelper->updateUserLoc($conn, $un, $addressline1, $addressline2,$city,$state,$zip,$latlng);
        break;
    }
}
?>