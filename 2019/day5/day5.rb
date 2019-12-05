File.open("./day5.txt", "r") do |file|
    registers = file.readline.split(",").map(&:to_i)
    regs = registers.dup # duplicate to reset registers
    pointer = 0

    # First iteration, Input: 1
    # Second iteration, Input: 5

    2.times do |iteration|
        while true
            temp = registers[pointer].to_s
            opcode = ("0" * (5 - temp.length)) + temp
            op = opcode[-2] + opcode[-1]
            modes = opcode[0, 3].reverse

            if op == "99"
                break
            elsif op == "01"
                a = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                b = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                registers[registers[pointer+3]] = a + b
                pointer += 4
            elsif op == "02"
                a = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                b = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                registers[registers[pointer+3]] = a * b
                pointer += 4
            elsif op == "03"
                print "Input: "
                registers[registers[pointer+1]] = gets.chomp.to_i
                pointer += 2
            elsif op == "04"
                puts (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                pointer += 2
            elsif op == "05"
                param1 = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                param2 = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                pointer = (param1 != 0 ? param2 : pointer + 3)
            elsif op == "06"
                param1 = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                param2 = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                pointer = (param1 == 0 ? param2 : pointer + 3)
            elsif op == "07"
                param1 = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                param2 = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                registers[registers[pointer+3]] = (param1 < param2 ? 1 : 0)
                pointer += 4
            elsif op == "08"
                param1 = (modes[0] == "1" ? registers[pointer+1] : registers[registers[pointer+1]])
                param2 = (modes[1] == "1" ? registers[pointer+2] : registers[registers[pointer+2]])
                registers[registers[pointer+3]] = (param1 == param2 ? 1 : 0)
                pointer += 4
            end
        end

        print "\n" unless iteration == 1
        pointer = 0
        registers = regs
    end
end