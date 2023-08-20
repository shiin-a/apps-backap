<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chat Global</title>
  </head>
  <body>
    <?php
    $GETlang = $_GET['hl']; //hlとは言語のこと
    $dbid = $_POST['dbid']; //データベースのID
    $picture = $_POST['picture'];
    unlink("picture/" .$picture);
    $dsn = 'mysql:dbname=chatglobal;hoat=localhost';
    $user = 'root';
    $password='Ycyc2112#';
    $dbh = new PDO($dsn,$user,$password);
    $dbh->query('SET NAMES utf8');

    $sql ='DELETE FROM chatglobal WHERE id=?';
    $stmt = $dbh->prepare($sql);
    $data[] = $dbid;
    $stmt->execute($data);

    $dbh = null;

    if($GETlang == 'orig'){
        header( "Location: index.php" ) ;
    }else if($GETlang == 'en'){
        header( "Location: index-en.php" ) ;
    }else if($GETlang == 'ja'){
        header( "Location: index-ja.php" ) ;
    }else{
        header( "Location: index-zh.php" ) ;
    }
  
    
    ?>
  </body>
</html>