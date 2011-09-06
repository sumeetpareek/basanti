/* Author: 

*/
inno_slide_order = new Array();
inno_slide_order['about'] = 1;
inno_slide_order['work'] = 2;
inno_slide_order['ways'] = 3;
inno_slide_order['services'] = 4;
inno_slide_order['contact'] = 5;

inno_bg_current = [255, 255, 255, 255, 255, 255];
inno_bg_options = [
  [15, 77, 5, 23, 118, 191], //green, blue
  [240, 117, 9, 15, 77, 5], //orange, green
  [213, 107, 255, 240, 117, 9], //purple, orange
  [241, 255, 43, 213, 107, 255] //yellow, purple
];
inno_bg_count = 0;
inno_bg_step = [0, 0, 0, 0, 0, 0];


function bg_anim() {
  for(i=0; i<inno_bg_current.length; i++) {
    inno_bg_current[i] = inno_bg_current[i] + inno_bg_step[i];
  }
  $('body').css('background' , '-moz-linear-gradient(left bottom , rgb('+ inno_bg_current[0] +', '+ inno_bg_current[1] +', '+ inno_bg_current[2] +'), rgb('+ inno_bg_current[3] +', '+ inno_bg_current[4] +', '+ inno_bg_current[5] +'), rgb('+ inno_bg_current[0] +', '+ inno_bg_current[1] +', '+ inno_bg_current[2] +'))  no-repeat fixed 0 0 transparent');
}


function bg_anim_init(secs, step_time) { // TODO: color consistency
  secs = secs || 1000;
  step_time = step_time || 250;
  steps = parseInt(secs/step_time);
  // set all the steps
  for (i=0; i<inno_bg_step.length; i++) {
    inno_bg_step[i] = parseInt((inno_bg_options[inno_bg_count][i] - inno_bg_current[i])/steps);
  }
  // increase the option index count
  inno_bg_count++;
  inno_bg_count = inno_bg_count % inno_bg_options.length;
  // start animation (depends on jquery.timer.js plugin)
  $(document).everyTime(step_time, function(){bg_anim();}, steps);
}


$(document).ready(function(){
  //setup any slider
  $('#slider').anythingSlider({
    buildArrows         : false,      // If true, builds the forwards and backwards buttons
    buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
    buildStartStop      : false,      // If true, builds the start/stop button
  enableKeyboard      : false,
      
  infiniteSlides      : false,
  });

var active = 'about';

// set up external links
$('.l a').click(function(){

    var temp_arr = $(this).attr('id').split('-');
    temp_arr.pop();
    var slide_id = temp_arr.join('-');    
    var slide_num = inno_slide_order[slide_id];
    var active_num = inno_slide_order[active];  
   
   // If switching to already active slide, do nothing.
   if (active == slide_id) {
     return false;
   }
   // append or prepend the slide
   if (slide_num < active_num) {
      // if the slide to show is "lighter", it needs to go before
      // if such "lighter" slide is moving from below the "hevier" side, adjustment is needed
      if ($('#'+slide_id).closest('.panel').index() > $('#'+active).closest('.panel').index()) {
        // move the sibling present before 'active slide' after it, and then move the 'to goto slide' before 'active slide'
        $($('#'+active).prev().detach()).insertAfter($('#'+active));        
      }
      var slide = $('#'+slide_id).detach();
      slide.insertBefore('#'+active);
   } else {
      // if the slide to show is "heavier", it needs to go after
      // if such "heavier" slide is moving from above the "lighter" side, adjustment is needed
      if ($('#'+slide_id).closest('.panel').index() < $('#'+active).closest('.panel').index()) {
        // move the sibling present after 'active slide' before it, and then move the 'to goto slide' after 'active slide'
        $($('#'+active).next().detach()).insertBefore($('#'+active));       
      }
        var slide = $('#'+slide_id).detach();
        slide.insertAfter('#'+active);
   }
    

        $('#slider').anythingSlider('#'+slide_id);
  
   active = slide_id;

// make the current nav active
$('.l a').removeClass('active');
$(this).addClass('active');

bg_anim_init();
   
    return false;
});

  // change body background gradient to the first option
  bg_anim_init();

});


