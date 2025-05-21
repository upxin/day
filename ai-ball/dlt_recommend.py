import json
import pandas as pd
import random
from collections import Counter


def generate_recommendations(df, n_groups=10, red_count=9, blue_count=4):
    # 最近20期红球热度评分
    recent_window = df.iloc[-20:, :5].values.flatten()
    counts_recent = Counter(recent_window)

    # 当前期红球
    current_red = set(df.iloc[-1, :5])

    # 所有红球列表
    all_reds = list(range(1, 36))

    # 构建热度评分表
    heat_scores = []
    for num in all_reds:
        score = counts_recent[str(num).zfill(2)]
        appeared = num in current_red
        heat_scores.append({"红球": num, "热度评分": score, "当前期是否出现": appeared})

    heat_df = pd.DataFrame(heat_scores).sort_values(by="热度评分", ascending=False)

    # 蓝球分析（最近10期出现频率最高的）
    recent_blues = df.iloc[-10:, 5:].values.flatten()
    blue_counter = Counter(recent_blues)
    top_blues = [int(k) for k, _ in blue_counter.most_common(8)]

    results = []
    for _ in range(n_groups):
        hot = heat_df[(~heat_df["当前期是否出现"]) & (heat_df["热度评分"] >= 5)]
        hot_candidates = hot.sample(n=min(5, len(hot)), random_state=None)[
            "红球"
        ].tolist()

        cold_rising = heat_df[(heat_df["热度评分"] <= 2) & (heat_df["当前期是否出现"])]
        rising_candidates = cold_rising.sample(
            n=min(3, len(cold_rising)), random_state=None
        )["红球"].tolist()

        combined = hot_candidates + rising_candidates
        while len(combined) < red_count:
            fallback = (
                heat_df[~heat_df["红球"].isin(combined)].sample(1)["红球"].values[0]
            )
            combined.append(fallback)

        reds = sorted(combined[:red_count])
        blues = sorted(random.sample(top_blues, blue_count))
        results.append({"红球": reds, "蓝球": blues})

    return pd.DataFrame(results)


def main():
    num_recommendations = 3  # 👈 你只需改这一行即可控制生成几条

    with open("d500.json", "r") as f:
        raw = json.load(f)

    df = pd.DataFrame(raw, columns=["R1", "R2", "R3", "R4", "R5", "B1", "B2"])
    df = df.applymap(int)

    result = generate_recommendations(
        df, n_groups=num_recommendations, red_count=9, blue_count=4
    )
    print(f"大乐透推荐 {num_recommendations} 组复试（9+4）号码：\n")
    for idx, row in result.iterrows():
        red_str = " ".join(map(lambda x: str(x).zfill(2), row["红球"]))
        blue_str = " ".join(map(lambda x: str(x).zfill(2), row["蓝球"]))
        print(f"{red_str} : {blue_str}")


if __name__ == "__main__":
    main()
