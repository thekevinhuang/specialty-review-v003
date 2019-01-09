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


//function sassociated with Item Model Show

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

function itemModelShowCharacteristicList() {
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

function itemModelShowSortButton (button) {
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
        itemModelShowCharacteristicList()
        itemModelReset()
    } else if ($(".item_categories.show").length){
        
    }
})

