<?php
// Set headers to handle AJAX requests
header('Content-Type: application/json');

// Define receiving email
$receiving_email_address = 'thirumalaithiruvasan@gmail.com';

// Basic input validation
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Check for empty fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Basic security - sanitize inputs
$name = htmlspecialchars($name);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

try {
    // Create email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Compose email message
    $email_message = "<h3>Contact Form Message</h3>";
    $email_message .= "<p><strong>Name:</strong> $name</p>";
    $email_message .= "<p><strong>Email:</strong> $email</p>";
    $email_message .= "<p><strong>Subject:</strong> $subject</p>";
    $email_message .= "<p><strong>Message:</strong></p>";
    $email_message .= "<p>" . nl2br($message) . "</p>";
    
    // Send email
    $mail_result = mail($receiving_email_address, "Contact Form: $subject", $email_message, $headers);
    
    if ($mail_result) {
        echo json_encode(['success' => true, 'message' => 'Your message has been sent. Thank you!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Unable to send email. Please try again later.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>