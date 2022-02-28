import React from "react";
import { SafeAreaView } from "react-native";
import { Content, Title, TextInput, Button, HelperText } from "components";
import { useForm } from "form/Form/Form";
import { ValidationSchema } from "form/Form/types";
import { TextField } from "form/TextField/TextField";
import { isRequired } from "form/validations/isRequired";
import { isAlphanumeric } from "form/validations/isAlphanumeric";
import { useUpdateCurrentUser } from "modules/users/useUpdateCurrentUser";

type FormValues = {
  username: string;
};

const validationSchema: ValidationSchema<FormValues> = {
  username: [isRequired(), isAlphanumeric()],
};

export const SetUsernameScreen = () => {
  const { mutateAsync: updateCurrentUser } = useUpdateCurrentUser();
  const { Form, handleSubmit } = useForm<FormValues>({
    validate: validationSchema,
    onSubmit: (values) => updateCurrentUser({ username: values.username }),
  });

  return (
    <SafeAreaView>
      <Content>
        <Title style={{ marginBottom: 20 }}>Set Username</Title>
        <Form>
          <TextField
            autoCapitalize="none"
            placeholder="johndoe"
            name="username"
          />

          <Button
            onPress={handleSubmit}
            style={{ alignSelf: "flex-end", marginTop: 10 }}
            mode="contained"
          >
            Next
          </Button>
        </Form>
      </Content>
    </SafeAreaView>
  );
};
