class Player < ApplicationRecord
    belongs_to :leaderboard
    has_many :friends
end
