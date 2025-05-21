import json
import pandas as pd
import numpy as np
from collections import Counter
import random

with open("s50.json", "r") as f:
    raw_data = json.load(f)

df = pd.DataFrame(raw_data, columns=["R1","R2","R3","R4","R5","R6","B"])
recent_20 = df.iloc[-20:]

class RecentLotteryPredictor:
    def __init__(self, data):
        self.raw_red = data[["R1", "R2", "R3", "R4", "R5", "R6"]].astype(int).values
        self.raw_blue = data["B"].astype(int).values

        self.all_red = self.raw_red.flatten()
        self.red_counts = Counter(self.all_red)
        self.hot_red = [num for num, cnt in self.red_counts.items() if cnt >= 5]
        self.cold_red = [num for num, cnt in self.red_counts.items() if cnt <= 2]
        self.blue_counts = Counter(self.raw_blue)

    def generate_red(self):
        # 唯一修改点：在最后转换类型
        last_nums = list(self.raw_red[-1])
        candidates = random.sample(last_nums, 1)
        
        hot_pool = [n for n in self.hot_red if n not in candidates]
        candidates += random.sample(hot_pool, min(3, 6-len(candidates)))  # 修复括号
        
        cold_pool = [n for n in self.cold_red if n not in candidates]
        if cold_pool:
            candidates += random.sample(cold_pool, min(2, 6-len(candidates)))
        
        while len(candidates) < 6:
            new_num = random.choice([n for n in range(1,34) if n not in candidates])
            candidates.append(new_num)
        
        tails = [n%10 for n in candidates]
        tail_counter = Counter(tails)
        while max(tail_counter.values()) > 3:
            bad_tail = tail_counter.most_common(1)[0][0]
            replace_candidates = [n for n in range(1,34) if n%10 != bad_tail and n not in candidates]
            if replace_candidates:
                candidates[-1] = random.choice(replace_candidates)
            tails = [n%10 for n in candidates]
            tail_counter = Counter(tails)
        
        return sorted([int(x) for x in candidates])  # 唯一类型转换
    
    def generate_blue(self):
        recent_blues = list(self.raw_blue[-5:])
        return int(random.choice(recent_blues)) if recent_blues else random.randint(1,16)
    
    def predict(self, n=5):
        return [[int(x) for x in self.generate_red()] + [self.generate_blue()] for _ in range(n)]  # 最终转换

# 执行预测
predictor = RecentLotteryPredictor(recent_20)
predictions = predictor.predict(10)

print("优化后的预测结果：")
for i, res in enumerate(predictions, 1):
    print(f"{res[:6]} {res[6]}")
