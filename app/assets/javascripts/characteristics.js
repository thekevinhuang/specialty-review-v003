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

$(document).on('turbolinks:load', function () {
    if  ($(".characteristics.index").length) {
        let characteristicIndex = new CharacteristicIndex()
        characteristicIndex.newCharacteristicFormShow()

    } else if ($(".characteristics.show").length){
        
    }
})