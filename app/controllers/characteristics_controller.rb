class CharacteristicsController < ApplicationController
    before_action :require_log_in

    def new
        @characteristic = Characteristic.new
    end

    def create
        @characteristic = Characteristic.find_or_initialize_by(name: characteristic_params[:name])
        
        @characteristic.description = characteristic_params[:description]

        if @characteristic.save
            render json: @characteristic, status: 201       
        else
            render :new
        end

    end

    def index
        @characteristics = Characteristic.all
        
        respond_to do |format|
            format.html {:index}
            format.json {render json: @characteristics}
        end
    end

    def show
        @characteristic = Characteristic.find_by(id: params[:id])
        @item_models = @characteristic.item_models

        respond_to do |format|
            format.html {render :show}
            format.json {render json:@item_models}
        end
    end

    private

    def characteristic_params
        params.require(:characteristic).permit(:name, :description)
    end
end