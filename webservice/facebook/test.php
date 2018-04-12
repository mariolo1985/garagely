<?php
    include 'fbhelper.php';
    $_fbhelper = new FBHelper();

    $result = $_fbhelper->setUserAccessTokenFromJS();
    echo $result;
?>