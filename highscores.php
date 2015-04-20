<?php
include ('db.php');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$orderby = 'score';

if(isset($_GEt['orderby'])){
	
	$orderby = cleanStr($_POST['orderby']);
	
}

	
	$sql = "SELECT * FROM edm_scores ORDER BY ".$orderby." DESC";
	
    $result = $conn->query($sql);



function cleanStr ($str){
	
	$str = mb_convert_encoding($str, 'UTF-8', 'UTF-8');
	$str = htmlentities($str, ENT_QUOTES, 'UTF-8');
	
	return $str;
	
}
?> 
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="score page">
		<link rel="stylesheet" href="style.css">
		<title> EUROPEAN PARLIAMENT MADNESS </title>
	</head>
	
	<body>
	<div class = "title"> EUROPEAN PARLIAMENT MADNESS</div>
	<div class = "wrapper">
	<div class = "menu">
		<a class = "bt" href="index.html"> <--MENU </a>
	</div>
	<div class = "highscores"> HIGHSCORES : </div>
	<?php
	
	echo '	 <table style="width:100%" class = "score_table">';
    while($row = mysqli_fetch_array($result)){
		
		  echo '<tr class = "score_line">';
			echo '<td class = "name">'.$row['name'].'</b></td>';
			echo '<td class = "score"><b>'.$row['score'].'</b></td>';
			echo '<td class = "time"><i>'.$row['timestamp'].'</i></td>';
		 echo ' </tr>';

		
	}		
	
	echo '</table>' ;
	
	
	$conn->close();
	?>
	</div>
	</body>
</html>