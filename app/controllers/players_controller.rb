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
        leaderboard = Leaderboard.first
        player = Player.create(username: params[:username], email: params[:email], total_score: 0, highest_score: 0, leaderboard_id: leaderboard.id)
    end 

    def edit
        player = Player.find_by(id: params[:id])
        player.username = params[:username]
        player.save
    end 

    def increase_score
        player = Player.find_by(id: params[:id])
        player.total_score += params[:score]
        player.save
    end 

    def update_high_score
        player = Player.find_by(id: params[:id])
        if params[:score] > player.highest_score
            player.highest_score = params[:score]
            player.save
        end 
    end 
end
