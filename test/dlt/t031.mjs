// 14 18  20  25 35
const ipt = `
1 6 7 8 13 18 19 21 22 26 27 29 30 31 34 # 1 10 11
2 3 4 8 10 13 14 15 18 21 23 24 27 28 29 32 34 # 2 5
3 4 5 7 9 15 17 18 23 27 28 32 # 2 4 9 11
1 5 8 12 16 17 18 22 23 25 30 33 # 4 6 9 11
1 3 5 8 15 16 19 23 25 # 1 9 11
4 5 6 13 17 21 23 24 27 29 30 31 # 1 4 11 12
4 6 15 17 18 23 24 29 31 34 # 1 3 8 9
6 7 9 14 19 23 24 26 29 35 # 3 6 9
6 11 16 17 22 # 4 9
7 16 20 23 25 # 5 9
7 9 16 23 25 # 5 9
7 8 10 11 13 14 19 24 26 29 30 # 1 6 8 11
3 5 15 17 20 26 35 # 4 6 9
2 7 11 14 15 19 27 # 2 7 8
1 3 6 10 15 23 27 # 8 9 11
10 16 17 21 23 25 29 # 2 8 10
3 5 6 11 22 28 33 # 2 4 7
2 4 6 10 13 18 22 # 3 7 12
2 3 24 27 30 32 33 # 4 6 9
10 11 13 18 23 32 33 # 5 6 12
1 2 5 13 20 24 25 # 7 9 11
1 4 6 18 21 29 34 # 6 8 10
2 5 6 7 8 11 13 17 20 26 29 30 31 33 # 4 8 11
2 5 6 8 13 16 17 22 25 31 32 # 1 8 10 11
5 7 10 11 15 20 21 24 28 30 # 3 8 9
1 4 6 9 10 16 21 25 32 35 # 5 9 11
1 2 18 20 21 22 32 33 # 4 5 12
3 6 10 11 13 20 23 25 # 3 7
3 8 15 18 21 26 31 35 # 4 8 12
10 11 12 14 15 25 27 28 31 35 # 4 11
5 8 13 14 16 17 23 25 31 32 # 3 9 11
9 18 21 22 25 26 27 30 32 33 35 # 3 5 6
4 5 9 11 16 17 21 22 27 28 29 # 2 3 4 5
3 7 13 15 18 20 22 23 30 32 33 35 # 1 11
1 5 8 10 13 16 17 22 23 25 26 29 30 31 # 7 12
`;
const goal = [[14, 18, 20, 25, 35,],[1,7]];
export { ipt, goal };
