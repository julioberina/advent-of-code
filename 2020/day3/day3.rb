File.open('day3.txt', 'r') do |file|
    rows = [0, 0, 0, 0, 0]
    cols = [0, 0, 0, 0, 0]
    rd = [1, 1, 1, 1, 2]
    cd = [1, 3, 5, 7, 1]
    trees = [0, 0, 0, 0, 0]
    grid = file.readlines.map(&:chomp)
    width = grid[0].length
    
    until rows.all? (grid.length-1)
        5.times do |i|
            unless rows[i] == (grid.length-1)
                rows[i] = rows[i] + rd[i]
                cols[i] = (cols[i] + cd[i]) % width
                trees[i] += 1 if grid[rows[i]][cols[i]] == '#'
            end
        end
    end

    puts trees[1] # Part 1
    puts trees.inject(:*) # Part 2
end