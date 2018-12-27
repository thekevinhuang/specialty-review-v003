function activityFormLoad() {
    //simply load the partial when the button is clicked
    
}

function activityCreate() {
    //obtain the information from a form, serialize it, and post it.
}

function activityList() {

    let htmlActivityList = ""
    
    $.get("/activities.json", function(data) {
        data.forEach((element, index) => {htmlActivityList += '<li><a href = "activities/' + element.id + '">' + element.name + '</a></li>'})
        $("#activity-list").html(htmlActivityList)
    })
}

$(document).ready(function initialize() {
    activityList()
})