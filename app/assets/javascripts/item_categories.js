function itemCategoryNewForm() {
    
    $("#new-item-category").on("click", function(e){
        $.ajax({
            url: '/item_categories/new',
            dataType: 'script'
        })
        $("#new-item-category").hide()
    })
}

function itemCategoryRefresh() {
    $("#item-category-form").empty()
    $("#new-item-category").show()
    if  ($(".item_categories.index").length) {
        asyncItemCategoryIndex()
    } else if ($(".activities.index").length){
        asyncActivityItemCategory()
    }
}

function asyncItemCategoryIndex () {
    //loads activities and their item categories
    let htmlActivityItemCategoryList = ""
    
    $.get("/activities.json", function(data) {
        data.forEach((element, index) => {htmlActivityItemCategoryList += itemCategoryIndexActivityLink(element)})
        $("#item-category-list").html(htmlActivityItemCategoryList)
    })
}

function itemCategoryIndexActivityLink(element) {
    var activityList = '<h4><a href = "activities/' + element.id + '">' + element.name + '</a></h4>'
    activityList += '<div> <ul style="list-style-type:none">'
    //iterate on item_categories and generate more items
    activityList += itemCategoryIndexItemCategoryLink(element.item_categories)
    activityList += '</ul> </div>'
    return activityList
}

function itemCategoryIndexItemCategoryLink (item_categories_array) {
    var item_category = ''
    item_categories_array.forEach((element, index) => {
        item_category+='<li><a href="item_categories/'+element.id + '">' + element.name + '</a></li>'
    })
    return item_category
}

$(document).on('turbolinks:load', function () {
    if  ($(".item_categories.index").length) {
        itemCategoryNewForm()
        asyncItemCategoryIndex()
    } else if ($(".item_categories.show").length){
        
    }
})