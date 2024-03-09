var a=1
var b=2
var c=3
var mc=0
var xc=0
var oc=0
var ifr = [0,0]
var xoc = [0,0]
var pl = ["O", "X"]
var ft = 0
var w = false
var cid = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"]
var cidc = [[a,1], [a,2], [a,3], [b,1], [b,2], [b,3], [c,1], [c,2], [c,3]]
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
  ]
var pb = [
  [[a,a,a], [3,2,1]],
  [[b,b,b], [3,2,1]],
  [[c,c,c], [3,2,1]],
  [[a,b,c], [3,3,3]],
  [[a,b,c], [2,2,2]],
  [[a,b,c], [1,1,1]],
  [[a,b,c], [3,2,1]],
  [[a,b,c], [1,2,1]],
  [[a,b,a], [3,2,1]],
  [[c,b,c], [3,2,1]],
  [[a,b,c], [3,2,3]],
  [[a,b,c], [1,2,1]]
]
function cell(f, r){
  return board[(2-(r-1))][(f - 1)]
}
function cohcell(f,r,h){
  board[(2-(r-1))][(f - 1)] = h
}
function hi(f, r, h){
  for(let i=0; i<cid.length; i++){
    if(f+" "+r == cidc[i][0]+" "+cidc[i][1]){
      let ch = document.getElementById(cid[i])
      ch.textContent = h
      cohcell(f,r,h)
      break
    }
  }
}
function cw(){
  for(let n=0; n<pb.length; n++){
    if(cell(pb[n][0][0], pb[n][1][0]) != "" && cell(pb[n][0][0], pb[n][1][0]) == cell(pb[n][0][1], pb[n][1][1]) && cell(pb[n][0][0], pb[n][1][0]) == cell(pb[n][0][2], pb[n][1][2])){
      alert("Player "+cell(pb[n][0][2], pb[n][1][2])+" wins.")
      w = true
      window.location.reload()
      return//You repeated a configuration in pb
    }
  }
}
function GameEngine(s, sh){
  cw()
  if(s==1 && !w){
    for(let i=1; i<4; i++){
      for(let j=1; j<4; j++){
        if(cell(i, j) == pl[sh+1%2]){
          for(let i1=1; i1<4; i1++){
            for(let j1=1; j1<4; j1++){
              if(cell(i1, j1) == ""){
                hi(i, j, "")
                hi(i1,j1,pl[sh+1%2])
                ft = 0
                mc += 1
                cw()
                return
              }
            }
          }
        }
      }
    }
  }
  if(s == 0 && !w){
    for(let i=1; i<4; i++){
      for(let j=1; j<4; j++){
        if(cell(i, j) == ""){
          hi(i,j, pl[sh+1%2])
          xoc[sh+1%2] += 1
          mc += 1
          cw()
          return
        }
      }
    }
  }
}
function tw(f, r){
  for(let i=0; i<2; i++){
    if(mc % 2 == i && xoc[i] < 3 && cell(f,r) == ""){
      hi(f, r, pl[i])
      xoc[i] += 1
      mc += 1
      GameEngine(0, i)
      return
    }else if(mc % 2 == i && xoc[i] > 2){
      if(ft == 0 && cell(f,r) == pl[i]){
        ifr[0] = f
        ifr[1] = r
        ft += 1
      }else if(ft == 1 && cell(f,r) == "" &&   cell(ifr[0], ifr[1]) == pl[i]){
        hi(ifr[0], ifr[1], "")
        hi(f,r,pl[i])
        ft = 0
        mc += 1
        GameEngine(1, i)
      }else if(cell(f,r) == pl[i]){
        ifr[0] = f
        ifr[1] = r
      }
      return
    }
  }
}