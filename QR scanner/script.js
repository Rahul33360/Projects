function genQR() {
    var gapi = "https://chart.googleapis.com/chart?cht=qr&chs=";
    var myimg = document.getElementById("img");
    var mytext = document.getElementById("qrtext").value;
    var mysize = document.getElementById("size").value;

    console.log("mytext:", mytext); // Add this line for debugging

    if (mytext !== "") {
        myimg.src = gapi + mysize + "x" + mysize + "&chl=" + mytext;
    } else {
        alert("Please Enter Text...");
    }
}
        
function shareQR() 
{
    // Get the URL of the QR code image
    var qrURL = document.getElementById("img").src;
    // Define the sharing message
    var message = "Check out my QR code: " + qrURL;

    // Use the Web Share API to share the message and QR code image
    if (navigator.share) 
    {
        navigator.share({
        title: "QR Code",
        text: message,
        url: qrURL,
    }) 
    .then(() => console.log("QR code shared successfully."))
    .catch((error) => console.error("Error sharing QR code:", error));
    } 
    else 
    {
        // Web Share API not supported, show an error message
        alert("Web Share API not supported on this browser.");
    }
}