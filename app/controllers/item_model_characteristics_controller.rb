class ItemModelCharacteristicsController < ApplicationController
    before_action :require_log_in
    
    def show
        @item_model_characteristic = ItemModelCharacteristic.find_by(id: params[:id])
    end
    
    def new
    end

    def create

        @item_model = ItemModel.find_by(id: params["item_model"]["id"])
        if @item_model
            if !params["item_model_characteristic"]["characteristic_id"].empty?
                @characteristic = Characteristic.find_by(id: params["item_model_characteristic"]["characteristic_id"])
            else
                @characteristic = Characteristic.find_or_initialize_by(name: params["characteristic"]["name"])
                if !@characteristic.id?
                    @characteristic.description = params["characteristic"]["description"]
                end
            end

            if @characteristic.save
                imchar = ItemModelCharacteristic.new(item_model_id: @item_model.id, characteristic_id: @characteristic.id)
                imchar.save
                redirect_to item_model_path(@item_model)

            else
                redirect_to item_model_path(@item_model)
            end
        else
            redirect_to root_path
        end
        
    end

end