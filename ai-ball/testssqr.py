import random


def generate_random_sets():
    # 从1~33中随机抽取6个不重复红球
    set1 = sorted(random.sample(range(1, 34), 6))
    set2 = sorted(random.sample(range(1, 34), 6))

    # 计算交集（重号）
    common = sorted(set(set1) & set(set2))

    # 打印结果
    print("第一组红球：", set1)
    print("第二组红球：", set2)
    print("重号：", common if common else "无")
    print("重号数量：", len(common))
    print("-" * 40)


# 多次调用查看效果
for _ in range(10):
    generate_random_sets()
