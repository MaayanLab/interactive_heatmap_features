/*
Example files
*/

var hzome = ini_hzome();

make_clust('mult_view.json');

var about_string = 'This heatmap compares features available in several interactive heatmap tools including Clustergrammer.';

function make_clust(inst_network){

    d3.json('json/'+inst_network, function(network_data){

      // define arguments object
      var args = {
        root: '#container-id-1',
        'network_data': network_data,
        'about':about_string,
        'row_tip_callback':hzome.gene_info,
        'col_tip_callback':test_col_callback,
        'tile_tip_callback':test_tile_callback,
        'dendro_callback':dendro_callback,
        'matrix_update_callback':matrix_update_callback,
        'cat_update_callback': cat_update_callback,
        'sidebar_width':150,
        'tile_colors':['#808080','blue'],
        'row_order':'rank',
        'col_order':'rank',
        'row_label_scale': 1.5,
        'col_label_scale': 2,
        // 'ini_view':{'N_row_var':20}
        // 'ini_expand':true
      };

      resize_container(args);

      d3.select(window).on('resize',function(){
        resize_container(args);
        cgm.resize_viz();
      });

      cgm = Clustergrammer(args);

      check_setup_enrichr(cgm);

      d3.select(cgm.params.root + ' .wait_message').remove();


      // hack for color gradient
      d3.selectAll('linearGradient stop').each(function(){

        d3.select(this)
          .attr('stop-color', function(){

            var inst_color = d3.select(this).attr('stop-color');

            if ( inst_color == 'red' ){
              inst_color = '#808080';
            }

            return inst_color;

          });

      });

      // do not display sliders if initializing in other order
      d3.select('.col_slider_group').style('opacity',0)
      d3.select('.row_slider_group').style('opacity',0)
  });


}

function matrix_update_callback(){

  if (genes_were_found[this.root]){
    enr_obj[this.root].clear_enrichr_results(false);
  }
}

function cat_update_callback(){
  console.log('callback to run after cats are updated');
}

function test_tile_callback(tile_data){
  var row_name = tile_data.row_name;
  var col_name = tile_data.col_name;

}

function test_col_callback(col_data){
  var col_name = col_data.name;
}

function dendro_callback(inst_selection){

  var inst_rc;
  var inst_data = inst_selection.__data__;

  // toggle enrichr export section
  if (inst_data.inst_rc === 'row'){
    d3.select('.enrichr_export_section')
      .style('display', 'block');
  } else {
    d3.select('.enrichr_export_section')
      .style('display', 'none');
  }

}

function resize_container(args){

  var screen_width = window.innerWidth;
  var screen_height = window.innerHeight - 20;

  d3.select(args.root)
    .style('width', screen_width+'px')
    .style('height', screen_height+'px');
}
