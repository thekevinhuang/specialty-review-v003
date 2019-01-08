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

$(document).on('turbolinks:load', function () {
    if  ($(".item_models.show").length) {
        itemModelShowCharacteristicFormShow()
    } else if ($(".item_categories.show").length){
        
    }
})

