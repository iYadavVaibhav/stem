document.addEventListener("DOMContentLoaded", function () {
    //alert('Hi')


});


// remove number from section titles
let titles = document.querySelectorAll("body > div.md-container > main > div > div.md-sidebar.md-sidebar--primary > div > div > nav > ul > li > label")
for (title of titles) {
    title.innerHTML = "\n      "+title.innerHTML.slice(12,)
}

var link = document.createElement('link');
link.rel = "apple-touch-icon";
link.sizes = "180x180";
link.href = window.location.origin+"/wiki/assets/images/apple-touch-icon.png";
document.getElementsByTagName('head')[0].appendChild(link);

var link = document.createElement('link');
link.rel = "icon";
link.sizes = "32x32";
link.href = window.location.origin+"/wiki/assets/images/favicon-32x32.png";
document.getElementsByTagName('head')[0].appendChild(link);

// <!--Favicons and icons -->
// <link rel="apple-touch-icon" sizes="180x180" href="{{ site.baseurl }}/images/apple-touch-icon.png">
// <link rel="icon" type="image/png" sizes="32x32" href="{{ site.baseurl }}/images/favicon-32x32.png">
// <link rel="icon" type="image/png" sizes="16x16" href="{{ site.baseurl }}/images/favicon-16x16.png">
