<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['logname'];
    $email = $_POST['logemail'];
    $password = password_hash($_POST['logpass'], PASSWORD_BCRYPT);
    $age = $_POST['age'];

    $sql = "INSERT INTO users (full_name, email, password, age) VALUES ('$full_name', '$email', '$password', '$age')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
