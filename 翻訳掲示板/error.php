<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chat Global</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  </head>
  <body>
    <?php
        $GETlang = $_GET['hl']; //hlとは言語のこと
        if($GETlang == 'orig' ||$GETlang == 'en'){
            print 'Please send a comment or specify a file.';
            $buttonName = "back";
        }else if($GETlang == 'ja'){
            print 'コメントを送るかファイルを指定してください。';
            $buttonName = "戻る";

        }else{
            print '请发送评论或指定文件。';
            $buttonName = "回去";
      
        }
    ?>
    <br />
    <input type="button" onclick="history.back()" value=<?php  print $buttonName;?>>
  </body>
</html>