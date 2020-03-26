class AddLeaderboardToPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :leaderboard_id, :integer
  end
end
