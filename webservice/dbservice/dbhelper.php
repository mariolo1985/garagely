<?php

class DbHelper{
    
    function getDefaultConnection(){
        include ('../.creds/getcreds.php');
        $_credHelper = new CredHelper();
        $cred = $_credHelper->getDbCred();


        $_mysqli = @new mysqli("devgaragely.cjh3odacflwh.us-west-2.rds.amazonaws.com:3306",$cred['un'],$cred['pw'],"devgaragely_db");
        if ($_mysqli->connect_error){
            echo 'Connection Error: ' . $_mysqli->connect_error;
            return null;
        }

        return $_mysqli;
    }// end getdefaultconnections

    // NEW USER
    function insertUser($conn, $username, $email){
        try{            
            $stmt = $conn->prepare('SET @_un := ?');// set username
            $stmt->bind_param('s',$username);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_unemail := ?');// SET EMAIL
            $stmt->bind_param('s', $email);
            $stmt->execute();

            $result = $conn->query('CALL pNewUser(@_un,@_unemail)');
            return $result;
            $result->free();
        }catch(Exception $e){
            echo $e->getMessage(); // for debugging 
        }
        //$conn->close();
    }// end insertUser

    // INSERT USER LOC
    function insertUserLoc($conn, $username,$addressline1, $addressline2, $city, $state, $zip, $latlng){

        try{           
            $stmt = $conn->prepare('SET @_un := ?');
            $stmt->bind_param('s',$username);
            $stmt->execute();
            
            $stmt = $conn->prepare('SET @_addressline1 := ?');
            $stmt->bind_param('s',$addressline1);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_addressline2 := ?');
            $stmt->bind_param('s',$addressline2);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_city := ?');
            $stmt->bind_param('s',$city);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_state := ?');
            $stmt->bind_param('s',$state);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_zip := ?');
            $stmt->bind_param('s',$zip);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_latlng := ?');
            $stmt->bind_param('s',$latlng);
            $stmt->execute();

            $result = $conn->query('CALL pInsertUserLocWithLatlng(@_un, @_addressline1, @_addressline2, @_city, @_state, @_zip, @_latlng)');
            return $result;
            $result->free();
        }catch(Exception $e){
            echo $e->getMessage();
        }

        //$conn->close();

    }// end insertUserLoc

    // UPDATES USER LOC
    function updateUserLoc($conn, $username,$addressline1, $addressline2, $city, $state, $zip, $latlng){
        try{           
            $stmt = $conn->prepare('SET @_un := ?');
            $stmt->bind_param('s',$username);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_addressline1 := ?');
            $stmt->bind_param('s',$addressline1);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_addressline2 := ?');
            $stmt->bind_param('s',$addressline2);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_city := ?');
            $stmt->bind_param('s',$city);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_state := ?');
            $stmt->bind_param('s',$state);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_zip := ?');
            $stmt->bind_param('s',$zip);
            $stmt->execute();

            $stmt = $conn->prepare('SET @_latlng := ?');
            $stmt->bind_param('s',$latlng);
            $stmt->execute();

            $result = $conn->query('CALL pUpdateUserLocWithLatlng(@_un, @_addressline1, @_addressline2, @_city, @_state, @_zip, @_latlng)');
            return $result;
            $result->free();
        }catch(Exception $e){
            echo $e->getMessage();
        }

        //$conn->close();
    }

    // CHECK IF EMAIL EXIST
    function checkEmail($conn, $email){
        try{
            $stmt = $conn->prepare('SET @_email := ?');
            $stmt->bind_param('s', $email);
            $stmt->execute();

            $result = $conn->query('CALL pCheckEmail(@_email)');
            $rows = array();
            if ($result->num_rows === 0){                          
                // NO RESULTS
                $rows = null;
            }else{
                while($r = $result->fetch_assoc()){
                    $rows[] = $r;
                }
            }
            return $rows;
            $result->free();
        }catch(Exception $e){
            echo $e->getMessage();
        }

        //$conn->close();
    }
}
?>