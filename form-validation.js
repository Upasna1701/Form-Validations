$(document).ready(function () {

    // Only Alphabets Validation

    $("#Username, #ParentName").on("input", function() {
        var inputValue = jQuery(this).val();
        
        // Use a regular expression to allow only alphabets with spaces, but the first character cannot be a space
        var regex = /^[A-Za-z][A-Za-z ]*$/;
        
        // Test the input against the regex
        if (!regex.test(inputValue)) {
            // If input doesn't match the regex, remove non-alphabet characters and extra spaces
            var cleanedValue = inputValue.replace(/[^A-Za-z ]/g, ''); // Remove non-alphabet characters
            cleanedValue = cleanedValue.replace(/  +/g, ' '); // Remove extra spaces
            if (cleanedValue.length > 0 && cleanedValue[0] === ' ') {
                cleanedValue = cleanedValue.substring(1); // Remove leading space
            }
            jQuery(this).val(cleanedValue);
        }
    });


   // Mobile number validation only numbers allowed
    $("#phone").on("keypress", function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
        // maxlength 13 characters
        if ($(this).val().length >= 10) {
          evt.preventDefault(); 
        }
        return true;
    });
    $("#phone").on("keyup", function (event) {
        var mobval = parseInt($("#phone").val().substr(0, 2));
        var mobvalfirstdigit = parseInt($("#phone").val().substr(0, 1));
        // first number cannot be 1 to 5 
        if (mobval < 60 && mobvalfirstdigit != 6 && mobvalfirstdigit != 7 && mobvalfirstdigit != 8 && mobvalfirstdigit != 9) {
        $("#phone").val("");
        return false;
        }
    });

    // Fist letter cannot be space for any field validation
    
    $("#email, #TokenNumber, #AccountName, #AccountNumber, #IfscCode").on("keypress", function(event) {
        // Get the current value of the input field
        var inputValue = $(this).val();
        
        // Check if the pressed key is a space and if the input is empty
        if (event.which === 32 && inputValue.length === 0) {
            event.preventDefault(); // Prevent the space from being entered
        }
    });

    // Function to check if the email format is valid
    function isValidEmail(email) {
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }


    // IFSc code validation

    function isValidIFSCCode(ifsc) {
        ifsc = ifsc.toUpperCase();
        var ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return ifscPattern.test(ifsc);
    }
    $(function() {
        $('#IfscCode').on('input', function() {
            var inputField = this;
            inputField.value = inputField.value.toUpperCase();
        });
    });

    // Function to check if the input contains special characters
    function containsSpecialCharacters(inputValue) {
        var specialChars = /[.,@#$%^&*(){}\-+=~`?<>\/\\|]/;
        return specialChars.test(inputValue);
    }
  
    // Function to clear error messages for a given field
    function clearErrorMessage(fieldId) {
        $("#" + fieldId + "-error").text(""); // Clear the error message
    }
  
    // Add input event listeners to clear error messages on input
    $("#Username, #ParentName, #phone, #email, #AccountName, #AccountNumber, #IfscCode, #TokenNumber").on("input", function() {
        clearErrorMessage($(this).attr("id"));
    });
    
    
    // Form submit
    
    var formSubmitted = false;
    $(".basic-form-btn").click(function(e) {
        if (formSubmitted) {
          e.preventDefault(); // Prevent multiple form submissions
          return;
        }
        e.preventDefault(); // Prevent multiple form submissions
      
        // Reset any previous error messages
        $(".basic-error-message").text("");
      
        var valid = true;
      
        // Field validations
        var validations = [
          { fieldId: "Username", required: true },
          { fieldId: "ParentName", required: true },
          { fieldId: "phone", required: true, minLength: 10},
          { fieldId: "TokenNumber", required: true, minLength: 6 ,noSpecialChars: true},
          { fieldId: "email", required: true },
          { fieldId: "AccountName", required: true, noSpecialChars: true},
          { fieldId: "AccountNumber", required: true, minLength: 9, maxLength: 18 ,noSpecialChars: true },
          { fieldId: "IfscCode", required: true, maxLength: 11 ,noSpecialChars: true, customValidation: isValidIFSCCode},
        ];
      
        // Loop through the validations
        validations.forEach(function(validation) {
          var inputField = $("#" + validation.fieldId);
          var inputValue = inputField.val();
      
          // Check if the field is required
          if (validation.required && inputValue === "") {
            valid = false;
            $("#" + validation.fieldId + "-error").text(validation.fieldId.replace(/([A-Z])/g, ' $1').trim() + " is required.");
          } else {
            // Additional validation checks (e.g., min and max length, email validation)
            if (validation.noSpecialChars && containsSpecialCharacters(inputValue)) {
              valid = false;
              $("#" + validation.fieldId + "-error").text("Special characters are not allowed.");
            }
            if ((validation.fieldId === "phone" || validation.fieldId === "TokenNumber" || validation.fieldId === "AccountNumber") && inputValue.length < validation.minLength) {
              valid = false;
              $("#" + validation.fieldId + "-error").text(validation.fieldId + " must be at least " + validation.minLength + " characters.");
            }
            if (validation.fieldId === "email" && !isValidEmail(inputValue)) {
              valid = false;
              $("#" + validation.fieldId + "-error").text("Invalid email format.");
            }
            if (validation.fieldId === "IfscCode" && !validation.customValidation(inputValue)) {
              valid = false;
              $("#" + validation.fieldId + "-error").text("Invalid IFSC code format.");
            }
          }
        });
      
        if (!valid) {
          e.preventDefault(); // Prevent form submission if validation fails
        } else {
            console.log("submitted");
        }
      });


        // autocomplete hide

        $('#basicform input').attr('autocomplete', 'off');

        // copy paste validation

        $('#basicform input').on('paste', function (e) {
        e.preventDefault();
        // Clear the field when paste is detected
        $(this).val('');
        });

        // If you want to prevent right-click paste (context menu), you can add the following code:
        $('#basicform input').on('contextmenu', function (e) {
        e.preventDefault();
        });





});