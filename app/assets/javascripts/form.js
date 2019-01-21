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
        let parentOptions = `<option value="" selected>Choose here</option>`
        var form = this
        parentArray.forEach((element,index) => {
            parentOptions += form.selectOptionCreate(element)
        })
        return parentOptions
    }

    selectOptionCreate(element) {
        return `<option value="${element.id}">${element.name}</option>`
    }

    parentHTMLForm() {
        var parentId = this.parentId
        var parentName = this.parentName
        var parentClass = this.parentClass
        var parentArray = this.parentArray

        let parentHTML = ``
        if (parentId>0) {
            parentHTML = `
                <h4>${readableClassName(parentClass)}: ${parentName}</h4>
                <input type="hidden" name="parent[parent_id]" id="parent_parent_id" value = "${parentId}">
            `
        } else if (parentClass != "NothingClass") {
            parentHTML = `
                <h4>Select a ${readableClassName(parentClass)}:</h4>
                <br>
                <select name="parent[parent_id]" id="parent_parent_id">
                <br>
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
        let className = this.className
        let parentHTML = this.parentHTMLForm()
    
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

//Form for item model characteristics

class IMCForm extends GenericForm {
    constructor({className = "item_model_characteristic", parentId = 0, parentClass = "characteristic", parentName = "NothingName", parentArray = []}) {
        super({className:className, parentId: parentId, parentClass:parentClass, parentName:parentName, parentArray: parentArray})
    }

    parentHTMLForm() {
        var className = this.className
        var parentId = this.parentId
        var parentClass = this.parentClass
        var parentArray = this.parentArray
        let parentHTML = ``

        parentHTML += `<input type="hidden" name="item_model[id]" id="item_model_id" value = "${parentId}">`

        parentHTML += `
        <label for="${className}_${parentClass}_id">Select a ${readableClassName(parentClass)}</label>
        <br>
        <select name="${className}[${parentClass}_id]" id="${className}_${parentClass}_id">
        ${this.parentSelectOptions(parentArray)}
        </select>
        <br><br>
        `
        return parentHTML
    }

    newHTMLForm() {
        let overallClass = this.className
        let subClass = this.parentClass
        let parentHTML = this.parentHTMLForm()
        
        let html = `
            <form class = "new_${overallClass}" id="new_${overallClass}" accept-charset="UTF-8">
                ${parentHTML}
                <label for="${subClass}_name">Name</label>
                <br>
                <input type="text" name="${subClass}[name]" id="${subClass}_name">
                <br>
                <br>
                <label for="${subClass}_description">Description</label>
                <br>
                <textarea name="${subClass}[description]" id="${subClass}_description"></textarea>
                <br>
                <br>
                <input type="submit" name="commit" value = "Add ${readableClassName(subClass)} to this Model">
            </form>
        `
        return html
    }

}
