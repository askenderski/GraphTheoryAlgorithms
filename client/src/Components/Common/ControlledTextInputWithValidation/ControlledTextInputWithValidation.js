import withValidateOnInputStop from "../../../HOCs/withValidateOnInputStop";
import ControlledTextInput from "../ControlledTextInput/ControlledTextInput";

const ControlledTextInputWithValidation = withValidateOnInputStop(ControlledTextInput);

export default ControlledTextInputWithValidation;