def tally_str(str)
    result = []
    prev = str[0]
    cnt = 0

    str.each_char do |c|
        if prev == c
            cnt += 1
        else
            result << prev << cnt
            cnt = 1
        end

        prev = c
    end

    result << prev << cnt

    return result
end

total = 0
file = File.open("./day4.txt", "w")

372037.upto(905157) do |num|
    puts num
    orig = num
    num = num.to_s.split("").map(&:to_i)
    has_consecutive_ints = false
    is_non_descending = false

    num.each_with_index do |digit, index|
        if index == num.length - 1
            is_non_descending = true
        else
            if digit > num[index+1]
                break
            elsif digit == num[index+1]
                has_consecutive_ints = true
            end
        end
    end

    if has_consecutive_ints && is_non_descending
        total += 1
        file.puts orig
    end
end

puts total
file.close

File.open("./day4.txt", "r") do |f|
    passwords = f.readlines.map(&:chomp)
    total = 0

    passwords.each do |pword|
        digit_count = tally_str(pword)
        fits_criteria = true

        (digit_count.length - 1).step(1, -2) do |i|
            if digit_count[i] == 2
                fits_criteria = true
                break
            elsif digit_count[i] > 2
                fits_criteria = false
            end
        end

        if fits_criteria then total += 1 end
    end

    puts total
end