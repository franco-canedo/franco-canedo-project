class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :username
      t.string :email
      t.integer :total_score
      t.integer :highest_score
      t.integer :leaderboard_id
      

      t.timestamps
    end
  end
end
