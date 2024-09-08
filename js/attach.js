function attachFile($attachField) {
    let attachError, attachedBlock, attachName = null;

    $attachField.on('change',(e) => {
        let $this = $(e.currentTarget);
        let fileSize = $this[0].files[0].size;
        let fileMaxSize = $attachField.data('maxsize') ? $attachField.data('maxsize')*1024*1024 : null;	
        let formats = $this.attr('accept') ? $this.attr('accept').toString() : null;		
        let fullPath = $this.val();
        let fileType = fullPath.substr(fullPath.lastIndexOf('.')).toLowerCase();
        $attachField.parents('label').removeClass('has-error');
        if (fileMaxSize && fileSize > fileMaxSize) {
            if(!attachError) {
                $attachField.parents('label').after('<span class="attach_error"></span>');
                attachError = $attachField.parents('label').next('.attach_error');
            };
            attachError.text($attachField.data('sizeerror'));
            $attachField.val('');
        } else if (formats && !formats.includes(fileType)){
            if(!attachError) {
                $attachField.parents('label').after('<span class="attach_error"></span>');
                attachError = $attachField.parents('label').next('.attach_error');
            };
            attachError.text($attachField.data('typeerror'));
            $attachField.val('');
            

        } else {
            if (fullPath) {
                if(attachError) {
                    $(attachError).remove();
                    attachError = null;
                }
                
                let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                let filename = fullPath.substring(startIndex);
                if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }
                if(!attachedBlock) {
                    $attachField.parents('label').after('<div class="attached_file"><div class="file_name"></div><span class="attach_remove"></span></div>');
                    attachedBlock = $attachField.parents('label').next('.attached_file');
                    attachName = attachedBlock.find('.file_name');
                }
                attachName.text(filename);
                $attachField.parents('label').attr('hidden','');
            };
        }
        
    })
	
    $(document).on('click','.attach_remove',(e) => {
        $(e.target).parents('.field_block').find('label').removeAttr('hidden');
        $(e.target).parents('.field_block').find('input').val('');
        $(attachedBlock).remove();
        attachedBlock = null;
    })
}