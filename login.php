<?php
session_start();
include('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['logemail'];
    $password = $_POST['logpass'];

    // Sanitize user input
    $email = mysqli_real_escape_string($conn, $email);

    // Perform database query to check for the user
    $query = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);

        // Verify the password
        if (password_verify($password, $row['password'])) {
            // Password is correct
            $_SESSION['user'] = $email;
            echo json_encode(['status' => 'success', 'username' => $row['full_name']]);
        } else {
            // Invalid password
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
        }
    } else {
        // User not found
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
    }
}
?>
