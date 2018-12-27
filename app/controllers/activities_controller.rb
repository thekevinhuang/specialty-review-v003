class ActivitiesController < ApplicationController
    before_action :require_log_in
    
    def show
        @activity = Activity.find_by(id: params[:id])
        respond_to do |format|
            format.html {render :show}
            format.json {render json:@activity}
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
            redirect_to activity_path(@activity)
        else
            render :new
        end
    end

    def destroy

    end

    def index
        @activities = Activity.all
        respond_to do |format|
            format.html {render :index}
            format.json {render json: @activities}
        end
    end

    private

    def activity_params
        params.require(:activity).permit(:name, :description)
    end
end