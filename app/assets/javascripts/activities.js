function activityFormLoad() {
    //simply load the partial when the button is clicked
    $("#new-activity").on("click", function(e){
        $.ajax({
            url: 'activities/new',
            dataType: 'script'
        })
        $("#new-activity").hide()
    })    
}

function activityCreate() {
    //obtain the information from a form, serialize it, and post it.
    $("form#new_activity").submit(function(event) {
        event.preventDefault()

        var values =  $(this).serialize()

        var posting = $.post('/activities', values)

        posting.done(function (data){
            $("#activity-form").empty()
            $("#new-activity").show()
            activityList()
        })
    })
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
    activityFormLoad()
})