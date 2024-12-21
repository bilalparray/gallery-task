$(document).ready(function () {
  // Filter images
  $(".filter-buttons button").click(function () {
    var filter = $(this).attr("data-filter");

    // Remove 'active' class from all buttons and add it to the clicked button
    $(".filter-buttons button").removeClass("active");
    $(this).addClass("active");

    if (filter == "all") {
      $(".gallery-item").show();
    } else {
      $(".gallery-item").hide();
      $('.gallery-item[data-category="' + filter + '"]').show();
    }
  });

  // Hover effect to show caption
  $(".gallery")
    .on("mouseenter", ".gallery-item", function () {
      $(this).find(".caption").fadeIn(200);
    })
    .on("mouseleave", ".gallery-item", function () {
      $(this).find(".caption").fadeOut(200);
    });

  // Load more images
  $("#load-more").click(function () {
    var newImages = `
            <div class="gallery-item" data-category="nature">
    <img src="images/nature4.jpg" alt="Nature 4">
    <div class="caption">Stunning mountain view</div>
</div>
<div class="gallery-item" data-category="nature">
    <img src="images/nature5.webp" alt="Nature 5">
    <div class="caption">Lush green forest</div>
</div>
<div class="gallery-item" data-category="nature">
    <img src="images/nature6.jpg" alt="Nature 6">
    <div class="caption">Crystal-clear lake</div>
</div>
<div class="gallery-item" data-category="nature">
    <img src="images/nature7.jpg" alt="Nature 7">
    <div class="caption">Golden sunset over hills</div>
</div>
<div class="gallery-item" data-category="cities">
    <img src="images/city4.jpg" alt="City 4">
    <div class="caption">Vibrant city streets</div>
</div>
<div class="gallery-item" data-category="cities">
    <img src="images/city5.jpg" alt="City 5">
    <div class="caption">Historic downtown area</div>
</div>
<div class="gallery-item" data-category="cities">
    <img src="images/city6.jpg" alt="City 6">
    <div class="caption">Skyscrapers touching the sky</div>
</div>

           
        `;
    $(".gallery").append(newImages);
  });

  // Lightbox effect
  $("body").on("click", ".gallery-item img", function () {
    var $currentImg = $(this);

    // Function to update the navigation button states
    function updateNavigationButtons() {
      var $prevImg = $currentImg
        .parent(".gallery-item")
        .prev(".gallery-item")
        .find("img");
      var $nextImg = $currentImg
        .parent(".gallery-item")
        .next(".gallery-item")
        .find("img");

      if ($prevImg.length === 0) {
        $(".lightbox .prev").prop("disabled", true); // Disable 'Prev' button
      } else {
        $(".lightbox .prev").prop("disabled", false); // Enable 'Prev' button
      }

      if ($nextImg.length === 0) {
        $(".lightbox .next").prop("disabled", true); // Disable 'Next' button
      } else {
        $(".lightbox .next").prop("disabled", false); // Enable 'Next' button
      }
    }

    var src = $currentImg.attr("src");
    var lightbox = `
        <div class="lightbox">
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="${src}" alt="">
                <div class="navigation">
                    <button class="prev">Prev</button>
                    <button class="next">Next</button>
                </div>
            </div>
        </div>
    `;
    $("body").append(lightbox);

    // Initial button state update
    updateNavigationButtons();

    // Close lightbox
    $(".lightbox .close").click(function () {
      $(".lightbox").remove();
    });

    // Navigate to previous image
    $(".lightbox .prev").click(function () {
      var $prevImg = $currentImg
        .parent(".gallery-item")
        .prev(".gallery-item")
        .find("img");
      if ($prevImg.length) {
        $currentImg = $prevImg;
        $(".lightbox img").attr("src", $currentImg.attr("src"));
        updateNavigationButtons();
      }
    });

    // Navigate to next image
    $(".lightbox .next").click(function () {
      var $nextImg = $currentImg
        .parent(".gallery-item")
        .next(".gallery-item")
        .find("img");
      if ($nextImg.length) {
        $currentImg = $nextImg;
        $(".lightbox img").attr("src", $currentImg.attr("src"));
        updateNavigationButtons();
      }
    });
  });
});
