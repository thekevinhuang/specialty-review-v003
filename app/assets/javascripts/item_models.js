//functions associated with Item Model Index
function itemModelRefresh() {
    $("#item-model-form").empty()
    $("#new-item-model").show()
    if  ($(".item_category.show").length) {
        itemCategoryShowModelList()
        itemCategoryShowModelFormShow()
    } else if ($(".item_model.index").length){
        
    }
}

