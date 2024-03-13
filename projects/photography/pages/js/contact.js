var sendBtn = document.getElementById('sendBtn');
var senderName = document.getElementById('senderName');
var email = document.getElementById('email');
var mailBody = document.getElementById('mailBody');

sendBtn.onclick = function () {
    if(senderName.value != "" || email.value != "" || mailBody.value != "") {
        window.location.href = 'mailto:shivamrudraphotography@gmail.com?subject=Regarding%20query%20of%20your%20service&body=' + 'From ' + senderName.value + ': ' + mailBody.value;
    }
}