/* eslint-disable */
$(document).ready(() => {
  let notdone = true;
  $('#btn').click(() => {
    if (notdone) {
      $('.title').prop('disabled', false);
      $('#btn').val('Done');
      // $('#btn').html('Done');
      $('#btn').html('<i class="fa fa-edit fa-lg fw"></i> Submit');
      notdone = false;
      $('#btn').click(() => {
        $('.title').prop('disabled', true);
        
      });
    } else {
      $('.title').prop('disabled', true);
      $('#btn').val('Edit');
      $('#btn').html('<i class="fa fa-edit fa-lg fw"></i> Edit');
      notdone = true;
      $('#btn').click(() => {
        $('.title').prop('disabled', false);
        
      });
    }
  });
});
