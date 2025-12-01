(ns advent-of-code.day01
  (:require [clojure.java.io :as io]
            [clojure.string :as s]
            [advent-of-code.utils :as u]))

(def input (slurp (io/resource "day01.txt")))

;; How many 100s (100, 200, 300, ...) to add to bring negative number to range [0, 99].
(defn pack-neg [n]
  (-> (abs n) (/ 100.0) Math/ceil (* 100) int))

;; How many 100s (100, 200, 300, ...) to subtract to bring positive number to range [0, 99].
(defn pack-pos [n]
  (-> n (/ 100.0) Math/floor (* 100) int))

;; Add and subtract but keeping the result within [0-99]
(def rotate-fns {
  "L" (fn [a b]
        (let [c (- a b)]
          (if (neg? c) (+ c (pack-neg c)) c)))
  "R" (fn [a b]
        (let [c (+ a b)]
          (if (>= c 100) (- c (pack-pos c)) c)))})

(defn part-1 [data]
  (let [dial (atom 50)
        password (atom 0)]

    (doseq [rotation data]
      (let [rot-list (s/split rotation #"")
            rot-fn (rotate-fns (first rot-list))
            rot-distance (u/str-list-to-int (rest rot-list))]

        (swap! dial rot-fn rot-distance)
        (if (zero? @dial) (swap! password inc))))

    @password))

(defn part-2 [data]
  (let [dial (atom 50)
        password (atom 0)]

    (doseq [rotation data]
      (let [rot-list (s/split rotation #"")
            rot-fn (rotate-fns (first rot-list))
            rot-distance (u/str-list-to-int (rest rot-list))]

        (if
          (and (= (first rot-list) "L")
               (neg? (- @dial rot-distance))
               (not (zero? @dial)))
          (swap! password + (/ (pack-neg (- @dial rot-distance)) 100)))

        ;; When at 0 and rotation distance is at least 100, we don't want to double count ending back at 0
        ;; We have a check as the last line to add one to password if dial is 0
        ;; ex. Dial 0, L200 should only count 1, not 2
        (if
          (and (= (first rot-list) "L")
               (neg? (- @dial rot-distance))
               (zero? @dial)
               (>= rot-distance 100))
          (do
            (swap! password + (/ (pack-pos rot-distance) 100))
            (if (zero? (rem rot-distance 100)) (swap! password dec))))

        ;; Same as above. We don't want to double count ending back at 0
        ;; ex. Dial 99, R101 should only count 1, not 2.
        (if
          (and (= (first rot-list) "R")
               (> (+ @dial rot-distance) 100))
          (do
            (swap! password + (/ (pack-pos (+ @dial rot-distance)) 100))
            (if (zero? (rem (+ @dial rot-distance) 100)) (swap! password dec))))

        (swap! dial rot-fn rot-distance)
        (if (zero? @dial) (swap! password inc))))

    @password))

(defn solve []
  (let [data (s/split-lines input)]
    (println "Part 1:" (part-1 data))
    (println "Part 2:" (part-2 data))))