function encrypt(public_key_file) { 
jQuery.get(public_key_file, function(data) {
    run(data);
	});
}
function run(pubkey) {
	'use strict';
    if (window.crypto.getRandomValues) {  
        if ($('#button').html() === "Encrypt") {
			var openpgp = typeof window !== 'undefined' && window.openpgp ? window.openpgp : require('https://github.com/openpgpjs/openpgpjs/blob/master/dist/openpgp.min.js');
			openpgp.initWorker({ path:'https://github.com/openpgpjs/openpgpjs/blob/master/dist/openpgp.worker.min.js' });
			openpgp.config.aead_protect = false;
			var options = {
    			data: $('#input').val(),
    			publicKeys: openpgp.key.readArmored(pubkey).keys
			};
			openpgp.encrypt(options).then(function(ciphertext) {
				$('#input').val(ciphertext.data);
			});
            $('#button').html("Clear");  
            return true;  
        } else {  
            $('#input').val("");
            $('#button').html("Encrypt");  
        }  
   } else {  
        $("#button").val("Error");  
        window.alert("This browser isn't supported!");  
        return false;  
    }  
}  
