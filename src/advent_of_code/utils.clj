(ns advent-of-code.utils
  (:require [clojure.string :as s]))

;; Helper functions (grid parsing, math, etc.)
(defn str-to-int [s]
  (Integer/parseInt s))

(defn str-list-to-int [strlist]
  (str-to-int (s/join #"" strlist)))