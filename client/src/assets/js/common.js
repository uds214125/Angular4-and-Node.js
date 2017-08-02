$(document).ready(function() {

	// code of select state start here===========
                var country = ["Australia", "Bangladesh", "Denmark", "Hong Kong", "Indonesia", "Netherlands", "New Zealand", "South Africa"];
                $("#country").select2({
                  data: country
                });
    // code of select state ends here=============

     $("ul.nav-stacked li").click(function(){
        $(".inputs-fields").hide();
    });

     $(".navbar-brand").click(function(){
        $(".inputs-fields").show();
    });
});