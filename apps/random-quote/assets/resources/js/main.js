function createTwitterPost(jsonData) {
    var quoteText;
    var quotePerson;
    var siteLink = 'https://twitter.com/intent/tweet?text=';

    if (jsonData) {
        quoteText = removeHTMLMarkUp(json[0].content);
        // console.log("quoteText:", quoteText);
        quotePerson = jsonData[0].title;
        // console.log("quotePerson:", quotePerson);
    } else {
        quoteText = $("#quote-text").text();
        quotePerson = $("#quote-person").text();
    }
    var hrefLink = siteLink + '"' + quoteText + '" ' + quotePerson;
    // console.log("hrefLink:", hrefLink);
    // var linkCharCount = hrefLink.count;
    // if (linkCharCount > 140) {
    //   var linkCharCountOver = linkCharCount - 140;
    //   quoteText = quoteText.substring(0, quoteText.length - linkCharCountOver);
    //   hrefLink = siteLink + '"' + quoteText + '"' + quotePerson;
    //   console.log("Quote char reduced");
    // } else {
    //   console.log("Quote char unchanged");
    // }
    return hrefLink;
}

$(document).ready(function() {
    // alert("Ready!")
    updateQuote();
});

$('#new-quote-btn').click(function() {
    updateQuote();
});

$('.fa-twitter').click(function() {
    window.open(createTwitterPost());
});

function updateQuote() {  
    // changeStyleSheet();
    $.ajaxSetup({ cache: false });
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
        var currentQuote = json[0].content;
        currentQuote = removeHTMLMarkUp(currentQuote);
        var title = json[0].title;
        $("#quote-text").html(currentQuote); 
        $("#quote-person").html("- " + title); 
    });
}

function removeHTMLMarkUp(text) {
    text = text.replace(/<[^>]*>/g, "").trim();
    return text;
}

// function newColor() {
//   var colorList =
//   [ "red", "pink", "purple", "deep_purple",
//  "indigo", "light_blue", "cyan", "teal",
//  "green", "light green", "lime", "yellow", 
//  "amber", "orange", "deep_orange", "grey"];

//   randomNumber = Math.floor(Math.random() * colorList.length);
//   return colorList[randomNumber];
// }

// function changeStyleSheet(){

//   var newMaterialStyleSheet = "https://code.getmdl.io/1.3.0/material." + newColor() + "-" + newColor() + ".min.css";
//   console.log(newMaterialStyleSheet);
//   $('#material-style-sheet').attr('href',newMaterialStyleSheet);
// }
(function() {
    'use strict';
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var showSnackbarButton = document.querySelector('#demo-show-snackbar');
    var handler = function(event) {
        showSnackbarButton.style.backgroundColor = '';
    };
    showSnackbarButton.addEventListener('click', function() {
        'use strict';
        var data = {
            message: 'Developed by Rex Brooker.',
            timeout: 10000,
            actionHandler: handler,
            actionText: 'Okay'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
}());
