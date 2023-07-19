import withValidateOnInputStop from "../../../HOCs/withValidateOnInputStop";
import ControlledTextInput, { ITextInputProps } from "../ControlledTextInput/ControlledTextInput";

const ControlledTextInputWithValidation = withValidateOnInputStop<ITextInputProps>(ControlledTextInput);

export default ControlledTextInputWithValidation;