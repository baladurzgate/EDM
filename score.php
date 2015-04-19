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

	
	$sql = "SELECT * FROM edm_scores ORDER BY ".$orderby;
	
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
		<meta name="description" content="illustrations ">
		<title> EUROPEAN DEPUTY MADNESS 2 ! </title>
		
		<style>
			body{
				width:860px;
				margin:10 auto;
				
			}
			.title{
				
				font-family:'Courier';
				text-align:center;
				font-size:40px;
				padding:10px;
				border-style:solid;
				border-color:#0000FF;
				margin-bottom:50px;

				
			}
			
			.score_line{
				
				font-family:'Courier';
				font-size:30px;
				padding:10px;
				
			}		
			
			.highscores{
				
				font-family:'Courier';
				font-size:35px;
				padding:10px;
				
			}
			
			.name{
				
				font-family:'Courier';
				font-size:30px;
				padding:10px;
				
			}
			
			
			.score{
				
				font-family:'Courier';
				font-size:30px;
				color:#FF5500;
				padding:10px;
				
			}
			
			.time{
				
				font-family:'Courier';
				font-size:14px;
				padding:10px;
				
			}
		
		
		</style>
	</head>
	
	<body>
	<div class = "title"> EUROPEAN DEPUTY MADNESS 2 ! </div>
	<div class = "highscores"> HIGHSCORES : </div>
	<?php
	
	echo '	 <table style="width:100%" class = "score_table">';
    while($row = mysqli_fetch_array($result)){
		
		  echo '<tr class = "score_line">';
			echo '<td class = "name"><b>'.$row['name'].'</b></td>';
			echo '<td class = "score"><b>'.$row['score'].'</b></td>';
			echo '<td class = "time"><i>'.$row['timestamp'].'</i></td>';
		 echo ' </tr>';

		
	}		
	
	echo '</table>' ;
	
	
	$conn->close();
	?>
	</body>
</html>
