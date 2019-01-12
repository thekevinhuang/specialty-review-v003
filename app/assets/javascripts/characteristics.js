//General Helper functions for Characteristics

function characteristicId() {
    return $('*[data-characteristic-id]').attr("data-characteristic-id")
}

function characteristicArray() {
    var characteristicArray = []
    $.ajax({
        'async': false,
        'url': "/characteristics.json",
        'success': function (data){
            var resultArray = []
            data.forEach((element,index)=> {
                resultArray.push({id:element.id, name:element.name})
            })
            characteristicArray = resultArray
        }
    })
    return characteristicArray
}

class CharacteristicIndex {
    constructor () {
        this.className = "characteristic"
        let characteristicIndexForm = new GenericForm({className:this.className})
        this.htmlForm = characteristicIndexForm.newHTMLForm()
    }

    asyncCharacteristicIndex() {
        let htmlCharacteristicList = ""
        var characteristicIndex = this

        $.get("/characteristics.json", function (data){
            data.forEach((element, index)=>{htmlCharacteristicList += characteristicIndex.characteristicLink(element)})
            $("#characteristic-list").html(htmlCharacteristicList)
        })
    }

    characteristicLink (element) {
        return '<li><a href = "characteristics/' + element.id + '">' + element.name + '</a> ' + element.description + ' </li>'
    }

    newCharacteristicFormShow() {
        var characteristicIndex = this
        let html = characteristicIndex.htmlForm
        $('#new-characteristic').on("click", function (e) {
            $("#characteristic-form").html(html)
            $("#new-characteristic").hide()

            characteristicIndex.newCharacteristicFormSubmit()
        })
    }

    newCharacteristicFormSubmit() {
        var characteristicIndex = this
        $("form#new_characteristic").submit(function (event) {
            event.preventDefault()

            var values = $(this).serialize()

            var posting = $.post('/characteristics', values)

            posting.done(function (data){
                $("#characteristic-form").empty()
                $("#new-characteristic").show()
                characteristicIndex.asyncCharacteristicIndex()
            })
        })

    }

}

class CharacteristicShow {
    constructor () {
        this.id = characteristicId()
    }

    asyncItemModelList() {
        var itemModelList = ""
        var characteristicShow = this
        $.get("/characteristics/"+characteristicShow.id+".json", function(data) {
            data.forEach((element, index) => {
                itemModelList += characteristicShow.itemModelLink(element)
            })
            $("#item-model-list").html(itemModelList)
        })
        
    }
    
    itemModelLink(element) {
        return `<li><a href="/item_models/${element.id}">${element.name}</a></li>`
    }


}

$(document).on('turbolinks:load', function () {
    if  ($(".characteristics.index").length) {
        var characteristicIndex = new CharacteristicIndex()
        characteristicIndex.newCharacteristicFormShow()
        characteristicIndex.asyncCharacteristicIndex()
    } else if ($(".characteristics.show").length){
        var characteristicShow = new CharacteristicShow()
        characteristicShow.asyncItemModelList()
    }
})