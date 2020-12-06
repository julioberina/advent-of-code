File.open('day6.txt', 'r') do |file|
    sum_counts = 0
    everyone = 0
    people = 0
    yes_questions = Hash.new(0)

    file.each_line do |line|
        line = line.chomp

        if line.empty?
            sum_counts += yes_questions.length
            yes_questions.each { |k, v| everyone += 1 if v == people }
            yes_questions = Hash.new(0)
            people = 0
        else
            line.each_char { |question| yes_questions[question] += 1 }
            people += 1
        end
    end

    puts sum_counts
    puts everyone
end