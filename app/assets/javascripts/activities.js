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

function activityLink(element) {
    return '<li><a href = "activities/' + element.id + '">' + element.name + '</a></li>'
}


//Activity Show Functions:

function asyncActivityItemCategory () {
    let htmlItemCategoryList = ""
    //need to work out how to get item categories pertaining to a specific activity.
    $.get("/activities/"+  +".json", function(data) {
        data.forEach((element, index) => {htmlItemCategoryList += itemCategoryLink(element)})
        $("#item-category-list").html(htmlItemCategoryList)
    })
}
function itemCategoryLink(element) {
    return '<li><a href = "item_categories/' + element.id + '">' + element.name + '</a></li>'
}

$(document).on('turbolinks:load', function () {
    if  ($(".activities.index").length) {
        activityIndexFormShow()

    } else if ($(".activities.show").length){
        alert ("this is activities show")
    }
})