//Get page data

function activityShowId () {
    return $('*[data-activity-id]').attr("data-activity-id")
}

function activityShowName() {
    return $(".activity-name")[0].innerHTML
}

function activityArray() {
    var activityArray = []
    $.ajax({
        'async': false,
        'url': "/activities.json",
        'success': function (data){
            var resultArray = []
            data.forEach((element,index)=> {
                resultArray.push({id:element.id, name:element.name})
            })
            activityArray = resultArray
        }
    })
    return activityArray
}

//Activity Class Creation

class ActivityShow {
    constructor(){
        this.id = activityShowId()
        this.name = activityShowName()
        this.className = "activity"
        this.childName = "item_category"
        let activityShowForm = new GenericForm({className:this.childName, parentId:this.id, parentClass:this.className, parentName:this.name})
        this.formHTML = activityShowForm.newHTMLForm()
    }

    itemCategoryLink(element) {
        var activity_id = this.id
        return '<li><a href = "/activities/' + activity_id + '/item_categories/' + element.id + '">' + element.name + '</a></li>'
    }

    newItemCategoryFormShow() {
        var activityShow = this
        let html = activityShow.formHTML
        $("#new-item-category").on("click", function(e){
            $("#item-category-form").html(html)
            $("#new-item-category").hide()
            
            activityShow.newItemCategoryFormSubmit()
        })
    }

    asyncItemCategoryList () {
        let htmlItemCategoryList = ""
        var activityShow = this
        var activity_id = activityShow.id
        
        $.get("/activities/"+ activity_id +".json", function(data) {
            data.item_categories.forEach((element, index) => {htmlItemCategoryList += activityShow.itemCategoryLink(element)})
            $("#item-category-list").html(htmlItemCategoryList)
        })
    }

    newItemCategoryFormSubmit() {
        var activityShow = this
        $("form#new_item_category").submit(function(event){
            event.preventDefault()
        
            var values =  $(this).serialize()
        
            var posting = $.post('/item_categories', values)
        
            posting.done(function (data){
                $("#item-category-form").empty()
                $("#new-item-category").show()
                activityShow.asyncItemCategoryList()
            })
        })
    }

}

class ActivityIndex {
    constructor() {
        let activityIndexForm = new GenericForm({className:"activity"})
        this.formHTML = activityIndexForm.newHTMLForm("activity")
    }

    asyncActivityList() {
        let htmlActivityList = ""
        var activityIndex = this
        $.get("/activities.json", function(data) {
            data.forEach((element, index) => {htmlActivityList += activityIndex.activityLink(element)})
            $("#activity-list").html(htmlActivityList)
        })
    }

    activityLink(element) {
        return '<li><a href = "activities/' + element.id + '">' + element.name + '</a></li>'
    }

    newActivityFormSubmit() {
        var activityIndex = this
        $("form#new_activity").submit(function(event) {
            event.preventDefault()
        
            var values =  $(this).serialize()
        
            var posting = $.post('/activities', values)
        
            posting.done(function (data){
                $("#activity-form").empty()
                $("#new-activity").show()
                activityIndex.asyncActivityList()
            })
        })
    }

    newActivityFormShow() {
        var activityIndex = this
        let html = activityIndex.formHTML
        $("#new-activity").on("click", function(e){
            $("#activity-form").html(html)
            $("#new-activity").hide()
            
            activityIndex.newActivityFormSubmit()
        })
    }
}


$(document).on('turbolinks:load', function () {
    if  ($(".activities.index").length) {
        let activityIndex = new ActivityIndex()
        activityIndex.newActivityFormShow()

    } else if ($(".activities.show").length){
        let activityShow = new ActivityShow()
        activityShow.newItemCategoryFormShow()
        activityShow.asyncItemCategoryList()
    }
})