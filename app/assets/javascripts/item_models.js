//general Item model Show functions

function itemModelId() {
    return $('*[data-item-model-id]').attr("data-item-model-id")
}

function userId() {
    return $('*[data-user-id]').attr("data-user-id")
}
//finish the userID form

//Item Model Show class
class ItemModelShow {
    constructor () {
        this.id = itemModelId()
        this.userId = userId()
        this.characteristicArray = characteristicArray() //borrowed from characteristics.js
        let imcHTMLForm = new IMCForm({parentId:this.id, parentArray:this.characteristicArray})
        this.formHTML = imcHTMLForm.newHTMLForm()
    }

    initializer() {
        //clear out existing form
        $("#characteristic-form").empty()
        //show the new characteristic button
        $("#new-characteristic").show()
        
        //load form click buttons
        this.characteristicFormShow()
        //load sorting buttons
        this.characteristicListSortButton()
        //initial characteristic sort
        $("#sort-review").click()
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
                itemModelShow.initializer()
            })
        })
    }

    asyncCharacteristicList() {

    }



    characteristicListSortButton() {
        var itemModelShow = this
        $("#sort-review").on("click", function (e) {
            itemModelShow.sortButton(this)
        })
        $("#sort-count").on("click", function(e) {
            itemModelShow.sortButton(this)
        })
    }

    singleCharacteristic(element) {
        var itemModelShow = this
        var singleChar = `
            <a href="/characteristics/${element.characteristic.id}">${element.characteristic.name}</a><br>
            Total Number of Reviews: ${element.review_count} <br>
            Average Review: ${element.average_rating} <br>
            <a href="/item_model_characteristics/${element.id}">All reviews for this product's ${element.characteristic.name}</a><br>
            ${itemModelShow.singleRating(element)}
        `
        return singleChar
        //add a single characteristic html
    }

    singleRating(element) {
        var itemModelShow = this
        var rating_id_html = ""
        if (element.rating === undefined || element.rating.length == 0) {
            rating_id_html = `<div data-rating-id-${element.id} = "${element.ratings.id}"></div>`
        }

        var ratingHTML = `
            <form class="rating-form-for-${element.id}" id="rating-form-for-${element.id}">
                <input type="hidden" name="rating[item_model_characteristic_id]" id="rating_item_model_characteristic_id" value = "${element.id}">
                ${rating_id_html}
                <input type="hidden" name="rating[user_id]" id="rating_user_id" value="${itemModelShow.userID}">
                <br>
                <div id="rating-button-${element.id}" data-imc="${element.id}">
                    ${itemModelShow.ratingButtons(element)}
                </div>
            </form>
        `
        return ratingHTML
    }

    ratingButtons (element) {
        var item_buttons = ``
        var i
        for (i=1; i<6; i++) {
            item_buttons +=`
                <input type="radio" value="${i}" name="rating[rating]" id="rating_rating_${i}">
                <label for="rating_rating_${i}">${i}</label>
            `
        }
        $.get(`/item_model_characteristics/${element.id}/curr_user_rating`, function(data) {
            var rating = data.rating
            $(`#rating-form-for-${element.id} #rating_rating_${rating}`).prop("checked", true)
        })
        return item_buttons
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
                characteristicListHTML += itemModelShow.singleCharacteristic(element)
            })
            
            //"<%=j(render partial: 'item_models/char_display', locals: {item_model_characteristics: @item_model_characteristics})%>"
            
            $("#characteristic-list").html(characteristicListHTML)
            
            
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
        itemModelShow.initializer()
        //itemModelReset()
    } else if ($(".item_categories.show").length){
        
    }
})

