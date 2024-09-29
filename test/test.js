async function test () {
  console.log(1)
  const res1= await test1()
  console.log(res1)
  const res2= await test2()
  console.log(res2)
  console.log(2)
}
function test1 () {
  return Promise.resolve(3)
}

function test2 () {
  return Promise.resolve(4)
} 
test()