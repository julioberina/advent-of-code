$input = File.read(File.dirname(__FILE__) + "/input.txt").split

$num_str_to_int = {
  "oneight" => "18",
  "twone" => "21",
  "threeight" => "38",
  "fiveight" => "58",
  "sevenine" => "79",
  "eightwo" => "82",
  "eighthree" => "83",
  "nineight" => "98",
  "zero" => "0",
  "one" => "1", 
  "two" => "2", 
  "three" => "3", 
  "four" => "4", 
  "five" => "5",
  "six" => "6", 
  "seven" => "7", 
  "eight" => "8", 
  "nine" => "9"
}

def part1
  result = 0

  $input.each do |line|
    nums = line.scan(/\d/).to_a
    result += "#{nums.first}#{nums.last}".to_i
  end

  puts result
end

def part2
  result = 0

  $input.each do |line|

    regex = Regexp.new($num_str_to_int.keys.push("\\d").join("|"))

    items = line.scan(regex).to_a.map do |item|
      $num_str_to_int[item] || item
    end.join("").split("")

    result += "#{items.first}#{items.last}".to_i
  end

  puts result
end

part1
part2