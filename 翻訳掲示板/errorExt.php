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
            print 'The only file extensions that can be sent are png, jpeg, jpg, and gif.';
            $buttonName = "back";
        }else if($GETlang == 'ja'){
            print '送れるファイルの拡張子はpng, jpeg, jpg, gifだけです。';
            $buttonName = "戻る";

        }else{
            print '只能发送png，jpeg，jpg和gif文件扩展名。';
            $buttonName = "回去";
      
        }
    ?>
    <br />
    <input type="button" onclick="history.back()" value=<?php  print $buttonName;?>>
  </body>
</html>