class ItemModelCharacteristicsController < ApplicationController
    before_action :require_log_in
    
    def show
        @item_model_characteristic = ItemModelCharacteristic.find_by(id: params[:id])
        respond_to do |format|
            format.html {render :show}
            format.json {render json: @item_model_characteristic, include: ['ratings', 'ratings.user']}
        end
    end
    
    def new
        
        @item_model = ItemModel.find_by(id: params[:id])

        if !@item_model_characteristic
            @item_model_characteristic = ItemModelCharacteristic.new
        end
        
        if !@characteristic
            @characteristic = Characteristic.new
        end

    end

    def index
        @item_model_characteristics = ItemModelCharacteristic.all
        render json: @item_model_characteristics
    end

    def sorted_characteristic_list
        sort = params[:sort]
        @item_model = ItemModel.find_by(id: params[:id])
        @item_model_characteristics = ItemModelCharacteristic.sort_by_param({item_model: @item_model, sort_type: params[:sort]})
        render json: @item_model_characteristics, include: ['ratings', 'characteristic', 'item_model'], methods: [:average_rating, :review_count]
    end

    def create
        @item_model = ItemModel.find_by(id: params["item_model"]["id"])
        if @item_model
            if !params["item_model_characteristic"]["characteristic_id"].empty?
                @characteristic = Characteristic.find_by(id: params["item_model_characteristic"]["characteristic_id"])
                if !@item_model.characteristics.include?(@characteristic)
                    @imchar = ItemModelCharacteristic.new(item_model_id: @item_model.id, characteristic_id: @characteristic.id)
                    @imchar.save 
                end
            else
                @characteristic = Characteristic.find_or_initialize_by(name: params["characteristic"]["name"])
                if !@characteristic.id?
                    @characteristic.description = params["characteristic"]["description"]
                    @characteristic.save
                end
                if !@item_model.characteristics.include?(@characteristic)
                    @imchar = ItemModelCharacteristic.new(item_model_id: @item_model.id, characteristic_id: @characteristic.id)
                    @imchar.save 
                end
            end

            render json: @imchar, status: 201
            
        else
            redirect_to root_path
        end
        
    end

end