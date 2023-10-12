let title =document.getElementById('title')
let price =document.getElementById('price')
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let category =document.getElementById('category')
let total = document.getElementById('total')
let submit = document.getElementById('sub')
let count  = document.getElementById('count')


let op = 'see'; 
let fu ;
function  gettotal(){
if( price.value!=''){
  let  t = (+price.value  + +taxes.value + +ads.value)
  - +discount.value ;
  total.innerHTML=t;
  total.style.backgroundColor='#040';
}else{
    total.innerHTML='';
    total.style.backgroundColor='#f04';
    
}

}



let datapro;
if(localStorage.product!=null){

    datapro = JSON.parse(localStorage.product) 
}else{
    datapro =[];
}




submit.onclick= function(){
    
let pro ={
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
count:count.value,
total:total.innerHTML,
category:category.value.toLowerCase(),
}

if(title.value !=''){
if( op =='see'){
    if(pro.count >1 ){
    for(let i=0 ; i < pro.count; i++ ){


        datapro.push(pro);
    }
}else{
    datapro.push(pro);
    
}
}else{               
    datapro[fu] = pro;
submit.ineerHTML ='creat';
count.style.display ='block';
op ='see';



}
}



total.style.backgroundColor='#f04';

localStorage.setItem('product',JSON.stringify(datapro))
cleardata();
show();

}

function  cleardata(){
    
    title.value ="";
price.value ="";
taxes.value ="";
ads.value ="";
discount.value ="";
count.value ="";
category.value ="";
total.innerHTML="";

}

function show(){

    let table ='';
    for(let i =0 ; i < datapro.length ; i++   ){
        table +=`
        
        
        <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button  onclick="update(${i})" id="upgrade">upgrade</button></td>
    <td><button onclick="deleted(${i})" id="delete">delete</button></td>
        </tr>
        
        `
        
        
    }
    document.getElementById('tbody').innerHTML=table;
    let deleteall = document.getElementById('delall')
    if( datapro.length> 0){
deleteall.innerHTML=`
<button onclick="deletall()" >delete All(${datapro.length})</button>
`
    }
    else{
        deleteall.innerHTML='';
    }


    }


show()

function deleted(i){
datapro.splice(i,1);
localStorage.product =JSON.stringify(datapro);

show()
}

function deletall(){
localStorage.clear()
datapro.splice(0)
show()

}


function update(i){
 op = 'dd';
 title.value = datapro[i].title;
 price.value = datapro[i].price;
 taxes.value = datapro[i].taxes;
 ads.value = datapro[i].ads;
 discount.value = datapro[i].discount;
 category.value = datapro[i].category;
count.style.display ='none';
gettotal();
submit.innerHTML='upgrade';
fu = i;
scroll({

    top:0,
    behavior:'smooth',
})

}

let ss ='title';

function getsearch(id){
    let searchb =document.getElementById('searchb')

if(id =='btntitle'){
ss ='title';
searchb.focus();
searchb.placeholder='search by title';

}else{
    
    ss='category';
    searchb.focus();
    searchb.placeholder='search by category';
}
searchb.value='';
show()
}

function search(value){
let table='';

    if( ss=='title'   ){

   for(let i=0 ;i< datapro.length ;i++){
    if(datapro[i].title.includes(value.toLowerCase())){
        table +=`
        
        
        <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button  onclick="update(${i})" id="upgrade">upgrade</button></td>
    <td><button onclick="deleted(${i})" id="delete">delete</button></td>
        </tr>
        
        `

    }


}


    }else{

        for(let i=0 ;i< datapro.length ;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                
                
                <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick="update(${i})" id="upgrade">upgrade</button></td>
            <td><button onclick="deleted(${i})" id="delete">delete</button></td>
                </tr>
                
                `
        

            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
    
}