<?php


require 'cognitohelper.php';

echo '<p>loading...</p>';

try{
    $cognitoHelper = new CognitoHelper();
    echo '<p>Have cognitoHelper';

    $msg = $cognitoHelper->createUser('newtest1','Password!','loserpunkx182@gmail.com');
    echo "<p>" . $msg . "</p>";

} catch (Exception $e) {    
    echo "<p>Error: " . $e->getMessage() . "</p>";
}

?>

