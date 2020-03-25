class LeaderboardsController < ApplicationController
    def index
        leaderboards = Leaderboard.all 
        render json: leaderboards
    end 

    def show
        leaderboard = Leaderboard.find_by(id: params[:id])
        render json: leaderboard
    end 
end
