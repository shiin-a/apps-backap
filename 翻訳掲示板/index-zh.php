<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Chat Global</title>
        <link rel="shortcut icon" href="picture/globalLNG.png">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <style>
             #title{
                background-image:url("picture/title.png");
                color: #67a8dd;
                font-weight: 800;
                padding: 0.5em;
                font-size: 40px;
                box-shadow: 2px 2px 4px black; 
                
            }
            div{
                box-shadow: 1px 1px 4px;
            }
            #delete{
       
                background-image:url("picture/delete.png");
                background-repeat:no-repeat;
                border:none;
                width:35px;
                height:35px;
                cursor: pointer;
                border-radius: 0%;
              
                        
            }
            #submit{
       
                background-image:url("picture/submit.png");
                background-position: right 50% bottom 10%;
                background-repeat:no-repeat;
                background-color:#ffffff;
                border:none;
                width:70px;
                height:70px;
                text-indent: -9999px;
                cursor: pointer;
                border-radius: 50%;
                    
            }

            #textarea {
        　　    resize: none;
            }
            #selectFile{
                margin: 5px auto;
                padding: 15px;
                border-radius: 4px;
                max-width: 250px;
                text-align: center;
                background-color: #f1f1f1;
                color: #73a9ff;
                box-shadow:  0 2px 6px rgba(146, 146, 146, 0.8);
                cursor: pointer;
            }
            #languageIMG{
                position: fixed;
                top: 10px; 
                right: 0px;
                padding: 6px 0px;
                width:80px;
                height:80px;
            }
        </style>
    </head>
    <body>
        
        <a id = title> xyz012.xyz </a><br /><br />
        <a href="setting.html"><img src="picture/setting.png" border="0"></a>
        <p>用户鸣叫后，立即将其翻译成日语，英语或中文。<br /> ※推文可以使用日语，英语和中文以外的其他语言。 </p><br /><br />
     
        <a href="setting.html"><img id="languageIMG" src="picture/zh.png"></a>
        <?php


            $sql = null;$res = null;$dbh = null;
            try {	
                    $dsn = 'mysql:dbname=chatglobal;hoat=localhost';
                    $user = 'root';
                    $password='Ycyc2112#';
                    $dbh = new PDO($dsn,$user,$password);
                  
                    $sql = "SELECT * FROM chatglobal";
                
                    $res = $dbh->query($sql);
                    
                    $count = 0; //写真の出た回数
                    foreach( $res as $value ) {		
                        print '<div>';
                        print '<form method="post" action="delete.php?hl=orig">';
                        print '<input  type="hidden" name="dbid" value="' .$value["id"] .'">';
                        if(strcmp($value["picture"], "") != 0){  //写真が送られた場合
                           print '<input  type="hidden" name="picture" value="' .$value["picture"] .'">';
                        }
                        print '<input id="delete" type="submit" value=""></form>';
                        if(strcmp($value["picture"], "") != 0){
                        //    print '<img src="./picture/' .$value["picture"]. '"width="50px"id="' .$count.'">';
                        print '<a href="picture/' .$value["picture"]. '"><img src="./picture/' .$value["picture"]. '"width="50px"id="' .$count.'"></a>';


                        }

                        print nl2br($value["commentZh"]);
                        print "</div>";
                        print "<br />";
                        
                    }

                
                } catch(PDOException $e) {
                    print 'ただいま障害により大変ご迷惑をおかけします';
                    exit();
                }

            $dbh = null;


            
        ?>
       
        <form id="formID" method="post" action="insert.php?hl=zh" enctype="multipart/form-data">
            <textarea id="textarea" name="comment" rows="15" cols="40"></textarea><br />
            <input id="selectFile" type="file" name="picture" style="width: 400px left:50px; line-height: 40px;" accept="image/*">
            <input id="submit" type="submit" value="" >
        </form>
      

     </body>
</html>
