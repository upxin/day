import json
import pandas as pd
import numpy as np
from collections import Counter, defaultdict
import random


class DLTAnalyzerPredictor:
    def __init__(self, data, recent_period=15):
        """
        data: list of dict or list, 每期号码包含7个数字，前5为红球（1-35），后2为蓝球（1-12）
        recent_period: 统计冷热温基于最近多少期数据
        """
        self.df = pd.DataFrame(data)
        # 确保数据是int类型
        self.df = self.df.astype(int)
        # 只用最近recent_period期
        self.recent_df = self.df.tail(recent_period)

        # 红球和蓝球分开
        self.red_balls = self.recent_df.iloc[:, :5].values.flatten()  # 前5列红球
        self.blue_balls = self.recent_df.iloc[:, 5:].values.flatten()  # 后2列蓝球

        self.red_counter = Counter(self.red_balls)
        self.blue_counter = Counter(self.blue_balls)

        self.total_red = len(self.red_balls)
        self.total_blue = len(self.blue_balls)

        # 统计红球出现频率
        self.red_freq = {
            num: count / self.total_red for num, count in self.red_counter.items()
        }
        self.blue_freq = {
            num: count / self.total_blue for num, count in self.blue_counter.items()
        }

        # 按出现频率排序
        self.red_sorted = sorted(
            self.red_freq.items(), key=lambda x: x[1], reverse=True
        )
        self.blue_sorted = sorted(
            self.blue_freq.items(), key=lambda x: x[1], reverse=True
        )

        # 设定冷热温阈值 (你可以调)
        self.red_hot_thresh = 0.06
        self.red_cold_thresh = 0.02
        self.blue_hot_thresh = 0.06
        self.blue_cold_thresh = 0.02

        self.red_hot, self.red_warm, self.red_cold = self._classify_nums(
            self.red_freq, self.red_hot_thresh, self.red_cold_thresh
        )
        self.blue_hot, self.blue_warm, self.blue_cold = self._classify_nums(
            self.blue_freq, self.blue_hot_thresh, self.blue_cold_thresh
        )

    def _classify_nums(self, freq_dict, hot_thresh, cold_thresh):
        hot = [num for num, freq in freq_dict.items() if freq >= hot_thresh]
        cold = [num for num, freq in freq_dict.items() if freq <= cold_thresh]
        warm = [num for num in range(1, 36) if num not in hot and num not in cold]
        # 对蓝球，范围是1~12，需特别处理
        if max(freq_dict.keys()) <= 12:
            warm = [num for num in range(1, 13) if num not in hot and num not in cold]
        return hot, warm, cold

    def _check_same_tail(self, nums):
        tails = [n % 10 for n in nums]
        tail_count = Counter(tails)
        # 最大同尾号数量不超过3
        return max(tail_count.values()) <= 3

    def _check_repeat_numbers(self, last_period_reds, candidate_reds):
        # 限制与上一期红球重复号不超过3个
        common = set(last_period_reds) & set(candidate_reds)
        return len(common) <= 3

    def predict_red(self, last_reds):
        """
        预测红球，基于冷热温号比例随机组合，
        并且限制重号和同尾号数量
        """
        max_trials = 100
        for _ in range(max_trials):
            candidate = []
            # 分配红球比例(可调)
            # 例如：2热+2温+1冷
            hot_count = 2
            warm_count = 2
            cold_count = 1

            candidate += random.sample(self.red_hot, min(hot_count, len(self.red_hot)))
            candidate += random.sample(
                self.red_warm, min(warm_count, len(self.red_warm))
            )
            candidate += random.sample(
                self.red_cold, min(cold_count, len(self.red_cold))
            )

            # 若总数不足5，随机补足
            while len(candidate) < 5:
                num = random.randint(1, 35)
                if num not in candidate:
                    candidate.append(num)
            candidate = sorted(candidate)

            # 约束：同尾号不超过3，且与上一期重复号不超过3
            if self._check_same_tail(candidate) and self._check_repeat_numbers(
                last_reds, candidate
            ):
                return candidate

        # 如果尝试多次失败，直接返回随机红球（保证5个不重复）
        return sorted(random.sample(range(1, 36), 5))

    def predict_blue(self):
        """
        预测蓝球，采用1热+1冷组合，保证不重复
        """
        candidate = []
        if self.blue_hot:
            candidate.append(random.choice(self.blue_hot))
        if self.blue_cold:
            cold_choice = random.choice(self.blue_cold)
            if cold_choice not in candidate:
                candidate.append(cold_choice)

        # 只要一个蓝球，随机选一个
        if candidate:
            return random.choice(candidate)
        else:
            return random.randint(1, 12)

    def predict_next(self, n=5):
        """
        预测下一期号码，n为推荐组合数
        """
        results = []
        last_reds = self.df.iloc[-1, :5].tolist()

        for _ in range(n):
            red = self.predict_red(last_reds)
            blue = self.predict_blue()
            results.append({"red": red, "blue": blue})
        return results


# 读取数据
with open("d50.json", "r", encoding="utf-8") as f:
    data = json.load(f)

predictor = DLTAnalyzerPredictor(data)

# 预测5组号码
preds = predictor.predict_next(5)
print("\n推荐号码：")
for i, rec in enumerate(preds, 1):
    # 转int防止numpy.int64输出问题
    red_str = [int(x) for x in rec["red"]]
    blue_str = int(rec["blue"])
    print(f"推荐{i}: 红球{red_str}  蓝球{blue_str}")
