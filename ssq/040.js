const ipt = `

1 2 9 10 16 17 19 24 27 28 31 # 4 12 
2 3 11 13 14 18 20 25 28 31 32 # 8 13 
2 4 7 9 12 16 17 18 22 24 25 27 30 31 # 2 13 
3 5 6 7 12 14 15 17 19 23 24 26 32 #  6 8
4 6 9 10 15 16 19 20 24 26 31 33 # 8 
6 13 16 22 28 31 # 5
3 4 6 7 9 12 15 17 18 20 26 27 28 32 # 4 14 
3 4 5 7 11 14 17 18 21 23 24 29 # 4 6 8
1 2 3 4 5 11 12 13 20 26 28 31 # 1 2 6
2 3 7 10 14 15 24 28 31 32 # 16
5 9 11 14 16 18 23 24 # 13
2 3 5 6 11 18 19 20 26 32 # 4 10
2 4 7 10 14 15 17 18 20 21 24 25 27 28 29 32 # 13
1 4 6 9 11 14 16 17 19 22 24 25 28 30 # 3 12
6 7 8 13 14 15 16 17 18 20 22 24 27 30 31 33 # 5
5 6 7 8 9 13 15 16 17 21 25 31 33 # 10 11 16
3 4 6 7 9 12 15 17 18 20 26 27 28 32 # 4 14
2 4 5 10 12 17 19 21 22 23 25 29 30 # 4 13 14
1 4 8 9 11 12 14 15 18 19 20 22 25 26 28 32 # 14
3 5 8 12 14 16 17 18 20 23 25 30 31 # 7 13
1 2 5 13 19 22 25 27 29 30 # 6 13 14 15
2 8 10 12 15 17 22 23 24 26 30 32 # 10
2 4 7 9 14 18 22 24 27 28 29 32 # 5 7 13
4 7 8 11 13 18 20 24 25 33 # 3 5 8 11 14
2 6 13 15 16 23 24 27 28 # 1 3 7 8 9 10 11 14 15 16
1 2 4 9 10 15 18 20 31 32 # 11 12
2 4 7 9 12 14 18 22 27 29 # 11 14
6 10 11 14 17 20 22 24 25 30 31 # 1 16
2 5 15 20 21 22 24 25 28 # 3 9 10
1 7 8 10 13 20 24 26 30 31 32 # 10 14
2 3 7 11 12 16 20 23 28 29 31 27 # 6 9 16
2 4 7 9 12 16 17 18 22 24 25 27 30 31 # 2 13
3 5 6 7 12 14 15 17 19 23 24 26 32 # 6 8
1 4 5 11 12 15 20 21 22 23 24 25 # 8 16
3 6 8 9 10 12 17 19 22 24 29 30 # 2 10
3 4 5 6 16 17 20 21 26 28 30 31 # 6
1 2 3 5 6 13 18 19 20 21 23 25 26 29 31 32 # 6
2 7 8 11 12 14 17 19 23 27 28 31 # 7 12 16
1 5 7 11 12 15 19 22 23 26 33 # 9 11 15 
2 3 7 9 12 13 16 18 28 29 30 # 4 13 14 15
3 4 8 18 21 25 29 30 32 33 # 4 13
4 7 8 14 19 21 25 27 29 33 # 5 10 14 16
8 9 10 13 17 18 22 23 27 28 31 # 3 6 9 
1 2 3 6 10 17 19 25 31 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
2 14 22 23 24 25 29 30 33 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
3 7 9 12 13 23 25 28 30 32 # 1 2 7 11 15 
8 12 13 14 15 16 17 19 22 31 #  2 8 10
4 9 10 13 19 20 23 29 33 # 3 4 8 14 15 16
1 4 6 7 8 12 14 17 18 20 24 28 32 # 11
2 4 7 18 19 22 27 28 32 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
1 2 3 4 7 14 20 21 24 25 27 29 # 3
2 4 5 7 9 12 14 23 27 28 32 # 2 3 7 12
3 6 9 14 15 17 18 26 30 31 33 # 8 9
1 4 5 10 15 17 18 21 26 27 30 # 9 10 14 16
7 8 10 11 13 14 16 18 19 20 22 # 3 8
1 4 7 10 14 20 26 27 31 32 # 4 5 8 13 15 16 
3 6 10 11 14 15 20 21 23 25 30 33 # 6 9 10
4 5 6 10 13 18 19 23 28 30 # 3 11
1 2 4 6 8 14 15 19 20 27 30 32 # 4 11 13
4 7 8 11 15 19 20 21 22 23 24 #
4 5 6 10 13 18 19 23 28 30 # 3 11
2 4 11 16 17 19 22 23 24 27 28 30 # 3 14 
4 7 8 9 13 17 18 20 21 25 29 30 # 1 12 
1 2 7 8 9 15 19 26 27 30 # 6 7 14
1 6 7 8 9 15 23 26 27 33 #  2 8 12
2 4 5 8 11 13 16 19 21 23 32 33 # 2 3 
1 3 4 8 9 16 18 19 21 24 27 32 # 9 11 
1 2 8 9 13 15 18 22 24 28 31 32 # 14
1 7 9 11 14 15 16 26 28 30 33 # 12 
1 7 8 9 15 16 18 21 30 32 # 9 14 
2 3 5 6 7 10 17 23 26 28 33 # 4 16 
2 3 6 15 19 24 28 29 30 32 # 7 14 
1 2 7 14 17 21 25 26 28 30 31 # 4 13
4 7 9 13 18 21 22 26 29 30 33 # 10 16 
1 2 9 10 16 17 19 24 27 28 31 # 4 12 
2 3 11 13 14 18 20 25 28 31 32 # 8 13
3 9 11 14 15 18 24 25 26 # 3 13 14 15 16
3 9 12 14 17 18 22 25 28 # 3 4 8 12 13
3 5 6 11 19 20 21 23 25 31 33 # 14 15 
2 5 10 13 14 15 20 21 27 29 30 #  3 6
2 4 7 11 12 15 16 22 27 28 # 1 10
1 3 5 14 16 20 25 26 30 31 # 11 15
4 7 10 12 14 15 26 29 31 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
1 5 8 14 17 19 22 24 25 28 30 # 10 16 
3 9 10 12 13 18 19 23 26 30 32 #  9
2 4 6 7 8 16 17 18 30 31 # 4 11 13
1 3 5 10 15 18 19 21 24 31 # 1 2 10
3 5 11 12 14 18 19 27 28 32 # 6 10 11
4 7 10 13 16 21 25 26 29 30 # 2 9 13
4 5 7 9 13 16 21 24 25 27 29 33 # 15 14
3 7 8 9 11 14 16 18 25 30 33 # 8 11
2 4 7 10 14 16 18 26 28 29 30 # 9 13
6 9 10 13 15 16 20 22 25 29 # 4 7
1 7 12 14 15 17 18 22 25 28 33 # 8 15 16
2 3 5 14 17 18 20 25 28 29 31 # 3 11 16 
1 4 7 8 10 13 16 19 20 25 29 28 31 # 8 14 
5 6 10 12 13 14 15 20 26 28 29 30 32 # 2 16 
3 6 7 12 13 16 20 21 26 30 31 32 # 4 5 
5 10 11 12 13 14 18 22 26 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
1 4 8 10 11 12 14 17 20 25 27 31 # 10 
1 7 9 11 12 16 20 22 23 27 28 29 # 4 
6 7 10 16 20 21 22 27 29 31 32 # 8 9 
3 4 5 8 17 20 22 24 25 28 32 # 1 11 14
6 9 13 15 16 17 20 21 27 30 31 # 3 8 10
3 6 8 13 15 16 20 25 26 28 # 5 8 10 12
1 8 12 13 15 23 25 28 30 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
1 4 7 9 10 15 18 20 21 28 30 31 # 10
1 4 7 9 10 15 20 21 28 30 31 # 4 10
2 4 12 13 17 18 19 28 30 32 # 5 9 11
2 6 13 22 24 27 28 30 31 33 # 2 4 12
1 7 8 12 14 17 18 21 25 31 # 1 11
3 9 10 14 15 16 21 22 30 31 # 15 16
3 7 8 15 17 18 21 22 25 30 # 11 14
3 5 10 11 12 13 14 18 22 32 # 7 15
3 6 11 13 15 16 18 23 24 27 # 5 11
3 11 12 16 19 22 24 25 26 27 # 1 6 
3 5 9 11 15 20 21 22 25 29 # 11 13 
4 14 15 16 18 24 27 29 31 32 # 4  11
2 3 15 18 21 22 23 28 29 #  10 11
7 10 13 18 20 22 23 24 26 # 3  12 15
2 3 6 10 11 13 20 28 33 #  8 9 14
1 10 13 15 16 17 27 29 32 # 5 10 
1 10 12 13 16 17 20 23 32 # 9 12 
1 8 10 11 13 18 25 28 32 #  1 16
1 10 14 15 21 23 24 29 31 # 3 7 
8 14 15 17 20 23 25 27 33 # 2 
30 27 24 21 19 17 10 3 #  1
2 6 9 8 15 16 23 30 #  10 13 15
4 7 9 10 11 13 17 23 24 #  11
5 7 10 12 14 15 20 25 33 # 1 
1 5 7 10 14 18 20 26 27 # 1 
2 4 5 12 18 19 24 27 30 #  6 15
3 8 13 17 26 27 29 32 33 # 4 9 
7 1 8 13 15 20 21 22 26 #  15
33 31 30 24 22 18 15 9 7 # 12 
10 14 18 20 22 23 26 31 32 #  1
6 7 11 18 22 26 27 28 30 #  9
1 2 4 9 10 14 26 31 33 #  14
3 7 14 22 24 27 30 32 33 #  11
3 4 7 8 10 13 17 27 33 # 11 
2 6 9 12 14 16 17 19 26 #  12
1 2 3 20 23 28 30 32 33 #  8
9 10 12 13 17 19 20 24 31 # 10 
2 3 7 12 14 20 22 27 30 #  9
8 14 15 18 19 26 29 31 33 #  5
1 3 5 9 10 16 23 26 31 # 16 
8 9 15 17 21 26 27 28 32 # 11 
3 14 16 17 21 22 23 27 29 #  16
2 7 10 15 16 17 18 26 30 #  3
`;

const g1 = [];
const g2 = [];

module.exports = {
  ipt,
  g1,
  g2,
};
