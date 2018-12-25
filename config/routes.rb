Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#home'
  resources :users
  
  get '/signin' => 'sessions#new'
  post '/sessions' => 'sessions#create'
  delete '/signout' => 'sessions#destroy'

  resources :activities do
    resources :item_categories, name_prefix: "activity_"
  end
  
  resources :item_categories do
    resources :item_models, name_prefix: "item_category_"
  end

  resources :item_models

  resources :item_model_characteristics, only: [:new, :create, :show] do
    resources :ratings, name_prefix: "item_model_characteristic_"
  end

  resources :characteristics
  
  resources :ratings

  
  get 'auth/google_oauth2/callback' => 'sessions#create'

  get 'google_login', to: redirect("/auth/google_oauth2")
end
