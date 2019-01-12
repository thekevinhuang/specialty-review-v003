//general Item model Show functions

function itemModelId() {
    return $('*[data-item-model-id]').attr("data-item-model-id")
}

//Item Model Show class
class ItemModelShow {
    constructor () {
        this.id = itemModelId()
        this.characteristicArray = characteristicArray() //borrowed from characteristics.js
        let imcHTMLForm = new IMCForm({parentId:this.id, parentArray:this.characteristicArray})
        this.formHTML = imcHTMLForm.newHTMLForm()
    }

    characteristicFormShow() {
        var itemModelShow = this
        var item_model_id = itemModelShow.id
        
        $("#new-characteristic").on("click", function(e){
            $("#characteristic-form").html(itemModelShow.formHTML)
            $("#new-characteristic").hide()

            itemModelShow.characteristicFormSubmit()
        })
    }

    characteristicFormSubmit() {
        var itemModelShow = this
        $("form#new_item_model_characteristic").submit(function(event) {
            event.preventDefault()
        
            var values =  $(this).serialize()
        
            var posting = $.post('/item_model_characteristics', values)
        
            posting.done(function (data){
                $("#characteristic-form").empty()
                $("#new-characteristic").show()
                
                itemModelShow.asyncCharacteristicList()
            })
        })
    }

    asyncCharacteristicList() {

    }



    characteristicList() {
        var itemModelShow = this
        $("#sort-review").on("click", function (e) {
            itemModelShow.sortButton(this)
        })
        $("#sort-count").on("click", function(e) {
            itemModelShow.sortButton(this)
        })
    }

    singleCharacteristic(element) {

    }

    sortButton (button) {
        var itemModelShow = this
        $("#characteristic-list").empty()
        var item_model_id = itemModelShow.id
        var sort = $(button).data("sort")
        var characteristicListHTML = ""
        //need to make a request take the data and render some stuffs
        $.get(`/item_models/${item_model_id}/item_model_characteristics/${sort}`, function(data) {
            //loop through the results and create pages
            data.forEach((element, index) => {
                debugger
                characteristicListHTML += itemModelShow.singleCharacteristic(element)
            })
            
            //"<%=j(render partial: 'item_models/char_display', locals: {item_model_characteristics: @item_model_characteristics})%>"
            
            $("#characteristic-list").html(characteristicListHTML)
            //refresh page datas
            itemModelReset()
        })
    }
}


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


//function associated with Item Model Show



function itemModelShowCharacteristicFormShow() {//done
    var item_model_id = itemModelId()
    
    $("#new-characteristic").on("click", function(e){
        $.ajax({
            url: '/item_models/'+ item_model_id +'/item_model_characteristics/new',
            dataType: 'script'
        })
        $("#new-characteristic").hide()
    })
} 

function itemModelShowCharacteristicList() {//done
    $("#sort-review").on("click", function (e) {
        itemModelShowSortButton(this)
    })
    $("#sort-count").on("click", function(e) {
        itemModelShowSortButton(this)
    })
}

function itemModelReset() {
    itemModelShowCharacteristicFormShow()
    itemModelShowRatingUpdate()
}

function itemModelShowSortButton (button) {//done
    $("#characteristic-list").empty()
    item_model_id = itemModelId()
    var sort = $(button).data("sort")
    $.ajax({
        url: '/item_models/' + item_model_id + '/item_model_characteristics/' + sort,
        dataType: 'script'
    })
}

function itemModelShowRatingUpdate() {
    //adds the on click to all of the radio rating buttons
    $("[id^='rating-button']").each((index, element) => {
        
        var imc_id = $(element).data("imc")
        $(element).on("click", function () {
            itemModelShowRatingDescToggle(imc_id)
        })
        itemModelShowRatingFormSubmit(imc_id)    
    })
}

function itemModelShowRatingFormSubmit(imc_id) {
    rating_form = $('#rating-form-for-'+imc_id)

    rating_form.submit(function(event) {
        event.preventDefault()
    
        var values =  $(this).serialize()
        rating_id = itemModelShowRatingId(imc_id)
        
        if (rating_id) {
            var posting = $.ajax('/ratings/'+rating_id,{
                type: 'PATCH',
                data: values
            })
        } else {
            var posting = $.post('/ratings', values)
        }
    
        posting.done(function (data){
            $("#sort-review").click()
        })
    })
}

function itemModelShowRatingId(imc_id) {
    return $('*[data-rating-id-'+imc_id+']').attr("data-rating-id-"+imc_id)
}

function itemModelShowRatingDescToggle(imc_id) {
    if ($('#rating-description-'+imc_id).is(":hidden")) {
        $('#rating-description-'+imc_id).attr("hidden", false)
    } else {
        $('#rating-description-'+imc_id).attr("hidden", true)
    }
    
}



$(document).on('turbolinks:load', function () {
    if  ($(".item_models.show").length) {
        var itemModelShow = new ItemModelShow ()
        itemModelShow.characteristicFormShow()
        
    } else if ($(".item_categories.show").length){
        
    }
})

