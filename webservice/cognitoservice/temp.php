<?php


require 'cognitohelper.php';

echo '<p>loading...</p>';

try{
    $cognitoHelper = new CognitoHelper();
    echo '<p>Have cognitoHelper';

    $msg = $cognitoHelper->authUser('newtest1','Password!');
    echo "<p>" . $msg . "</p>";
    echo json_encode($msg['AuthenticationResult']);

} catch (Exception $e) {    
    echo "<p>Error: " . $e->getMessage() . "</p>";
}

?>

