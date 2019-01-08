//Associated with Item Category Index page
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

//Associated with Item Category Show

function itemCategoryShowModelFormShow() {
    var item_category_id = itemCategoryId()
    $('#new-item-model').on('click', function (e) {
        $.ajax({
            url: '/item_categories/'+item_category_id + '/item_models/new',
            dataType: 'script'
        })
        $("#new-item-model").hide()
    })
}

function itemCategoryShowModelList() {
    htmlItemModelList = ""

    $.get("/item_categories/"+itemCategoryId()+ "/item_model_list", function(data) {
        data.forEach((element, index) => {
            htmlItemModelList += itemCategoryShowItemModelLink(element)
            $('#item-model-list').html(htmlItemModelList)
        })
    })

}

function itemCategoryShowItemModelLink (element) {
    return '<li><a href="/item_categories/'+itemCategoryId()+'/item_model/'+ element.id+'">'+element.name + ' - Rating: '+ element.overall_rating+'</a></li>'
}

function itemCategoryId() {
    return $('*[data-item_category-id]').attr("data-item_category-id")
}

$(document).on('turbolinks:load', function () {
    if  ($(".item_categories.index").length) {
        itemCategoryNewForm()
        asyncItemCategoryIndex()
    } else if ($(".item_categories.show").length){
        itemCategoryShowModelList()
        itemCategoryShowModelFormShow()
    }
})