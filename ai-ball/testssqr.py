import json
import pandas as pd
from collections import Counter
import random


class TrendAwareLotteryPredictor:
    def __init__(self, data):
        # 传入DataFrame，包含 R1-R6, B 列
        self.red_data = data[["R1", "R2", "R3", "R4", "R5", "R6"]].astype(int).values
        self.blue_data = data["B"].astype(int).values

        # 统计全部红球次数
        self.all_red = self.red_data.flatten()
        self.red_counts = Counter(self.all_red)

        # 分类冷号 温号 热号
        self.cold_red = [num for num, cnt in self.red_counts.items() if cnt <= 2]
        self.warm_red = [num for num, cnt in self.red_counts.items() if 3 <= cnt <= 4]
        self.hot_red = [num for num, cnt in self.red_counts.items() if cnt >= 5]

        # 判断温号的升温趋势（最近10期出现频率≥3视为升温）
        recent_10 = self.red_data[-10:].flatten()
        recent_counts = Counter(recent_10)
        self.rising_warm = [num for num in self.warm_red if recent_counts[num] >= 3]

    def generate_red(self):
        last_reds = list(self.red_data[-1])  # 上一期红球
        candidates = []

        # 1. 保留1~2个重号(从上期红球中选)
        keep_count = random.choice([1, 2])
        keep = random.sample(last_reds, keep_count)
        candidates.extend(keep)

        # 2. 优先加入升温温号，最多2个
        warm_pool = [n for n in self.rising_warm if n not in candidates]
        warm_needed = min(2, 6 - len(candidates))
        if warm_pool and warm_needed > 0:
            candidates.extend(
                random.sample(warm_pool, min(warm_needed, len(warm_pool)))
            )

        # 3. 加入热号池，最多2个
        hot_pool = [n for n in self.hot_red if n not in candidates]
        hot_needed = min(2, 6 - len(candidates))
        if hot_pool and hot_needed > 0:
            candidates.extend(random.sample(hot_pool, min(hot_needed, len(hot_pool))))

        # 4. 加入冷号池，最多1个
        cold_pool = [n for n in self.cold_red if n not in candidates]
        cold_needed = min(1, 6 - len(candidates))
        if cold_pool and cold_needed > 0:
            candidates.extend(
                random.sample(cold_pool, min(cold_needed, len(cold_pool)))
            )

        # 5. 补足6个号码（1-33之间，不重复）
        while len(candidates) < 6:
            pick = random.randint(1, 33)
            if pick not in candidates:
                candidates.append(pick)

        # 6. 控制同尾号不超过3个
        tails = [n % 10 for n in candidates]
        tail_counter = Counter(tails)
        while max(tail_counter.values()) > 3:
            bad_tail = tail_counter.most_common(1)[0][0]
            # 替换一个尾号为bad_tail的数字
            for i in range(len(candidates) - 1, -1, -1):
                if candidates[i] % 10 == bad_tail:
                    # 找新数字，尾号不同且不重复
                    replace_candidates = [
                        x
                        for x in range(1, 34)
                        if x % 10 != bad_tail and x not in candidates
                    ]
                    if replace_candidates:
                        candidates[i] = random.choice(replace_candidates)
                        break
            tails = [n % 10 for n in candidates]
            tail_counter = Counter(tails)

        # 7. 控制连号不超过2对（连续数字对）
        candidates.sort()

        def count_consecutive_pairs(nums):
            count = 0
            for i in range(len(nums) - 1):
                if nums[i + 1] - nums[i] == 1:
                    count += 1
            return count

        while count_consecutive_pairs(candidates) > 2:
            # 替换最后一个数字，确保不连续
            last = candidates[-1]
            replace_candidates = [
                x
                for x in range(1, 34)
                if x not in candidates and all(abs(x - c) > 1 for c in candidates)
            ]
            if replace_candidates:
                candidates[-1] = random.choice(replace_candidates)
                candidates.sort()
            else:
                break

        return sorted(candidates)

    def generate_blue(self):
        # 最近5期蓝球随机
        recent_blues = list(self.blue_data[-5:])
        if recent_blues:
            return int(random.choice(recent_blues))
        else:
            return random.randint(1, 16)

    def predict(self, n=5, include_blue=False):
        results = []
        for _ in range(n):
            red = self.generate_red()
            if include_blue:
                blue = self.generate_blue()
                results.append(red + [blue])
            else:
                results.append(red)
        return results


# 示例用法
if __name__ == "__main__":
    with open("s50.json", "r") as f:
        raw_data = json.load(f)
    df = pd.DataFrame(raw_data, columns=["R1", "R2", "R3", "R4", "R5", "R6", "B"])
    predictor = TrendAwareLotteryPredictor(df)
    recs = predictor.predict(10, include_blue=False)
    for i, rec in enumerate(recs, 1):
        print(f"推荐号码 {i}: {[int(x) for x in rec]}")
