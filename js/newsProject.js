let generalBtn = document.querySelector('#general');
let businessBtn = document.querySelector('#business');
let sportBtn = document.querySelector('#sports');
let technologyBtn = document.querySelector('#technology');
let entertainmentBtn = document.querySelector('#entertainment');
let searchBtn = document.querySelector('#search');

let searchNews = document.querySelector('#news-input');
let newsType = document.querySelector('#news-type');
let newsDetails = document.querySelector('#news-details');
let weather = document.querySelector('.weather');


// Array
let dataArry =[];


// const API_KEY = '2f60588cc706431fac80ae4ef3e685e2';
// const API_KEY = '2f60588cc706431fac80ae4ef3e685e2';
 
// class oop news
class News{  

    // weather API
    apiWeather = async () => {
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=lod&appid=d0634cdb8000dfc11d2cdbc4e8ffe3c2')
        let myData = await response.json();
        
        this.showDataWeather([myData]);
    }     

// show data weather 
    showDataWeather(newData) {
        let newArray = newData;


        newArray.forEach((element) => {
            let temp = element.main.temp;
            temp = temp - 273.15;
            temp = Math.round(temp); 
            temp = temp + "°c";
            let iconWheather = element.weather[0].icon;
            weather.innerHTML +=
                `
                <div class='d-md-flex m-md-0 m-3'>
              <h6 class='text-danger'>${element.name}</h6>
              <img class='img-fluid' src="http://openweathermap.org/img/wn/${iconWheather}@2x.png" alt="" /> 
              <h6 class='text-danger'>${temp}</h6>
              <div>            
              `
        })
    }

    
    // fillter function
    fillterData() {
        // newsDetails.innerHTML = '';
        // console.log(dataArry);
        let inputVal = searchNews.value;
        // fillter data
        dataArry = dataArry.filter(function(value) {
            return value.title.startsWith(inputVal);
            
        })
        
        this.showData()
    }
    
    // headline fetch
    headLineFunc = async () =>{
        //  page headline api
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&apiKey=2f60588cc706431fac80ae4ef3e685e2');   
        
        // translate json
        let myData = await response.json();
        // append content to the array
        dataArry = myData.articles;
        // calling to 
        this.showData();
        
        
    }

    // businessFunc = async () =>{
    //     let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&category=business&apiKey=2f60588cc706431fac80ae4ef3e685e2');
        
    //         let myData = await response.json();
    //         dataArry = myData.articles;
    
        
    //         this.showData();
    //     }
    
    
    // sports fetch
    sportsFunc = async () =>{
                //  page sports api
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&category=sports&apiKey=2f60588cc706431fac80ae4ef3e685e2'
        );
                // translate json

            let myData = await response.json();
                    // append content to the array

            dataArry = myData.articles;
        
            this.showData();
        }
    //general fetch
    generalFunc = async () =>{
                //  page general api
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&category=general&apiKey=2f60588cc706431fac80ae4ef3e685e2');
                // translate json
            let myData = await response.json();
                    // append content to the array
            dataArry = myData.articles;
      
            this.showData();
        }
    //entertainment fetch
    entertainmentFunc = async () =>{
                        //  page entertainment api
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&category=entertainment&apiKey=2f60588cc706431fac80ae4ef3e685e2'
        );
                        // translate json
            let myData = await response.json();
                                // append content to the array
            dataArry = myData.articles;
       
            this.showData();
        }
    // technology fetch
    technologyFunc = async () =>{
                        //  page technology api
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=il&category=technology&apiKey=2f60588cc706431fac80ae4ef3e685e2'
        );
                        // translate json
            let myData = await response.json();
                                // append content to the array
            dataArry = myData.articles;
            console.log(dataArry);
        
            this.showData();
        }
    //   start show data 
       showData(){
        // empty the data from html
        newsDetails.innerHTML ='';
        
        // new varible empty string for append that in html
    let newsD ='' ;
        dataArry.map(news =>{
        //    in the date value in api have 'T' so it will remove every later from T end the text after
    let data = news.publishedAt.split('T');
    // chack null text to not print
    if(news.urlToImage !== null && news.title !== null && data[0] !== null && news.description !== null && news.utrl !== null){
    // create the content
        newsD += 
    `
    <div class='col-sm-12 col-md-4 p-2 text-md-end text-center border border-5 shadow rounded-1'>
    <div class='p-2'>
       <img src="${news.urlToImage}" class='img-fluid d-md-none'>
       <img src="${news.urlToImage}" height='200vh' width='100%' class='d-none d-md-block'>
    <div>
    <duv class=''>
    <div class='' height = ''>
    <h5 class='card-ttle w-md-100' >${news.title}</h5>
    </div>
    <div class=''>
    <h6 class='text-primary'>${data[0]}</h6>
    </div>
    <div class='showDescription'>
    <i class="fa-solid fa-angle-down showItem"></i>
    <div class='arrow d-none'>
    <p class='text-muted'>${news.description}</p>
    </div>
    </div>
    <div class="icons d-flex justify-content-between gap-3 text-xl-start">
    <div class='gap-3'>
    <i class="fa-solid fa-thumbs-up likeIcon" ></i>
    <i class="fa-solid fa-thumbs-down disLikeIcon" ></i> 
    </div>           
    <a class="btn btn-dark" target="_blank" href="${news.url}">מידע נוסף</a>
    </div>     
    </div>
    
    </div>
            </div>
            
        </div>
        
    </div>
    `;
    }
    
})
     
       
            // append to div in html
        newsDetails.innerHTML = newsD
        // call the func that show description content when you press 
        this.showDescriptionAll();
        // change to green
        this.changeLikeColor();
        // change to red
        this.changeDisLikeColor();
        
    }
    // function that show description content when you press
    showDescriptionAll(){
    document.querySelectorAll('.showItem').forEach((element, i) => {
        element.addEventListener('click', function(){
             document.querySelectorAll('.arrow')[i].classList.toggle('d-none');
        })
    });
    }
    // change the color of icon to green when you click on
    changeLikeColor(){
        let saveArry = [];
        let saveItems = document.querySelector('.save-items');
    let likeIcon = document.querySelectorAll('.likeIcon');
    likeIcon.forEach((item) => {
        item.addEventListener('click', function() {
           item.classList.toggle('text-success');
               
        })
    })
    }
    // change the color of to red icon when you click on
    changeDisLikeColor(){
    let disLikeIcon = document.querySelectorAll('.disLikeIcon');
    disLikeIcon.forEach((item) => { 
        item.addEventListener('click', function() {
            item.classList.toggle('text-danger');
        })
    })
  }
}

let news = new News();
news.apiWeather();

//  headline page show
window.onload = function(){
    // טקסט כותרות בראשית הדף
    newsType.innerHTML=`<h4 class='text-end'>כותרות</h4>`;
    // פונקציה
    news.headLineFunc();
}

// general page btn
generalBtn.addEventListener('click', function(){
    newsType.innerHTML=`<h4 class='text-end'>כללי</h4>`;

    news.generalFunc();
});

// sport page btn
sportBtn.addEventListener('click', function(){
    newsType.innerHTML=`<h4 class='text-end'>ספורט</h4>`;
    news.sportsFunc();    
});

// technology page btn
technologyBtn.addEventListener('click', function(){
    newsType.innerHTML=`<h4 class='text-end'>טכנולוגיה</h4>`;

news.technologyFunc();

});

//   entertainment page btn
entertainmentBtn.addEventListener('click', function(){
    newsType.innerHTML=`<h4 class='text-end'>בידור</h4>`;

    news.entertainmentFunc();

});

// search btn
searchBtn.addEventListener('click', function(){
  
    newsType.innerHTML=`<h4 class='text-end'> חיפוש : ${searchNews.value}</h4>`;
news.fillterData()
}); 

// delet add
let addBtn = document.querySelector('.add-btn');
// x btn remove the add
addBtn.addEventListener('click', function(e) {
    e.target.parentElement.remove()
})

// x btn remove the big add
let bigAddBtn = document.querySelector('.big-add-btn');
bigAddBtn.addEventListener('click', function(e) {
    e.target.parentElement.remove()
})

// admin togalle display none - block to the div //
let personIconBtn = document.querySelector('.admin-icon-btn');
let personLogIn = document.querySelector('.login-adminacsses');
personIconBtn.addEventListener('click', function(e) {
    e.preventDefault();
    personLogIn.classList.toggle('adminIconStyle');
})

// person icon input value and person icon btn //

let inputName = document.querySelector('#fName');
let inputEmail = document.querySelector('#email');
let inputPassword = document.querySelector('#password');
let loginBtn = document.querySelector('.loginBtn');
let divLogin = document.querySelector('.div-login');

loginBtn.addEventListener('click', function() {
    let inpValName = inputName.value;
    let inpValEmail = inputEmail.value;
    let inpValPass = inputPassword.value;
    // the obj from the input
    let inputValue = {
        userName: inpValName,
        email: inpValEmail,
        password: inpValPass,
    }

    // if that when the email deatails are full
    if (inpValName !== '' && inpValEmail !== '' && inpValPass !== '') {
        localStorage.setItem(inpValName, JSON.stringify(inputValue));
        let signOut = divLogin;
        signOut.innerHTML =
            `
        <div class=" col-md-6 position-fixed end-0 text-center d-flex justify-content-end " >
                    <div class=" p-5 text-white shadow bg-dark border border-1 shadow rounded">
                        <div class="text-center">
                        <img class="img-fluid rounded-5" src="/image/4d5752b5e01c4234949d317a53d65497 (2).png" width="20%" alt="">
                        <h4>Welcome</h4>
                        </div>
                        <form>
                        <div class="form-group">
                        <h4>${inpValName}</h4>
                        
                        </div>
                        <div class="form-group">
                        <p>${inpValEmail}</p>
                        
                        </div>
                        <hr class="">
                        <div class="form-group row">
                        <button class='col-12 btn text-white'>Add another acount</button>
                        </div>
                        <hr class="">
                        

                            <div class="d-flex justify-content-center gap-2">
                                <div class="logOut-div">
                                    <button class=" logOutBtn btn border shadow text-white"><a class='text-white text-decoration-none' href='/newsProject.html'>Log-Out</a></button>
                                </div>
                                
                                
                                </div>
                                <hr class=''>
                                <div class='d-flex gap-3'>
                                <div>
                                <button class=" logOutBtn btn border shadow text-white">Privacy</button>
                                </div>
                                <div class='mt-2'>
                                <h6>|</h6>
                                </div>
                                <div>
                                <button class=" logOutBtn btn border shadow text-white">Service</button>
                                </div>
                                </div>
                        </form>
                    </div>
                </div>
        `
    }
        
})
