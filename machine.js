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
    let rotor_i=[21, 5, 9, 18, 14, 11, 0, 15, 23, 3, 1, 16, 22, 20, 17, 7, 4, 6, 8, 25, 13, 10, 24, 19, 2, 12];
    let rotor_ii=[23, 8, 14, 17, 25, 2, 15, 11, 22, 16, 10, 9, 12, 21, 3, 19, 6, 13, 5, 4, 18, 1, 24, 20, 7, 0];
    let rotor_iii=[3, 19, 13, 24, 20, 15, 10, 18, 12, 7, 17, 8, 22, 23, 21, 6, 14, 4, 5, 0, 11, 1, 16, 2, 25, 9];
    const rotor_box=[rotor_i,rotor_ii,rotor_iii];
    let reflector=[19, 20, 25, 15, 24, 18, 22, 13, 16, 21, 23, 14, 17, 7, 11, 3, 8, 12, 5, 0, 1, 9, 6, 10, 4, 2];
    
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
    final_rotor = [];
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
            output=output+" ";
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