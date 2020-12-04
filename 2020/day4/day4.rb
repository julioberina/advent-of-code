File.open('day4.txt', 'r') do |file|
    data = {}
    valid = 0
    complete = 0

    file.each_line do |line|
        line = line.chomp

        if line.empty?
            if data.size == 8 || (data.size == 7 && data['cid'].nil?)
                valid += 1
                clean = true

                clean = false if data['byr'].to_i < 1920 || data['byr'].to_i > 2002
                clean = false if data['iyr'].to_i < 2010 || data['iyr'].to_i > 2020
                clean = false if data['eyr'].to_i < 2020 || data['eyr'].to_i > 2030
                clean = false if !data['hcl'].match(/^\#[a-zA-Z0-9]{6}$/)
                clean = false if !(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].include? data['ecl'])
                clean = false if !data['pid'].match(/^\d{9}$/)

                unit = data['hgt'][-2, 2]
                data['hgt'][-2, 2] = ''

                if (unit == 'cm' && (data['hgt'].to_i < 150 || data['hgt'].to_i > 193)) ||
                    (unit == 'in' && (data['hgt'].to_i < 59 || data['hgt'].to_i > 76)) ||
                    (unit != 'cm' && unit != 'in')

                    clean = false
                end

                complete += 1 if clean
            end

            data = {}
        else
            line.split(' ').each do |item|
                item = item.split(':')
                data[item[0]] = item[1]
            end
        end
    end

    puts valid
    puts complete
end