
const showHome = () =>{
    document.getElementById("Home").style.display = "block";
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Comment").style.display = "none";
    document.getElementById("Chess").style.display = "none";
    document.getElementById("showhome").style.backgroundColor = "lightgray";
    document.getElementById("showlogin").style.backgroundColor = "white";
    document.getElementById("showregister").style.backgroundColor = "white";
    document.getElementById("showshop").style.backgroundColor = "white";
    document.getElementById("showcomment").style.backgroundColor = "white";
    document.getElementById("showchess").style.backgroundColor = "white";
}
const showLogin = () =>{
    document.getElementById("Home").style.display = "none";
    document.getElementById("Login").style.display = "block";
    document.getElementById("Register").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Comment").style.display = "none";
    document.getElementById("Chess").style.display = "none";
    document.getElementById("showhome").style.backgroundColor = "white";
    document.getElementById("showlogin").style.backgroundColor = "lightgray";
    document.getElementById("showregister").style.backgroundColor = "white";
    document.getElementById("showshop").style.backgroundColor = "white";
    document.getElementById("showcomment").style.backgroundColor = "white";
    document.getElementById("showchess").style.backgroundColor = "white";
}
const showRegister = () =>{
    document.getElementById("Home").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "block";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Comment").style.display = "none";
    document.getElementById("Chess").style.display = "none";
    document.getElementById("showhome").style.backgroundColor = "white";
    document.getElementById("showlogin").style.backgroundColor = "white";
    document.getElementById("showregister").style.backgroundColor = "lightgray";
    document.getElementById("showshop").style.backgroundColor = "white";
    document.getElementById("showcomment").style.backgroundColor = "white";
    document.getElementById("showchess").style.backgroundColor = "white";
}
const showShop = () =>{
    document.getElementById("Home").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("Shop").style.display = "block";
    document.getElementById("Comment").style.display = "none";
    document.getElementById("Chess").style.display = "none";
    document.getElementById("showhome").style.backgroundColor = "white";
    document.getElementById("showlogin").style.backgroundColor = "white";
    document.getElementById("showregister").style.backgroundColor = "white";
    document.getElementById("showshop").style.backgroundColor = "lightgray";
    document.getElementById("showcomment").style.backgroundColor = "white";
    document.getElementById("showchess").style.backgroundColor = "white";
}
const showComment = () =>{
    document.getElementById("Home").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Comment").style.display = "block";
    document.getElementById("Chess").style.display = "none";
    document.getElementById("showhome").style.backgroundColor = "white";
    document.getElementById("showlogin").style.backgroundColor = "white";
    document.getElementById("showregister").style.backgroundColor = "white";
    document.getElementById("showshop").style.backgroundColor = "white";
    document.getElementById("showcomment").style.backgroundColor = "lightgray";
    document.getElementById("showchess").style.backgroundColor = "white";
}
const showChess = () =>{
    document.getElementById("Home").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("Register").style.display = "none";
    document.getElementById("Shop").style.display = "none";
    document.getElementById("Comment").style.display = "none";
    document.getElementById("Chess").style.display = "block";
    document.getElementById("showhome").style.backgroundColor = "white";
    document.getElementById("showlogin").style.backgroundColor = "white";
    document.getElementById("showregister").style.backgroundColor = "white";
    document.getElementById("showshop").style.backgroundColor = "white";
    document.getElementById("showcomment").style.backgroundColor = "white";
    document.getElementById("showchess").style.backgroundColor = "lightgray";
    document.getElementById("responsetext").innerHTML="";
}

function fetchversion(){
    const fetchPromise = fetch("https://cws.auckland.ac.nz/gas/api/Version");
    const StreamPromise = fetchPromise.then((reponse)=>reponse.text());
    StreamPromise.then((data)=>{document.getElementById("version").innerHTML += data;});
}
fetchversion();

const mydragstart = (ev) =>{
    ev.dataTransfer.setData("text/plain",ev.target.id);
}

const mydragover = (ev) =>{
    ev.preventDefault();
}

const mydrop = (ev) =>{
    if(ev.dataTransfer !== null){
        const data=ev.dataTransfer.getData("text/plain");
        ev.target.appendChild(document.getElementById(data));
    }
}

const getItems=()=>{
    const fetchPromise=fetch('https://cws.auckland.ac.nz/gas/api/AllItems',
    {
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type': "application/json",
        }
    });
    const StreamPromise=fetchPromise.then((response)=>response.json());
    StreamPromise.then((data)=>showItems(data));
}

const SearchItem=()=>{
    var item = document.getElementById("searchitems").value;
    const fetchPromise=fetch('https://cws.auckland.ac.nz/gas/api/Items/'+ item,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type': "application/json",
        }
    });
    const StreamPromise=fetchPromise.then((response)=>response.json());
    StreamPromise.then((data)=>showItems(data));
}

const showItems=(orders)=>{
    let htmlString="<tr><td>Item</td><td>Description</td><td>Price</td></tr>";
    const showOrder=(order)=>{
        htmlString+=`<tr><td><img width=200 height=200 src=${'https://cws.auckland.ac.nz/gas/api/ItemPhoto/'+order.id}></td>
        <td width=600 style="text-align: left; padding-left:10px;"></br><span style="font-weight: bold;">${order.name}</span></br></br>${order.description}</br></br><input type="button" id='${order.id}' value="Buy Now" onclick="BuyItems(this.id)"/></br></br></td><td width=100>$${order.price}</td></tr>`;
    }
    orders.forEach(element => {
        showOrder(element);
    });
    const ourTable=document.getElementById("ShopTable")
    ourTable.innerHTML=htmlString
}
getItems();

function Registeruser(){
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/Register',{
        method:'POST',
        headers:{
            "Accept" : "application/json",
            'Content-Type': "application/json",
        },
        body:JSON.stringify({
            'username':document.getElementById("RegistUsername").value,
            'password':document.getElementById("RegistPassword").value,
            "address":document.getElementById("RegistAddress").value
        })
    });
    const StreamPromise = fetchPromise.then(response=>response.text());
    StreamPromise.then(data=>{
        document.getElementById("RegisterResponse").innerHTML=data;
    })
}

function WriteComments(){
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/Comment',{
        method:'POST',
        headers:{
            "Accept" : "application/json",
            'Content-Type': "application/json",
        },
        body:JSON.stringify({
            'comment':document.getElementById("GuestBook").value,
            'name':document.getElementById("GuestName").value
        })
    });
    fetchPromise.then(document.getElementById("AllComments").innerHTML='<iframe src="https://cws.auckland.ac.nz/gas/api/Comments" frameborder="0" width="750px"></iframe>');
}

const RefreshComments=()=>{
    document.getElementById("AllComments").innerHTML='<iframe src="https://cws.auckland.ac.nz/gas/api/Comments" frameborder="0" width="750px"></iframe>'
}

var usr, pas;
function UserLogin(){
    usr = document.getElementById("LoginUsername").value;
    pas = document.getElementById("LoginPassword").value;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/VersionA',{
            headers:{
                "Accept" : "application/json",
                'Content-Type': "application/json",
                "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
            }
    });
    fetchPromise.then(res=>{
        if(res.status == 200){
            document.getElementById("showlogin").style.display = "none";
            document.getElementById("Login").style.display = "none";
            document.getElementById("showhome").style.backgroundColor = "lightgray";
            document.getElementById("Home").style.display = "block";
            document.getElementById("logout").style.display = "block"
            document.getElementById("logout").innerHTML = `User: ${usr}  <em class="textlogout" onclick="UserLogout()">logout</em>`;
            alert("Login Success");
        }else{
            document.getElementById("LoginResponse").innerHTML = "Uncorrect username or password.";
        }
    });
}

function UserLogout(){
    usr = null;
    pas = null;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/VersionA',{
            headers:{
                "Accept" : "application/json",
                'Content-Type': "application/json",
                "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
            }
    });
    fetchPromise.then(response=>{
        if(response.status == 401){
            alert("User Logout");
            showHome();
            document.getElementById("showlogin").style.display = "block";
            document.getElementById("logout").innerHTML = "You are not logged in yet.👩";
            document.getElementById("Quit").style.display="none";
            document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Try Game" class="btn" onclick="Pairme()" />`;
            document.getElementById("responsetext").innerHTML="";
            document.getElementById("gamechess").innerHTML=originalchess;
        }
    });
}

const BuyItems=(id)=>{
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/PurchaseItem/'+id,{
            headers:{
                "Accept" : "application/json",
                'Content-Type': "application/json",
                "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
            }
    });
    fetchPromise.then(response=>{
        if(response.status == 200){
            alert("User: "+usr+"\nYou buy: " + id +"😀");
        }else{
            alert("Please Login first!");
            showLogin();
        }
    });
}

const removedrop = (ev) =>{
    if(ev.dataTransfer !== null){
        const data=ev.dataTransfer.getData("text/plain");
        document.getElementById(data).remove();
    }
}

var gameId,state;
const Pairme=()=>{
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/PairMe',{
        method:'GET',
        headers:{
            "Accept" : "application/json",
            "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
        }
    });
    fetchPromise.then((response)=>{
        if(response.status != 200){
            alert("Please Login first!");
            showLogin();
        }
    });
    const streamPromise = fetchPromise.then((response)=>response.json());
    streamPromise.then((data)=>{
        gameId = data.gameId;
        document.getElementById("Quit").style.display="block";
        document.getElementById("responsetext").style.display="block";
        if(data.state == "wait"){
            state="wait";
            document.getElementById("responsetext").innerHTML="Waiting for opponent. You can click 'Try Game' to see if someone paired up with you.";
        }
        if(data.state == "progress"){
            state="progress";
            if(usr==data.player1){
                document.getElementById("responsetext").innerHTML=`User: <em>${usr}</em>          `+`, your opponent is <em>${data.player2}</em>`;
                document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Send your Move" class="btn" onclick="Sendyourmove()" />`;
            }
            if(usr==data.player2){
                document.getElementById("responsetext").innerHTML=`User: <em>${usr}</em>          `+`, your opponent is <em>${data.player1}</em>`;
                document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Get their Move" class="btn" onclick="Gettheirmove()" />`;
            }
        }
    });
}

const QuitGame=()=>{
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/QuitGame?gameId='+gameId,{
        headers:{
            "Accept" : "application/json",
            'Content-Type': "application/json",
            "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
        }
    });
    fetchPromise.then(response=>{
        if(response.status == 200){
                alert("Game over");
                document.getElementById("Quit").style.display="none";
                document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Try Game" class="btn" onclick="Pairme()" />`;
                document.getElementById("responsetext").innerHTML="";
                document.getElementById("gamechess").innerHTML=originalchess;
        }
    });
}

const Sendyourmove=()=>{
    mymove = document.getElementById("gamechess").innerHTML;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/MyMove',{
        method:'POST',
        headers:{
            'Content-Type': "application/json",
            "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
        },
        body:JSON.stringify({
            'gameId':gameId,
            'move':mymove
        })
    });
    const StreamPromise = fetchPromise.then(response=>response.text());
    StreamPromise.then(data=>{
        if(data == "no such game id"){
            document.getElementById("Quit").style.display="none";
            document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Try Game" class="btn" onclick="Pairme()" />`;
            alert("Your opponent quit the game.");
            document.getElementById("responsetext").innerHTML="";
            document.getElementById("gamechess").innerHTML=originalchess;
        }
        else{
            document.getElementById("responsetext").innerHTML=data;
            document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Get their Move" class="btn" onclick="Gettheirmove()" />`;
        }
    })
}

const Gettheirmove=()=>{
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/TheirMove?gameId='+gameId,{
        headers:{
            'Accept':'text/plain',
            "Authorization":"Basic "+ window.btoa(usr + ':' + pas),
        }
    });
    const StreamPromise = fetchPromise.then(response=>response.text());
    StreamPromise.then(data=>{
        if(data.length!=0){
            if(data=="(no such gameId)"){
                document.getElementById("Quit").style.display="none";
                document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Try Game" class="btn" onclick="Pairme()" />`;
                alert("Your opponent quit the game.");
                document.getElementById("responsetext").innerHTML="";
                document.getElementById("gamechess").innerHTML=originalchess;
            }
            else{
                document.getElementById("Choosebutton").innerHTML=`<input type="button" value="Send your Move" class="btn" onclick="Sendyourmove()" />`;
                document.getElementById("gamechess").innerHTML=data;
            }
        }
        else{
            document.getElementById("responsetext").innerHTML="Your opponent hasn't moved.";
            return false;
        }
    })
}