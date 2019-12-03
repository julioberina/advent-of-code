require "set"

File.open("./day3.txt", "r") do |file|
    directions = file.readlines.map(&:chomp).map { |dirs| dirs.split(",") }
    second_wire = false
    marked = Set.new
    smarked = Set.new
    first_steps = [nil]
    second_steps = [nil]
    least = nil
    position = [1, 1]

    directions.each do |d|
        d.each do |path|
            der = path[1, path.length].to_i

            der.times do 
                position[0] -= 1 if path[0] == "L"
                position[0] += 1 if path[0] == "R"
                position[1] -= 1 if path[0] == "D"
                position[1] += 1 if path[0] == "U"

                if second_wire
                    smarked << position.to_s
                    second_steps << position.to_s
                else
                    marked << position.to_s
                    first_steps << position.to_s
                end
            end
        end

        second_wire = !second_wire
        position = [1, 1]
    end

    intersect_manhattan_distance = marked.intersection(smarked).map do |str| 
        arr = eval str
        (arr[0] - 1).abs + (arr[1] - 1).abs
    end

    puts intersect_manhattan_distance.min

    (marked.intersection(smarked)).each do |item|
        temp = first_steps.index(item) + second_steps.index(item)
        least = temp if least.nil? || temp < least
    end

    puts least
end