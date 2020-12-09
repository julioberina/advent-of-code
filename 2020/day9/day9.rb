require 'set'

File.open('day9.txt', 'r') do |file|
    ln = 1
    numbers = []
    cont = []
    sums = Hash.new(0)

    file.each_line do |line|
        line = line.to_i
        cont << line

        if ln <= 25
            numbers.each { |num| sums[(num + line)] += 1 }
            numbers << line
        else
            if sums[line].zero?
                puts line
                break
            end

            diff = numbers.shift

            numbers.each do |num|
                sums[(num + diff)] -= 1
                sums[(num + line)] += 1
            end

            numbers << line
        end

        ln += 1
    end

    first_answer = cont.pop

    2.upto(cont.length) do |len|
        break_loop = false

        ((cont.length + 1) - len).times do |i|
            range = cont[i, len]

            if range.inject(:+) == first_answer
                puts "#{range.min + range.max}"
                break_loop = true
                break
            end
        end

        break if break_loop
    end
end