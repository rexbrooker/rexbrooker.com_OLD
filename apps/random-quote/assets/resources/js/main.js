// this function will open a twitter post page with fomatted quote text
function createTwitterPost(jsonData) {
    var quoteText;
    var quotePerson;
    var siteLink = 'https://twitter.com/intent/tweet?text=';

    if (jsonData) {
        quoteText = removeHTMLMarkUp(json[0].content);

        quotePerson = jsonData[0].title;

    } else {
        quoteText = $("#quote-text").text();
        quotePerson = $("#quote-person").text();
    }
    var hrefLink = siteLink + '"' + quoteText + '" ' + quotePerson;

    return hrefLink;
}

$(document).ready(function() {
    // fetch quote when opened
    updateQuote();
});

$('#new-quote-btn').click(function() {
    updateQuote();
});

$('.fa-twitter').click(function() {
    window.open(createTwitterPost());
});

function updateQuote() {
    $.ajaxSetup({ cache: false });
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
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
