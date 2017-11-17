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

  // modal that shows dtails of a center when a button is clicked
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    var name = button.data('name')
    var address = button.data('address')
    var capacity = button.data('capacity')
    var price = button.data('price')
    var details = button.data('details')

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-body p#address').text(address);
    modal.find('.modal-body p#capacity').text(capacity)
    modal.find('.modal-body p#price').text(price)
    modal.find('.modal-body p#div').text(details)
  })
});
