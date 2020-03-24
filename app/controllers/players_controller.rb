class PlayersController < ApplicationController
    def index
        players = Player.all 
        render json: players, except: [:created_at, :updated_at]
    end 

    def show
        player = Player.find_by(id: params[:id])
        render json: player, except: [:created_at, :updated_at]
    end 

    def create 
        player = Player.create(username: params[:username], email: params[:email], wins: 0, losses: 0, leaderboard_id: Leaderboard.first)

    end 

    def edit
        player = Player.find_by(id: params[:id])
        player.username = params[:username]
        player.save
    end 

    def addWin 
        player = Player.find_by(id: params[:id])
        player.wins += 1
        player.save
    end 

    def update
        player = Player.find_by(id: params[:id])
        player.losses += 1
        player.save
    end 



end
