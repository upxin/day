/**
 * 12012
 * 17136
 * 12012
 *
 * 2 7 8 9 12 15 17 18 22 25 26 27 # 3 5 7 8
 * 
 */
const ipt = `
5 6 7 10 11 13 14 16 17 22 24 26 33 35 # 3 5 8
2 6 7 10 11 17 20 21 22 23 24 25 26 27 28 29 31 34 # 6 8
4 6 7 15 16 18 20 21 24 28 29 31 32 35 # 3 11
2 7 8 9 12 15 17 18 22 25 26 27 # 3 5 7 8
2 3 7 12 13 14 17 20 24 26 34 # 1 3 6 8
4 7 8 9 10 11 15 19 2 23 26 32 33 34 # 4 9 11
4 7 8 10 14 15 16 17 19 20 22 26 28 29 31 # 4 8
3 5 6 11 13 16 17 23 24 29 30 34 # 3 5 8 9
3 4 5 7 9 15 17 18 23 27 28 32 # 2 4 9 11
1 4 5 13 16 19 23 24 30 32 33 34 # 4 10 11
1 2 7 8 9 11 13 14 16 19 20 23 29 32 # 6 7 11
5 7 9 13 15 19 24 29 # 5 8 9
1 15 18 24 26 31 # 2 9
4 10 15 16 17 22 26 30 # 2 7 11
4 5 6 12 13 18 22 23 29 35 # 2 7 8 12
2 3 4 7 9 11 20 26 27 28 30 34 # 2 3 12
5 7 8 9 26 33 # 5 12
4 9 10 19 27 34 # 6 11
3 7 9 16 17 35 # 3 10
3 5 6 22 26 27 29 31 34 35 # 8 11 12
3 7 10 11 15 16 22 26 28 29 # 10 3
3 7 10 11 15 16 22 26 28 29 # 10 7
3 7 8 14 20 24 25 26 29 31 # 7 10 11
3 7 8 11 12 20 24 25 29 32 # 1 7 10
4 7 11 13 17 19 27 31 # 7 8 10
1 11 12 14 15 21 24 27 # 5 6 10
4 13 16 20 26 29 32 # 4 7 9
5 9 11 13 14 15 20 22 23 24 26 28 32 34 # 5 8
5 6 16 21 22 23 25 # 3 4 5
2 3 7 9 11 17 22 27 29 # 1 6 7 9
8 11 20 26 32 34 # 5 9
3 4 6 7 12 15 17 18 20 25 27 34 # 2 7
3 7 9 10 15 18 21 24 26 27 29 32 # 5 10 11
4 7 8 10 14 18 20 26 33 34 # 7 8 11
9 13 16 20 22 25 28 30 34 # 3 5
4 8 10 15 22 25 26 29 34 # 3 5
3 5 9 14 29 # 6 7
3 5 9 14 29 # 6 7
3 5 9 14 29 # 6 7
2 3 5 8 14 17 18 21 23 29 # 2 3 7
16 21 25 26 30 # 5 11
5 9 21 25 29 # 1 8
6 11 29 32 35 # 5 11
3 5 12 14 17 18 23 25 26 28 # 7 9 12
2 7 9 11 15 23 28 29 30 31 # 7 8 11
3 7 12 17 18 20 21 25 27 32 # 3 7 9
2 3 7 9 11 17 22 27 29 # 1 6 7 9
3 6 8 10 11 15 16 20 26 29 30 33 # 3 6 8
3 4 15 16 20 24 25 27 29 30 31 35 # 3 8
`;
const goal = [
  [12, 22, 25, 27, 28],
  [1, 2],
];

export { ipt, goal };
