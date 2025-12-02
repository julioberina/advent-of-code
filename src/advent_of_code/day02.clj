(ns advent-of-code.day02
  (:require [clojure.java.io :as io]
            [clojure.string :as s]
            [advent-of-code.utils :as u]))

(def input (slurp (io/resource "day02.txt")))

(defn spread-range [range-str]
  (let [rangev (map bigint (s/split range-str #"-"))]
    (range (first rangev) (+' (last rangev) 1N))))

(defn partition-str [num-str p]
  (let [n (count num-str)
        rng-end (inc (- n p))]
    (map #(subs num-str % (+ p %)) (range 0 rng-end p))))

;; Invalid IDs have a sequence repeated exactly twice
(defn invalid-id? [id]
  (let [sid (str id)
        n (count sid)
        half-n (quot n 2)]
    (= (subs sid 0 half-n) (subs sid half-n n))))

;; Deep Invalid IDs have a sequence repeated at least twice
(defn deep-invalid-id? [id]
  (let [sid (str id)
        n (count sid)
        invalid (atom false)]

    (doseq [p (u/factors n)]
      (let [plist (partition-str sid p)
            pseq (first plist)]

        (if (every? #(= % pseq) plist)
          (reset! invalid true))))

    @invalid))

(defn sum-up-invalid-ids [data invalid-id-fn]
  (->> data
       (map spread-range)
       flatten
       (filter invalid-id-fn)
       (reduce +')))

(defn part-1 [data]
  (sum-up-invalid-ids data invalid-id?))

(defn part-2 [data]
  (sum-up-invalid-ids data deep-invalid-id?))


(defn solve []
  (let [data (s/split input #",")]
    (println "Part 1:" (part-1 data))
    (println "Part 2:" (part-2 data))))