require 'set'

# Part 1
File.open('day1.txt', 'r') do |file|
    numbers = Set.new

    file.each_line do |line|
        line = line.to_i
        diff = 2020 - line
        
        if numbers.include? diff
            puts (line * diff)
            break
        else
            numbers << line
        end
    end
end

# Part 2
File.open('day1.txt', 'r') do |file|
    nums = file.readlines.map(&:to_i).to_set

    nums.each do |a|
        nums.each do |b|
            diff = (2020 - a - b)

            if nums.include? diff
                puts a * b * diff
                break
            end
        end
    end
end