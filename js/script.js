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


});


