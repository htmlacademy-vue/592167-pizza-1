import { emailRegex } from "@/constants";

const rules = {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электронная почта имеет неверный формат",
  },
};

const validator = (value, appliedRules, needValidation = true) => {
  let error = "";
  if (!needValidation) {
    return;
  }
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;
      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(
          fields[key],
          validations[key].rules,
          validations[key].needValidation
        );
        if (validations[key].error) {
          isValid = false;
        }
      });
      return isValid;
    },
    $clearValidationErrors() {
      if (!this.validations) {
        return;
      }
      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },
  },
};
