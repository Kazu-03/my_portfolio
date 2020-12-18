Rails.application.routes.draw do
  devise_for :users

  # devise_scope :users do
  #   get "sign_in", :to => "users/sessions#new"
  #   get "sign_out", :to => "users/sessions#destroy"
  # end

  root 'posts#index'
  resources :blogs, only: [:index,:new, :create, :destroy, :edit, :update, :show] do
  end

  resources :works, only: [:index,:new, :create, :destroy,:edit,:update, :show] do
  end

  resources :abouts, only:[:index] do
  end
end
