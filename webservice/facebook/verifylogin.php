<?php
session_start();
require '../frameworks/Facebook/autoload.php';
$hasError = false;

$fb = new Facebook\Facebook([
    'app_id' => '250452845373699',
    'app_secret' => '70476420f22999094b65eff67f9fdc49',
    'default_graph_version' => 'v2.8'
]);

$helper = $fb->getRedirectLoginHelper();
try{
    // GET TOKEN FROM LOGIN REDIRECT
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // FIX ME - ERROR HANDLING
  $hasError = true;
  // When Graph returns an error
  //echo 'Graph returned an error: ' . $e->getMessage();
  //exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // FIX ME - ERROR HANDLING
  $hasError = true;
  // When validation fails or other local issues
  //echo 'Facebook SDK returned an error: ' . $e->getMessage();
  //exit;
}

if (isset($accessToken)){
    // LOGGED IN
    // OAuth 2.0 client
    $oAuth2Client = $fb->getOAuth2Client();
    // Token metadata
    $tokenMetadata = $oAuth2Client->debugToken($accessToken);

    try{
        // VALIDATE METADATA
        $tokenMetadata->validateAppId('250452845373699');
        $tokenMetadata->validateExpiration();
    }catch(Facebook\Exceptions\FacebookSDKException $e){
        //echo 'Validation Error: ' . $e->getMessage();
        // FIX ME - ERROR HANDLING

    }

    if (! $accessToken->isLongLived()){
        // EXCHANGE SHORT-LIVED TOKEN FOR LONG LIVED 
        try{
            $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
        }catch(Facebook\Exceptions\FacebookSDKException $e){
            //echo 'Error Getting long lived access token: ' . $e->getMessage();
            $hasError = true;
        }
    }

    // HANDLE $hasError = true;
    if (!$hasError){
        $_SESSION['fb_access_token'] = (string) $accessToken;
        echo '<script>window.location.href="/";</script>'; // close login tab/window
    }else{
        echo 'HAS ERROR';
    }

}else{

    // FIX ME - COULD NOT GET TOKEN 
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}
?>