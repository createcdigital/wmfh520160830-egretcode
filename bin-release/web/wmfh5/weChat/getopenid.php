<?php
    require_once "weChatId.php";

    $appid = $wAppid;  
    $secret = $wKey;  
    $code = $_GET["code"];  
    $get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';

    $ch = curl_init();  
    curl_setopt($ch,CURLOPT_URL,$get_token_url);  
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);  
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
    $res = curl_exec($ch);  
    curl_close($ch);  
    $json_obj = json_decode($res,true);  

    $access_token       = $json_obj['access_token'];
    $openid             = $json_obj['openid'];
    setcookie("openid", $openid, time()+7000, "/", "www.createcdigital.com");
    header("Location:".$_COOKIE['url']);
#echo "=====".$openid."<br/>";
#echo "=====".$_COOKIE['openid'];
#echo "<br/>=====".$_COOKIE['url'];
?>
