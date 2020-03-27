class PlayersController < ApplicationController
    def index
        # players = Player.all 
        # sorted = players.sort_by {|player| player.highest_score}
        lb = Leaderboard.all.first.players.sort_by { |player| player.highest_score }
        render json: lb.reverse, except: [:created_at, :updated_at]
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

    def log_in
        player = Player.find_by(username: params[:username])
        # byebug
        # binding.pry
        if player 
            render json: player
        else 
            render json: {message: "error"}
        end 
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
