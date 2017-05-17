import { Validator } from 'vee-validate'
Validator.extend('phone', {
  getMessage: function(field){
    return 'The ${field} is not a valid phone'
  },
  validate: function(phone){
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(phone)){return false}
        return true
  }
})
export default [{name:'phone',rule:'required|phone'}]
