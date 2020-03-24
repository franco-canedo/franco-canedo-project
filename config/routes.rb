Rails.application.routes.draw do
  resources :friends
  resources :leaderboards
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post 'players/:id', to: 'players#addWin'
  patch 'players/:id', to: 'players#addLoss'

  
end
