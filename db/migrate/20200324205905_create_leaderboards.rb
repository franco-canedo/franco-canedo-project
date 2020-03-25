class CreateLeaderboards < ActiveRecord::Migration[6.0]
  def change
    create_table :leaderboards do |t|
      t.string :name
      t.integer :players

      t.timestamps
    end
  end
end
