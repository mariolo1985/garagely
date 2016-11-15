<?php
include "dbhelper.php";        

$_dbhelper = new DbHelper();
$conn = $_dbhelper->getDefaultConnection();

echo $conn->client_info;
echo $conn->server_info;
?>