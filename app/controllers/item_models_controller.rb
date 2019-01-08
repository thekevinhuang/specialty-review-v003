class ItemModelsController < ApplicationController
    before_action :require_log_in

    def show
        @item_model = ItemModel.find_by(id: params[:id])
        if !@item_model_characteristic
            @item_model_characteristic = ItemModelCharacteristic.new
        end
        
        if !@characteristic
            @characteristic = Characteristic.new
        end

        respond_to do |format|
            format.html {render :show}
            format.json {render json:@item_model}
        end
    end

    def new
        if !@item_model
            @item_model = ItemModel.new
        end

        if params[:item_category_id]
            @item_category = ItemCategory.find_by(id: params[:item_category_id])
        else
            
        end
    end

    def create
        @item_model = ItemModel.new(item_model_params)
        @item_category = ItemCategory.find_by(id: params[:parent][:parent_id])
        @item_model.item_category = @item_category

        if @item_model.save
            render json: @item_model, status: 201
        else
            render :new
        end
    end

    def listByRating
        item_category_id = params[:id]
        @item_category = ItemCategory.find_by(id: item_category_id)
        @item_model_list = ItemModel.sorted_by_overall_rating_desc(@item_category)
        render json: @item_model_list, include: ['item_model_characteristics', 'item_model_characteristics.ratings']
    end

    private

    def item_model_params
        params.require(:item_model).permit(:name, :description)
    end
end