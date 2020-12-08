require 'set'

File.open('day8.txt', 'r') do |file|
    instructions = file.readlines.map(&:chomp)
    jmpnop = Array.new
    executed = Set.new
    acc = 0
    line = 0

    instructions.each_with_index do |item, ind|
        jmpnop << ind if ['jmp', 'nop'].include? item[0, 3]
    end

    until executed.include? line
        command = instructions[line].split(' ')
        executed << line
        
        if command[0] == 'acc'
            acc += command[1].to_i
            line += 1
        elsif command[0] == 'jmp'
            line += command[1].to_i
        else
            line += 1
        end
    end

    puts acc

    jmpnop.each do |l|
        previous = instructions[l][0, 3]
        instructions[l][0, 3] = {'jmp' => 'nop', 'nop' => 'jmp'}[instructions[l][0, 3]]

        executed = Set.new
        acc = 0
        line = 0

        until (executed.include? line) || line >= 625
            command = instructions[line].split(' ')
            executed << line
            
            if command[0] == 'acc'
                acc += command[1].to_i
                line += 1
            elsif command[0] == 'jmp'
                line += command[1].to_i
            else
                line += 1
            end
        end

        if line == 625
            puts acc
            break
        else
            instructions[l][0, 3] = previous
        end
    end
end