File.open("./day2.txt", "r") do |file|
    intcode = file.readline.split(",").map(&:to_i)
    iccopy = intcode.dup
    intcode[1] = 12
    intcode[2] = 2
    
    0.step(intcode.length, 4) do |i|
        if intcode[i] == 99
            break
        elsif intcode[i] == 1
            intcode[intcode[i+3]] = intcode[intcode[i+1]] + intcode[intcode[i+2]]
        elsif intcode[i] == 2
            intcode[intcode[i+3]] = intcode[intcode[i+1]] * intcode[intcode[i+2]]
        end
    end

    puts intcode[0]

    0.upto(99) do |noun|
        0.upto(99) do |verb|
            intcode = iccopy.dup
            intcode[1] = noun
            intcode[2] = verb

            0.step(intcode.length, 4) do |i|
                if intcode[i] == 99
                    break
                elsif intcode[i] == 1
                    intcode[intcode[i+3]] = intcode[intcode[i+1]] + intcode[intcode[i+2]]
                elsif intcode[i] == 2
                    intcode[intcode[i+3]] = intcode[intcode[i+1]] * intcode[intcode[i+2]]
                end
            end

            puts "100 * #{noun} + #{verb} = #{100 * noun + verb}" if intcode[0] == 19690720
        end
    end
end