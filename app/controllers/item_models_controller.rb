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
            redirect_to item_category_item_model_path(@item_category, @item_model)
        else
            render :new
        end
    end

    private

    def item_model_params
        params.require(:item_model).permit(:name, :description)
    end
end