import json
import pandas as pd
import numpy as np
from collections import Counter
import random

# 读取数据
with open("s50.json", "r", encoding="utf-8") as f:
    data = json.load(f)

df = pd.DataFrame(data)
df.columns = ["R1", "R2", "R3", "R4", "R5", "R6", "B"]
for col in df.columns:
    df[col] = df[col].astype(int)

reds_df = df[["R1", "R2", "R3", "R4", "R5", "R6"]]
blues = df["B"]

# 最近20期用于冷热统计
recent_20 = reds_df.tail(20)
red_counts = Counter()
for row in recent_20.values:
    red_counts.update(row)

# 共现矩阵（备用）
co_occur = np.zeros((34, 34), dtype=int)
for row in reds_df.values:
    for i in range(6):
        for j in range(i + 1, 6):
            co_occur[row[i]][row[j]] += 1
            co_occur[row[j]][row[i]] += 1


# 尾数函数
def tail(num):
    return num % 10


# 带冷热分析的预测
def generate_predictions_with_logic(n=5):
    results = []
    last_row = list(reds_df.iloc[-1])
    hot_nums = [num for num, _ in red_counts.most_common(12)]
    cold_nums = [num for num, _ in red_counts.most_common()][-12:]

    for _ in range(n):
        prediction = []

        # 与上一期重复的热号（1~2个）
        repeats = list(set(last_row) & set(hot_nums))
        if repeats:
            prediction.extend(
                random.sample(repeats, min(len(repeats), random.choice([1, 2])))
            )

        # 添加热号
        remaining_hot = [n for n in hot_nums if n not in prediction]
        prediction.extend(random.sample(remaining_hot, min(3, 6 - len(prediction))))

        # 补冷号
        remaining_cold = [n for n in cold_nums if n not in prediction]
        need = 6 - len(prediction)
        if need > 0:
            prediction.extend(
                random.sample(remaining_cold, min(need, len(remaining_cold)))
            )

        # 尾数去同
        tails = [tail(n) for n in prediction]
        if len(set(tails)) == 1:
            alt_pool = [
                i for i in range(1, 34) if tail(i) != tails[0] and i not in prediction
            ]
            if alt_pool:
                prediction[-1] = random.choice(alt_pool)

        prediction = sorted([int(x) for x in prediction])

        # 补蓝球
        blue = random.randint(1, 16)
        results.append(prediction + [blue])

    return results


if __name__ == "__main__":
    n = 10  # 生成多少组预测
    predictions = generate_predictions_with_logic(n)

    print("预测结果：")
    for i, group in enumerate(predictions, 1):
        red_balls = group[:6]
        blue_ball = group[6]
        print(f"{i}: {red_balls} {blue_ball}")
