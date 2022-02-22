$(".box").hide();
$(document).ready(function () {
    var Arr, htmls
    $(".loader").show()
    fetch("https://gnews.io/api/v4/top-headlines?&token=5024123fe545730f7fa719ed2ebea9cb&lang=en")
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
            $(".loader").hide()
            console.log(data);
            Arr = data.articles.map(function (input) {
                return `<div id="infor" class="flex-container">
                    <div style="order: 1"><img src= ${input.image} alt="image"></div> 
                    <div id="text" style="order: 2"> 
                         <a href= ${input.url} target="blank"> ${input.title} </a>
                         <p><i>${input.publishedAt}</i></p>
                          <p>${input.description}</p>
                      </div>
                 </div>`
            })
            htmls = Arr.join(" ")
            return $("#json").html(htmls)
        });

    $("#showSearch").click(function () {
        $(".box").show("fast");
        $("#json, #banner").css("opacity", "0.4")
    });

    $("#close").click(function () {
        $(".box").hide("fast");
        $("#json, #banner").css("opacity", "1")
    })

    $('#btSearch').click(function () {
        let result = $("#search").val()
        let start = $("#start").val()
        let end = $("#end").val()
        $(".loader").show()
        $("#json").hide()
        console.log(result)
        console.log(start)
        console.log(end)
        if (result != "") {
            $("#json, #banner").css("opacity", "1")
            $(".box").hide("fast");
            fetch("https://gnews.io/api/v4/search?q=" + result + "&from=" + start + "&to=" + end +"&token=5024123fe545730f7fa719ed2ebea9cb&lang=en")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    $(".loader").hide()
                    $("#json").show()
                    Arr = data.articles.map(function (input) {
                        return `<div id="infor" class="flex-container">
                        <div style="order: 1"><img src= ${input.image} alt="image"></div> 
                        <div id="text" style="order: 2"> 
                             <a href= ${input.url} target="blank"> ${input.title} </a>
                             <p><i>${input.publishedAt}</i></p>
                              <p>${input.description}</p>
                          </div>
                     </div>`
                    })
                    htmls = Arr.join(" ")
                    return $("#json").html(htmls)
                });
        }
    })

})
