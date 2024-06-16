
        function LoadPage(pageName){
            $.ajax({
                method:"get",
                url:pageName,
                success:(response)=>{
                    $("section").html(response);
                }
            })
        }

        $(function(){

            $("#passwordContainer").hide();

            $("#signin").click(()=>{
                LoadPage(`user-login.html`);
            })
       
        var email = "";
        $("#btnGetStarted").click(()=>{
            email = $("#Email").val();
            $.ajax({
                method: "get",
                url : "http://127.0.0.1:6600/getusers",
                success : (users)=>{
                    var user = users.find(item=> item.Email===email);
                    if(user){
                        if(user.Email===email){
                            $("#passwordContainer").show();
                            $("#emailContainer").hide();
                            $("#error").hide();
                        }
                    }else{
                        $("#error").html(`User Doesn't Exist-<a id="InkRegister">Register</a>`)
                    }
                }
            })
        })
        $("#btnSignIn").click(()=>{
            $.ajax({
                method:"get",
                url:"http://127.0.0.1:6600/getusers",
                success:(users)=>{
                    var user  = users.find(item=> item.Email===email);
                    if(user){
                        if(user.Password===$("#Password").val()){
                            alert("Login Success");
                            $("#signin").html(`${user.UserName}-Signout`);
                        }else{
                            alert("Invalid Password")
                        }
                    }
                }
            })
        })

        $(document).on("click", "#lnkRegister", ()=>{
            LoadPage(`user-register.html`);
            $("#error").hide();
        })

        $(document).on("click","#btnRegister",()=>{
            var user ={
                "UserId":$("#UserId").val(),
                "UserName" : $("#UserName").val(),
                "Password" : $("#RPassword").val(),
                "Email":$("#REmail").val(),
                "Mobile":$("#Mobile").val()
            }
            $.ajax({
                method : "post",
                url: "http://127.0.0.1:6600/adduser",
                data: user
            })
            alert(`Register Successfully..`);
            LoadPage(`user-login.html`);
        })

        function LoadVideos(){
            $("section").html("");
            $.ajax({
                method:'get',
                url:'http://127.0.0.1:6600/getvideos',
                success:(videos)=>{
                    videos.map(video=>{
                        $(`<div class="box"><iframe height="200" src=${video.Url} class="card-img-top"></iframe><div>${video.Title}</div></div>`).appendTo("section");
                    })
                }
            })
        }

        $(document).on("click","#btnLogin",()=>{
            $.ajax({
                method:"get",
                url:"http://127.0.0.1:6600/getusers",
                success:(users)=>{
                    var user = users.find(item=>item.UserId==$("#LoginUserId").val());
                    if(user.UserId==$("#LoginUserId").val() && user.Password==$("#LoginPassword").val())
                    {
                        //create a cookie and store user details in cookie
                        LoadVideos();
                        $("#Signin").html(`${user.UserName} <button id="btnSignout" class="btn btn-warning">Signout</button>`)
                    }else{
                        alert(`Invalid User Name or Password`);
                    }
                }
            })
        })
   


        $(document).on("click","#btnSignout", ()=>{
            location.reload();
            //Delete Cookie and nevigate to login.
        })
    })