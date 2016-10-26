
        <?php
            
            $mysqli = getConnected("external-db.s209002.gridserver.com","db209002_mlo","One8turbo*","db209002_garagely");
          
            function getConnected($host,$user,$pass,$db){
                $mysqli = @new mysqli($host, $user, $pass, $db);
                

                if ($mysqli->connect_error){
                    echo "Connection Error #: " . $mysqli->connect_errno . "\n";
                    echo "Connection Error: " . $mysqli->connect_error . "\n";
                }
                
                return $mysqli;
            }
         
                // IF THE QUERY ERRORS OUT
                // ALSO SETS $RESULTS
                if (!$results = $mysqli->query("SELECT * FROM Users")){

                    echo "Select Error #: " . $mysqli->errno . "\n";
                    echo "Select Error: " . $mysqli->error . "\n";
                }

                // NO ROWS FOUND
                if ($results->num_rows ===0){
                    echo "Sorry, no results for you!";
                }

                /*
                // GET RESULTS AS SINGLE ?
                // INCREMENTS TO THE NEXT ROW
                //$user = $results->fetch_assoc();
                //echo $user['UserID'];

                while($user = $results->fetch_assoc()){
                    echo $user['UserID'] . ': ' . $user['FirstName'] . ' ' . $user['LastName'];
                }
                */

                $rows = array();
                while($r = $results->fetch_assoc()){
                    $rows[] = $r;
                }
                header('Content-type: application/json');
                echo json_encode($rows);

                $results->free();// free result
                $mysqli->close();// closes connection

                       
            
            
        ?>
