<?php
/**
 * Contact Form Handler
 *
 * Falls back to PHP mail() when EmailJS is not yet configured.
 * For reliable Gmail delivery, configure EmailJS in assets/js/contact.js instead.
 */

header('Content-Type: application/json');

// ── Configuration ─────────────────────────────────────────────────────────────
const RECEIVING_EMAIL = 'thirumalaithiruvasan@gmail.com';
const SITE_NAME       = 'Thirumalai Vasan Portfolio';

// ── Helper ────────────────────────────────────────────────────────────────────
function respond(bool $success, string $message): void
{
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// ── Method guard ──────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.');
}

// ── Collect & sanitise input ──────────────────────────────────────────────────
$senderName  = trim(strip_tags($_POST['name']    ?? ''));
$senderEmail = trim($_POST['email']   ?? '');
$subject     = trim(strip_tags($_POST['subject'] ?? ''));
$messageText = trim(strip_tags($_POST['message'] ?? ''));

// ── Validate ──────────────────────────────────────────────────────────────────
if (!$senderName || !$senderEmail || !$subject || !$messageText) {
    respond(false, 'Please fill in all required fields.');
}
if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

// Prevent SMTP header injection via newline characters
foreach ([$senderName, $senderEmail, $subject] as $field) {
    if (preg_match('/[\r\n]/', $field)) {
        respond(false, 'Invalid characters detected in input.');
    }
}

// Safe values for use in HTML email
$senderEmail = filter_var($senderEmail, FILTER_SANITIZE_EMAIL);
$safeSubject = htmlspecialchars($subject,     ENT_QUOTES, 'UTF-8');
$safeName    = htmlspecialchars($senderName,  ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($messageText, ENT_QUOTES, 'UTF-8'));

// ── Build headers ─────────────────────────────────────────────────────────────
// Use a no-reply sender so the From header passes SPF/DKIM on shared hosting.
// The visitor's address goes into Reply-To so you can reply with one click.
$host        = $_SERVER['HTTP_HOST'] ?? 'localhost';
$fromAddress = "noreply@{$host}";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . SITE_NAME . " <{$fromAddress}>\r\n";
$headers .= "Reply-To: {$safeName} <{$senderEmail}>\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

// ── Build HTML email body ─────────────────────────────────────────────────────
$emailBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:auto;padding:24px">

  <h2 style="color:#18d26e;border-bottom:2px solid #18d26e;padding-bottom:8px;margin-top:0">
    New Message from Portfolio Contact Form
  </h2>

  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <tr>
      <td style="padding:10px 12px;font-weight:bold;color:#555;width:80px;border-bottom:1px solid #eee">Name</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee">{$safeName}</td>
    </tr>
    <tr style="background:#f9f9f9">
      <td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee">Email</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee">
        <a href="mailto:{$senderEmail}" style="color:#18d26e">{$senderEmail}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 12px;font-weight:bold;color:#555">Subject</td>
      <td style="padding:10px 12px">{$safeSubject}</td>
    </tr>
  </table>

  <h3 style="color:#555;margin-bottom:8px">Message</h3>
  <div style="background:#f5f5f5;padding:16px;border-radius:6px;line-height:1.7;white-space:pre-wrap">
    {$safeMessage}
  </div>

  <hr style="margin-top:28px;border:none;border-top:1px solid #eee">
  <p style="color:#aaa;font-size:12px;margin-bottom:0">
    Sent via the contact form on <strong>Thirumalai Vasan&rsquo;s Portfolio</strong>.
    Hit <em>Reply</em> to respond directly to {$safeName}.
  </p>

</body>
</html>
HTML;

// ── Send ──────────────────────────────────────────────────────────────────────
$mailSubject = "Portfolio Contact: {$safeSubject}";
$sent = mail(RECEIVING_EMAIL, $mailSubject, $emailBody, $headers);

if ($sent) {
    respond(true, 'Your message has been sent. Thank you!');
} else {
    respond(false, 'Failed to send email. Please try again later or email me directly.');
}
