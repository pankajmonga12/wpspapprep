$(document).on('pagebeforeshow', '#mainPage', function ()
{
    // alert("hello");
    localStorage.setItem("siteName", "http://sarkaripariksha.com");
    // check if user id exist
    if(localStorage.getItem("spUserId") && localStorage.getItem("blogId")) // if user is already logged in 
    	{
    	  localStorage.setItem("userName", localStorage.getItem("spUserName"));
          localStorage.setItem("userId", localStorage.getItem("spUserId"));
    	// redirect him to profile page
          $.mobile.changePage("profile.html");
    	
    	}
    else if(localStorage.getItem("blogId")){
    	 
    	$.mobile.changePage("home.html");
    	
    }
});

$(document).on('pagebeforeshow', '#homePage', function ()
		{
		     //call the home page 
		    callHomePage();
		    
		});

$(document).on('click', '#submit_code', function ()
{
	 if ($('#site_code').val().length > 0 )
	    {
			       
	        var siteName = localStorage.getItem("siteName");

	        siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttSubmitCode.php";

	        var formData = $("#frm_enter").serialize();
	        
	     

	        $.ajax({
	            url: siteUrl,
	            data: formData, // Convert a form to a JSON string representation
	            type: 'post',
	            async: true,
	            dataType: "jsonp",
	            jsonpCallback: 'successCallback',
	            beforeSend: function () {
	                $.mobile.showPageLoadingMsg(true);
	            },
	            complete: function () {
	                $.mobile.hidePageLoadingMsg();
	            },
	            success: function (result)
	            { 

	                $.each(result, function (i, row)
	                {
	                    if (row.section_title == 'valid')
	                    {
	                        var blogId = row.section_id;
	                        localStorage.setItem("blogId", blogId);
	                        $.mobile.changePage("home.html");
	          			   
	                    }
	                    else
	                    {
	                        $('#msg').empty();
	                        $('#msg').append('<p>' + row.section_title + '</p>');
	                    }


	                });


	            },
	            error: function (x, t, m) {
	                alert('Network error has occurred please try again! ');
	            }
	        });



	    }
	    else
	    {
	        alert('Please fill website code!');
	    }

		});

function callHomePage()
{
	  var siteName = localStorage.getItem("siteName");
	  var blogId = localStorage.getItem("blogId");

	    var userList = {'blogId': blogId};

	    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttHome.php";


	    $.ajax({
	        type: "GET",
	        url: siteUrl,
	        data: userList,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {

	            dataT = $.trim(data);
	            $('#homePage').empty();

	            $('#homePage').append(dataT);
	            $('#homePage').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });
}
$(document).on('click', '#submit_login', function ()
{

    loginUser();
});

function loginUser()
{
    if ($('#user_name').val().length > 0 && $('#password').val().length > 0)
    {
        var userName = $('#user_name').val();
        var siteName = localStorage.getItem("siteName");

        siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttLogin.php";

        var formData = $("#frm_login").serialize();
        
       

        $.ajax({
            url: siteUrl,
            data: formData, // Convert a form to a JSON string representation
            type: 'post',
            async: true,
            dataType: "jsonp",
            jsonpCallback: 'successCallback',
            beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
            success: function (result)
            {

                $.each(result, function (i, row)
                {
                    if (row.section_title == 'valid')
                    {
                        var uid = row.section_id;

                        localStorage.setItem("userName", userName);
                        localStorage.setItem("userId", uid);
                        localStorage.setItem("spUserId", uid);
                        localStorage.setItem("spUserName", userName);
                        
                        // check if user has requested for plan purchase
                        // redirect him to checkout page directly
                        var reqPlanId= localStorage.getItem("TT_WREQUESTED_PLAN_ID");
          			    var reqExamID= localStorage.getItem("TT_WREQUESTED_CATEGORY_ID");
          			    
          			  var demoExamID= localStorage.getItem("TT_DEMO_EXAM_ID");
          			 
          			 // alert('reqPlanId=='+reqPlanId+' reqExamID=='+reqExamID);  
          			  if(reqExamID && reqPlanId)
          			    	{ 
          		           callCheckout(true);
          			    	}
          			    	else
          			    	{ 
          			    	 $.mobile.changePage("profile.html");
          			    	}
                                                    
                       
                    }
                    else
                    {
                        $('#loginmsg').empty();
                        $('#loginmsg').append('<p>' + row.section_title + '</p>');
                    }


                });


            },
            error: function (x, t, m) {
                alert('Network error has occurred please try again! ');
            }
        });



    }
    else
    {
        alert('Please fill all necessary fields');
    }

}
/*-----Logout the user------------*/
$(document).on('click', '#btn_logout', function ()
{
    localStorage.setItem("userName", "");
    localStorage.setItem("userId", "");
    
    localStorage.setItem("spUserName","");
    localStorage.setItem("spUserId", "");
	

    $.mobile.changePage("index.html");
});
/*---------End of log out code---------*/

/*-------Call Profile Page-------------------*/

$(document).on('pagebeforeshow', '#profile_page', function ()
{
    callProfilePage();
});

function callProfilePage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");
    var blogId = localStorage.getItem("blogId");  

    var userList = {'user_id': userId,'blogId':blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttProfile.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#profile_page').empty();

            $('#profile_page').append(dataT);
            $('#profile_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}

/*----------End of profile page--------------*/

function slide_me(id)
{ 
    $("#" + id).slideToggle("fast");
}
/*----------------------My Tutorial Page----------------------------*/
$(document).on('pagebeforeshow', '#mytutorial_page', function ()
{
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var blogId = localStorage.getItem("blogId");  

    var userList = {'user_id': userId,'blogId':blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMyTutorials.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#mytutorial_page').empty();

            $('#mytutorial_page').append(dataT);
            $('#mytutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
});

/*----------------Open tutorial----------------------------*/
function openTutorial(sId)
{
    $.mobile.changePage("ttViewTutorial.html");
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");
    var blogId = localStorage.getItem("blogId");

    var userList = {'user_id': userId, 'sID': sId,"blogId":blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttExamTree.php";


    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {


            dataT = $.trim(data);
            $('#view_tutorial_page').empty();

            $('#view_tutorial_page').append(dataT);
            $('#view_tutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}

function alertMsg()
{
    alert('Coming Soon.');
}

/*--------------Read Tutorial------------------*/
function readTutorial(cId, sId)
{
    $.mobile.changePage("ttReadTutorial.html");

    var siteName = localStorage.getItem("siteName");
    var blogId = localStorage.getItem("blogId");

    var dataList = {'cId': cId, 'sID': sId,'blogId':blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttViewTutorial.php";


    $.ajax({
        type: "GET",
        url: siteUrl,
        data: dataList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {


            dataT = $.trim(data);
            $('#read_tutorial_page').empty();

            $('#read_tutorial_page').append(dataT);
            $('#read_tutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}
/*--------------End of  Read Tutorial------------------*/

/*---------------Slide the tutorial content-----------------------*/
function slideDiv(id)
{
    $("#content-" + id).slideToggle("slow");
    // now check if class exist

    if ($('#head-' + id).hasClass("tutorial_header_active"))
    {
        $('#head-' + id).removeClass("tutorial_header_active");
    }
    else
    {
        $('#head-' + id).addClass("tutorial_header_active");
    }



}
/*------------------End of Slide the tutorial content------------------------------------*/

/*---------------------Login user on enter keypress-----------------------------*/
$(document).keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') // enter key press
    {
        // check if user is logged in.. if not then call login function on enter key press	
        if (localStorage.getItem("userId") == "")
        {
            loginUser();
        }


    }


});
/*-------------------------------------------------------------------------------*/

/*-----------------------------My Exam Page----------------------------------------*/

$(document).on('pagebeforeshow', '#my_exam_page', function ()
{
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var blogId = localStorage.getItem("blogId");  

    var userList = {'user_id': userId,'blogId':blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMyExams.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#my_exam_page').empty();

            $('#my_exam_page').append(dataT);
            $('#my_exam_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
});
/*----------------------------------------------------------------------------------*/

function showAlert(msg)
{
    alert(msg);
}



function startMockTest(sId)
{
    var siteName = localStorage.getItem("siteName");
    $.mobile.changePage("ttMockTest.html");

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMockTest.php";
    var formData = $("#frmStartMock" + sId).serialize();

    //alert(formData);

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#mock_test_page').empty();

            $('#mock_test_page').append(dataT);
            $('#mock_test_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}

$(document).on('click', '#show_area2', function ()
{
    // check if user selected instruction checkbox
    if ($('#chk_accept').is(':checked'))
    {
        $('#instruction_area1').css({'display': 'none'});
        $('#instruction_area2').css({'display': 'block'});
    }
    else
    {
        alert('Please tick instructions checkbox!');
    }
});

$(document).on('click', '#start_test', function ()
{
    $('#instruction_area2').css({'display': 'none'});
    $('#question_div').css({'display': 'block'});
    //get site url
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var sID = $("#sID").val();
    var view = $("#view").val();
    var exam_category_id = $('#exam_category_id').val();
    
    var blogId = localStorage.getItem("blogId");  

    var formData = {'user_id': userId, 'sID': sID, 'view': view, 'exam_category_id': exam_category_id,'blogId':blogId};


    var siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMockQuestion.php";

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            $('#tt_time_div').css({'display': 'block'});
            $('#dashboard').css({'display': 'block'});
            $("#question_div").html(data);
            $('#question_div').trigger('create');
            setCountDown(); // start timer
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('We are unable to load page,Please try again');
            $('#instruction_area1').css({'display': 'block'});
        }

    });


});







/*-------------------------Mock test functions-------------------------------*/
//-------------Next button click -----------------
$(document).on('click', '.tet_mock_next', function ()
{

    var buttonId = this.id;
    var id = parseInt(buttonId.substring(7));
    var prevId = 'ques_' + id;
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();

    var url = localStorage.getItem("siteName");

    // check if radio button is checked 
           var radioName = 'rd_ans' + id;
     
     if ($('input[name=' + radioName + ']:checked').length)
     // button is checked mark thsi question as attempted
     {
     
     var qid = "Q" + id;
     // remove this question from pending list
     var removeId = "tt_pend_q" + id;
     //$("#"+removeId  ).remove();
     
     $("#" + removeId).css({'background-color': '#00CC00', 'border': '1 px solid #00CC00'});
     
     }
   

    ++id;

    var nextId = 'ques_' + id;

    // alert('next==>'+prevId+'  '+nextId);

    $('#' + prevId).css({'display': 'none', 'width': '100%'});
    $('#' + nextId).css({'display': 'block', 'width': '100%'});
    $('#tet_previous' + id).css({'display': 'block'}); // show previous button 
    $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button 

    // save the current display question id 
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();
   
    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button 
    }



    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();

    var ques_id = $('#q_id' + id).val();


    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);

});
//-------------End of next  button click -----------------



//------------ PREVIOUS BUTTON CLICK--------------------

$(document).on('click', '.tet_prevoius', function ()
{
    var buttonId = this.id;
    var id = parseInt(buttonId.substring(7));
    var curId = 'ques_' + id;
    var url = localStorage.getItem("siteName");
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();

    // check if radio button is checked 
      var radioName = 'rd_ans' + id;
     if ($('input[name=' + radioName + ']:checked').length)  // button is checked mark thsi question as attempted
     {
     var qid = "Q" + id;
     // change the color of question 
     var removeId = "tt_pend_q" + id;
     //$("#"+removeId  ).remove();
     $("#" + removeId).css({'background-color': '#00CC00'});
     
     }
   
    --id;

    var prevId = 'ques_' + id;

    //   alert('next==>'+prevId+'  '+nextId);

    $('#' + curId).css({'display': 'none', 'width': '100%'});
    $('#' + prevId).css({'display': 'block', 'width': '100%'});
    if (id == 1)
    {
        $('#tet_previous' + id).css({'display': 'none'});
        $('#tet_previous_disable' + id).css({'display': 'block'}); // show previous button 
    }
    else
    {
        $('#tet_previous' + id).css({'display': 'block'});
        $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button 
    }

    // save the current display question id 
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();

    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button 
    }


    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();

    var ques_id = $('#q_id' + id).val();

   

    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);

});
//-------------END OF PREVIOUS BUTTON CLICK-------------

function saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id)
{
    var formData = {'test_taken_id': test_taken_id, 'time_taken': time_taken, 'question_id': ques_id, 'module_id': module_id, 'subject_id': subject_id, 'ip': '0'};

    var siteName = localStorage.getItem("siteName");
    var siteUrl = siteName + "/wp-content/plugins/tet-india/tt_save_exam_time.php";

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
        	var saveRes = data;
        },
        error: function (jqXHR, status, errorThrown)
        {

        }

    });
}


$(document).on('pagebeforeshow', '#my_word_page', function ()
{
    callMywordPage();
});

function callMywordPage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMyword.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#my_word_page').empty();

            $('#my_word_page').append(dataT);
            $('#my_word_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}



/*------------- End Of Word Page --------------*/
/*----------------------------------------------------------------------------*/

// save answer on radio button click

//$(document).on('click', '.tt_test_option', function ()
$(document).on('change', '[type="radio"].tt_test_option', function() 
{

    var url = localStorage.getItem("siteName");

    var buttonId = this.name;
   
    var answer = $('#' + this.id).val();
    var id = parseInt(buttonId.substring(6));
   
    var ques_id = $('#q_id' + id).val();
    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();
    var test_taken_id = $('#test_taken_id').val();
    var idAddress = 0;
    var time_taken = $('#time_taken').val();


    var siteUrl = url + "/wp-content/plugins/tet-india/tt_save_test_question.php";
    
   
    formData = {"test_taken_id": test_taken_id, "ip": idAddress, "question_id": ques_id, "answer":
                answer, "module_id": module_id, "subject_id": subject_id, "time_taken": time_taken};

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
          
        },
        complete: function () {
          
        },
        success: function (data, status)
        {
            var saveRes = data;
        },
        error: function (jqXHR, status, errorThrown)
        {

        }

    });
});



/*--------- Ranking Page -----------------------*/

$(document).on('pagebeforeshow', '#my_ranking_page', function ()
{
    callRankingPage();
});

function callRankingPage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttRanking.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#my_ranking_page').empty();

            $('#my_ranking_page').append(dataT);
            $('#my_ranking_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}



/*------------- End Of Raanking Page --------------*/

/*---------------------------------------------------------------------------------*/
/*--------------------------Save pending Test--------------------------------------*/

$(document).on('click', '#tt_btn_save', function ()
		{
			if(confirm("Are you sure to save and exit the exam??"))
			{
		    var url = localStorage.getItem("siteName");

		  
		    var siteUrl = url + "/wp-content/plugins/tet-india/mWhiteLabel/ttSavePendingTest.php";
		    
		   // alert(siteUrl);

		    var formData = $("#frmMockTest").serialize();
		    
		  //  alert(formData);
		    $.ajax({
		        type: "POST",
		        url: siteUrl,
		        data: formData,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		        	   $.mobile.changePage("profile.html");
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		        	alert("there is some error whie saving the exam.");
		        	   $.mobile.changePage("profile.html");
		        }

		    });
			}
		});

/*-----------------------------------------------------------------------------------*/

$(document).on('click', '#tt_at_q_hd', function ()
		{
	
	$("#tt_q_left").slideToggle("slow");
    $("#tt_pend_div").slideToggle("slow");
});
/*-----------------------------------------------------------------------------------------*/

// add onclick event for pending question link
// this will display that question
$(document).on('click', '.tt_pend_q', function ()
{
	//alert('id');
    var buttonId = this.id;

    var id = parseInt(buttonId.substring(9));
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();
   

    // get the current display question id 
    var currentId = $("#currentQuestionId").val();
    var currentQuestionId = 'ques_' + currentId;
    

    // check if radio button is checked 
    var radioName = 'rd_ans' + currentId;
    if ($('input[name=' + radioName + ']:checked').length)  // button is checked mark thsi question as attempted
    {

        var qid = "Q" + currentId;
        // change the color of question 
        var removeId = "tt_pend_q" + currentId;
        //$("#"+removeId  ).remove();
        $("#" + removeId).css({'background-color': '#00CC00'});

    }

    var targetQuestionId = 'ques_' + id;




    $('#' + currentQuestionId).css({'display': 'none', 'width': '100%'}); // hide current question
    $('#' + targetQuestionId).css({'display': 'block', 'width': '100%'}); // display target question

    // save the current display question id 
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();

    // alert(id+' max=='+MaxQuestionNo)

    // display and hide the next and previus button
    if (id == 1) // hide the previous button
    {
        $('#tet_previous' + id).css({'display': 'none'});
        $('#tet_previous_disable' + id).css({'display': 'block'}); // show previous button 
    }
    else
    {
        $('#tet_previous' + id).css({'display': 'block'});
        $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button 
    }
    
    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button 
    }

    // save total time taken by user
  var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();
    var idAddress = $('#ipAdress').val();
     var ques_id = $('#q_id' + id).val();
    
  
  
 
    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);
    
    $("#tt_q_left").slideToggle("slow");
    $("#tt_pend_div").slideToggle("slow");
});

/*----------------------------------------------------*/
function viewHistory(testId){
		    var siteName = localStorage.getItem("siteName");
		    var userId = localStorage.getItem("userId");
		    
		    $.mobile.changePage("viewHistory.html");
		    var blogId = localStorage.getItem("blogId"); 

		    var userList = {'user_id': userId,'testId':testId,'blogId':blogId};
		    
	 
		    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttViewHistory.php";

		    $.ajax({
		        type: "GET",
		        url: siteUrl,
		        data: userList,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		            dataT = $.trim(data);
		            $('#tt_history_page').empty();

		            $('#tt_history_page').append(dataT);
		            $('#tt_history_page').trigger('create');
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
		}

 
$(document).on('click', '.ttMenuLi', function ()
		{

	 $("#ttMenu").children().removeClass("current");
	
    var buttonId = this.id;

	$("#"+buttonId).addClass('current');

	// hide all graph div
	$(".graphDiv").css({'display': 'none'});
	// display only selected menu div

	$("#"+buttonId+'_div').css({'display': 'block'});
		});  

$(document).on('click', '#submit_mock_test', function ()
{

	submitMockExam();

});


 function submitMockExam()
 {
	 
	 $.mobile.changePage("mockResult.html");
     var siteName = localStorage.getItem("siteName");

     siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMockTestResult.php";
     
  //   alert(siteUrl);

     var formData = $("#frmMockTest").serialize();
     
    // alert(formData);

		        $.ajax({
		            url: siteUrl,
		            data: formData, // Convert a form to a JSON string representation
		            type: 'post',
		            cache: false,
		            dataType: "text",
		            beforeSend: function () {
		                $.mobile.showPageLoadingMsg(true);
		            },
		            complete: function () {
		                $.mobile.hidePageLoadingMsg();
		            },
		            success: function  (data, status)
		            { 
		            	//alert('success mock');
		            	
		            	  dataT = $.trim(data);
				            $('#mock_result_page').empty();

				            $('#mock_result_page').append(dataT);
				            $('#mock_result_page').trigger('create');


		            },
		            error: function (x, t, m) {
		            	$('#tet_loading_img').css({'display': 'none'});
		                alert('Network error has occurred please try again! ');
		            }
		        });
 }
 
 $(document).on('change', '[type="radio"].myClass', function(){ 
     alert('Change');
    // var buttonId = this.name;
     var answer = $('#' + this.id).val();
     alert('val'+answer);
 }); 
 
 $(document).on('pagebeforeshow', '#my_exam_his_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");
			    var blogId = localStorage.getItem("blogId"); 
			    
			    var userList = {'user_id': userId,'blogId':blogId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMyHistory.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_exam_his_page').empty();

			            $('#my_exam_his_page').append(dataT);
			            $('#my_exam_his_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 
 function resumeExam(testTakenId)
 {
	     var siteName = localStorage.getItem("siteName");
	     $.mobile.changePage("ttMockTest.html");

	     siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMockTest.php";
	    // alert("#frmPendingExam" + testTakenId);
	     
	     var formData = $("#frmPendingExam" + testTakenId).serialize();

	   //  alert(formData);

	     $.ajax({
	         type: "POST",
	         url: siteUrl,
	         data: formData,
	         cache: false,
	         dataType: "text",
	         beforeSend: function () {
	             $.mobile.showPageLoadingMsg(true);
	         },
	         complete: function () {
	             $.mobile.hidePageLoadingMsg();
	         },
	         success: function (data, status)
	         {
	             dataT = $.trim(data);
	             $('#mock_test_page').empty();

	             $('#mock_test_page').append(dataT);
	             $('#mock_test_page').trigger('create');
	           //  alert('succ');
	         },
	         error: function (jqXHR, status, errorThrown)
	         {
	             alert('Network error has occurred please try again!');
	         }

	     });
	 }

 
 $(document).on('click', '#start_pending_test', function ()
{
	 $('#instruction_area2').css({'display':'none'});
	 $('#question_div').css({'display':'block'});
	        //get site url
	       
	        var siteName = localStorage.getItem("siteName");
	        var sID= $("#sID").val();
	        var view= $("#view").val();
	        var userId = localStorage.getItem("userId");
	        var testTakenId=$("#test_taken_id").val();
	         
	        var formData = {'user_id': userId, 'sID': sID, 'view': view, 'testTakenId': testTakenId};

	        
	        var siteUrl=siteName+"/wp-content/plugins/tet-india/mWhiteLabel/ttMockPendingQuestion.php" ;
	       
	        $.ajax({
	            type: "POST",
	            url: siteUrl,
	            data: formData,
	            cache: false,
	            dataType: "text",
	            beforeSend: function () {
	                $.mobile.showPageLoadingMsg(true);
	            },
	            complete: function () {
	                $.mobile.hidePageLoadingMsg();
	            },
	            success: function (data, status)
	            {
	                $('#tt_time_div').css({'display': 'block'});
	                $('#dashboard').css({'display': 'block'});
	                $("#question_div").html(data);
	                $('#question_div').trigger('create');
	                setCountDown(); // start timer
	            },
	            error: function (jqXHR, status, errorThrown)
	            {
	                alert('We are unable to load page,Please try again');
	                $('#instruction_area1').css({'display': 'block'});
	            }

	        });
	       
});
 
 $(document).on('pagebeforeshow', '#my_account_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    
			    var blogId = localStorage.getItem("blogId");  

			    var userList = {'user_id': userId,'blogId':blogId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttAccountHeader.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_account_page').empty();

			            $('#my_account_page').append(dataT);
			            $('#my_account_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 $(document).on('pagebeforeshow', '#personal_info_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");
			    var blogId = localStorage.getItem("blogId");  

			    var userList = {'user_id': userId,'display':"personal_info","blogId":blogId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttPersonalInfo.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#personal_info_page').empty();

			            $('#personal_info_page').append(dataT);
			            $('#personal_info_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 /* change city on state change */
 $(document).on('change', '#cmbState', function ()
 {

     var state = $(this).val();

     state = state.replace(/ /g, '%20');
     var siteName = localStorage.getItem("siteName");
     siteUrl=siteName+"/wp-content/plugins/tet-india/get_city.php";
    // $("#cmbCity").load(siteName+"/wp-content/plugins/tet-india/get_city.php?state=" + state);
     
     var List = {'state': state};
     
     $.ajax({
	        type: "GET",
	        url: siteUrl,
	        data: List,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	            $('#cmbCity').empty();

	            $('#cmbCity').append(dataT);
	            $('#cmbCity').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });

 });
$(document).on('click', '#submit_per_info', function ()
		{
	
	if(validatePersonalForm())
		{
    var siteName = localStorage.getItem("siteName");
    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttPersonalInfo.php";
    var formData = $("#frmPersInfo").serialize();

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#personal_info_page').empty();

            $('#personal_info_page').append(dataT);
            $('#personal_info_page').trigger('create');
         
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
		}
});
 
$(document).on('click', '#submit_acc_info', function ()
		{
	
	if(validateAccountForm())
		{
    var siteName = localStorage.getItem("siteName");
    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttPersonalInfo.php";
    var formData = $("#frmAccount").serialize();

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#account_page').empty();

            $('#account_page').append(dataT);
            $('#account_page').trigger('create');
         
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
		}
});

function validatePersonalForm()
{
	 if ($('#billing_first_name').val() == '')
	    {

	       alert("Please Enter First Name.");
	        return false;
	    }
	    if ($('#billing_last_name').val() == '')
	    {
	    	alert("Please Enter Last Name.");
	        return false;
	    }
	    if ($('#billing_address_1').val() == '')
	    {
	    	alert("Please Enter Address.");
	        return false;
	    }
	    if ($('#cmbState').val() == '')
	    {
	    	alert("Please Enter State.");
	        return false;
	    }
	    if ($('#cmbCity').val() == '')
	    {
	    	alert("Please Enter City.");
	        return false;
	    }
	    if ($('#billing_postcode').val() == '')
	    {
	    	alert("Please Enter ZipCode.");
	        return false;
	    }

	    if ($('#billing_email').val() == '')
	    {
	    	
	    	alert("Please Enter Email.");
	        return false;
	    }
	    else
	    	{
		    	if( !isValidEmailAddress( $('#billing_email').val() ) ) 
	    		{
		    		alert("Please Enter Valid Email.");
			        return false
	    		}
	    	}

	    if ($('#billing_phone').val()  == '')
	    {
	    	alert("Please Enter Phone.");
	        return false;
	    }
	    return true;
	}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

$(document).on('pagebeforeshow', '#account_page', function ()
		{
		    var siteName = localStorage.getItem("siteName");
		    var userId = localStorage.getItem("userId");
		    
		    var blogId = localStorage.getItem("blogId");  
		    var userList = {'user_id': userId,'display':"account_info","blogId":blogId};

		    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttPersonalInfo.php";

		    $.ajax({
		        type: "GET",
		        url: siteUrl,
		        data: userList,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		            dataT = $.trim(data);
		            $('#account_page').empty();

		            $('#account_page').append(dataT);
		            $('#account_page').trigger('create');
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
		});

function callRegistrationForm()
{
	var siteName = localStorage.getItem("siteName");
	 

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttRegistrationForm.php";
  
    var blogId = localStorage.getItem("blogId");

    var userList = {'blogId': blogId};

    
    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        data:userList,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
          
            $('#registration_page').empty();

            $('#registration_page').append(dataT);
            $('#registration_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
	}

// Get registration form
$(document).on('click', '#btn_regis', function ()
{
	  $.mobile.changePage("ttRegistrationPage.html");
	  
	  callRegistrationForm();
		   
		});

// submit registration 
$(document).on('click', '#submit_register', function ()
{
	if(validateForm()) // chek for validation
	{
	       
	        var siteName = localStorage.getItem("siteName");

	        siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttRegisterUser.php";

	        var formData = $("#frmRegister").serialize();
	        
	    // alert(formData);

	        $.ajax({
	            url: siteUrl,
	            data: formData, // Convert a form to a JSON string representation
	            type: 'post',
	            cache: false,
		        dataType: "text",
	            beforeSend: function () {
	                $.mobile.showPageLoadingMsg(true);
	            },
	            complete: function () {
	                $.mobile.hidePageLoadingMsg();
	            },
	            success: function (data, status)
		        { 
		            dataT = $.trim(data);
		            $('#register_msg').empty();
		            $('#register_msg').append(dataT);
		            
		        },
	            error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
	    }
	

	            
});

function validateForm()
{
	 if ($('#phone').val().length > 0 && $('#password').val().length > 0 && $('#password_repeat').val().length > 0 && $('#email').val().length > 0)
		 {
		  if($('#password').val()==$('#password_repeat').val())
			  {
			  // chek for valid email
			  if( !isValidEmailAddress( $('#email').val() ) ) 
	    		{
		    		alert("Please Enter Valid Email.");
			        return false;
	    		}
			  else
				  {
				  return true;
				  }
			  
			  }
		  else
			  {
			  	alert('Passwords do not match!');
				 return false;
			  }
		 }
	 else
		 {
		 alert('Please fill all the fields!');
		 return FALSE;
		 }
}
function loadLoginPage()
{
	$.mobile.changePage("ttLoginPage.html");
	
	var blogId=  localStorage.getItem("blogId");
 	var siteName = localStorage.getItem("siteName");
 	var userList = {'blogId': blogId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttLoginForm.php";
    
    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
           
            $('#login_page').empty();

            $('#login_page').append(dataT);
            $('#login_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('mNetwork error has occurred please try again!');
        }

    });
}
$(document).on('click', '#btn_login', function ()
		{
			
			loadLoginPage();
	  
		});
 
$(document).on('click', '#btn_search_exam', function ()
		{
	
	  $.mobile.changePage("ttExamCategortyPage.html");
		var siteName = localStorage.getItem("siteName");
		 

	    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttExamCategory.php";
	    
	    $.ajax({
	        type: "GET",
	        url: siteUrl,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	           
	            $('#exam_category_page').empty();

	            $('#exam_category_page').append(dataT);
	            $('#exam_category_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });
	  
		});
		
function openDiv(id)
{
	if(id=="hnd")
		{
		 $('#block_eng').css({'display':'none'});
		 $('#block_hnd').css({'display':'block'});
		}
	else
		{
		 $('#block_hnd').css({'display':'none'});
		 $('#block_eng').css({'display':'block'});
		}
	 
	}

function showExamPage(id)
{
	  $.mobile.changePage("ttExamPage.html");
		var siteName = localStorage.getItem("siteName");
	    var blogId = localStorage.getItem("blogId"); 
		
		var dataList={'examCategoryId':id,'blogId':blogId};
		

	    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttExamPage.php";
	    
	    $.ajax({
	        type: "GET",
	        url: siteUrl,
	        cache: false,
	        data:dataList,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	           
	            $('#exam_page').empty();

	            $('#exam_page').append(dataT);
	            $('#exam_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });
	}
/* close the app on back button press*/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
     var notificationOpenedCallback = function(jsonData) {
  if (jsonData.additionalData) {
    if (jsonData.additionalData.yourUrlKey)
      location.href = jsonData.additionalData.yourUrlKey;
  }
}

  window.plugins.OneSignal.init("9acfc00b-bac7-4113-a9c1-8023992dc8ee",
                                 {googleProjectNumber: "128221655071",
                               autoRegister: true},
                                 notificationOpenedCallback);

  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);
}
function onBackKeyDown() 
{ 
	if(confirm('Do you want to close the app??'))
	{
		navigator.app.exitApp();
	}
	
}

/* close the app on back button press*/

function buy_now(exam_page_id)
{ 
	$.mobile.changePage("ttBuyNowPage.html");
	var siteName = localStorage.getItem("siteName");
	var blogId = localStorage.getItem("blogId"); 
	 
	  if(localStorage.getItem("userId")) // if user is already logged in 
		   {
		  var dataList={'exam_page_id':exam_page_id,'user_id':localStorage.getItem("userId"),'blogId':blogId};
		   }
	  else
		  {
		  var dataList={'exam_page_id':exam_page_id,'blogId':blogId};	  
		  }
	
	

    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttBuyNow.php";
    
    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        data:dataList,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
           
            $('#buy_now_page').empty();

            $('#buy_now_page').append(dataT);
            $('#buy_now_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}
/* change plan desc and price on plan change and onmdeium change*/
function changeDesc()
{

    var selected = $("input[type='radio'][name='medium_id']:checked");
    if (selected.length > 0) {
        medium = selected.val();
    }
    else
    {
        medium = 1;
    }



    if (medium == "1")
    {
        var prefix = "e";
    }
    else
    {
        var prefix = "h";
    }
    var plan = $('#plans').val();
    var id = '#' + prefix + 'Plan' + plan;
   
    //alert(plan+' md='+medium);
    if (plan == 6) // display subject if user has selected one subject plan
    {
        $('.subDivClass').css({'display': 'none'});
        $('#subDiv' + medium).css({'display': ''});
    }
    else
    {
        $('.subDivClass').css({'display': 'none'});
    }

    $('.planDesc').css({'display': 'none'});
    $(id).css({'display': 'block'});

    // display the related price div

 
    $('.priceDvClass').css({'display': 'none'});
    $("#priceDv" + plan).css({'display': 'block'});



}
 

$(document).on('change', '[type="radio"].rd_medium', function() 
{
 
	changeDesc();
       //uncheked allready select subject
    $("input[type='radio'][name='sub_category_id']").attr("checked", false);
    
    
});



$(document).on('change', '#plans', function ()
 {

	changeDesc();
     //uncheked allready select subject
    $("input[type='radio'][name='sub_category_id']").attr("checked", false);
    
    

});

/*------------------ check out page ---------*/
$(document).on('click', '#checkout', function ()
		{
	 
	// check for validation
	if(validateCheckoutForm())
	{
		
		  var selectedPaymentMode = $("input[type='radio'][name='rd_scr_code']:checked");
	    	selectedPaymentModeValue= selectedPaymentMode.val();
	  
		
		// 	check if user is logged in
		var userId = localStorage.getItem("userId");
		if(userId!="")
			{
			 
			// call checkout page 
			$.mobile.changePage("ttCheckOutPage.html");
			callCheckout(false);
			}
		else // redirect user to register/ login  page
			{
			 
			// call checkout page 
			var reqPlanId= $('#plans').val();
			  var selected = $("input[type='radio'][name='medium_id']:checked");
			    if (selected.length > 0) {
			        medium = selected.val();
			    }
			    else
			    {
			        medium = 1;
			    }
			    // 	get payment mode    
			   
		   
		   
		    
		    	localStorage.setItem("TT_SCRATCH_CARD",0);
			    if(reqPlanId==6)// one subject plan
			    	{
			     	var selectedSub = $("input[type='radio'][name='sub_category_id']:checked");
		    		 if (selectedSub.length > 0) {
		    			 var reqExamId=  selectedSub.val();
		    			// alert(reqExamId);
		    		 }
		    		 
			    	}
			    else
			    	{
				    	if(medium==1) // choose english exam
				    	{
				    	var reqExamId= $('#engExamId').val();
				    	}
				    	else
				    	{
				    	var reqExamId= $('#hindiExamId').val();
				    	}
			    	}
			   
			
			    

		    localStorage.setItem("TT_WREQUESTED_CATEGORY_ID",reqExamId);
			localStorage.setItem("TT_WREQUESTED_PLAN_ID", reqPlanId);
			
		
			loadLoginPage();
			
			}
	}
		});

function validateCheckoutForm()
{
// check if user has selected any medium
	 var selected = $("input[type='radio'][name='medium_id']:checked");
	    if (selected.length > 0) {
	    	// check what payment mode user has selected
	    	var selectedPaymentMode = $("input[type='radio'][name='rd_scr_code']:checked");
	    	selectedPaymentModeValue= selectedPaymentMode.val();
	    	
	    	
	    	
	        // check selected plan
	    	var reqPlanId= $('#plans').val();
	    	if(reqPlanId==6)// one subject plan
	    	{
	    		// check if user has selected any one subject
	    		var selectedSub = $("input[type='radio'][name='sub_category_id']:checked");
	    		 if (selectedSub.length == 0) {
	    			 alert('Please select any one subject');
	    			 return false;
	    		 }
	    		 else
	    			 {
	    				return true;
	    			 }
	    	}
	    	else
	    		{
	    		//alert('selected');
	    		return true;
	    		}
	    		
	    }
	    else
	    {
	    alert('Please select any medium!');
	    return false;
	    }
}
		
function callCheckout(condition)
{
	  var url = localStorage.getItem("siteName");
	  var blogId = localStorage.getItem("blogId"); 
	  
	    var siteUrl = url + "/wp-content/plugins/tet-india/mWhiteLabel/ttCheckOutPage.php";
	    
	   if(condition) // user has requested the plan purchase
		   {
			var reqPlanId= localStorage.getItem("TT_WREQUESTED_PLAN_ID");
		    var reqExamID=	   localStorage.getItem("TT_WREQUESTED_CATEGORY_ID");
		    var user_id=   localStorage.getItem("userId");
		    $.mobile.changePage("ttCheckOutPage.html");
		   // check if user has selected scratch card code
		  
		  
			   
		    var formData={'dierctCheckout':1,'plans':reqPlanId,'examId':reqExamID,'user_id':user_id,'blogId':blogId};
			  
			  
		    var reqPlanId= localStorage.setItem("TT_WREQUESTED_PLAN_ID","");
		    var reqExamID= localStorage.setItem("TT_WREQUESTED_CATEGORY_ID","");
			  
		   }
	   else
		   {
		   var formData = $("#frmBuy").serialize();
		   }
	  
	    
	  //  alert(formData);
	    $.ajax({
	        type: "POST",
	        url: siteUrl,
	        data: formData,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	        	
	        	 dataT = $.trim(data);
	            
	            $('#checkout_page').empty();

	            $('#checkout_page').append(dataT);
	            $('#checkout_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	        	alert('Network error has occurred please try again!');
	        	  
	        }

	    });
}

$("#payment_method_cheque").click(function () {

  
    $("#tt_payment_cheque").slideDown('slow');
    $("#tt_payment_online_trans").slideUp('slow');
    
    $("#frmCheckout").attr("action", "");

});

 $("#payment_method_online_trans").click(function () {

    
    $("#tt_payment_cheque").slideUp('slow');
    $("#tt_payment_online_trans").slideDown('slow');
    
    $("#frmCheckout").attr("action", "");

});
 
 // apply discount code
 $(document).on('click', '#btn_apply_disc', function ()
 	        {
	            var code = $("#txtDiscountCode").val();
	            var plan_id = $("#plans").val();
	            var url = localStorage.getItem("siteName");

	            //   fancybox_loading
	            $('#tet_loading_img').css({'display': 'block'});

	            var discountUrl = url + "/wp-content/plugins/tet-india/tt_discount_price.php?" +
	                    "dCode=" + code + "&pID=" + plan_id;

	           // alert(discountUrl);

	            var jqxhr = $.get(discountUrl);

	            jqxhr.success(function (data)
	            {
	            	$('#tet_loading_img').css({'display': 'none'});

	                if (data == 'false')
	                {
	                    // get original cost
	                    var orgPrice = $("#orgCost").val();

	                    $("#txtDiscountCode").val('');
	                    $("#amount").html('Rs. ' + orgPrice); // refresh the plan cost
	                    $("#dicsountMsg").html('Invalid Discount Code');
	                    //$("#payment_methods").css({'display': 'block'});
	                    $("#online_payment_hidden").val(1);
	                    
	                    $("#chk_pay").css({'display': 'block'});
	           
	                }
	                else
	                { 
	                    $("#dicsountMsg").html('');
	                    $("#dicsountMsg").html('Discount Code Applied.');
	                    $("#amount").html(data);
	                    //$("#payment_methods").css({'display': 'none'});
	                    $("#online_payment_hidden").val(0);
	                    
	                    $("#chk_pay").css({'display': 'none'});
	                    $("#payment_method_cheque").css({'display': 'none'});
	                    
	                //    alert('chk_pay. payment_method_cheque');
	                     // select online payment radio button // there is only one option for discount customer
	                    $('input:radio[name=payment_method]')[0].checked = true;
	                    

	                }
	            });

	            jqxhr.error(function (data)
	            {
	                $('#tet_loading_img').css({'display': 'none'});
	                alert('We are unable to load page,Please try again');

	            });


	        });
 
 
 function submitCheckoutForm(type)
 {
	 
	 var url = localStorage.getItem("siteName");
	 
	
	var siteUrl = url + "/wp-content/plugins/tet-india/mWhiteLabel/ttSubmitCheckout.php";
	//alert(siteUrl)	;	
		
	 var formData = $("#frmCheckout").serialize();
    
	   
     
 
	
		$.ajax({
		  type: "POST",
		  url: siteUrl,
		  data: formData,
		  cache: false,
		  dataType: "text",
		  beforeSend: function () {
		      $.mobile.showPageLoadingMsg(true);
		  },
		  complete: function () {
		      $.mobile.hidePageLoadingMsg();
		  },
		  success: function (data, status)
		  {
		  	
		  	 dataT = $.trim(data);
		      
		      $('#checkout_page').empty();
		
		      $('#checkout_page').append(dataT);
		      $('#checkout_page').trigger('create');
		  },
		  error: function (jqXHR, status, errorThrown)
		  {
		  	alert('Network error has occurred please try again!');
		  	  
		  }
		
		});
 }
 
 $(document).on('change', '[type="radio"]#payment_method_online_trans', function()
{
	 $('#tt_payment_online_trans').css({'display':'block'});
     $('#tt_payment_cheque').css({'display':'none'});
});
 
 $(document).on('change', '[type="radio"]#payment_method_cheque', function()
{
		$('#tt_payment_online_trans').css({'display':'none'});
		$('#tt_payment_cheque').css({'display':'block'});
});

function startDemoTest(demoExamID)
{
     var user_id= localStorage.getItem("userId");
    // console.log('user ID : '+user_id);
// check if user is logged in if not send him to login page
    if(user_id!="")
        {
            //console.log('mock test');
        openMockTest(demoExamID);
        }
    else // redirect user to login page
        {
            

            //console.log('mock test login');
            localStorage.setItem("TT_DEMO_EXAM_ID", demoExamID);
            loadLoginPage();

        }
}
 function openMockTest(examID)
 {
     var siteName = localStorage.getItem("siteName");
     $.mobile.changePage("ttMockTest.html");
     
     var user_id= localStorage.getItem("userId");

     siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMockTest.php";
     var formData = {'view':'Demo','user_id':user_id,'pCID':examID,'testType':'new'};

    // alert('user_id='+user_id+' pCID='+examID);

     $.ajax({
         type: "POST",
         url: siteUrl,
         data: formData,
         cache: false,
         dataType: "text",
         beforeSend: function () {
             $.mobile.showPageLoadingMsg(true);
         },
         complete: function () {
             $.mobile.hidePageLoadingMsg();
         },
         success: function (data, status)
         {
             dataT = $.trim(data);
             $('#mock_test_page').empty();

             $('#mock_test_page').append(dataT);
             $('#mock_test_page').trigger('create');
         },
         error: function (jqXHR, status, errorThrown)
         {
             alert('Network error has occurred please try again!');
         }

     });
 }
 
 function validateAccountForm()
 {
	 if ($('#userPwd').val() != $('#userCnfPwd').val())
	    {
		    alert("Password do not match");
	        return false;
	    }

	    if ($('#userEmail').val() == '')
	    {
	    	
	    	alert("Please Enter Email.");
	        return false;
	    }
	    else
	    	{
		    	if( !isValidEmailAddress( $('#userEmail').val() ) ) 
	    		{
		    		alert("Please Enter Valid Email.");
			        return false
	    		}
	    	}
  	    return true;
 }
 
 $(document).on('pagebeforeshow', '#my_plan_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var blogId = localStorage.getItem("blogId");  

			    var userList = {'user_id': userId,'blogId':blogId};
			    

			    siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttMyPlans.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_plan_page').empty();

			            $('#my_plan_page').append(dataT);
			            $('#my_plan_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 
 
 
 
 $(document).on('change', '#cmbCategory', function ()
 {

     updateExam();
     

 });


 function updateExam()
 {
     var categoryId = $('#cmbCategory').val();
     var medium = $('#cmbMedium').val();
    
    
       var siteName = localStorage.getItem("siteName");
     var url = siteName+"/wp-content/plugins/tet-india/tt_get_exams.php?category=" + categoryId + "&medium=" + medium ;
      
     $.ajax({
         type: "GET",
         url: url,
         cache: false,
         dataType: "jsonp",
         jsonpCallback: 'successCallback',
         beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
         success: function (data)
         {
             $('#cmb_exam').empty();
             $.each(data, function (i, row)
             {
                 //  alert('succ'+row.strMessage);
                 $('#cmb_exam').append(row.strMessage);
                 $('#cmb_exam').trigger('create');

             });

         },
         error: function onError(jqXHR, errorThrown) {
             //  alert('Network error has occurred please try again! ');
         }

     });
 }
 
  
 
 $(document).on('change', '#cmbMedium', function ()
		 {
		   
		     // update exam if user has selected category
		     var categoryId = $('#cmbCategory').val();

		     if (categoryId != 0 )
		     {
		         updateExam();

		     }
	});
 
 function names(val, fieldId) {

	    if ($.isNumeric(val.slice(-1))) {
	        alert("Numeric values not allowed.");
	        $('#' + fieldId).val(val.substr(0, val.length - 1));
	    }
	    if (/^[a-zA-Z0-9- ]*$/.test(val) == false) {
	        alert("Special characters not allowed.");
	        $('#' + fieldId).val(val.substr(0, val.length - 1));
	    }


	}
 $(document).on('change', '[type="radio"]#b_rd_sc', function() 
		 {
	 		$('#rd_scr_code_div').css({"display":"block"});
	 		$('#rd_online_div').css({"display":"none"});
	 		$('#rd_online_div1').css({"display":"none"});
	 		
		 });
 
 
 $(document).on('change', '[type="radio"]#b_rd_plans', function()
 		 {
	 		$('#rd_scr_code_div').css({"display":"none"});
	 		$('#rd_online_div').css({"display":"block"});
	 		$('#rd_online_div1').css({"display":"block"});
		 });
 
 /* ----------------scratch card code  ----------------*/
 
 /*------------------Pracrice test----------------------*/
 function startPractice(frm)
 {
	 var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/mWhiteLabel/ttDiagnosticTest.php';
    
     $.mobile.changePage("ttPracticeTest.html");
     
     var formData = $("#"+frm).serialize();
     
      $.ajax({
          type: "POST",
          url:siteUrl,
          data: formData, 
          dataType: "text",
          async: true,
          beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	            $('#practice_test_page').empty();

	            $('#practice_test_page').append(dataT);
	            $('#practice_test_page').trigger('create');
	        },
         
          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
        	  return false;
              alert('Network error has occurred please try again!');
           }  
      });
 }
 
 $(document).on('click', '#submit_practice_test', function ()
		 {

		 	submitPracticeExam();

		 });


		  function submitPracticeExam()
		  {
		 	 
		 	 $.mobile.changePage("practiceResult.html");
		      var siteName = localStorage.getItem("siteName");

		      siteUrl = siteName + "/wp-content/plugins/tet-india/mWhiteLabel/ttDiagnosticResult.php";
		     
		      var formData = $("#frmPracticeTest").serialize();
		     
		 		        $.ajax({
		 		            url: siteUrl,
		 		            data: formData, // Convert a form to a JSON string representation
		 		            type: 'post',
		 		            cache: false,
		 		            dataType: "text",
		 		            beforeSend: function () {
		 		                $.mobile.showPageLoadingMsg(true);
		 		            },
		 		            complete: function () {
		 		                $.mobile.hidePageLoadingMsg();
		 		            },
		 		            success: function  (data, status)
		 		            {
		 		            	
		 		            	  dataT = $.trim(data);
		 				            $('#practice_result_page').empty();

		 				            $('#practice_result_page').append(dataT);
		 				            $('#practice_result_page').trigger('create');


		 		            },
		 		            error: function (x, t, m) {
		 		            	//$('#tet_loading_img').css({'display': 'none'});
		 		                alert('Network error has occurred please try again! ');
		 		            }
		 		        });
		  }

 
 /*------------------End of Pracrice test----------------------*/

 

 
		
		  $("#payment_method_cheque").click(function () {

		    
		      $("#tt_payment_cheque").slideDown('slow');
		      $("#tt_payment_online_trans").slideUp('slow');
		      
		      $("#frmCheckout").attr("action", "");

		  });

		   $("#payment_method_online_trans").click(function () {

		      
		      $("#tt_payment_cheque").slideUp('slow');
		      $("#tt_payment_online_trans").slideDown('slow');
		      
		      $("#frmCheckout").attr("action", "");

		  });
		   

		   $(document).on('click', '#place_order', function ()
		  	        {
		  	 		   	submitCheckoutForm('cash');
		  		     
		  	        });
	 
		   
		   $(document).on('change', '[type="radio"]#payment_method_online_trans', function()
		  {
		  	 $('#tt_payment_online_trans').css({'display':'block'});
		       $('#tt_payment_cheque').css({'display':'none'});
		  });
		   
		   $(document).on('change', '[type="radio"]#payment_method_cheque', function()
		  {
		  		$('#tt_payment_online_trans').css({'display':'none'});
		  		$('#tt_payment_cheque').css({'display':'block'});
		  });