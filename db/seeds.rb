# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Leaderboard.destroy_all
# Player.destroy_all
# Friend.destroy_all


leaderboard = Leaderboard.create(name: "Leaderboard")

franco = Player.create(username: "franco", email: "franco@gmail.com", wins: 20, losses: 5, leaderboard_id: leaderboard.id)
ben = Player.create(username: "ben", email: "ben@gmail.com", wins: 15, losses: 5, leaderboard_id: leaderboard.id)
dane = Player.create(username: "dane", email: "dane@gmail.com", wins: 4, losses: 40, leaderboard_id: leaderboard.id)

Friend.create(user_id: franco.id, friend_id: ben.id)
Friend.create(user_id: franco.id, friend_id: dane.id)
Friend.create(user_id: ben.id, friend_id: franco.id)


