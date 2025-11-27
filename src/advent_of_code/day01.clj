(ns advent-of-code.day01
  (:require [clojure.java.io :as io]
            [clojure.string :as s]
            [advent-of-code.utils :as u]))

(def input (slurp (io/resource "day01.txt")))

(defn part-1 [data]
  (count data))

(defn part-2 [data]
  (* 2 (count data)))

(defn solve []
  (let [data (s/split-lines input)]
    (println "Part 1:" (part-1 data))
    (println "Part 2:" (part-2 data))))