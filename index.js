var validChars = "ABCDEFabcdef0123456789";
var convertSuccess = false;
var alertDisplay = document.getElementById("alert");
var utf_8 = document.getElementById("utf-8");
var utf_16 = document.getElementById("utf-16");
var utf_32 = document.getElementById("utf-32");

document.getElementById("convert").addEventListener("click", () => {
    var unicode = document.getElementById("unicode").value;
    reset_values();

    // If input is null
    if(unicode.length == 0) {
        alertDisplay.innerHTML = "No null input!";
        convertSuccess = false;
        return -1;
    }
    
    // If a character in the input is invalid
    for(var i = 0; i < unicode.length; i++) {
        if(!validChars.includes(unicode.charAt(i))) {
            alertDisplay.innerHTML = "Invalid input!";
            convertSuccess = false;
            return -1;
        }
    }

    // If valid input
    utf_8.value = get_UTF_8(unicode);
    utf_16.value = get_UTF_16(unicode);
    utf_32.value = get_UTF_32(unicode);
    convertSuccess = true;
});

// TODO: Export to text file when #export is clicked
document.getElementById("export").addEventListener("click", () => {
    // If conversion was successful, makes download link in webpage
    if(convertSuccess) {
        alertDisplay.classList.add("green-alert");

        var link = document.getElementById('download');
        var file = new Blob([utf_8.value, '\n', utf_16.value, '\n', utf_32.value], {type: 'text/plain'});
        link.href = URL.createObjectURL(file);
        link.download = "output.txt";
        link.click();
        URL.revokeObjectURL(link.href);

        alertDisplay.innerHTML = "Successfully exported to text file.";
    }
    else {
        alertDisplay.classList.add("red-alert");
        alertDisplay.innerHTML = "Cannot export to text file!";
    }

});

// TODO: Conversion for UTF-8
function get_UTF_8(unicode) {
  var utf8 = "";
  for (var i = 0; i < unicode.length; i += 4) {
    var codepoint = parseInt(unicode.substr(i, 4), 16);
    if (codepoint <= 0x7f) {
      utf8 += String.fromCharCode(codepoint);
    } else if (codepoint <= 0x7ff) {
      utf8 += String.fromCharCode(0xc0 | (codepoint >> 6));
      utf8 += String.fromCharCode(0x80 | (codepoint & 0x3f));
    } else if (codepoint <= 0xffff) {
      utf8 += String.fromCharCode(0xe0 | (codepoint >> 12));
      utf8 += String.fromCharCode(0x80 | ((codepoint >> 6) & 0x3f));
      utf8 += String.fromCharCode(0x80 | (codepoint & 0x3f));
    } else {
      utf8 += String.fromCharCode(0xf0 | (codepoint >> 18));
      utf8 += String.fromCharCode(0x80 | ((codepoint >> 12) & 0x3f));
      utf8 += String.fromCharCode(0x80 | ((codepoint >> 6) & 0x3f));
      utf8 += String.fromCharCode(0x80 | (codepoint & 0x3f));
    }
  }
  return utf8;
    //return "Replace with UTF-8";
}

// TODO: Conversion for UTF-16
function get_UTF_16(unicode) {
    return "Replace with UTF-16";
}

// TODO: Conversion for UTF-32
function get_UTF_32(unicode) {
    return "Replace with UTF-32";
}

// Resets form values
function reset_values() {
    document.getElementById("utf-8").value = "";
    document.getElementById("utf-16").value = "";
    document.getElementById("utf-32").value = "";

    alertDisplay.innerHTML = "";
    alertDisplay.className = "";
    alertDisplay.classList.add("red-alert");
}