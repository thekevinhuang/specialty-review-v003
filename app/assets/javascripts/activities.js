//Activity Index Functions:

function asyncActivityIndex() {
    let htmlActivityList = ""
    
    $.get("/activities.json", function(data) {
        data.forEach((element, index) => {htmlActivityList += activityLink(element)})
        $("#activity-list").html(htmlActivityList)
    })
}

function activityIndexFormShow() {
    $("#new-activity").on("click", function(e){
        $.ajax({
            url: 'activities/new',
            dataType: 'script'
        })
        $("#new-activity").hide()
    }) 
}
//To force the nav bar activities button to load the ajax events. Not sure how to circumvent.

function activityIndexLoader() {
    $("#activity-loader").on("click", function(e) {
        e.preventDefault()
        window.location.replace("/activities")
        $(document).ready(function initialize() {
            activityIndexFormShow()
        })
    })
}

function activityLink(element) {
    return '<li><a href = "activities/' + element.id + '">' + element.name + '</a></li>'
}


//Activity Show Functions:

function itemCategoryLink(element) {
    return '<li><a href = "item_categories/' + element.id + '">' + element.name + '</a></li>'
}

$(document).ready(function initialize() {
    activityIndexLoader()
    activityIndexFormShow()
})