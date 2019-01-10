//ensure requests contain the token
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  })

//Create a form for Name and Description

function newHTMLForm(className, parentId = 0, parentClass = "NothingClass", parentName = "NothingName") {
    
    parentHTML = ``
    if (parentId>0) {
        parentHTML = `
        <h4>${parentClass}: ${parentName}</h4>
        <input type="hidden" name="parent[parent_id]" id="parent_parent_id" value = "${parentId}">
        `
    }

    html = `
        <h3>New ${(className.charAt(0).toUpperCase() + className.slice(1)).replace("_", " ")}</h3>
        <form class = "new_${className}" id="new_${className}" accept-charset="UTF-8">
            ${parentHTML}
            <label for="${className}_name">Name</label>
            <br>
            <input type="text" name="${className}[name]" id="${className}_name">
            <br>
            <br>
            <label for="${className}_description">Description</label>
            <br>
            <textarea name="${className}[description]" id="${className}_description"></textarea>
            <br>
            <br>
            <input type="submit" name="commit" value = "Create ${(className.charAt(0).toUpperCase() + className.slice(1)).replace("_", " ")}">
        </form>
    `
    return html
}

//Get page data

function activityShowId () {
    return $('*[data-activity-id]').attr("data-activity-id")
}

function activityShowName() {
    return $(".activity-name")[0].innerHTML
}



//Activity Class Creation

class ActivityShow {
    constructor(){
        this.id = activityShowId()
        this.name = activityShowName()
        this.className = "activity"
        this.childName = "item_category"
        this.formHTML = newHTMLForm(this.childName, this.id, this.className, this.name)
    }

    itemCategoryLink(element) {
        var activity_id = this.id
        return '<li><a href = "/activities/' + activity_id + '/item_categories/' + element.id + '">' + element.name + '</a></li>'
    }

    newItemCategoryFormShow() {
        var activityShow = this
        html = activityShow.formHTML
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
        this.formHTML = newHTMLForm("activity")
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
        html = activityIndex.formHTML
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