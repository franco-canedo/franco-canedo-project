class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :username
      t.string :email
      t.integer :wins
      t.integer :losses
      

      t.timestamps
    end
  end
end
