File.open("./day1.txt", "r") do |f|
    masses = f.readlines.map(&:chomp).map(&:to_i)
    net_fuel = 0

    # Part 1
    puts masses.map { |n| (n / 3.0).floor - 2 }.inject(:+)

    # Part 2
    until masses.empty?
        masses = masses.map { |n| (n / 3.0).floor - 2 }.select(&:positive?)
        net_fuel += masses.inject(:+) unless masses.empty?
    end

    puts net_fuel
end