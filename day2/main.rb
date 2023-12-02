$input = File.read(File.dirname(__FILE__) + "/input.txt").split("\n")

$cubes = {
  "red" => 12,
  "green" => 13,
  "blue" => 14
}

def part1
  game_id_sum = 0

  $input.each do |input|
    is_valid_game = true
    current_game = input.match(/Game\s\d+\:\s/)[0]
    game_id = current_game.match(/\d+/)[0].to_i
    game = input.sub(current_game, "")
    sets = game.split("; ").map { |set| set.split(", ") }

    sets.each do |set|
      set.each do |cube|
        amount, color = cube.split(" ")
        
        if amount.to_i > $cubes[color]
          is_valid_game = false
          break
        end
      end

      break if !is_valid_game
    end

    game_id_sum += game_id if is_valid_game
  end

  puts game_id_sum
end

def part2
  powers_sum = 0

  $input.each do |input|
    current_game = input.match(/Game\s\d+\:\s/)[0]
    game = input.sub(current_game, "")
    sets = game.split("; ").map { |set| set.split(", ") }

    # Minimum amount of cubes for a valid game
    cube_min = {
      "red" => 0,
      "green" => 0,
      "blue" => 0
    }

    sets.each do |set|
      set.each do |cube|
        amount, color = cube.split(" ")
        cube_min[color] = [cube_min[color], amount.to_i].max
      end
    end

    powers = cube_min.values.inject(:*)
    powers_sum += powers
  end

  puts powers_sum
end

part1
part2