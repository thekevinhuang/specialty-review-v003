class ActivitiesController < ApplicationController
    before_action :require_log_in
    protect_from_forgery :except => [:new, :index]
    
    def show
        @activity = Activity.find_by(id: params[:id])
        respond_to do |format|
            format.js {render 'show.js'}
            format.html {render 'show.html'}
            format.json {render json:@activity, include: 'item_categories'}
        end
    end

    def new
        if !@activity
            @activity = Activity.new
        end
    end

    def create
        @activity = Activity.new(activity_params)
        if @activity.save
            render json: @activity, status: 201
        else
            render :index
        end
    end

    def destroy

    end

    def index
        @activities = Activity.all
        
        respond_to do |format|
            format.js {render 'index.js', :layout =>false }
            format.html {render 'index.html'}
            format.json {render json: @activities}
        end
    end

    private

    def activity_params
        params.require(:activity).permit(:name, :description)
    end
end