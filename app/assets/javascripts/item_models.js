//functions associated with Item Model Index
function itemModelRefresh() {
    $("#item-model-form").empty()
    $("#new-item-model").show()
    
    if  ($(".item_categories.show").length) {
        itemCategoryShowModelList()
        itemCategoryShowModelFormShow()
    } else if ($(".item_models.index").length){
        
    }
}


//function sassociated with Item Model Show

function itemModelId() {
    return $('*[data-item-model-id]').attr("data-item-model-id")
}

function itemModelShowCharacteristicFormShow() {
    var item_model_id = itemModelId()
    
    $("#new-characteristic").on("click", function(e){
        $.ajax({
            url: '/item_models/'+ item_model_id +'/item_model_characteristics/new',
            dataType: 'script'
        })
        $("#new-characteristic").hide()
    })
} 

function itemModelShowCharacteristicList() {
    $("#sort-review").on("click", function (e) {
        itemModelShowSortButton(this)
    })
    $("#sort-count").on("click", function(e) {
        itemModelShowSortButton(this)
    })
}

function itemModelShowSortButton (button) {
    $("#characteristic-list").empty()
    item_model_id = itemModelId()
    var sort = $(button).data("sort")
    $.ajax({
        url: '/item_models/' + item_model_id + '/item_model_characteristics/' + sort,
        dataType: 'script'
    })
}



$(document).on('turbolinks:load', function () {
    if  ($(".item_models.show").length) {
        itemModelShowCharacteristicFormShow()
        itemModelShowCharacteristicList()
    } else if ($(".item_categories.show").length){
        
    }
})

