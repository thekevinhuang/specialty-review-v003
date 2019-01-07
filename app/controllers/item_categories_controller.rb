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
            render json: @item_category, status: 201
        else
            render :new
        end
    end

    def show
        @item_category = ItemCategory.find_by(id: params[:id])
        respond_to do |format|
            format.html {render :show}
            format.json {render json: @item_category, include: 'item_models'}
        end
    end

    def index
        @item_categories = ItemCategory.all

        respond_to do |format|
            format.html {render :index}
            format.json {render json:@item_categories}
        end
        
    end

    private

    def item_category_params
        params.require(:item_category).permit(:name, :description)
    end

end