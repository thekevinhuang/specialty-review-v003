
function activityLink(element) {
    return '<li><a href = "activities/' + element.id + '">' + element.name + '</a></li>'
}

function itemCategoryLink(element) {
    return '<li><a href = "item_categories/' + element.id + '">' + element.name + '</a></li>'
}

$(document).ready(function initialize() {
    var response = $.ajax({
        url: window.location.pathname + ".js",
        dataType: 'script'
    })
})