function getURLParameter(e) {
    for (var t = window.location.search.substring(1).trim(), r = t.replace(/%20/g, " ").replace(/\s+/g, " ").trim(), s = encodeURIComponent(r), n = decodeURIComponent(s).replace(/%21/g, "!").replace(/%22/g, '"').replace(/%27/g, "'"), a = n.split("&"), c = 0; c < a.length; c++) {
        var o = a[c].split("=");
        if (o[0] === e) return o[1]
    }
}

function displayResults(e) {
    for (var t = 0; t < pages.length; t++) {
        var r, s = baseURL + pages[t];
        $.ajax({
            url: s,
            asynch: !1,
            success: function(t) {
                var s = t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""),
                    n = s.substring(t.lastIndexOf("<title>") + 7, t.lastIndexOf("</title>")),
                    a = $(s).text().replace(/(\r\n|\n|\r)/gm, " ").replace(/ +/g, " ");
                r = searchText(this.url, n, a, e)
            },
            complete: function() {
                r && (results += prepareHTML(r), founded++), $("#results").html(results)
            }
        })
    }
}

function searchText(e, t, r, s) {
    var n = r.toLowerCase(),
        a = s.toLowerCase(),
        c = n.search(a);
    if (c >= 0) {
        let o = getPageInfo(e, t, r);
        return o
    }
    return null
}

function getPageInfo(e, t, r) {
    for (var s = {
            url: "",
            content: "",
            title: "",
            matchPart: ""
        }, n = r.match(/\(?[^\.\?\!]+[\.!\?]\)?/g), a = "", c = 0, o = 0; o < n.length; o++)
        if (n[o].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            a = highlightText(n[o], searchTerm), c = o;
            break
        }
    return 0 === c && c !== n.length - 1 ? a = a + n[c + 1] + "..." : 0 !== c && c !== n.length - 1 && (a = a + n[c + 1] + "..."), s.url = e, s.title = t, s.matchPart = a, s
}

function highlightText(e, t) {
    var r = new RegExp("(" + t + ")", "gi");
    return e.replace(r, "<strong>$1</strong>")
}

function prepareHTML(e) {
    var t = "";
    return t += '<div class="resultBlock">', t += '<p class="title"><a href="' + e.url + '" >' + e.title + "</a></p>", t += '<p class="pageURL">' + e.url + "</p>", t += '<p class="description">' + e.matchPart + "</p>", t += "</div>"
}

var baseURL = "",
    pages = ["articles/article_1.html", "articles/article_2.html", "articles/article_3.html", "articles/article_4.html", "articles/article_5.html", "articles/article_6.html", "articles/article_7.html", "articles/article_8.html"],
    page = {
        url: "",
        content: "",
        title: "",
        matchPart: ""
    },
    searchTerm = getURLParameter("search").trim(),
    results = "",
    founded = 0;

$(function() {
    displayResults(searchTerm)
}), $(document).ajaxComplete(function() {
    founded >= 1 && $("#numOfResults").html("<p><span>" + founded + "</span> search results found for <span>" + searchTerm + "</span>...</p>"), results || $("#results").html("<p>Sorry, no results found for <strong>" + searchTerm + "</strong>...</p>")
});