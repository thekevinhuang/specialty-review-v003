Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#home'
  resources :users
  
  get '/signin' => 'sessions#new'
  post '/sessions' => 'sessions#create'
  delete '/signout' => 'sessions#destroy'

  get '/item_categories/:id/item_model_list' => 'item_models#listByRating'
  get '/item_models/:id/item_model_characteristics/new' => 'item_model_characteristics#new'
  get '/item_models/:id/item_model_characteristics/:sort' => 'item_model_characteristics#sorted_characteristic_list'
  get '/item_model_characteristics/:imc_id/curr_user_rating' => 'ratings#show_from_parents'

  resources :activities do
    resources :item_categories, name_prefix: "activity_"
  end
  
  resources :item_categories do
    resources :item_models, name_prefix: "item_category_"
  end

  resources :item_models

  resources :item_model_characteristics, only: [:new, :create, :show, :index] do
    resources :ratings, name_prefix: "item_model_characteristic_"
  end

  resources :characteristics
  
  resources :ratings

  
  get 'auth/google_oauth2/callback' => 'sessions#create'

  get 'google_login', to: redirect("/auth/google_oauth2")
end
