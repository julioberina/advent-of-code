(ns advent-of-code.utils
  (:require [clojure.string :as s]))

;; Helper functions (grid parsing, math, etc.)
(defn str-to-int [s]
  (Integer/parseInt s))

(defn str-list-to-int [strlist]
  (str-to-int (s/join #"" strlist)))

;; Factors of number up to 1/2 (inclusive)
(defn factors [n]
  (filter #(zero? (rem n %)) (range 1 (inc (quot n 2)))))