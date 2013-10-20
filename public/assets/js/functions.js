jQuery(document).ready(function(){
    jQuery('input.datepicker').Zebra_DatePicker();  
    
    jQuery('.uploader').change(function(){
        var fullPath = this.value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        	filename = filename.substring(1);
        }
        jQuery(this).next('span.uploader_text').html(filename);
    });
});