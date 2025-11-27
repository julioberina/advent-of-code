(ns advent-of-code.core
  (:require [clojure.string :as s]))

(defn -main [& args]
  (let [day (first args)
        ;; Pad single digits with 0 (e.g., "1" -> "01")
        day-str (if (< (count day) 2) (str "0" day) day)
        ;; Construct the symbol: advent-of-code.day01
        ns-symbol (symbol (str "advent-of-code.day" day-str))
        solve-fn (symbol "solve")]

    (try
      ;; Load the namespace dynamically
      (require ns-symbol)
      ;; Find the 'solve' function in that namespace
      (if-let [solver (ns-resolve ns-symbol solve-fn)]
        (do
          (println (str "--- Day " day " ---"))
          (solver)) ;; Execute the function
        (println "Function 'solve' not found in" ns-symbol))

      (catch java.io.FileNotFoundException _
        (println "Namespace for Day" day "not found (checked" ns-symbol ")")))))