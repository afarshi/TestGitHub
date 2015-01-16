	


        $().ready(function () {
            InitialDictionary = new Array();
            LoadCurrentValues(InitialDictionary);
     
            function Check() {
                if (!CompareDictionaries(InitialDictionary)) {
                    wind.onbeforeunload = null;
                    return confirm('Form is modified, Do you want to continue');
     
                }
            }
     
            $("a").click(Check)
            $(window).bind('beforeunload', function () {
                if (!CompareDictionaries(InitialDictionary)) {
                    return "Form is modified, Do you want to continue";
     
                }
            })
            $('form').submit(function () { window.onbeforeunload = null; })
        })
 
           
$(document).ready(function() {
    InitialDictionary = [];
    LoadCurrentValues(InitialDictionary);
     
    function Check() {
        if (!CompareDictionaries(InitialDictionary)) {
            window.onbeforeunload = null;
            return confirm('Form is modified, Do you want to continue');
        }
    }
     
    $("a").click(Check);
    $(window).bind('beforeunload', function() {
        if (!CompareDictionaries(InitialDictionary)) {
            return "Form is modified, Do you want to continue";
     
        }
    })
    $('form').submit(function() {
        window.onbeforeunload = null;
    })
});
           
function LoadCurrentValues(dictionary) {
    $("input:text").each(function() {
        AddElementToDictionary(dictionary,this.id, this.value);
    });
    //alert(this.value )});
    $("input:radio").each(function() {
        AddElementToDictionary(dictionary,this.id, this.checked);
    });
    $("input:checkbox").each(function() {
        AddElementToDictionary(dictionary,this.id, this.checked);
     
    });
    $("select").each(function() {
        AddElementToDictionary(dictionary,this.id, $("#" + this.id).val());
    }
    )
}
//Adds the form element values to dictionary
function AddElementToDictionary(Dictionary, name, value) {
    var formElement = new FormElement();
    formElement.name = name;
    formElement.value = value;
    Dictionary.push(formElement)
}
     
     
// to compare the initial form values and current form values and returns true if they are same or false if they are different.
     
function CompareDictionaries(InitialDictionary) {
    CurrentDictionary = new Array();
     
    //At any point while the application is runing it will load the current values, for each control in the form.
    LoadCurrentValues(CurrentDictionary);
    // Initially check for the number of controls in the Initial Dictionary and in the final dictionary. If the number of controls don't match then
    // form is changed in such a way that some of the controls are hidden or some of the controls loaded as part of the page actions.
    // In these cases, Form save dailogue should trigger
     
    if (InitialDictionary.length != CurrentDictionary.length) {
        return false;
    }
        //number of controls are same, next check if there is any change in the values of each controls
    else {
     
        for(i=0;i<InitialDictionary.length;i++)
        {
            if((InitialDictionary[i].name==CurrentDictionary[i].name) && (InitialDictionary[i].value != CurrentDictionary[i].value))
            {
                return false;
            }
        }
        return true;
    }

