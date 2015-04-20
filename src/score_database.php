<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "games";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST['name']) && isset($_POST['score']) && isset($_POST['stats'])) {
	
	
	$name = cleanStr($_POST['name']);
	$score = cleanStr($_POST['score']);
	$stats = cleanStr($_POST['stats']);

	$sql = "INSERT INTO edm_scores (name, score,stats)VALUES ('".$name."', '".$score."','".$stats."')";

	if ($conn->query($sql) === TRUE) {

	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

}

if(isset($_POST['orderby'])){
	
	$orderby = cleanStr($_POST['orderby']);
	
	$sql = "SELECT * FROM edm_scores";
	
    $result = $conn->query($sql);

    while($row = mysqli_fetch_array($result))
	{
		echo $row['name'] . " " . $row['score'];
		echo "<br />";
	}	
	
	
}

$conn->close();


function cleanStr ($str){
	
	$str = mb_convert_encoding($str, 'UTF-8', 'UTF-8');
	$str = htmlentities($str, ENT_QUOTES, 'UTF-8');
	
	return $str;
	
}
?> 


