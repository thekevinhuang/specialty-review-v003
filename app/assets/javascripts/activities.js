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
    var activity_id = activityShowId()
    //need to work out how to get item categories pertaining to a specific activity.
    $.get("/activities/"+ activity_id +".json", function(data) {
        data.item_categories.forEach((element, index) => {htmlItemCategoryList += itemCategoryLink(element)})
        $("#item-category-list").html(htmlItemCategoryList)
    })
}

function itemCategoryFormShow() {
    var activity_id = activityShowId()
    $("#new-item-category").on("click", function(e){
        $.ajax({
            url: '/activities/'+activity_id + '/item_categories/new',
            dataType: 'script'
        })
        $("#new-item-category").hide()
    })
}

function activityShowId () {
    return $('*[data-activity-id]').attr("data-activity-id")
}

function itemCategoryLink(element) {
    var activity_id = activityShowId()
    return '<li><a href = "/activities/' + activity_id + '/item_categories/' + element.id + '">' + element.name + '</a></li>'
}

$(document).on('turbolinks:load', function () {
    if  ($(".activities.index").length) {
        activityIndexFormShow()

    } else if ($(".activities.show").length){
        asyncActivityItemCategory()
        itemCategoryFormShow()
    }
})