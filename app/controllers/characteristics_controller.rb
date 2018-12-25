class CharacteristicsController < ApplicationController
    before_action :require_log_in

    def new
        @characteristic = Characteristic.new
    end

    def create
        @characteristic = Characteristic.find_or_initialize_by(name: characteristic_params[:name])
        
        @characteristic.description = characteristic_params[:description]

        if @characteristic.save
            redirect_to characteristic_path(@characteristic)        
        else
            render :new
        end

    end

    def show
        @characteristic = Characteristic.find_by(id: params[:id])
    end

    private

    def characteristic_params
        params.require(:characteristic).permit(:name, :description)
    end
end