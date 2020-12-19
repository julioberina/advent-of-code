$total_ways = {}
$paths = {}

def total_paths(current_jolt, last_jolt)
    if current_jolt == last_jolt
        return 1
    elsif $total_ways[current_jolt]
        return $total_ways[current_jolt]
    else
        if $paths[current_jolt].empty?
            return 0
        else
            total = 0

            $paths[current_jolt].each do |jolt|
                total += total_paths(jolt, last_jolt)
            end

            $total_ways[current_jolt] = total

            return total
        end
    end
end

File.open('day10.txt', 'r') do |file|
    jolts = file.readlines.map do |num|
        num.chomp.to_i
    end.sort

    #puts jolts.inspect

    jolt1 = 0
    jolt3 = 1
    last_jolt = 0
    $paths[0] = []

    jolts.each do |jolt|
        jolt1 += 1 if (jolt - last_jolt) == 1
        jolt3 += 1 if (jolt - last_jolt) == 3

        nums = [jolt-3, jolt-2, jolt-1]

        until nums.empty?
            num = nums.shift
            next if num.negative?
            $paths[num] << jolt if $paths[num]
        end

        $paths[jolt] = []
        last_jolt = jolt
    end

    # nums = [0]

    # until nums.empty?
    #     num = nums.shift
    #     $paths[num].each { |child| nums.push(child) }
    #     total_paths += 1 if num == last_jolt
    # end

    puts (jolt1 * jolt3)
    puts total_paths(0, last_jolt)
end