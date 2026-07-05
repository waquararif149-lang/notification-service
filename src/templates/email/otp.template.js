const otpTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
<style>
body{
background:#f5f5f5;
font-family:Arial;
}
.card{
max-width:600px;
margin:40px auto;
background:white;
padding:40px;
border-radius:10px;
text-align:center;
box-shadow:0 5px 15px rgba(0,0,0,.15);
}
.otp{
font-size:36px;
letter-spacing:8px;
font-weight:bold;
background:#2563eb;
color:white;
display:inline-block;
padding:18px 35px;
border-radius:8px;
margin:20px 0;
}
</style>
</head>

<body>

<div class="card">

<h2>Email Verification</h2>

<p>Use the OTP below to verify your email.</p>

<div class="otp">${otp}</div>

<p>This OTP expires in <b>5 minutes</b>.</p>

<p>If you didn't request this email, simply ignore it.</p>

</div>

</body>
</html>
`;

export default otpTemplate;