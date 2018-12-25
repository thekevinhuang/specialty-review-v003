class ApplicationController < ActionController::Base
    before_action :current_user
    require 'securerandom'


    def logged_in?
        !!current_user
    end

    private
    
    def require_log_in
        if !logged_in?
            flash[:message] = "You need to be logged in to view that page!"
            redirect_to root_path
        end
    end

    def current_user
        @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end
    helper_method :current_user
end
