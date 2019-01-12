function itemCategoryId() {
    return $('*[data-item_category-id]').attr("data-item_category-id")
}

function itemCategoryShowName() {
    return $(".item-category-name")[0].innerHTML
}

class ItemCategoryIndex {
    constructor() {
        this.className = "item_category"
        this.parentClass = "activity"
        this.parentArray = activityArray() //borrowed from activities.js
        let itemCatIndexForm = new GenericForm({className:this.className,parentClass:this.parentClass,parentArray:this.parentArray})
        this.formHTML = itemCatIndexForm.newHTMLForm()
    }

    asyncItemCategoryIndex() {
        let htmlActivityItemCategoryList = ""
        var itemCategoryIndex = this
        $.get("/activities.json", function(data) {
            data.forEach((element, index) => {htmlActivityItemCategoryList += itemCategoryIndex.activityLink(element)})
            $("#item-category-list").html(htmlActivityItemCategoryList)
        })
    }

    activityLink(element) {
        var itemCategoryIndex = this
        var activityList = '<h4><a href = "activities/' + element.id + '">' + element.name + '</a></h4>'
        activityList += '<div> <ul style="list-style-type:none">'
        //iterate on item_categories and generate more items
        activityList += itemCategoryIndex.itemCategoryLink(element.item_categories)
        activityList += '</ul> </div>'
        return activityList
    }

    itemCategoryLink (item_categories_array) {
        var item_category = ''
        item_categories_array.forEach((element, index) => {
            item_category+='<li><a href="item_categories/'+element.id + '">' + element.name + '</a></li>'
        })
        return item_category
    }

    newItemCatFormShow() {
        var itemCatIndex = this
        let html = this.formHTML
        $("#new-item-category").on("click", function(e){
            $("#item-category-form").html(html)
            $("#new-item-category").hide()

            itemCatIndex.newItemCatFormSubmit()
        })
    }

    newItemCatFormSubmit() {
        var itemCatIndex = this
        $("form#new_item_category").submit(function(event) {
            event.preventDefault()
        
            var values =  $(this).serialize()
        
            var posting = $.post('/item_categories', values)
        
            posting.done(function (data){
                $("#item-category-form").empty()
                $("#new-item-category").show()
                itemCatIndex.asyncItemCategoryIndex()
            })
        })
    }
}

//Associated with Item Category Show

class ItemCategoryShow {
    constructor () {
        this.id = itemCategoryId()
        this.className = "item_model"
        this.parentClass = "item_category"
        this.parentName = itemCategoryShowName()
        let itemModelForm = new GenericForm({className:this.className, parentId:this.id,parentClass:this.parentClass,parentName:this.parentName})
        this.formHTML = itemModelForm.newHTMLForm()
    }

    itemModelList() {
        let htmlItemModelList = ""
        var itemCategoryShow = this
        $.get("/item_categories/"+itemCategoryId()+ "/item_model_list", function(data) {
            data.forEach((element, index) => {
                htmlItemModelList += itemCategoryShow.itemModelLink(element)
                $('#item-model-list').html(htmlItemModelList)
            })
        })
    }

    itemModelLink(element) {
        return '<li><a href="/item_categories/'+itemCategoryId()+'/item_models/'+ element.id+'">'+element.name + ' - Rating: '+ element.overall_rating+'</a></li>'
    }

    newItemModelFormShow() {
        let itemCategoryShow = this
        var html = itemCategoryShow.formHTML
        $('#new-item-model').on('click', function (e) {
            $("#item-model-form").html(html)
            $('#new-item-model').hide()

            itemCategoryShow.newItemModelFormSubmit() 
        })
    }

    newItemModelFormSubmit() {
        let itemCategoryShow = this
        $("form#new_item_model").submit(function(event) {
            event.preventDefault()
        
            var values =  $(this).serialize()
        
            var posting = $.post('/item_models', values)
        
            posting.done(function (data){
                $("#item-model-form").empty()
                $("#new-item-model").show()

                itemCategoryShow.itemModelList()
            })
        })
    }
}

$(document).on('turbolinks:load', function () {
    if  ($(".item_categories.index").length) {
        let itemCategoryIndex = new ItemCategoryIndex()
        itemCategoryIndex.newItemCatFormShow()
        itemCategoryIndex.asyncItemCategoryIndex()
    } else if ($(".item_categories.show").length){
        let itemCategoryShow = new ItemCategoryShow()
        itemCategoryShow.newItemModelFormShow()
        itemCategoryShow.itemModelList()
    }
})