class ItemCategoriesController < ApplicationController
    before_action :require_log_in

    def new
        if !@item_category
            @item_category = ItemCategory.new
        end

        if params[:activity_id]
            @activity = Activity.find_by(id: params[:activity_id])
        else
            
        end
    end

    def create
        
        @item_category = ItemCategory.new(item_category_params)
        
        @activity = Activity.find_by(id: params[:parent][:parent_id])
        @item_category.activity = @activity

        if @item_category.save
            redirect_to activity_item_category_path(@activity, @item_category)
        else
            render :new
        end
    end

    def show
        @item_category = ItemCategory.find_by(id: params[:id])
        
    end

    def index

    end

    private

    def item_category_params
        params.require(:item_category).permit(:name, :description)
    end

end