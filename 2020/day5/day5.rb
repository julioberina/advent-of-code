require 'set'

File.open('day5.txt', 'r') do |file|
    max_seat_id = 0
    mapping = {'F' => 0, 'L' => 0, 'B' => 1, 'R' => 1}
    all_seats = Set.new
    in_file_seats = Set.new

    128.times do |r|
        next if [0, 127].include? r
        8.times { |c| all_seats << (r * 8 + c) }
    end

    file.each_line do |line|
        line = line.chomp.split('').map { |l| mapping[l] }.join('')
        row = line[0, 7].to_i(2)
        column = line[7, 3].to_i(2)
        seat_id = row * 8 + column
        in_file_seats << seat_id
        max_seat_id = seat_id if seat_id > max_seat_id
    end

    puts max_seat_id
    puts all_seats.difference(in_file_seats).inspect
end