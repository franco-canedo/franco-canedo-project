Rails.application.routes.draw do
  resources :friends
  resources :leaderboards
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  patch 'players/:id/increase-score', to: 'players#increase_score'
  patch 'players/:id/highscore', to: 'players#update_high_score'
  post 'players', to: 'players#create'
  patch 'players/:id/edit', to: 'players#edit'

  
end
