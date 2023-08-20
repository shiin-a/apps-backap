<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Chat Global</title>
    </head>
    <body>
        
        <?php
      
        try{
            $GETlang = $_GET['hl']; //hlとは言語のこと
            $comment = $_POST['comment'];
            
            if(isset($_FILES['picture']) && is_uploaded_file($_FILES['picture']['tmp_name'])){  //ユーザーがファイルも一緒に送信した場合
 
                $picture = $_FILES['picture']['tmp_name'];
                $ext = pathinfo($_FILES['picture']['name'], PATHINFO_EXTENSION);  
                $image = toImageID($picture, $ext, $GETlang);
                $image = resize($picture, $image);
                $image = direction($picture, $image);
                $picture_name = nameFile($image);  
                
 
                print "写真の名前は" .$picture_name ."です";
        

            
            }else{
                if (strcmp($comment, "") == 0 ) {     //コメントも画像も送らなかった場合
                   
                    header("Location: error.php?hl=" .$GETlang);
                        exit;   
                }
                $picture_name ="";
            }
            
            $comment = htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');
            $commentEn  = translate($comment, "en");
      
            $commentJa = translate($comment, "ja");
            $commentZh = translate($comment, "zh");
  
       
   

            $dsn = 'mysql:dbname=chatglobal;hoat=localhost';
            $user = 'root';
            $password='Ycyc2112#';
            $dbh = new PDO($dsn,$user,$password);
            $dbh->query('SET NAMES utf8');

            $sql ='INSERT INTO chatglobal (commentOrig,commentEn,commentJa,commentZh,picture) VALUES(?,?,?,?,?)';
            $stmt = $dbh->prepare($sql);
            $data[] = $comment;
            $data[] = $commentEn;
            $data[] = $commentJa;
            $data[] = $commentZh;
            $data[] = $picture_name;
            $stmt->execute($data);

            $dbh = null;
            if($GETlang == 'orig'){
                header( "Location: index.php" );
                exit;
            }else if($GETlang == 'en'){
                header( "Location: index-en.php" );
                exit;
            }else if($GETlang == 'ja'){
                header( "Location: index-ja.php" );
                exit;
            }else{
                header( "Location: index-zh.php" );
                exit;
            }
            

        
        }catch(\Throwable $e ) {
            
            echo 'PDOException: ' . $e->getMessage();
            
        }
            




            function toImageID($picture, $ext, $GETlang)  { 
                //imageIDに変える。

         
                if($ext == 'png'){
                    $tmpImage = imagecreatefrompng($picture);
                    
                }else if($ext == 'jpeg' || $ext == 'jpg'){                                   
                    $tmpImage = imagecreatefromjpeg($picture);       
                }else if($ext == 'gif'){
                    $tmpImage = imagecreatefromgif($picture);
                }else{
                    header("Location: errorExt.php?hl=" .$GETlang);
                    exit;
                }
                list($width, $hight) = getimagesize($picture);
                
               
                $image = imagecreatetruecolor($width, $hight);
               
		imagealphablending($image, false);
		imagesavealpha($image, true);
	        imagecopyresampled($image, $tmpImage, 0, 0, 0, 0, $width, $hight, $width, $hight);
            
                return $image;
               
               
              

            }

            function resize($picture, $image){
                //画像サイズを変更
                list($width, $hight) = getimagesize($picture);               
                if($hight > 300){                              
                    $newwidth = floor(($width*300)/$hight);     //縦と横の比率はもとのまま
                    $newhight = 300;
                }else{
                    $newwidth = $width;
                    $newhight = $hight;
                }
                $resizedimage = imagecreatetruecolor($newwidth, $newhight); 
                imagealphablending($resizedimage, false);
                imagesavealpha($resizedimage, true);
 
                imagecopyresampled($resizedimage, $image, 0, 0, 0, 0, $newwidth, $newhight, $width, $hight);
                imagedestroy($image);
		return $resizedimage;
             
            }
            function direction($picture, $image){
              
                $exif = exif_read_data($picture, 'EXIF');
              
                $degrees = 0;
                $mode = '';
                
                switch($exif['Orientation']) {
                    case 1: // 何もしない
                        break;
                    case 2: // 水平反転させる
                        $mode = 'IMG_FLIP_HORIZONTAL';
                        break;
                    case 3: // 反時計回りに180°回転させる
                        $degrees = 180;
                        break;
                    case 4: // 垂直反転させる
                        $mode = 'IMG_FLIP_VERTICAL';
                        break;
                    case 5: // 水平反転＆反時計回りに270°回転させる
                        $degrees = 270;
                        $mode = 'IMG_FLIP_HORIZONTAL';
                        break;
                    case 6: // 反時計回りに270°回転させる
                        $degrees = 270;
                        break;
                    case 7: // 垂直反転＆反時計回りに270°回転させる
                        $degrees = 270;
                        $mode = 'IMG_FLIP_VERTICAL';
                        break;
                    case 8: // 反時計回りに90°回転させる
                        $degrees = 90;
                        break;
                }
                
                // 反転
                if (! empty($mode)) {
                    $image = imageflip($image, $mode);
                }
                
                // 回転(反時計回り)
                if ($degrees > 0) {
                    $image = imagerotate($image, $degrees, 0);
                }
                
                return $image;
         
               
            }

            function nameFile($image){
                // /var/www/html/picture/tmp.png を違う名前に変える。
            
                $pictureName = (string) mt_rand(1, 100000);
                $pictureName = $pictureName . '.png';
                
                
                // コピーした画像を出力する
                imagepng($image , '/var/www/bbs/picture/' .$pictureName, 9);
                imagedestroy($image);
               
                 
            



               
                return $pictureName;
            }
            function translate($comment, $language){
           
                 
                $encode = urlencode($comment);
                $url = 'https://translation.googleapis.com/language/translate/v2?target=' .$language .'&key=AIzaSyCqxWZ9yJ7CERujEJ7e0HqaSX4uUdeSqE0&q=' .$encode; // リクエストするURLとパラメータ
            
                $curl = curl_init($url);
            
                // リクエストのオプションをセットしていく
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET'); // メソッド指定
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 証明書の検証を行わない
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // レスポンスを文字列で受け取る
            
                // レスポンスを変数に入れる
                $response = curl_exec($curl);
                $json = json_decode( $response , true ) ;
                $json = $json["data"]["translations"];
                
                
                
                if($json[0]["detectedSourceLanguage"] == $language){  //もし、もとのコメントと翻訳結果が同じ言語だったらもとのコメントを返す。
                    return $comment;   
                }
                
                
                curl_close($curl);
            
                return $json[0]["translatedText"];
                
                

               
                
            }
            

        ?>
        <a href="index.php">戻る</a>
   
     </body>
</html>
