class RatingsController <ApplicationController
    before_action :load_rating, only:[:show, :edit, :update]
    before_action :require_log_in

    def new
        
        if params[:item_model_characteristic_id]
            @item_model_characteristic = ItemModelCharacteristic.find_by(id: params[:item_model_characteristic_id])
            @rating = Rating.new
        else
            redirect_to root_path
        end
    end

    def create
        @rating = Rating.new(rating_params)

        if @rating.save
            redirect_to rating_path(@rating)
        else
            redirect_to root_path
        end
    end

    def show
        
    end

    def edit
        @item_model_characteristic = @rating.item_model_characteristic     
    end

    def update
        if @rating.update(rating_params)
            redirect_to rating_path(@rating)
        else
            redirect_to edit_rating_path(@rating)
        end
    end

    private

    def rating_params
        params.require(:rating).permit(:rating, :user_id, :item_model_characteristic_id, :description)
    end

    def load_rating
        @rating = Rating.find_by(id: params[:id])
    end
end