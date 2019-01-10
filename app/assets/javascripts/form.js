//ensure requests contain the token
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
})

//general Utility Scripts

function readableClassName (className) {
    return (className.charAt(0).toUpperCase() + className.slice(1)).replace("_", " ")
}

//Create a form for Name and Description
class GenericForm {
    constructor({className, parentId = 0, parentClass = "NothingClass", parentName = "NothingName", parentArray = []}) {
        this.className = className
        this.parentId = parentId
        this.parentClass = parentClass
        this.parentName = parentName
        this.parentArray = parentArray
    }

    parentSelectOptions(parentArray = []){
        let parentOptions = ``
        var form = this
        parentArray.forEach((element,index) => {
            parentOptions += form.selectOptionCreate(element)
        })
        return parentOptions
    }

    selectOptionCreate(element) {
        return `<option value="${element.id}">${element.name}</option>`
    }

    parentHTMLForm({parentId = 0, parentClass = "NothingClass", parentName = "NothingName", parentArray = []}) {
        let parentHTML = ``
        if (parentId>0) {
            parentHTML = `
                <h4>${readableClassName(parentClass)}: ${parentName}</h4>
                <input type="hidden" name="parent[parent_id]" id="parent_parent_id" value = "${parentId}">
            `
        } else if (parentClass != "NothingClass") {
            parentHTML = `
                <h4>Select a ${readableClassName(parentClass)}:</h4>
                <select name="parent[parent_id]" id="parent_parent_id">
                ${this.parentSelectOptions(parentArray)}
                </select>
                <br>
                <br>
            `
        } else {
            parentHTML = ``
        }
        return parentHTML
    }

    newHTMLForm() {
        
        let parentHTML = this.parentHTMLForm({parentId:this.parentId,parentClass:this.parentClass, parentName:this.parentName,parentArray:this.parentArray})
        let className = this.className
    
        let html = `
            <h3>New ${readableClassName(className)}</h3>
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
                <input type="submit" name="commit" value = "Create ${readableClassName(className)}">
            </form>
        `
        return html
    }

}
