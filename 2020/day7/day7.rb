require 'set'

File.open('day7.txt', 'r') do |file|
    direct_gold = Set.new
    dead_end = Set.new
    gold_paths = Hash.new
    total_paths = 0
    individual_bags = 0

    file.each_line do |line|
        current_bag = ''
        bag_contained = ''
        seen_contain = false
        quantity = 0

        line.scan(/\w+/) do |item|
            if item == 'contain'
                seen_contain = true
                gold_paths[current_bag] = {}
            elsif item.match(/\d+/)
                bag_contained = ''
                quantity = item.to_i
            elsif item == 'bag' || item == 'bags'
                current_bag.strip!
                bag_contained.strip!
                direct_gold << bag_contained if seen_contain && bag_contained == 'shiny gold'
                gold_paths[current_bag][bag_contained] = quantity if seen_contain
            elsif item == 'no'
                gold_paths[current_bag] = nil
                dead_end << current_bag
                break
            else
                item += ' '
                if seen_contain then bag_contained += item else current_bag += item end
            end
        end

        current_bag = ''
        bag_contained = ''
        seen_contain = false
        quantity = 0
    end

    gold_paths.each do |k, v|
        #puts "#{k} => #{v}"
        next if v.nil?
        bags = v.keys

        until bags.empty?
            bag = bags.shift

            if direct_gold.include? bag
                total_paths += 1
                break
            elsif dead_end.include? bag
                next
            else
                bags += gold_paths[bag].keys
            end
        end
    end

    puts total_paths

    sgb = []
    gold_paths['shiny gold'].each { |k, v| sgb += ([k] * v) }

    until sgb.empty?
        individual_bags += sgb.length
        level_length = sgb.length

        level_length.times do |i|
            unless dead_end.include? sgb[i]
                gold_paths[sgb[i]].each { |k, v| sgb += ([k] * v) }
            end
        end

        level_length.times { sgb.shift }
    end

    puts individual_bags
end