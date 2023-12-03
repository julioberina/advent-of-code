require "set"

$input = File.read(File.dirname(__FILE__) + "/input.txt").split("\n")
$num_ranges = {}

def is_symbol?(str)
  return !(str.match(/\d/) || str == ".")
end

def part1
  r = $input.length
  c = $input[0].length

  symbol_ranges = Set.new

  $input.each_with_index do |input, i|
    num = ""
    ri = nil, rj = nil

    c.times do |j|
      if input[j].match(/\d/)
        num += input[j]
        ri = (i * c + j) if rj.nil?
        rj = (i * c + j)
      else
        if !num.empty?
          $num_ranges[ri..rj] = num.to_i
        end

        num = ""
        ri = rj = nil
      end
    end

    if !num.empty?
      $num_ranges[ri..rj] = num.to_i
    end
  end

  $input.each_with_index do |input, i|
    c.times do |j|
      if is_symbol?(input[j])
        ((i-1)..(i+1)).to_a.each do |a|
          next if a < 0 || a >= r

          ((j-1)..(j+1)).to_a.each do |b|
            next if b < 0 || b >= c
            rng = a * c + b
            numrng = $num_ranges.keys.select { |numr| numr.include? rng }[0]
            symbol_ranges << numrng if numrng
          end
        end
      end
    end
  end

  puts symbol_ranges.to_a.map { |s| $num_ranges[s] }.inject(:+)
end

def part2
  r = $input.length
  c = $input[0].length
  symbol_sum = 0

  $input.each_with_index do |input, i|
    c.times do |j|
      if is_symbol?(input[j]) && input[j] == "*"
        symbol_ranges = Set.new

        ((i-1)..(i+1)).to_a.each do |a|
          next if a < 0 || a >= r

          ((j-1)..(j+1)).to_a.each do |b|
            next if b < 0 || b >= c
            rng = a * c + b
            numrng = $num_ranges.keys.select { |numr| numr.include? rng }[0]
            symbol_ranges << numrng if numrng
          end
        end

        if symbol_ranges.length == 2
          symbol_sum += symbol_ranges.to_a.map { |s| $num_ranges[s] }.inject(:*)
        end
      end
    end
  end

  puts symbol_sum
end

part1
part2