File.open('day2.txt', 'r') do |file|
    valid = 0
    valid2 = 0

    file.each_line do |line|
        line = line.split(': ')
        criteria = line[0].split(' ')
        range = criteria[0]
        letter = criteria[1]
        range = range.split('-').map(&:to_i)
        total = line[1].count(letter)
        position = ((line[1][range[0]-1]) == letter) ^ ((line[1][range[1]-1]) == letter)
        valid += 1 if total >= range[0] && total <= range[1]
        valid2 += 1 if position
    end

    puts valid
    puts valid2
end