var validChars = "ABCDEFabcdef0123456789";
var alertDisplay = document.getElementById("alert");
var convertSuccess = false;

document.getElementById("convert").addEventListener("click", () => {
    var unicode = document.getElementById("unicode").value;
    reset_values();

    if(unicode.length == 0) {
        alertDisplay.innerHTML = "No null input!";
        convertSuccess = false;
        return -1;
    }
    
    for(var i = 0; i < unicode.length; i++) {
        if(!validChars.includes(unicode.charAt(i))) {
            alertDisplay.innerHTML = "Invalid input!";
            convertSuccess = false;
            return -1;
        }
    }

    convertSuccess = true;
    document.getElementById("utf-8").value = get_UTF_8(unicode);
    document.getElementById("utf-16").value = get_UTF_16(unicode);
    document.getElementById("utf-32").value = get_UTF_32(unicode);
});

// TODO: Export to text file when #export is clicked
document.getElementById("export").addEventListener("click", () => {
    var fileName = "output.txt"

    if(convertSuccess) {
        alertDisplay.classList.add("green-alert");
        alertDisplay.innerHTML = "Successfully exported to " + fileName;
    }
    else {
        alertDisplay.classList.add("red-alert");
        alertDisplay.innerHTML = "Cannot export to text file!";
    }

});

// TODO: Conversion for UTF-8
function get_UTF_8(unicode) {
    return "Replace with UTF-8";
}

// TODO: Conversion for UTF-16
function get_UTF_16(unicode) {
    return "Replace with UTF-16";
}

// TODO: Conversion for UTF-32
function get_UTF_32(unicode) {
    return "Replace with UTF-32";
}

function reset_values() {
    document.getElementById("utf-8").value = "";
    document.getElementById("utf-16").value = "";
    document.getElementById("utf-32").value = "";

    alertDisplay.innerHTML = "";
    alertDisplay.className = "";
    alertDisplay.classList.add("red-alert");
}