function runfunc(){
    rotor =document.getElementById("rotor").value;
    stcode =document.getElementById("stcode").value;
    input=document.getElementById("text").value;
    if(stcode.length==0){
        stcode="ABC";
        document.getElementById("stcode").value=stcode;
    }
    if(rotor.length==0){
        rotor="123";
        document.getElementById("rotor").value=rotor;
    }
    var output = encode(rotor,stcode,input); 
    document.getElementById("output").value=output;
    console.log(rotor,stcode,input);
}
function encode(rotor,stcode,input){
    let output="";
    let rotor_i=[15, 10, 7, 4, 11, 3, 20, 23, 13, 0, 17, 21, 5, 8, 25, 1, 19, 22, 14, 6, 18, 24, 16, 2, 9, 12];
    let rotor_ii=[4, 1, 11, 9, 10, 6, 0, 12, 14, 17, 19, 5, 23, 25, 15, 24, 20, 7, 21, 18, 22, 8, 2, 3, 13, 16];
    let rotor_iii=[11, 22, 25, 6, 13, 3, 10, 14, 8, 16, 24, 12, 18, 23, 0, 21, 20, 15, 19, 2, 4, 7, 1, 9, 5, 17];
    const rotor_box=[rotor_i,rotor_ii,rotor_iii];
    let reflector=[21, 13, 22, 19, 18, 20, 15, 14, 16, 23, 17, 24, 25, 1, 7, 6, 8, 10, 4, 3, 5, 0, 2, 9, 11, 12];
    
    function Rotate(arr) {
        arr.push(arr.shift());
        return arr;
    }
    let meter2=false,meter3=false;
    function shift_coil(){
        rotor_box[0]=Rotate(rotor_box[0]);
        if(meter2==true){
            rotor_box[1]=Rotate(rotor_box[1]);
            if(meter3==true){
                rotor_box[2]=Rotate(rotor_box[2]);
                meter3=false;
            }
            meter2=false;
        }
        meter2=rotor_box[0][0]==25?true:false;
        meter3=rotor_box[1][0]==25?true:false;
        console.log(meter2,meter3);
    }
    for(let i=0;i<3;i++){
        if(rotor[i]=="1"){
            rotor_box[i]=rotor_i;
        }else if(rotor[i]=="2"){
            rotor_box[i]=rotor_ii;
        }else{
            rotor_box[i]=rotor_iii;
        }
    }
    //console.log(rotor_box);
    let unspace= [];
    for(let i=0;i<3;i++){
        rotor_box[i]=shift_pos(toascii(stcode[i]),rotor_box[i]);
    }
    console.log(rotor_box);
    for(let i=0;i<input.length;i++){
        if(input[i]!=' '){
            let code =  toascii(input[i]);
            let pos1 = rotor_box[0][code];
            let pos2 = rotor_box[1][pos1];
            let pos3 =rotor_box[2][pos2];
            let reflect_pos = reflector[pos3];
            //console.log(pos1,pos2,pos3,reflect_pos);
            let r1 = rotor_box[2].indexOf(reflect_pos);
            let r2 = rotor_box[1].indexOf(r1);
            let r3 =rotor_box[0].indexOf(r2);
            let final = String.fromCharCode(65 +r3);
            //console.log(r1,r2,r3,final);
            output = output+final;
            shift_coil();
        }else{
            output=output+input[i];
            console.log(output);
        }
    }
    return output;
}
function toascii(t){
    let num = t.toUpperCase().charCodeAt(0);
    return parseInt(num)-65;
}
function shift_pos(ch,arr) {
    for(let i=0;i<26;i++){
        if(ch!=i){
            arr.push(arr.shift());
        }else{
            break;
        }
    }
    return arr;
}


function setcache(){
    localStorage.setItem("cache","true")
}

function checkcache(){
    if(localStorage.getItem("cache")==="true"){
        document.getElementsByClassName('popup')[0].style.display = 'none';
    }
}
//pop up
function closepopup(){
    var valid = document.getElementById('cache').checked;
    if(valid==true){
        setcache();
        document.getElementsByClassName('popup')[0].style.display = 'none';
    }else{
        document.getElementsByClassName('popup')[0].style.display = 'none';
    }
}